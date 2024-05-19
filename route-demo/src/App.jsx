import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";

// 메인 컴포넌트
function Main() {
  return (
    <div>
      <h1>메인 페이지</h1>
      <p>환영합니다! 이 페이지는 메인 페이지입니다.</p>
      <Link to="/search?query=오늘 점심">오늘 점심 검색</Link>
    </div>
  );
}

// About 컴포넌트
function About() {
  const { name } = useParams();
  const navigate = useNavigate();

  const goToMain = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>About 페이지</h1>
      <p>이 페이지는 About 페이지입니다.</p>
      <p>전달받은 파라미터: {name}</p>
      <button onClick={goToMain}>메인으로 이동</button>
    </div>
  );
}

// Info 컴포넌트
function Info() {
  const navigate = useNavigate();

  const goToMain = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>Info 페이지</h1>
      <p>이 페이지는 Info 페이지입니다.</p>
      <button onClick={goToMain}>메인으로 이동</button>
    </div>
  );
}

// 검색 컴포넌트
function Search() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search?query=${searchTerm}`);
  };

  return (
    <div>
      <h1>검색 페이지</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="검색어를 입력하세요"
      />
      <button onClick={handleSearch}>검색</button>
      {query && <p>검색어: {query}</p>}
    </div>
  );
}

// 라우터 컴포넌트
function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">메인</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/about/John">About John</Link>
            </li>
            <li>
              <Link to="/info">Info</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about/" element={<About />} />
          <Route path="/about/:name" element={<About />} />
          <Route path="/info" element={<Info />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
