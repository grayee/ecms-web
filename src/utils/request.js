import axios from 'axios'
import store from '../store/index'

let cancel, promiseArr = {}
const CancelToken = axios.CancelToken;
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// 环境的切换
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = '/ecms';
} else if (process.env.NODE_ENV === 'debug') {
  axios.defaults.baseURL = '';
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'http://api.ecms.com/';
} else {
  axios.defaults.baseURL = 'api';
}

//设置请求超时
axios.defaults.timeout = 5000;
// 请求拦截器
axios.interceptors.request.use(function (config) {
  //在发送请求之前做某事
  //发起请求时，取消掉当前正在进行的相同请求
  if (promiseArr[config.url]) {
    promiseArr[config.url]('操作取消')
    promiseArr[config.url] = cancel
  } else {
    promiseArr[config.url] = cancel
  }
  // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
  // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
  const token = store.state.token;
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
// 响应拦截器
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});

/**
 * 封装axios的post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response.data);
      }).catch((error) => {
      reject(error);
    })
  })
}

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.data)
    })
  });
}
