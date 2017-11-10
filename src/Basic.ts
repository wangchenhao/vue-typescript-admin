import 'babel-polyfill';
import _ from 'lodash';
import Cookie from 'js-cookie';
import Vue from 'vue';
import './assets/style/index.scss';
import ElementUI from 'element-ui';
import Common from './common';
import i18n from './i18n';
import Http from './Http';
import * as Filters from './Filters';

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.prototype.$_ = _;
Vue.prototype.$cookie = Cookie;
Vue.prototype.$http = Http;

Vue.use(ElementUI, {
  i18n: (key: string, options: any) => i18n.t(key, options),
});

// 公共配置文件 设置组件前缀
// 注册 common 目录下所有的自定义组件
_.forEach(Common, (value, key) => {
  Vue.component(key, value);
});

_.forEach(Filters, (value, key) => {
  Vue.filter(key, value);
});

export { Vue, i18n };
