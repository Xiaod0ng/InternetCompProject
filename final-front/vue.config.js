const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080, // port
    host: 'localhost',
    open: true, //auto open web
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true, // cors
        secure: true,
        // pathRewrite: {
        //   // '^/proxyApi': '/ctm01boatstorage',
        // },
      },
    },
  },
})