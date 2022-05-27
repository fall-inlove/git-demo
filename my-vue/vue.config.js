const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8082", // 目标url
        changeOrigin: true, // 是否跨域
      },
    },
  },
});
