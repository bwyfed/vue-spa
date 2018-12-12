// 公共变量
const common = {
  IP: JSON.stringify('IP common variable')
}

module.exports = {
  // 开发环境变量
  dev: {
    env: {
      TYPE: JSON.stringify('dev'),
      ...common
    }
  },

  // 测试环境变量
  test: {
    env: {
      TYPE: JSON.stringify('test'),
      ...common
    }
  },

  // 生产环境变量
  build: {
    env: {
      TYPE: JSON.stringify('prod'),
      ...common
    }
  }
}
