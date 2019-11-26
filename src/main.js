// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from "./store";
import App from './App'
import router from './router'

//bootstrap
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.css'
//AdminLTE
import 'admin-lte'
import 'admin-lte/dist/css/AdminLTE.min.css'


//时间格式化组件moment
import moment from 'moment'

//easy UI
import 'vx-easyui/dist/themes/bootstrap/easyui.css';
import 'vx-easyui/dist/themes/icon.css';
import 'vx-easyui/dist/themes/vue.css';

import EasyUI from 'vx-easyui';
import locale from 'vx-easyui/dist/locale/easyui-lang-zh_CN';

import VeeValidate, {Validator} from 'vee-validate';
//引入中文包，提示信息可以以中文形式显示
import zh_CN from 'vee-validate/dist/locale/zh_CN';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'zh_CN',
});


import api from './api' // 导入api接口
Vue.prototype.$api = api; // 将api挂载到vue的原型上
//login
import './login.js'

// 引入mockjs
import './mock/mock'

Vue.use(VeeValidate, {
  i18n,
  i18nRootKey: 'validation',// customize the root path for validation messages.
  errorBagName: 'veeErrors', // change if property conflicts.
  fieldsBagName: 'veeFields', //此处默认为fields
  dictionary: {
    zh_CN: zh_CN
  }
});
//全局过滤器
Vue.filter('dateFmt', function (inputDate, mod = 0, pattern = 'YYYY-MM-DD HH:mm:ss') {
  let dateTime = moment(inputDate).format(pattern);
  switch (mod) {
    case 0:
      dateTime = moment(inputDate).startOf('day').format(pattern);
      break;
    case 1:
      dateTime = moment(inputDate).endOf('day').format(pattern);
      break;
  }
  return dateTime;
});

Vue.filter('parseToDate', function (inputStr,pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(inputStr,pattern).toDate();
});

const dictionary = {
  zh_CN: {
    messages: {
      required: ( field )=> "请输入" + field
    }
  }
};

// Override and merge the dictionaries
Validator.localize(dictionary);

Vue.config.productionTip = false;

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
});
