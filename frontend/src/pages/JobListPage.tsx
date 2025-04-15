// src/pages/JobListPage.tsx
import React from 'react';
import Job from '../types/Job';
import JobList from '../components/JobList';

interface JobListPageProps {
  jobs: Job[]; // 求人データの配列
  loading: boolean; // ローディング状態
  error: string | null; // エラーメッセージ
  onDelete: (id:number) => Promise<void>; // 削除後のリロード関数
}

const JobListPage: React.FC<JobListPageProps> = ({ jobs, loading, error, onDelete }:JobListPageProps) => {
  // ローディング中の表示
  if (loading) {
    return <p>Loading...</p>;
  }

  // エラーが発生した場合の表示
  if (error) {
    return <p className="text-red-600">{error}</p>;
  }
  
  // 求人リスト表示
  return (
    <div>
      <h1 className="text-2xl font-bold">求人情報一覧</h1>
        {jobs.map((job) => (
            <JobList key={job.id} job={job} onDelete={onDelete}/>
        ))}
    </div>
  );
};

export default JobListPage;