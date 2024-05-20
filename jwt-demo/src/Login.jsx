import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const [memLgnId, setMemLgnId] = useState("");
  const [memLgnPw, setMemLgnPw] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ memLgnId, memLgnPw }),
      });

      if (response.ok) {
        console.log('response.headers :: ', response.headers);
        const authHeader = response.headers.get("Authorization");  //서버 측에서 Access-Control-Expose-Headers 설정을 통해 Authorization 헤더를 노출시켜줘야 읽을 수 있음
        // Authorization 헤더에서 JWT 토큰 추출
        if (authHeader && authHeader.startsWith("Bearer ")) {
          const jwtToken = authHeader.substring(7); // 'Bearer ' 이후의 토큰 부분만 추출
          console.log("JWT 토큰:", jwtToken);
          localStorage.setItem("token", jwtToken);
          console.log("로그인 성공: location.state: ", from);
          navigate(from, { replace: true });
        } else {
          console.error("Authorization 헤더가 없거나 형식이 잘못되었습니다.");
        }
      } else {
        console.error("로그인 실패");
      }
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="아이디"
          value={memLgnId}
          onChange={(e) => setMemLgnId(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={memLgnPw}
          onChange={(e) => setMemLgnPw(e.target.value)}
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default Login;
