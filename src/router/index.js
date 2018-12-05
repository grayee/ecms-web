import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Users from '@/components/User'
import AdminLTE from '@/components/AdminLTE'
import Login from '@/components/Login'
import Register from '@/components/Register'
import NaviMenuBar from '@/components/NaviMenuBar'
import Orgnization from '@/view/Orgnization'
import Company from '@/view/Company'
import Menu from '@/view/Menu'
import MainContent from '@/components/MainContent'

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
          component:Orgnization
        },
        {
          path: 'company',
          component: Company
        },
        {
          path: 'menu',
          component: Menu
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
