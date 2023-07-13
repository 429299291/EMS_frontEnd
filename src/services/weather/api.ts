import { request } from '@umijs/max';
import { weatherAPI } from '../../constants/index';

export async function currentUser(options: any) {
  // const email = options.values.values
  return request<{
    data: API.CurrentUser;
  }>(`/api/user/currentUser/${options.values.values.email}`, {
    method: 'GET',
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function currentWeather(params: API.CurrentWeather) {
  return request<Record<string, any>>(
    `https://api.openweathermap.org/data/2.5/weather?lat=${params.lat}&lon=${params.lon}&appid=${weatherAPI}`,
    {
      method: 'GET',
    },
  );
}
