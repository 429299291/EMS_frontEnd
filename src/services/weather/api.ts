import { request } from '@umijs/max';
import { baiduAK, weatherAPI } from '../../constants/index';

export async function currentUser(options: any) {
  // const email = options.values.values
  return request<{
    data: API.CurrentUser;
  }>(`/api/user/currentUser/${options.values.values.email}`, {
    method: 'GET',
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function currentGeo(params: string) {
  return request<Record<string, any>>(
    `https://api.map.baidu.com/geocoding/v3/?address=${params}&output=json&ak=${baiduAK}`,
    // `https://api.map.baidu.com/geocoder?address=${params}&output=json&key=${baiduAK}`,
    {
      method: 'GET',
    },
  );
}
export async function currentWeather(params: API.CurrentWeather) {
  return request<Record<string, any>>(
    `https://api.openweathermap.org/data/2.5/weather?lat=${params.lat}&lon=${params.lon}&appid=${weatherAPI}`,
    {
      method: 'GET',
    },
  );
}
export async function day5Weather(params: API.CurrentWeather) {
  return request<Record<string, any>>(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${params.lat}&lon=${params.lon}&appid=${weatherAPI}`,
    {
      method: 'GET',
    },
  );
}
