import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

// 引入组件, 路由懒加载
const HomeComponent = ()=> import('@/components/home/home');
const classifyComponent = ()=> import('@/components/classify/classify');
const findComponent = ()=> import('@/components/find/find');
const myComponent = ()=> import('@/components/my/my');
const newGirlComponent = ()=> import('@/components/newGirl/newGirl');
const loginComponent = ()=> import('@/components/login/login');
const registerComponent = ()=> import("@/components/register/register");
const notFoundComponent = ()=> import("@/components/notFound/notFound");

export default new Router({
	mode: "history",
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
