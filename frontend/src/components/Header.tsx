import { Link } from 'react-router-dom';
import '../App.css';

const Header:React.FC = ()=>{
  return (
    <>
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">
            <Link to="/">ミニ求人ポータル</Link>
          </h1>
          <nav>
            <Link to="/jobs/new" className="text-sm underline">
              新規登録
            </Link>
          </nav>
        </div>
      </header>
    </>
  )
}

export default Header
