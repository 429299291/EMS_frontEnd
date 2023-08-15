// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取当前的用户 GET /api/currentUser */
// export async function currentUser(options?: { [key: string]: any }) {
//   return request<{
//     data: API.CurrentUser;
//   }>('/api/currentUser', {
//     method: 'GET',
//     ...(options || {}),
//   });
// }
export async function account(
  // params: {
  //   // query
  //   /** 当前的页码 */
  //   current?: number;
  //   /** 页面的容量 */
  //   pageSize?: number;
  // },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/user/getUsers', {
    method: 'POST',
    data: options,
  });
}
/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}
