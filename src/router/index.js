import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_dev');
import MainPage from '@/components/AdminLTE'
import Login from '@/components/Login'
import Register from '@/components/Register'
import MainContent from '@/components/MainContent'

Vue.use(Router);
//静态路由/-默认路由(无需登录就可以使用)
export const constantRouter = [
  {path: '/login', name: '登录', component: Login, hidden: true},
  {path: '/register', name: '注册', component: Register},
  {path: '/pages', redirect: '/pages/p404', name: 'Pages',
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
//动态路由
export const asyncRouter = [{
  path: '/', redirect: '/dashboard', name: '首页', component: MainPage, hidden: false,
  children: [{path: "/dashboard", name: 'Dashboard', component: MainContent}]
}];

const router = new Router({
  mode: 'history',
  routes: constantRouter
});
export default router;
