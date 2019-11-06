import Vue from 'vue'

import 'normalize.css/normalize.css'

import '@/assets/css/index.scss'

import 'amfe-flexible'; // 移动端适配

import App from './App'

import store from './store'

import router from './router'

import '@/permission' // permission 权限

import mountGlobal from '@/plugin/mountGlobal'
Vue.use(mountGlobal);

import '@/icons'; // icons

require('./mock');

// 解决移动端click事件300毫秒延迟方法
import FastClick from 'fastclick'
if ('addEventListener' in document) {
  document.addEventListener(
    'DOMContentLoaded',
    function() {
      FastClick.attach(document.body)
    },
    false
  )
}

Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
