import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JobFormPage: React.FC<{ onJobAdded: () => void }> = ({ onJobAdded }) => {
  // 状態管理
  const [title, setTitle] = useState<string>(''); // 求人タイトル
  const [description, setDescription] = useState<string>(''); // 求人説明
  const [company, setCompany] = useState<string>(''); // 会社名
  const [location, setLocation] = useState<string>(''); // 勤務地
  const [salary, setSalary] = useState<string>(''); // 給与（任意）

  const [error, setError] = useState<string | null>(null); // エラーメッセージ
  const [loading, setLoading] = useState<boolean>(false); // ローディング状態

  const navigate = useNavigate(); // ページ遷移用関数

  // フォーム送信ハンドラー
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // ページのリロードを防止
    setError(null); // エラー状態をリセット
    setLoading(true); // ローディング開始

    // 入力値をAPIに送信
    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          company,
          location,
          salary: salary ? parseInt(salary, 10) : null, // 給与を数値化
        }),
      });

      if (!response.ok) {
        // サーバーエラーをキャッチ
        throw new Error('求人情報の登録中に問題が発生しました。');
      }

      // 登録成功後、一覧ページを更新
      onJobAdded();
      navigate('/'); // 求人一覧画面に遷移
    } catch (err: any) {
      setError(err.message || '不明なエラーが発生しました。');
    } finally {
      setLoading(false); // ローディング状態を解除
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">新しい求人情報を登録</h1>

      {/* エラーメッセージ表示 */}
      {error && (
        <div className="mb-4 text-red-600">
          <p>{error}</p>
        </div>
      )}

      {/* フォーム */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold mb-2">タイトル *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="求人タイトルを入力してください"
            required
            maxLength={50}
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">説明 *</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="求人の説明を入力してください"
            required
            maxLength={200}
            rows={4}
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">会社名 *</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="会社名を入力してください"
            required
            maxLength={50}
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">勤務地 *</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="勤務地を入力してください"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">給与（オプション）</label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="給与金額を入力してください"
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? '登録中...' : '登録する'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-gray-600 underline"
          >
            キャンセル
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobFormPage;