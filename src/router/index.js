import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'
import HelloWorld from '@/components/HelloWorld'
import Users from '@/components/User'
import AdminLTE from '@/components/AdminLTE'
import Login from '@/components/Login'
import Register from '@/components/Register'
import NaviMenuBar from '@/components/NaviMenuBar'
import Orgnization from '@/view/Orgnization'
import Company from '@/view/Company'
import CompanyAdd from '@/view/CompanyAdd'
import Menu from '@/view/Menu'
import MainContent from '@/components/MainContent'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/user',
      component: Users
    },
    {
      path: '/admin',
      component: AdminLTE,
      children: [
        {
          path: "",
          component: MainContent
        },
        {
          path: "orgs",
          component: Orgnization
        },
        {
          path: 'company',
          component: Company
        },
        {
          path: "company/add",
          component: CompanyAdd
        },
        {
          path: 'menu',
          component: Menu
        }
      ]
    },
    {
      path: '/',
      component: Login
    },
    {
      path: 'login',
      redirect: '/'
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/menu',
      component: NaviMenuBar
    }
  ]
});

// 不重定向白名单
const whiteList = ['/', '/authredirect'];

/**
 * 全局的 before 钩子,导航触发时异步解析执,按照创建顺序调用
 * @param to  即将要进入的目标 路由对象
 * @param from: 当前导航正要离开的路由
 * @param  next: Function,一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数
 */

router.beforeEach((to, from, next) => {
  if (store.getters.token) { // 判断是否有token，从vuex中取出
    if (to.path === '/login') {
      next({path: '/'})
    } else {
  /*    if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetInfo').then(res => { // 拉取user_info
          const roles = res.data.role
          store.dispatch('GenerateRoutes', {roles}).then(() => { // 生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({...to}) // hack方法 确保addRoutes已完成
          })
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            next({path: '/login'})
          })
        })
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(store.getters.roles, to.meta.role)) {
          next()//
        } else {
          next({path: '/', query: {noGoBack: true}})
        }
        // 可删 ↑
      }*/
      next();
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      // 否则全部重定向到登录页
      next();
    }
  }

});

export default router;
