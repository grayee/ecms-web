/**
 * api接口统一管理
 * https://blog.csdn.net/qq_40128367/article/details/82735310
 */

// 文章模块接口
import company from '@/api/company';
import department from '@/api/department';
import position from '@/api/position';
import employee from '@/api/employee';
import menu from '@/api/menu';
import user from '@/api/user';
import org from '@/api/orgnization';
// 其他模块的接口……

// 导出接口
export default {
  user,
  company,
  department,
  position,
  employee,
  menu,
  org
  // ……
}
