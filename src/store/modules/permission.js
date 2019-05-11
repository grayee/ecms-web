import {constantRouter} from '../../router';

const permission = {
  state: {
    routers: constantRouter
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.routers.concat(routers);
    }
  },
  actions: {
    GenerateRoutes({commit}, data) {
      return new Promise(resolve => {
        const {menus} = data;
        let accessedRouters = [];
        getRouterByMenu(menus, accessedRouters);
        console.log(accessedRouters);
        commit('SET_ROUTERS', accessedRouters);
        resolve();
      })
    }
  },
};


function getRouterByMenu(menus, routers) {
    menus.forEach((menu) => {
      if (menu.children && menu.children.length) {
        getRouterByMenu(menu.children, routers);
      }else{
        const router = {};
        router.name = menu.id;
        router.path = menu.path;
        router.component = menu.component;
        routers.push(router)
      }
    });
  return routers;
}

export default permission;
