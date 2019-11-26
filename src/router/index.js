import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_dev');
import Main from '@/components/Main'
import Login from '@/components/Login'
import Register from '@/components/Register'
import MainContent from '@/components/MainContent'

Vue.use(Router);
//静态路由/-默认路由(无需登录就可以使用)
export const constantRouter = [
  {path: '/login', name: 'Login', component: Login, hidden: true, meta: {title: "登录"}},
  {path: '/register', name: 'Register', component: Register, meta: {title: "注册"}},
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
  path: '/', redirect: '/dashboard', name: 'Home', component: Main, hidden: false, meta: {title: "首页"},
  children: [{path: "/dashboard", name: 'Dashboard', component: MainContent}]
}];

const router = new Router({
  mode: 'history',
  routes: constantRouter
});
export default router;
