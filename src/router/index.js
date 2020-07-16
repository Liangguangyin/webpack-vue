import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/component/home'

Vue.use(VueRouter)
export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'home',
    component: home
  }]
})