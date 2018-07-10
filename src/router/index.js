import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import login from '@/components/login'
// 路由懒加载
// const eago = () => import('@/components/eago')
// const add = () => import('@/components/add')
// const library = () => import('@/components/library')
// const register = () => import('@/components/register')
// const accountPage = () => import('@/components/accountPage')
// const setings = () => import('@/components/setings')
// const personal = () => import('@/components/personal')
import eago from '@/components/eago'
import add from '@/components/add'
import library from '@/components/library'
import register from '@/components/register'
import accountPage from '@/components/accountPage'
import setings from '@/components/setings'
import personal from '@/components/personal'
import slogan from '@/components/slogan'
import sloganlibrary from '@/components/slogan_library'
// import resource from 'vue-resource'

Vue.use(Router)
// Vue.use(resource)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [
        {
          path: '/',
          name: 'eago',
          component: eago
        },
        {
          path: '/add',
          name: 'add',
          component: add
        },
        {
          path: '/library',
          name: 'library',
          component: library
        },
        {
          path: '/register',
          name: 'register',
          component: register
        },
        {
          path: '/accountPage',
          name: 'accountPage',
          component: accountPage
        },
        {
          path: '/setings',
          name: 'setings',
          component: setings
        },
        {
          path: '/personal',
          name: 'personal',
          component: personal
        },
        {
          path: '/slogan',
          name: 'slogan',
          component: slogan
        },
        {
          path: '/slogan_library',
          name: 'slogan_library',
          component: sloganlibrary
        }
      ]
    }
  ]
})
