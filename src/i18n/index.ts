import Vue from 'vue';
import VueI18n from 'vue-i18n';
import _ from 'lodash';
import Cookies from 'js-cookie';
import eleZh from './eleLang/zh-CN';
import eleEN from './eleLang/en';
import zhCN from './lang/zh-CN';
import en from './lang/en';

Vue.use(VueI18n);

const locales = {};

function addLang(key, a: object, b: object) {
  _.assignIn(locales, {
    [key]: _.assignIn({}, a, b),
  });
}

addLang('en', en, eleEN);
addLang('zh_CN', zhCN, eleZh);

const i18n = new VueI18n({
  locale: Cookies.get('language'),
  fallbackLocale: 'zh_CN',
  messages: locales,
});

export default i18n;
