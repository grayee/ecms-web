// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from "./store";
import App from './App'
import router from './router'
import VueResource from 'vue-resource'

//bootstrap
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'font-awesome/css/font-awesome.css'
//AdminLTE
import 'admin-lte'
import 'admin-lte/dist/css/AdminLTE.min.css'
import 'admin-lte/dist/css/skins/_all-skins.css'
//easy UI
import 'vx-easyui/dist/themes/default/easyui.css';
import 'vx-easyui/dist/themes/icon.css';
import 'vx-easyui/dist/themes/vue.css';


import EasyUI from 'vx-easyui';
import locale from 'vx-easyui/dist/locale/easyui-lang-zh_CN';


Vue.config.productionTip = false;

Vue.use(VueResource)
Vue.use(EasyUI, {
  locale: locale
});

//注册全局组件
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
