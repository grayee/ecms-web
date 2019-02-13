import base from './base'; // 导入接口域名列表
import axios from '@/utils/request'; // 导入request中创建的axios实例

const menu = {

  /**
   * 获取菜单树
   * @param param 用户名
   */
  getMenuTree(param) {
    return axios.get(`${base.sq}/auth/menu`);
  },
  /**
   * 菜单新增
   * @param param 菜单实体
   * @returns {*}
   */
  menuAdd(param) {
    return axios.post(`${base.sq}/auth/menu`, param);
  },

  // 其他接口…………
};

export default menu;
