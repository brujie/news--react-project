const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  // app.use("/api",
  //     createProxyMiddleware({
  //         target: "https://xxx",//目标端口
  //         changeOrigin: true,
  //         pathRewrite: {
  //             "^/api": ""
  //         }
  //     })
  // );
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );
};
