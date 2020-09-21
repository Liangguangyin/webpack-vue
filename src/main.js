import Vue from 'vue'
import App from './App'
import router from '@/router'
import store from '@/store'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import element from 'element-ui/lib/locale/lang/zh-CN'
import httpConfig from '@/server'
import '@/style/index.scss'
import pattern from '@/util/pattern.js'
import { loadingOpen, loadingClose } from '@/util/Loading'
import deepClone from '@/util/deepClone.js'
Vue.prototype.$axios = httpConfig;
Vue.prototype.$loadingOpen = loadingOpen
Vue.prototype.$loadingClose = loadingClose
Vue.prototype.$deepClone = deepClone
Date.prototype.pattern = pattern

// 组件全局注入
import tableList from "@/component/tableList"
import dynamicTree from '@/component/dynamicTree'
Vue.use(tableList)
Vue.use(dynamicTree)
Vue.use(ElementUI, { element })

// 全局导航守卫， 没有用户权限功能就不提出来了！！！
router.beforeEach((to, from, next) => {
  // vuex记录url的改变
  store.commit('setCurrentRouter', to)
  // if (to && to.path == '/') {
  //   next('/home')
  // } else {
  //   next()
  // }
  if (store.state.token) {
    if (to.path == '/') {
      next('/home')
    } else {
      next()
    }
  } else if (to.path == '/login') {
    next()
  } else {
    next('/login')
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')