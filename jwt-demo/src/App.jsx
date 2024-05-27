import styles from "./NavBar.module.css";
import Login from "./component/Login";
import Logout from "./component/Logout";
import Cart from "./component/Cart";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useLocation,
} from "react-router-dom";

// 메인 컴포넌트
function Main() {
  return (
    <div>
      <h1>메인 페이지</h1>
      <p>환영합니다! 이 페이지는 메인 페이지입니다.</p>
    </div>
  );
}

// About 컴포넌트
function About() {
  return (
    <div>
      <h1>About 페이지</h1>
      <p>이 페이지는 About 페이지입니다.</p>
    </div>
  );
}

// Info 컴포넌트
function Info() {
  return (
    <div>
      <h1>Info 페이지</h1>
      <p>이 페이지는 Info 페이지입니다.</p>
    </div>
  );
}

// 인증 여부를 확인하는 함수
const isAuthenticated = () => {
  const token = localStorage.getItem("accessToken");
  return !!token;
};

// 인증이 필요한 라우트를 위한 컴포넌트
const PrivateRoute = ({ element: Element, ...rest }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = isAuthenticated();
      setIsAuth(authenticated);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return isAuth ? (
    <Element {...rest} />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

function App() {
  return (
    <Router>
      <div>
        <nav className={styles.navBar}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link to="/" className={styles.navLink}>
                메인
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/about" className={styles.navLink}>
                About
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/info" className={styles.navLink}>
                Info
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/cart" className={styles.navLink}>
                Cart
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/login" className={styles.navLink}>
                Login
              </Link>
            </li>
            <li className={styles.navItem}>
              <Logout className={styles.navLink} />
            </li>
          </ul>
        </nav>
        <Routes>
          {/* 공개 라우트 */}
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />

          {/* 인증이 필요한 라우트는 이렇게 사용 */}
          <Route path="/info" element={<PrivateRoute element={Info} />} />

          {/* 내부 API 사용시 백엔드 401 오류 발생하면 로그인 페이지로 이동 */}
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
