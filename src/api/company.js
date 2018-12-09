import base from './base'; // 导入接口域名列表
import axios from '@/utils/request'; // 导入request中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const company = {
  //公司列表
  companyList() {
    return axios.get(`${base.sq}/org/company/list`);
  },
  //公司详情,演示
  companyDetail(id, params) {
    return axios.get(`${base.sq}/org/company/detail/${id}`, {
      params: params
    });
  },
  // post提交
  login(params) {
    return axios.post(`${base.sq}/accesstoken`, qs.stringify(params));
  }
  // 其他接口…………
}

export default company;
