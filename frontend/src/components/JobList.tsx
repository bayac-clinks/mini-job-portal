import React from 'react';
import Job from '../../types/Job';

interface JobListProps{
    job: Job; // 単一の求人情報
    onDelete: (id:number) => void; //削除用関数
}

const JobList: React.FC<JobListProps> = ({ job, onDelete }) => {
    return (
        <p className="p-4 bg-gray-100 border border-gray-300 rounded-lg mb-4">
            <h2 className="font-semibold">{job.title}</h2>
            <p className="text-sm text-gray-600">{job.company} - {job.description}</p>
            <button onClick={() => onDelete(job.id)}>削除</button>
        </p>
    );
};

export default JobList;