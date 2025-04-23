import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

interface HeaderProps {
  fetchJobs: () => Promise<void>; // 求人情報を再取得する関数
}

const Header:React.FC<HeaderProps> = ({fetchJobs})=>{
  const navigate = useNavigate(); // Navigate関数を取得
  const handlePortalClick = async () => {
    await fetchJobs(); // 求人情報の再取得を実行
    navigate('/jobs/'); // 求人一覧画面に遷移
  };

  return (
    <>
      <header className="bg-customGray py-1 fixed top-0 inset-x-0 shadow-md z-50">
        <div className="w-full flex justify-between items-center px-4 py-0">
          <div className="text-4xl font-bold">
            <Link to="/jobs/" className="transition-colors" onClick={handlePortalClick}>ミニ求人ポータル</Link>
          </div>
          <nav>
            <Link to="/jobs/new" className="text-sm bg-orange-300 !text-customGray hover:bg-orange-400 custom-hover py-2 px-4 rounded-md shadow-md transition-colors">新規登録</Link>
          </nav>
        </div>
      </header>
    </>
  )
}

export default Header
