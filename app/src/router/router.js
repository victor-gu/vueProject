import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

// 引入组件
import HomeComponent from '@/components/home/home';
import classifyComponent from '@/components/classify/classify';
import findComponent from '@/components/find/find';
import myComponent from '@/components/my/my';
import newGirlComponent from '@/components/newGirl/newGirl';
import loginComponent from '@/components/login/login';
import registerComponent from "@/components/register/register";
import notFoundComponent from "@/components/notFound/notFound";

export default new Router({
	routes: [
		{ path: "/", redirect: "/home" },   // 重定向
		{ path: "*", component: notFoundComponent },   // 匹配404
		{ path: '/home', name: 'home', component: HomeComponent },   // 首页
		{ path: '/classify', name: 'classify', component: classifyComponent },   // 分类
		{ path: '/find', name: 'find', component: findComponent },    // 发现
		{ path: '/my', name: 'my', component: myComponent },    // 我的
		{ path: '/newGirl', name: 'newGirl', component: newGirlComponent },   // 淘女郎
		{ path: "/login", name: "login", component: loginComponent },    // 登录
		{ path: "/register", name: "register", component: registerComponent },   // 注册
		{ path: "/notFound", name: "notFound", component: notFoundComponent }    // 404
	]
});
