// 可省略.vue, .json, .js

import Vue from 'vue';
import App from './App';
import router from './router/router';

Vue.config.productionTip = false;

// 引入Mint-UI全部组件
import Mint from 'mint-ui';
Vue.use(Mint);
import "../node_modules/mint-ui/lib/style.css";

// 重置样式及全局变量
import "../static/css/reset.css";

// 引入font-awesome
import "../node_modules/font-awesome/scss/font-awesome.scss";

// 自定义插件, 写入全局组件
import installer from "@/plugin/installer";
Vue.use(installer);

// vue-preview图片预览
import VuePreview from 'vue-preview';
Vue.use(VuePreview, {
    // mainClass: 'pswp--minimal--dark',
    // barsSize: {top: 0, bottom: 0},
    captionEl: false,
    fullscreenEl: false,
    shareEl: false,
    bgOpacity: 0.8,
    tapToClose: true,
    tapToToggleControls: false
});


new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
});