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

//datatables
/*import 'datatables.net'
import 'datatables.net/js/jquery.dataTables.min.js'
import 'datatables.net-bs/js/dataTables.bootstrap.min.js'
import 'datatables.net-bs/css/dataTables.bootstrap.min.css'*/

Vue.config.productionTip = false;

Vue.use(VueResource)

//注册全局组件
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
