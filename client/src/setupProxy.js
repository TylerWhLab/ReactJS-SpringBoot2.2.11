const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:9999', //URL, // 프록시가 동작할 위치
            changeOrigin: true,
        })
    );
};