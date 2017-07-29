import Vue from 'vue'
import { AxiosStatic, AxiosInstance } from 'axios'
import { LoDashStatic } from 'lodash'

declare module 'vue/types/vue' {
  interface Vue {
    $_: LoDashStatic
    $cookie: any
    $http: AxiosStatic | AxiosInstance
    // element-ui
    $loading: Function
    $message: Function
    $notify: Function
    $msgbox: Function
    $alert: Function
    $prompt: Function
    $confirm: Function
  }
}