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
  }
}
