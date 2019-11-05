import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
*/

export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/login1',
    component: () => import('@/views/login/login1'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },

  // 首页
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    hidden: true,
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', affix: true }
    }]
  },

  // 个人中心
  {
    path: '/person',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'personCenter',
        name: 'PersonCenter',
        meta: { title: '个人中心', icon: 'form' },
        component: () => import('@/views/person/index')
      }
    ]
  },

  // test
  {
    path: '/dataMge',
    component: Layout,
    redirect: '/dataMge/dataRecode/import',
    name: 'DataMge',
    meta: { title: '数据管理', icon: 'home' },
    children: [
      {
        path: 'dataRecode',
        name: 'DataRecode',
        redirect: '/dataMge/dataRecode/import',
        meta: { title: '数据登记', icon: 'home' },
        children: [
          {
            path: 'import',
            name: 'Import',
            meta: { title: '数据导入', icon: 'home' }
          },
          {
            path: 'importQuery',
            name: 'ImportQuery',
            meta: { title: '导入数据查询', icon: 'home' }
          }
        ]
      },
      {
        path: 'calculator',
        name: 'Calculator',
        meta: { title: '计量程序登记', icon: 'home' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// 动态路由
export const asyncRouterMap = [
  { path: '*', redirect: '/404', hidden: true }
];
