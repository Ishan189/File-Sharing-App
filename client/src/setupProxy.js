const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/',
    createProxyMiddleware({
      target: 'https://file-sharing-backend-i8pq.onrender.com',
      changeOrigin: true,
    })
  );
};