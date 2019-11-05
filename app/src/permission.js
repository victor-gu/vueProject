import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import store from './store'

NProgress.configure({ showSpinner: false })

// 记录页面跳转历史，以此判断页面左滑跳转还是右滑跳转
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()

  // 动画效果
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)
  // 判断并记录跳转页面是否访问过，以此判断跳转过渡方式
  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.dispatch('SetDirection', 'forward')
    } else {
      store.dispatch('SetDirection', 'back')
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.dispatch('SetDirection', 'forward')
  }

  console.log(store.state.direction.direction);
  if (getToken()) {
    if (whiteList.indexOf(to.path) !== -1) {
      next({ path: '/' })
      NProgress.done()
    } else {
      next();
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
