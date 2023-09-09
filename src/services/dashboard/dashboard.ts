import { request } from '@umijs/max';

export async function getHomeElectricity(body: API.getHomeElectricity) {
  return request<API.LoginResult>('/api/ems/getHomeElectricity', {
    method: 'POST',
    data: body,
  });
}
