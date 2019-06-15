import router from './router'
import store from './store'

// 不重定向白名单,"/login" 避免死循环
const whiteList = ['/login','/register', '/authredirect'];

/**
 * 全局的 before 钩子,导航触发时异步解析执,按照创建顺序调用
 * @param to  即将要进入的目标 路由对象
 * @param from: 当前导航正要离开的路由
 * @param  next: Function,一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数
 */

router.beforeEach((to, from, next) => {
  console.log(store.getters.token);
  if (store.getters.token) { // 判断是否有token，从vuex中取出
    if (to.path === '/login') {
      next({path: '/'})
    } else {
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetUserInfo').then(res => { // 拉取user_info
          console.log("用户信息：" + JSON.stringify(res.data));
          // 在这个时候进行获取后台权限及菜单
          store.dispatch('GetMenus', store.getters.token).then((menus) => {
            // 把这个菜单信息注册为路由信息
            store.dispatch('GenerateRoutes', {menus}).then(() => { // 生成可访问的路由表
              console.log("添加前",router.options.routes);
              router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
              console.log("添加后",router);
              next({...to}) // hack方法 确保addRoutes已完成
            })
          });
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            next({path: '/login'})
          })
        })
      } else {
        next()
      }
      next();
    }
  } else {
    // 在免登录白名单，直接进入; 否则全部重定向到登录页
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login');
    }
  }
});
