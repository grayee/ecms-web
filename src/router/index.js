import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Users from '@/components/User'
import AdminLTE from '@/components/AdminLTE'
import Login from '@/components/Login'
import Register from '@/components/Register'
import NaviMenuBar from '@/components/NaviMenuBar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/user',
      name: 'user',
      component: Users
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminLTE
    },
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/menu',
      name: "naviMenuBar",
      component: NaviMenuBar
    }
  ]
})
