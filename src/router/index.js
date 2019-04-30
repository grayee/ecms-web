import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'
const _import = require('./_import_dev');

import HelloWorld from '@/components/HelloWorld'
import Users from '@/components/User'
import AdminLTE from '@/components/AdminLTE'
import Login from '@/components/Login'
import Register from '@/components/Register'
import NaviMenuBar from '@/components/NaviMenuBar'
import MainContent from '@/components/MainContent'

import Orgnization from '@/view/Orgnization'
import Company from '@/view/Company'
import CompanyAdd from '@/view/CompanyAdd'
import Department from '@/view/Department'
import Position from '@/view/Position'
import Employee from '@/view/Employee'
import Menu from '@/view/Menu'
import User from '@/view/User'
import Role from '@/view/Role'
import UserAuthGrant from '@/view/UserAuthGrant'
import RoleAuthGrant from '@/view/RoleAuthGrant'
import OrgAuthGrant from '@/view/OrgAuthGrant'

Vue.use(Router);

export const constantRouter = [
  {path: '/login', component: Login, hidden: true},
  {
    path: '/pages', redirect: '/pages/p404', name: 'Pages',
    component: {
      render(c) {
        return c('router-view')
      }
    },
    children: [{path: '404', name: 'Page404', component: _import('errorPages/Page404')},
      {path: '500', name: 'Page500', component: _import('errorPages/Page404')},
    ]
  }
];

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
          path: "org",
          component: Orgnization
        },
        {
          path: 'org/company',
          component: Company
        },
        {
          path: 'org/department',
          component: Department
        },
        {
          path: 'org/position',
          component: Position
        },
        {
          path: 'org/employee',
          component: Employee
        },
        {
          path: "company/add",
          component: CompanyAdd
        },
        {
          path: 'auth/menu',
          component: Menu
        },
        {
          path: 'auth/user',
          component: User
        },
        {
          path: 'auth/role',
          component: Role
        },
        {
          path: 'auth/grant/user',
          component: UserAuthGrant
        },
        {
          path: 'auth/grant/role',
          component: RoleAuthGrant
        },
        {
          path: 'auth/grant/org',
          component: OrgAuthGrant
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
            //this.$router.addRoutes(response);
            //console.log(this.$store.state.user.menus);
            //console.log(this.$store.getters.menus);
          });
     /*     store.dispatch('GenerateRoutes', {roles}).then(() => { // 生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({...to}) // hack方法 确保addRoutes已完成
          })*/
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            next({path: '/'})
          })
        })
      } else {
          next()
      }
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
