import axios from 'axios'
import Vue from 'vue'
import VueAxios from 'vue-axios'
import store from '@/store/index'
import router from '../router';

//axios 结合 vue-axios使用
Vue.use(VueAxios,axios);

// 创建axios实例
let instance = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 1000 * 12//设置请求超时
});
//axios cancel token API基于可取消的promise提议
let cancel, promiseArr = {};
// 请求拦截器
instance.interceptors.request.use(function (config) {
  //在发送请求之前做某事
  //发起请求时，取消掉当前正在进行的相同请求
  if (promiseArr[config.url]) {
    promiseArr[config.url]('操作取消');
    promiseArr[config.url] = cancel;
  } else {
    promiseArr[config.url] = cancel;
  }
  // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
  // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
  const token = store.state.user.token;
  token && (config.headers.Authorization = token);
  return config;
}, function (error) {
  //请求错误时做些事
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        error.message = '错误请求';
        break;
      case 401:
        error.message = '未授权，请重新登录';
        break;
      case 403:
        error.message = '拒绝访问';
        break;
      case 404:
        error.message = '请求错误,未找到该资源';
        break;
      case 405:
        error.message = '请求方法未允许';
        break;
      case 408:
        error.message = '请求超时';
        break;
      case 500:
        error.message = '服务器端出错';
        break;
      case 501:
        error.message = '网络未实现';
        break;
      case 502:
        error.message = '网络错误';
        break;
      case 503:
        error.message = '服务不可用';
        break;
      case 504:
        error.message = '网络超时';
        break;
      case 505:
        error.message = 'http版本不支持该请求';
        break;
      default:
        error.message = '连接错误${err.response.status}';
    }
  } else {
    error.message = "连接到服务器失败";
  }
  message.err(error.message);
  return Promise.reject(error);
});


/**
 * 提示函数
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = msg => {
  console.log("提示信息：" + msg);
};

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: $router.currentRoute.fullPath
    }
  });
};
/**
 * 请求失败后的错误统一处理
 * @param status 请求失败的状态码
 * @param other 其他信息
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      toLogin();
      break;
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      tip('登录过期，请重新登录');
      localStorage.removeItem('token');
      store.commit('loginSuccess', null);
      setTimeout(() => {
        toLogin();
      }, 1000);
      break;
    // 404请求不存在
    case 404:
      tip('请求的资源不存在');
      break;
    default:
      console.log(other);
  }
};

// 响应拦截器
instance.interceptors.response.use(function (response) {
  // 请求成功
  return response.status === 200 ? Promise.resolve(response) : Promise.reject(response);
}, function (error) {
  const {response} = error;
  if (response) {
    // 请求已发出，但是不在2xx的范围
    errorHandle(response.status, response.data.message);
    return Promise.reject(response);
  } else {
    // 处理断网的情况
    // eg:请求超时或断网时，更新state的network状态
    // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
    // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
    store.commit('changeNetwork', false);
  }
});

export default instance;
