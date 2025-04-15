import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Job from '../types/Job';

const JobDetailsPage: React.FC = () => {
  // URL パラメータを取得（React Router の useParams を利用）
  const { id } = useParams<{ id: string }>();

  // 状態管理
  const [job, setJob] = useState<Job | null>(null); // 求人詳細データ
  const [loading, setLoading] = useState<boolean>(true); // ローディング状態
  const [error, setError] = useState<string | null>(null); // エラーメッセージ

  const navigate = useNavigate(); // 戻るボタンで使用可能

  // 求人詳細データの取得
  useEffect(() => {
    const fetchJobDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/jobs/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('指定された求人情報が見つかりませんでした。');
          } else {
            throw new Error('データを取得する際にエラーが発生しました。');
          }
        }
        const data: Job = await response.json();
        setJob(data); // データを状態に設定
      } catch (err: any) {
        setError(err.message || '不明なエラーが発生しました。');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJobDetails();
    }
  }, [id]);

  // ローディング中の表示
  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">データを読み込んでいます...</p>
      </div>
    );
  }

  // エラー発生時の表示
  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => navigate('/')} // 一覧画面に戻る
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          求人一覧に戻る
        </button>
      </div>
    );
  }

  // データ取得後の内容表示
  return (
    <div className="container mx-auto py-8">
      {job && (
        <>
          <h1 className="text-2xl font-bold mb-4">{job.title}</h1>
          <p className="text-gray-700 mb-2">会社名: {job.company}</p>
          <p className="text-gray-700 mb-4">詳細: {job.description}</p>
          <button
            onClick={() => navigate('/')} // 一覧画面に戻る
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            求人一覧に戻る
          </button>
        </>
      )}
    </div>
  );
};

export default JobDetailsPage;
