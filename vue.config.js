const configs = require('./config')
// console.log(process.env)

// 用于做相应的 merge 处理
const merge = require('webpack-merge')

// 根据环境判断使用哪份配置
let cfg
switch (process.env.NODE_ENV) {
  case 'development':
    cfg = configs.dev.env
    break
  case 'test':
    cfg = configs.test.env
    break
  case 'production':
    cfg = configs.build.env
    break
  default:
    break
}

module.exports = {
  chainWebpack: config => {
    config.plugin('define')
      .tap(args => {
        console.log(args)
        let name = 'process.env'
        // 使用 merge 保证原始值不变
        args[0][name] = merge(args[0][name], cfg)
        return args
      })
  },

  devServer: {
    open: true, // 是否自动打开浏览器页面
    host: '127.0.0.1', // 指定使用一个host。默认是localhost
    port: 8080, // 端口地址
    https: false, // 是否使用https
    // string | object 代理设置
    proxy: {
      // 接口是'/repos'开头的才用代理
      '/repos': {
        target: 'https://api.github.com', // 目标地址
        changeOrigin: true // 是否改变源地址
        // pathRewrite: {'^/api': ''}
      }
    },
    progress: true,
    // 提供在服务器内部的其他中间件之前执行自定义中间件能力
    before: app => {
      // `app`是一个express实例
    }
  }
}
