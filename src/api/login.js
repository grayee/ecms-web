import base from './base'; // 导入接口域名列表
import axios from '@/utils/request'; // 导入request中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const login = {
  //获取用户信息
  userinfo(param) {
    return axios.post(`${base.sq}/userinfo`, param);
  },
  //登出
  logout(params) {
    return axios.get(`${base.sq}/logout`, {
      params: params
    });
  },
  // post登陆提交
  login(params) {
    return axios.post(`${base.sq}/login/oauth`, params, {
      headers: {
        'Authorization': "Basic Y2xpZW50X2lkXzEyMzQ1Njc4OTA6Y2xpZW50X3NlY3JldF8xMjM0NTY3ODkw"
      }
    });
  }
};

export default login;