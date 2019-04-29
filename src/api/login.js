import base from './base'; // 导入接口域名列表
import axios from '@/utils/request'; // 导入request中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const login = {
  //获取用户信息
  getUserinfo(param) {
    return axios.get(`${base.sq}/userinfo`, param);
  },
  //登出
  logout(params) {
    return axios.get(`${base.sq}/logout/oauth`, {
      params: params
    });
  },
  // post登陆提交
  logon(params) {
    return axios.post(`${base.sq}/login/oauth`, params);
  },

  /**
   * 获取菜单
   * @param param 用户名
   */
  getMenus(param) {
    return axios.get(`${base.sq}/auth/menu`);
  }
};

export default login;
