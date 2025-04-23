import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JobFormPage: React.FC<{ onJobAdded: () => void }> = ({ onJobAdded }) => {
  // 状態管理
  const [title, setTitle] = useState<string>(''); // 求人タイトル
  const [description, setDescription] = useState<string>(''); // 求人説明
  const [company, setCompany] = useState<string>(''); // 会社名
  
  const [error, setError] = useState<string | null>(null); // エラーメッセージ
  const [loading, setLoading] = useState<boolean>(false); // ローディング状態

  const navigate = useNavigate(); // ページ遷移用関数
  const handlePortalClick = async () => {
    onJobAdded(); // 求人情報の再取得を実行
    navigate('/jobs/'); // 求人一覧画面に遷移
  };

  // ▼ 追加: バリデーション関数
  const validateForm = (): boolean => {
    if (!title.trim() || title.length > 100 || title.length < 3 ) {
      setError('タイトルは必須で、3～100文字以内で入力してください。');
      return false; // バリデーション失敗
    }
    if (!company.trim() || company.length > 50 ||  company.length < 2 ) {
      setError('会社名は必須で、2～50文字以内で入力してください。');
      return false; // バリデーション失敗
    }
    if (description.length > 200) {
      setError('説明は200文字以内で入力してください。');
      return false; // バリデーション失敗
    }
    return true; // バリデーション成功
  };

  // フォーム送信ハンドラー
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // ページのリロードを防止
    setError(null); // エラー状態をリセット

    // ▼ バリデーション実行
    if (!validateForm()) {
      return; // バリデーション失敗時は早期リターン
    }

    // ローディング開始
    setLoading(true);

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
        }),
      });

      if (!response.ok) {
        // サーバーエラーをキャッチ
        throw new Error('求人情報の登録中に問題が発生しました。');
      }

      // 登録成功後、一覧ページを更新
      handlePortalClick();
      // await onJobAdded();
      // navigate('/jobs/'); // 求人一覧画面に遷移
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
            maxLength={100}
          />
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
          <label className="block font-semibold mb-2">説明</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="求人の説明を入力してください"
            maxLength={200}
            rows={4}
          ></textarea>
        </div>

        <div className="flex justify-end mt-auto space-x-1">
          <button
            type="submit"
            className="bg-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-600 underline"
            disabled={loading}
          >
            {loading ? '登録中...' : '登録する'}
          </button>
          <button
            type="button"
            onClick={(handlePortalClick)}
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