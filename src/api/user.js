import base from './base'; // 导入接口域名列表
import axios from '@/utils/request'; // 导入request中创建的axios实例

const user = {
  //用户列表
  userList(param) {
    return axios.post(`${base.sq}/au/user/list`, param);
  },
  //用户新增
  userAdd(param) {
    return axios.post(`${base.sq}/au/user`, param);
  },
  //用户更新
  userUpt(param) {
    return axios.put(`${base.sq}/au/user`, param);
  },
  //用户详情,演示
  userDetail(id, params) {
    return axios.get(`${base.sq}/au/user/detail/${id}`, {
      params: params
    });
  },
  userDel(param) {
    return axios.delete(`${base.sq}/au/user`, {data: param});
  },
  // 其他接口…………
};

export default user;
