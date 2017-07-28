import axios, { AxiosInstance } from 'axios'
import Cookies from 'js-cookie'

const token = Cookies.get('token') || ''
const Http: AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8360/',
  timeout: 30 * 1000,
  headers: {
    'Authorization': 'Basic ' + token,
    'x-requested-with': 'XMLHttpRequest'
  },
  transformRequest: [function (data) {
    console.log(data)
    return data
  }],
  transformResponse: [function (data) {
    console.log(data)
    return data
  }],
  paramsSerializer: function (params) {
    console.log(params)
    return params
  }
})

export default Http
