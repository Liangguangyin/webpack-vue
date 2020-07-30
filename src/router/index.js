import Vue from 'vue'
import VueRouter from 'vue-router'
import config from './config'

Vue.use(VueRouter)
export default new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      component: () => import('@/view/404')
    },
    {
      path: '/',
      name: 'home',
      children: config,
      component: () => import('@/component/home')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/component/login')
    },
  ]
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}