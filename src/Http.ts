import axios from 'axios';
import _ from 'lodash';
import QS from 'qs';
import Cookies from 'js-cookie';

const token: string = Cookies.get('token') || '';
// 覆盖 axios 默认配置
_.assignIn(axios.defaults, {
  // baseURL: '',
  timeout: 30 * 1000,
  headers: { 'Authorization': 'Basic ' + token, 'x-requested-with': 'XMLHttpRequest' },
  params: {
    locale: Cookies.get('language'),
    _: new Date().getTime(),
  },
  transformRequest: [function (data: any) {
    // Do whatever you want to transform the data
    return QS.stringify(data, { allowDots: true });
  }],
});

// 请求拦截器
// axios.interceptors.request.use(function(config) {
//   // 发送请求前
//   return config;
// }, function(error) {
//   // 请求错误
//   return Promise.reject(error);
// });

// 响应连接器
axios.interceptors.response.use(function (response) {
  // 响应成功 只返回 响应数据
  return response.data;
}, function (error) {
  // 响应失败
  return Promise.reject(error);
});

export default axios;
