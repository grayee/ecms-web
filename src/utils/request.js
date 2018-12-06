import axios from 'axios'

//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = 'ecms';
// 请求拦截器
axios.interceptors.request.use(function (config) {
  //在发送请求之前做某事
  return config;
}, function (error) {
  //请求错误时做些事
  return Promise.reject(error);
})
// 响应拦截器
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
})

// 封装axios的post请求
export function fetch(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      })
  })
}

export default {
  JH_news(url, params) {
    return fetch(url, params);
  }
}
