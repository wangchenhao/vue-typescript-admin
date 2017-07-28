import 'es6-promise/auto'
import _ from 'lodash'
import Cookie from 'js-cookie'
import Vue from 'vue'
import ElementUI from 'element-ui'
import './assets/style/index.scss'
import config from './config'
import Common from './common'
import i18n from './i18n'
import Http from './Http'

Vue.config.productionTip = false

Vue.prototype.$_ = _
Vue.prototype.$cookie = Cookie
Vue.prototype.$http = Http

Vue.use(ElementUI, {
  i18n: (key: string, value: object) => i18n.vm._t(key, value)
})

// 公共配置文件 设置组件前缀
const cPrefix = config.Component.prefix
// 注册 common 目录下所有的自定义组件
_.forEach(Common, (value, key) => {
  const cName: string = value.options.name
  Vue.component(cPrefix + cName, value)
})

export { Vue, i18n }
