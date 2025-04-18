import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Job from '../types/Job';

interface JobDetailsPageProps{
  fetchJobs:() => Promise<void>; // 親コンポーネントから渡される求人データ再取得用関数
}

const JobDetailsPage: React.FC<JobDetailsPageProps> = ({fetchJobs}) => {
  // URL パラメータを取得（React Router の useParams を利用）
  const { id } = useParams<{ id: string }>();

  // 状態管理
  const [job, setJob] = useState<Job | null>(null); // 求人詳細データ
  const [loading, setLoading] = useState<boolean>(true); // ローディング状態
  const [error, setError] = useState<string | null>(null); // エラーメッセージ
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // モーダル表示状態
  const [isDeleting, setIsDeleting] = useState<boolean>(false); // 削除処理中かどうか

  const navigate = useNavigate(); // 戻るボタンで使用可能
  const handlePortalClick = async () => {
    await fetchJobs(); // 求人情報の再取得を実行
    navigate('/'); // 求人一覧画面に遷移
  };

  // モーダルを開く
  const openModal = () => {
    setIsModalOpen(true);
  };

  // モーダルを閉じる
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  // 削除処理
  const confirmDelete = async () => {
    setIsDeleting(true); // 削除処理開始
    try {
      const response = await fetch(`/api/jobs/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('求人情報の削除に失敗しました。');
      }

      await fetchJobs(); // 一覧データを再取得
      navigate('/'); // 削除後に一覧画面へ遷移
    } catch (err: any) {
      console.error(err.message);
      alert('削除処理中にエラーが発生しました。');
    } finally {
      setIsDeleting(false); // 削除処理終了
      closeModal(); // モーダルを閉じる
    }
  };

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
        <button onClick={(handlePortalClick)} // 一覧画面に戻る
          className="mt-4 bg-blue-500 text-gray-600 px-4 py-2 rounded underline">求人一覧に戻る</button>
      </div>
    );
  }

  // データ取得後の内容表示
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
      {job && (
        <>
          <h1 className="text-3xl font-bold text-gray-800 border-b pb-2 break-words whitespace-pre-wrap">{job.title}</h1>
          <p className="text-lg font-medium text-gray-700 mt-4">
            <span className="text-gray-900 font-semibold break-words whitespace-pre-wrap">会社名: </span> {job.company}
          </p>
          <p className="text-md text-gray-700 mt-4 break-words whitespace-pre-wrap">{job.description}</p>
          <div className="flex justify-end mt-4">
            {/* 求人一覧に戻るボタン */}
            <button onClick={(handlePortalClick)} className="bg-blue-500 text-gray-600 px-4 py-2 rounded underline">求人一覧に戻る</button>
            {/* 削除ボタン */}
            <button onClick={openModal} className="text-red-500 underline text-sm">削除</button>
          </div>
        </>
      )}
      {/* モーダルダイアログ */}
      {isModalOpen && (
        <div className="bg-customGray/50 fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <p className="text-lg font-bold mb-4">本当にこの求人情報を削除しますか？</p>
            <div className="flex justify-end">
              {/* 削除処理中はボタンを無効化 */}
              <button onClick={confirmDelete} disabled={isDeleting} className={`text-red-500 underline px-4 py-2 rounded mr-4 hover:bg-red-600 ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                {isDeleting ? '削除中...' : '削除する'}
              </button>
              <button onClick={closeModal} className="text-gray-600 underline px-4 py-2">キャンセル</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetailsPage;
