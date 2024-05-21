import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Outlet,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import styles from "./NavBar.module.css";

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

const LocationDisplay = () => {
  const location = useLocation();

  return (
    <div>
      <h3>Current Location</h3>
      <p>Pathname: {location.pathname}</p>
      <p>Search: {location.search}</p>
      <p>Hash: {location.hash}</p>
      <p>State: {JSON.stringify(location.state)}</p>
    </div>
  );
};

function Layout() {
  return (
    <div>
      <nav className={styles.navBar}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to="/" className={styles.navLink}>메인</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/about" className={styles.navLink}>About</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/about/John" className={styles.navLink}>About John</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/info" className={styles.navLink}>Info</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/search" className={styles.navLink}>Search</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/location" className={styles.navLink}>Location</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
      <footer style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f1f1f1' }}>© 2024 Company Name. All rights reserved.</footer>
    </div>
  );
}

// 라우터 컴포넌트
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="/about/" element={<About />} />
          <Route path="/about/:name" element={<About />} />
          <Route path="/info" element={<Info />} />
          <Route path="/search" element={<Search />} />
          <Route path="/location" element={<LocationDisplay />} />
        </Route>
      </Routes>
    </Router >
  );
}

export default App;