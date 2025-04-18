import React from 'react';
import { Routes, Route } from 'react-router-dom';
import JobListPage from '../pages/JobListPage';
import JobDetailsPage from '../pages/JobDetailsPage';
import JobFormPage from '../pages/JobFormPage';
import Job from '../types/Job';

interface AppRoutesProps {
  jobs: Job[];                 // 全求人のデータ
  loading: boolean;            // ローディング状態
  error: string | null;        // エラーメッセージ
  onDelete: (id: number) => Promise<void>; // 削除処理用関数
  fetchJobs: () => Promise<void>; // 新規求人追加処理用関数
}

const AppRoutes:React.FC<AppRoutesProps> = ({jobs, loading, error, onDelete, fetchJobs}) =>{
  return (
    <Routes>
      {/* 求人一覧ページ */}
      <Route path="/" element={<JobListPage jobs={jobs} loading={loading} error={error} onDelete={onDelete} />} />
      {/* 求人詳細ページ (/:id を動的URLとして扱う) */}
      <Route path="/jobs/:id" element={<JobDetailsPage fetchJobs={fetchJobs}/>} />
      {/* 新規求人登録ページ */}
      <Route path="/jobs/new" element={<JobFormPage onJobAdded={fetchJobs}/>} />
    </Routes>
  );
}

export default AppRoutes;