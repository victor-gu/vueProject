// 1. 子路由全都没权限时不显示本身
// 2. 默认重定向的路由没有权限时，寻找children中有权限的一项重定向
// 3. meta添加detail，给对应详情页权限

import { asyncRouterMap, constantRouterMap } from '@/router';

// 通过name属性判断是否与当前用户权限匹配，并且过滤掉父级
function hasPermission(roles, route) {
  if (route.children || !route.name) {
    return true;
  } else if (route.name) {
    return roles.some(role => route.name === role || route.meta.detail === role);
  } else {
    return false;
  }
}

// 递归过滤异步路由表，返回符合用户角色权限的路由表
function filterAsyncRouter(routes, roles) {
  const res = [];
  routes.forEach(route => {
    if (hasPermission(roles, route)) {
      if (route.children) {
        route.children = filterAsyncRouter(route.children, roles);
      }
      res.push(route);
    }
  })
  return res;
}

// 递归去除空路由
function neatenRouter(routers) {
  for (var i = routers.length - 1; i >= 0; i--) {
    if (routers[i].children && routers[i].children.length) {
      neatenRouter(routers[i].children);
    }
    if (routers[i].children && !routers[i].children.length) {
      routers.splice(i, 1);
    }
  }
}

// 重定向
function redirectRouter(routers) {
  routers.forEach(item => {
    if (item.children && item.children.length) {
      item.redirect = item.path + '/' + item.children[0].path;
      item.children.forEach(item1 => {
        if (item1.children && item1.children.length) {
          item1.redirect = item.path + '/' + item.children[0].path + '/' + item1.children[0].path;
        }
      })
    }
  });
}

const permission = {
  state: {
    routers: [],
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = routers.concat(constantRouterMap)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        let accessedRouters;
        // 管理员默认所有权限
        if (data.admin) {
          accessedRouters = asyncRouterMap;
        } else {
          // 遍历角色对象，数组去重，roles为可访问的菜单数组
          const arrSet = new Set();
          data.roles.forEach(item => {
            if (item.menus.web) {
              item.menus.web.forEach(item1 => { arrSet.add(item1) });
            }
          });
          const roles = [...arrSet];
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles);
          neatenRouter(accessedRouters);
          redirectRouter(accessedRouters);
        }
        commit('SET_ROUTERS', accessedRouters);
        resolve();
      })
    }
  }
}

export default permission;
