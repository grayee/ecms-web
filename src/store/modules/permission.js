import {asyncRouter} from '../../router';

const _import = require('../../router/_import_dev');
import Content from '@/view/Content'

const permission = {
  state: {
    addRouters: asyncRouter,
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters[0].children = asyncRouter[0].children.concat(routers);
    }
  },
  actions: {
    GenerateRoutes({commit}, data) {
      return new Promise(resolve => {
        const {menus} = data;
        let accessedRouters = getRouterByMenu(menus);
        //console.log("路由数组：",JSON.stringify(accessedRouters));
        commit('SET_ROUTERS', accessedRouters);
        resolve();
      })
    }
  },
  getters: {
    addRouters: state => state.addRouters
  }
};

function getRouterByMenu(menus) {
  const mapRouter = function (menu) {
    const router = {};
    router.name = menu.path;
    router.path = menu.path;
    router.meta = {};
    router.meta.title = menu.text;
    if (menu.attributes.component) {
      router.components = _import(menu.attributes.component);
    }
    return router;
  };

  let routers =[];
  menus.forEach((menu) => {
    if (menu.children && menu.children.length) {
      let fistChildren = menu.children[0];
      let curRouter = mapRouter(menu);
      curRouter.path = "/" + fistChildren.path.split("/")[1];
      curRouter.redirect = fistChildren.path;
      curRouter.component= Content;
      curRouter.children = getRouterByMenu(menu.children);
      routers.push(curRouter);
    } else {
      routers.push(mapRouter(menu));
      if (menu.attributes.pageBtn) {
        menu.attributes.pageBtn.forEach(btn => {
          routers.push(mapRouter(btn))
        });
      }
    }
  });
  return routers;
}

export default permission;
