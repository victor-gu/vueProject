function installer(){

}

// 一级头部
import firstHeader from "@/components/common/firstHeader";

// 二级头部
import secondHeader from "@/components/common/secondHeader";

// 底部
import footerNav from "@/components/common/footer";

// http请求
import http from "@/utils/httpclient";

// 公共方法
import common from "@/utils/common";


installer.install = function(Vue){

    // 挂载http请求
    Vue.prototype.all = http.all;
    Vue.prototype.get = http.get;
    Vue.prototype.post = http.post;

    // 挂载公共方法
    Vue.prototype.Cookie = common.cookie;

    // 定义全局组件
    Vue.component(secondHeader.name, secondHeader);
    Vue.component(firstHeader.name, firstHeader);
    Vue.component(footerNav.name, footerNav);
}

export default installer;