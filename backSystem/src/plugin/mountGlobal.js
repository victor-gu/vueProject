function mountGlobal() {}

import paging from '@/components/paging';
import myDialog from '@/components/myDialog';
import myTable from '@/components/myTable';

import * as filters from '@/filters';

import * as directives from '@/directives';

mountGlobal.install = function(Vue) {
  // 挂载全局组件
  Vue.component(paging.name, paging);
  Vue.component(myDialog.name, myDialog);
  Vue.component(myTable.name, myTable);

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
