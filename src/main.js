// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import elementui from 'element-ui'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store/index'
import global from './global'
import cookie from 'vue-cookies'
import world from 'echarts/map/js/world'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(elementui)
Vue.use(global)
Vue.use(cookie)
Vue.use(world)

Vue.config.productionTip = false
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
Vue.prototype.$http = axios
Vue.filter('datetostring', function (value) {
  if (value !== '') {
    return value.slice(0, value.indexOf('T'))
  }
  // let timeStamp = new Date(value)
  // console.log(timeStamp)
  // let week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  // return '【 ' + week[timeStamp.getDay()] + ' 】' + timeStamp.getFullYear() + ' - ' + timeStamp.getMonth() + 1 + ' - ' + timeStamp.getDate()
})
// Vue.http.options.emulateJSON = true
// Vue.http.options.headers = {
//   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
//   'Content-Type': 'multipart/form-data'
// }
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  mounted () {
    this.getusersCount()
    this.getsourceCount()
    this.getsloganCount()
  }
})
