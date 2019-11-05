import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/views/layout/index';
export const constantRoutes = [
  // 登陆
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index'),
    meta: { keepAlive: false }
  },

  // 首页
  {
    path: '/',
    component: Layout,
    redirect: 'Home',
    children: [
      // 首页
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/index')
      },
      // 分类
      {
        path: 'category',
        name: 'Category',
        component: () => import('@/views/category/index')
      },
      // 我的
      {
        path: 'my',
        name: 'My',
        component: () => import('@/views/my/index')
      }
    ]
  }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

export default createRouter()
