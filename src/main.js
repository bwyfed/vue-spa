import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/' // 在同级目录下，同时有store.js和store/目录，则要加上./store/

console.log(JSON.stringify(process.env)) // {"NODE_ENV":"development","VUE_APP_TITLE":"开发环境","BASE_URL":"/"}
Vue.config.productionTip = false

// 如果是非线上环境，加载vconsole
if (process.env.NODE_ENV !== 'production') {
  var VConsole = require('vconsole')
  var vConsole = new VConsole()
  vConsole.setOption('maxLogNumber', 5000)
  // 设置为 true 以在浏览器开发工具的性能/时间线面板中启用对组件初始化、编译、渲染和打补丁的性能追踪。
  Vue.config.performance = true
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
