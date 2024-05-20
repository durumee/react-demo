import styles from "./NavBar.module.css";
import Login from "./Login";
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

// 로그인을 직접 체크하는 Cart 컴포넌트
const Cart = () => {
  return (
    <div>
      <h1>Cart 페이지</h1>
      <p>이 페이지는 Cart 페이지입니다.</p>
    </div>
  );
};

function App() {
  // 인증 여부를 확인하는 함수
  const isAuthenticated = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const response = await fetch(
          "http://localhost:8080/api/validate-token",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          console.log("Auth ok");
          return true;
        }
      } catch (error) {
        console.error("Token validation failed:", error);
      }
    }

    return false;
  };

  // 인증이 필요한 라우트를 위한 컴포넌트
  const PrivateRoute = ({ element: Element, ...rest }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
      const checkAuth = async () => {
        const authenticated = await isAuthenticated();
        setIsAuth(authenticated);
        setIsLoading(false);
      };

      checkAuth();
    }, []);

    if (isLoading) {
      // 인증 상태 확인 중일 때 로딩 표시 또는 다른 처리 가능
      return <div>Loading...</div>;
    }
    console.log("location: ", location);
    return isAuth ? (
      <Element {...rest} />
    ) : (
      <Navigate to="/login" replace state={{ from: location }} />
    );
  };

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
          </ul>
        </nav>
        <Routes>
          {/* 공개 라우트 */}
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />

          {/* 인증이 필요한 라우트 */}
          <Route path="/info" element={<PrivateRoute element={Info} />} />
          <Route path="/cart" element={<PrivateRoute element={Cart} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
