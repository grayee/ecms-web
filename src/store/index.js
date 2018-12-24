import Vue from "vue";
import Vuex from "vuex";
import getters from './getters';
import app from './modules/app';
import user from './modules/user';

Vue.use(Vuex);

/**
 state:  存放所有变量, 不是所有变量都要放到 state 中，vuex 创立的初衷是方便我们对变量的管理，然而对组件的一些私有变量，
         不需要和别的组件共享。所以，state里面只放全局变量、多组件共享变量
 mutations:  存放同步读取、修改state的的方法
 action :  存放异步读取、修改state的的方法,异步触发mutations里面的方法,actions里面自定义的函数接收一个context参数和要变化的形参,
           context与store实例具有相同的方法和属性，所以它可以执行context.commit(' '),外部组件里进行全局执行actions里面方法的时候
           this.$store.dispatch('hideFooter')
 getter :和vue计算属性computed一样，来实时监听state值的变化(最新状态)，并把它也仍进Vuex.Store里面
 **/
const store = new Vuex.Store({
  state: {
    count: "123",
    logoText: "资金管理系统",
    logoMiniText: "ECMS",
    token:"",

    menus: [
      {
        icon: "sitemap",
        text: "组织管理",
        children: [
          {
            icon: "archive",
            path: "/admin/orgs",
            text: "组织机构管理"
          },
          {
            icon: "star",
            path: "/admin/company",
            text: "公司档案管理"
          },
          {
            icon: "group",
            text: "部门档案管理"
          },
          {
            icon: "street-view",
            text: "岗位信息管理"
          },
          {
            icon: "user-secret",
            text: "人员档案管理"
          }
        ]
      }, {
        icon: "key",
        text: "权限管理",
        children: [
          {
            icon: "user-plus",
            text: "用户管理"
          },
          {
            icon: "tags",
            text: "角色管理"
          },
          {
            icon: "navicon",
            path: "/admin/menu",
            text: "菜单管理"
          },
          {
            icon: "user-secret",
            text: "授权管理",
            children: [
              {
                icon: "circle-o",
                text: "用户授权"
              },
              {
                icon: "circle-o",
                text: "角色授权"
              }, {
                icon: "circle-o",
                text: "机构授权"
              }
            ]
          },
          {
            icon: "user-secret",
            text: "资源注册",
            children: [
              {
                icon: "circle-o",
                text: "按钮注册"
              },
              {
                icon: "circle-o",
                text: "字段注册"
              }, {
                icon: "circle-o",
                text: "记录注册"
              }
            ]
          }
        ]
      }, {
        icon: "cog",
        text: "系统管理",
        children: [
          {
            icon: "circle-o",
            text: "字典管理",
            path: "/about.html"
          },
          {
            icon: "circle-o",
            text: "在线用户管理",
            path: "/about.html"
          },
          {
            icon: "circle-o",
            text: "登录日志管理",
            path: "/about.html"
          }
        ]
      }
    ]
  },
  getters: getters,
  mutations: {},
  actions: {}
});

export default store;
