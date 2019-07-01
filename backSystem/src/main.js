import Vue from 'vue'

import 'normalize.css/normalize.css';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });

// 全局样式
import '@/styles/element-variables.scss';
import '@/styles/index.scss';

import App from './App'
import store from './store'
import router from './router'

import '@/icons';
import '@/permission';

// 登陆离子效果
import particles from 'particles.js';
Vue.use(particles);

// 解决edge浏览器select问题
import edgeSelectMixin from './plugin/edgeSelectMixin';
Vue.use(edgeSelectMixin);

// 挂载全局组件，指令，过滤器
import mountGlobal from './plugin/mountGlobal';
Vue.use(mountGlobal);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
