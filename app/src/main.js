// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// 引入Mint-UI 全部组件
import Mint from 'mint-ui'
Vue.use(Mint)
import "../node_modules/mint-ui/lib/style.css"

// 重置样式
import "../static/css/reset.css"

// 自定义插件
import installer from "./plugin/installer.js"
Vue.use(installer);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})