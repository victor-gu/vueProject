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
		{ path: "/", redirect: "/home" },
		{ path: '/home', name: 'home', component: HomeComponent },
		{ path: '/classify', name: 'classify', component: classifyComponent },
		{
			path: '/find',
			name: 'find',
			component: findComponent
		},
		{
			path: '/my',
			name: 'my',
			component: myComponent
		},
		{
			path: '/newGirl',
			name: 'newGirl',
			component: newGirlComponent
		},
		{
			path: "/login",
			name: "login",
			component: loginComponent
		},
		{
			path: "/register",
			name: "register",
			component: registerComponent
		},
		{
			path: "/notFound",
			name: "notFound",
			component: notFoundComponent
		}
	]
});
