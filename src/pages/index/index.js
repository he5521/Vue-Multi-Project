// 开发环境需要引入Mock
import '@/mock/index.js'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
import VueRouter from 'vue-router'
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}
let theme = 'light-theme'
if (theme) {
  import('@/assets/' + theme + '/style.scss')
} else {
  import(`@/assets/light-theme/style.scss`)
}
Vue.use(Element, {
 size: 'mini'
})

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
