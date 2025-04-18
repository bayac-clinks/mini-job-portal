import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import AppRoutes from './routes/AppRoutes'
import Job from './types/Job';

const App: React.FC = () => {
  // アプリ全体で管理する状態
  const [jobs, setJobs] = useState<Job[]>([]); // 求人一覧データ
  const [loading, setLoading] = useState<boolean>(false); // 読み込み状態
  const [error, setError] = useState<string | null>(null); // エラーハンドリング用

  // APIをコールして求人一覧を取得
  const fetchJobs = async () => {
    setLoading(true); // ローディングを開始
    setError(null);   // 前のエラーをクリア
    try {
      const response = await fetch('/api/jobs'); // RESTエンドポイントの呼び出し
      if (!response.ok) {
        throw new Error('データの取得に失敗しました'); // エラーをスロー
      }
      const data: Job[] = await response.json();
      setJobs(data); // 取得したデータを設定
    } catch (err: any) {
      setError(err.message || 'エラーが発生しました');
    } finally {
      setLoading(false); // ローディング終了
    }
  };

  // 求人削除処理
  const onDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/jobs/${id}`, { method: 'DELETE' }); // REST APIでDELETE処理
      if (!response.ok) {
        throw new Error('削除に失敗しました'); // 削除失敗時のエラーハンドリング
      }
      await fetchJobs(); // 削除後に最新の求人データを取得して再描画
    } catch (err: any) {
      setError(err.message || '削除処理に失敗しました'); // エラー表示
    }
  };

  // 初回レンダリング時に求人データを取得
  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* ヘッダーの呼び出し */}
        <Header fetchJobs={fetchJobs}/>
        
        <main className="container mx-auto p-4">
          {/* ページ遷移を定義 */}
          <AppRoutes jobs={jobs} loading={loading} error={error} onDelete={onDelete} fetchJobs={fetchJobs}/>
        </main>
      </div>
    </Router>
  );
};

export default App;