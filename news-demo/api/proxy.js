import { createProxyMiddleware } from 'http-proxy-middleware';
import { parse, stringify } from 'querystring';

export default (req, res) => {
    const proxy = createProxyMiddleware({
        target: 'https://newsapi.org',
        changeOrigin: true,
        pathRewrite: {
            '^/api': '', // /api로 시작하는 경로를 제거
        },
        onProxyReq: (proxyReq, req, res) => {
            if (req.method === 'POST' && req.headers['content-type'] === 'application/x-www-form-urlencoded') {
                let bodyData = '';

                // 요청 본문 데이터를 수신
                req.on('data', chunk => {
                    bodyData += chunk.toString();
                });

                req.on('end', () => {
                    // 수신된 본문 데이터를 파싱하여 apiKey 파라미터 추가
                    const parsedBody = parse(bodyData);
                    parsedBody.apiKey = process.env.NEWS_API_KEY; // 환경 변수에서 API 키를 가져옴

                    // 수정된 본문 데이터를 다시 문자열로 변환하여 요청 본문에 설정
                    const newBodyData = stringify(parsedBody);

                    // Content-Length 헤더를 수정된 본문 데이터 길이로 설정
                    proxyReq.setHeader('Content-Length', Buffer.byteLength(newBodyData));

                    // 수정된 본문 데이터를 프록시 요청에 쓰기
                    proxyReq.write(newBodyData);
                    proxyReq.end();
                });
            }
        },
    });

    proxy(req, res);
};
