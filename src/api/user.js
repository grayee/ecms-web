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
  getRoleTree(param) {
    return axios.get(`${base.sq}/au/role/tree/`);
  },
  //角色新增
  roleAdd(param) {
    return axios.post(`${base.sq}/au/role`, param);
  },
  //角色更新
  roleUpt(param) {
    return axios.put(`${base.sq}/au/role`, param);
  },
  roleDel(param) {
    return axios.delete(`${base.sq}/au/role`, {data: param});
  },
  //角色关联用户列表
  roleRefUsers(roleId,param) {
    return axios.post(`${base.sq}/au/role/getRefUser/`+roleId, param);
  },
  //角色关联用户
  roleRefUser(roleId,param) {
    return axios.post(`${base.sq}/au/role/refUser/`+roleId, param);
  },
  //角色删除关联用户
  roleRomoveRefUser(roleId, param) {
    return axios.delete(`${base.sq}/au/role/refUser/` + roleId, {data: param});
  },
  //角色权限树
  rolePermTree(param) {
    return axios.get(`${base.sq}/auth/resource/perm/tree`, param);
  },
  // 其他接口…………
};

export default user;
