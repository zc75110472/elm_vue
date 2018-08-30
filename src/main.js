import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './vuexx/index'
Vue.config.productionTip = false

Vue.prototype.$http = axios // 把axios挂在vue原型上
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
