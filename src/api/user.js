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
  //用户新增
  userRefAdd(param) {
    return axios.post(`${base.sq}/au/user/ref`, param);
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
  //用户上传头像
  userUploadAvatar(param) {
    let config = {
      headers:{'Content-Type':'multipart/form-data'}
    };
    return axios.post(`${base.sq}/au/user/avatar`, param,config);
  },
  getRoleTree(param) {
    return axios.get(`${base.sq}/au/role/tree/` + param);
  },
  //角色新增
  roleAdd(param) {
    return axios.post(`${base.sq}/au/role`, param);
  },
  userGrantRole(uid, param) {
    return axios.post(`${base.sq}/au/user/role/` + uid, param);
  },
  //角色更新
  roleUpt(param) {
    return axios.put(`${base.sq}/au/role`, param);
  },
  roleDel(param) {
    return axios.delete(`${base.sq}/au/role`, {data: param});
  },
  //角色关联用户列表
  roleRefUsers(roleId, param) {
    return axios.post(`${base.sq}/au/role/getRefUser/` + roleId, param);
  },
  //角色关联用户
  roleRefUser(roleId, param) {
    return axios.post(`${base.sq}/au/role/refUser/` + roleId, param);
  },
  //角色删除关联用户
  roleRemoveRefUser(roleId, param) {
    return axios.delete(`${base.sq}/au/role/refUser/` + roleId, {data: param});
  },
  //角色功能权限树
  rolePermFuncTree(roleId, param) {
    return axios.get(`${base.sq}/au/role/func/tree/` + roleId, param);
  },
  //角色数据权限树
  rolePermDataTree(roleId, param) {
    return axios.get(`${base.sq}/au/role/org/tree/` + roleId, param);
  },
  //角色功能授权
  roleGrantFunc(id, param) {
    return axios.post(`${base.sq}/au/role/function/` + id, param);
  },
  //角色数据授权
  roleGrantData(id, param) {
    return axios.post(`${base.sq}/au/role/data/` + id, param);
  },
  // 其他接口…………
};

export default user;
