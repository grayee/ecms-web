/**
 * api接口统一管理
 * https://blog.csdn.net/qq_40128367/article/details/82735310
 */
import {get, post} from '../utils/request'

/**
 * 定义了一个apiAddress方法，调用了封装的post方法，post方法的第一个参数是我们的接口地址，第二个参数是apiAddress的p参数，
 * 即请求接口时携带的参数对象。最后通过export导出apiAddress。
 *
 * @param p 请求接口时携带的参数对象
 * @returns {*}
 */
export const apiAddress = p => post('api/v1/users/my_address/address_edit_before', p);
