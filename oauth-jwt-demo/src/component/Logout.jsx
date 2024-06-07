import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Logout = ({ className, onLogout }) => {
  const navigate = useNavigate();
  const [subId, setSubId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const decoded = jwtDecode(token);
    setSubId(decoded?.sub.split('_')[1]);  //https://avatars.githubusercontent.com/u/
  }, [])

  const handleLogout = async () => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      try {
        const response = await fetch("http://localhost:8080/invalidate-token", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.ok) {
          localStorage.removeItem("accessToken");
          onLogout(); // 로그아웃 상태로 전환
          navigate("/login");
        } else {
          console.error("Failed to logout");
        }
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
  };

  const avatarUrl = subId ? `https://avatars.githubusercontent.com/u/${subId}` : '';

  return (
    <Link to="#" onClick={handleLogout} className={className} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
      {subId && <img src={avatarUrl} alt="avatar" style={{ width: '24px', height: '24px', borderRadius: '30%', marginRight: '8px' }} />}
      Logout
    </Link>
  );
};

export default Logout;
