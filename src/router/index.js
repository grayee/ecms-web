import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Users from '@/components/User'
import AdminLTE from '@/components/AdminLTE'
import Login from '@/components/Login'
import Register from '@/components/Register'
import NaviMenuBar from '@/components/NaviMenuBar'
import MainContent from '@/components/MainContent'
import Company from '@/components/Company'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/user',
      component: Users
    },
    {
      path: '/admin',
      component: AdminLTE,
      children:[
        {
          path:"",
          component:MainContent
        },
        {
          path:"orgs",
          component:MainContent
        },
        {
          path: 'company',
          component: Company
        },
        {
          path:'*',
          redirect: '/'
        },
        ]
    },
    {
      path: '/',
      component: Login
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
})
