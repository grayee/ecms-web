import Vue from "vue";
import Vuex from "vuex";
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: "123",
    logoText: "资金管理系统",
    logoMiniText: "ECMS",
    menus: [
      {
        icon: "sitemap",
        text: "组织管理",
        children: [
          {
            icon: "archive",
            path: "/index.html",
            text: "组织机构管理"
          },
          {
            icon: "star",
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
        path: "/about.html",
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
})

export default store;
