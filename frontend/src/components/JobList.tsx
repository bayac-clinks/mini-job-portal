import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Job from '../types/Job';

interface JobListProps{
    job: Job; // 単一の求人情報
    onDelete: (id:number) => void; //削除用関数
}

const JobList: React.FC<JobListProps> = ({ job, onDelete }) => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // モーダルの開閉状態を管理
    const [isDeleting, setIsDeleting] = useState<boolean>(false); // 削除処理中かどうか
    const [selectedJob, setSelectedJob] = useState<Job>(job); // 選択中の求人情報
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    // モーダルを開く（削除ボタンのクリック時）
    const openModal = (job: Job) => {
        setSelectedJob(job); // 削除対象IDを設定
        setIsModalOpen(true); // モーダルを開く
    };

    // モーダルを閉じる
    const closeModal = () => {
        setIsModalOpen(false); // モーダルを閉じる
        // setSelectedJob(null); // 選択中の求人IDをクリア
    };

    // モーダル内で削除を実行
    const confirmDelete = () => {
        setIsDeleting(true); // 削除処理開始
        onDelete(selectedJob.id); // 削除処理を実行
        setIsDeleting(false); // 削除処理終了
        closeModal(); // モーダルを閉じる
    };
    
    return (
        <div className="p-4 bg-white shadow-md border border-gray-200 rounded-lg mb-4 hover:shadow-lg transform transition duration-200 w-75 flex flex-col justify-between">
            <h2 className="text-lg font-bold text-gray-800 border-b">{job.title}</h2>
            <div className="flex-grow mt-2">
                <p className="text-gray-900 mt-2 text-sm break-words whitespace-pre-wrap">{job.company}</p>
                <p className="text-gray-700 text-sm mt-1 break-words whitespace-pre-wrap">
                    {isExpanded ? job.description : job.description.slice(0, 100)} {/* 文字数で省略 */}
                    {job.description.length > 100 && (
                        <span onClick={() => setIsExpanded(!isExpanded)} className="text-blue-500 underline ml-2 cursor-pointer" role="button" >
                            {isExpanded ? '閉じる' : 'もっと見る'}
                        </span>
                    )}
                </p>
            </div>
            <div className="flex justify-end mt-4">
                {/* 詳細ボタン */}
                <button onClick={() => navigate(`/jobs/${job.id}`)} className="text-blue-500 underline text-sm">詳細を見る</button>
                {/* 削除ボタン */}
                <button onClick={() => openModal(job)} className="text-red-500 underline text-sm">削除</button>
            </div>
            {/* モーダルダイアログ */}
            {isModalOpen && (
                <div className="bg-customGray/50 fixed inset-0 z-50 flex justify-center items-center">
                  <div className="bg-white p-6 rounded shadow-md w-96">
                    <p className="text-lg font-bold mb-4">本当に「{selectedJob.title}」を削除しますか？</p>
                    <div className="flex justify-end">
                        {/* 削除処理中はボタンを無効化 */}
                        <button onClick={confirmDelete} disabled={isDeleting} className={`text-red-500 underline px-4 py-2 rounded mr-4 ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            {isDeleting ? '削除中...' : '削除する'}
                        </button>
                        {/* キャンセルボタン */}
                        <button onClick={closeModal} className="text-gray-500 underline text-sm">キャンセル</button>
                    </div>
                  </div>
                </div>
            )}
        </div>
    );
};

export default JobList;