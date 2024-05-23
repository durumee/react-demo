import { createProxyMiddleware } from 'http-proxy-middleware';

export default (req, res) => {
    const proxy = createProxyMiddleware({
        target: 'https://newsapi.org',
        changeOrigin: true,
        pathRewrite: {
            '^/api': '', // /api로 시작하는 경로를 제거
        },
        onProxyReq: (proxyReq, req, res) => {
        },
    });

    proxy(req, res);
};