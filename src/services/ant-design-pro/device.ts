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
export async function device(
  // params: {
  //   // query
  //   /** 当前的页码 */
  //   current?: number;
  //   /** 页面的容量 */
  //   pageSize?: number;
  // },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/device/devices', {
    method: 'POST',
    data: options,
  });
}
export async function command(options?: { [key: string]: any }) {
  return request<API.RuleList>('/api/ems', {
    method: 'POST',
    data: options,
  });
}
