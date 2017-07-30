import axios, { AxiosRequestConfig } from 'axios';
import _ from 'lodash';
import Cookies from 'js-cookie';

const token: string = Cookies.get('token') || '';
// 覆盖 axios 默认配置
_.assignIn(axios.defaults, {
  baseURL: 'http://127.0.0.1:8360/',
  timeout: 30 * 1000,
  headers: { 'Authorization': 'Basic ' + token, 'x-requested-with': 'XMLHttpRequest' },
  transformRequest: [function (data: object) {
    // 请求数据 数据转换
    console.log(data);
    return data;
  }],
});

// 请求拦截器
axios.interceptors.request.use(function (config) {
  // 发送请求前
  return config;
}, function (error) {
  // 请求错误
  return Promise.reject(error);
});

// 响应连接器
axios.interceptors.response.use(function (response) {
  // 响应成功 只返回 响应数据
  return response.data;
}, function (error) {
  // 响应失败
  return Promise.reject(error);
});

export default axios;
