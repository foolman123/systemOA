const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
});
// module.exports = {
//   devServer: {
//     proxy: {
//       '/api': {
//         target: 'http://oa.anius.top', // 后端的接口地址
//         changeOrigin: true,
//         pathRewrite: {
//           '^/api': '/api' // 如果后端接口没有/api前缀，可以通过这里移除
//         }
//       }
//     }
//   }
// }