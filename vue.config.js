// const path = require('path')

module.exports = {
  // 配置方式1：CLI提供的属性
  outputDir: './build',
  devServer: {
    historyApiFallback: true,
    // 使用代理规则映射相应URL，绕过CORS跨域检测
    proxy: {
      '^/api': {
        target: 'http://152.136.185.210:5000',
        pathRewrite: {
          '^/api': '',
        },
        changeOrigin: true,
      },
    },
  },
  // 配置方式2：和webpack属性完全一致，最后会进行合并
  configureWebpack: {
    resolve: {
      alias: {
        component: '@/components',
      },
    },
  },
  // 配置方式3：和webpack属性完全一致，且接收之前的config，做覆盖
  // configureWebpack(config) {
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     component: '@/components'
  //   }
  // }
  // 配置方式4：chainWebpack链式编程，接收chainable config
  // chainWebpack(config) {
  //   config.resolve.alias
  //     .set('@', path.resolve(__dirname, 'src'))
  //     .set('component', '@/components')
  // },
}
