const fetchWithAuth = async (url, options = {}) => {
  let token = localStorage.getItem("accessToken");

  // 토큰이 없으면 로그인 페이지로 리디렉션
  if (!token) {
    window.location.href = "/login";
    return;
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  // 토큰이 유효하지 않은 경우 로그인 페이지로 리디렉션
  if (response.status === 401) {
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  }

  return response;
};

export default fetchWithAuth;
