function mountGlobal() {}

import { NavBar, Swipe, SwipeItem, Button, Field, CellGroup, Rate, tabbar, tabbarItem, Lazyload } from 'vant';

import * as filters from '@/filters';

import * as directives from '@/directives';

import Tabbar from 'components/Tabbar';

mountGlobal.install = function(Vue) {
  // 挂载全局组件
  Vue.component(Tabbar.name, Tabbar);
  Vue.component(NavBar.name, NavBar);
  Vue.component(Swipe.name, Swipe);
  Vue.component(SwipeItem.name, SwipeItem);
  Vue.component(Button.name, Button);
  Vue.component(Field.name, Field);
  Vue.component(CellGroup.name, CellGroup);
  Vue.component(Rate.name, Rate);
  Vue.component(tabbar.name, tabbar);
  Vue.component(tabbarItem.name, tabbarItem);

  Vue.use(Lazyload);

  // 挂载全局过滤器
  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
  })

  // 挂载全局指令
  Object.keys(directives).forEach(key => {
    Vue.directive(key, directives[key])
  })
}

export default mountGlobal;
