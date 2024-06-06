document.querySelectorAll('.hljs-attr').forEach(attrElement => {
    let nextNode = attrElement.nextSibling;
    
    // 다음 형제 노드가 텍스트 노드인지 확인
    while (nextNode && nextNode.nodeType !== Node.TEXT_NODE) {
      nextNode = nextNode.nextSibling;
    }
    
    if (nextNode && nextNode.nodeType === Node.TEXT_NODE) {
      console.log('다음 형제 텍스트 노드:', nextNode.textContent.trim());
      // 여기서 원하는 작업을 수행할 수 있습니다.
    }
  });
  
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
