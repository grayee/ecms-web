import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count:"123",
    logoText: "资金管理系统",
    logoMiniText: "ECMS",
    menus: [
      {
        path: "/index.html",
        icon: "mouse-pointer",
        text: "组织管理"
      }, {
        path: "/about.html",
        icon: "support",
        text: "权限管理"
      }
    ]
  },
  getters: {},
  mutations: {},
  actions: {}
})

export default store;
