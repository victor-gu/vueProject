import Vue from 'vue';
import Router from 'vue-router';
import common from "@/utils/common";
import { Toast } from 'mint-ui';
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
const phoneComponent = () => import("@/components/phone/phone");
const rarewordComponent = () => import("@/components/rareWord/rareWord");
const phraseComponent = () => import("@/components/phrase/phrase");


var router = new Router({
	mode: "history",
	routes: [
		{ path: "/", redirect: "/home" },   // 重定向
		{ path: "*", component: notFoundComponent },   // 匹配404
		{ path: '/home', name: 'home', component: HomeComponent },   // 首页
		{ path: '/find', name: 'find', component: findComponent },    // 发现
		{ path: '/my', name: 'my', component: myComponent },    // 我的
		{ path: '/newGirl', name: 'newGirl', component: newGirlComponent },   // 淘女郎
		{ path: "/login", name: "login", component: loginComponent },    // 登录
		{ path: "/register", name: "register", component: registerComponent },   // 注册
		{ path: "/notFound", name: "notFound", component: notFoundComponent },    // 404
		{ path: '/classify', component: classifyComponent, children: [   // 分类
			{ path: "", component: phoneComponent },
			{ path: "phone", name: "phone", component: phoneComponent },    // 手机号段
			{ path: "rareWord", name: "rareWord", component: rarewordComponent },    // 生僻字
			{ path: "phrase", name: "phrase", component: phraseComponent },    // 成语大全
		] },
	]
});

// 路由全局守卫，权限控制
router.beforeEach((to, from, next) => {   // 路由守卫
	// 需要登录才能显示的页面
	const nextRoute = ['classify', 'find', 'my'];
	if(nextRoute.indexOf(to.name) >= 0){
		if(common.cookie.get("loginState")){
			next();
		}else{
			Toast({ message: '登录已过期,请重新登录', duration: 1000 });
			setTimeout(function(){
				next("/login");
			}, 1500);
		}
		next();
	}else{
		next();
	}
});

export default router;

