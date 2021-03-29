const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/',
    createProxyMiddleware({
      target: 'https://nfeview.herokuapp.com',
      changeOrigin: true,
    })
  );
};
