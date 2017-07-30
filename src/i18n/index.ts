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

function addLang(key: string, a: object, b: object) {
  _.assignIn(locales, {
    [key]: _.assignIn({}, a, b),
  });
}

addLang('en', en, eleEN);
addLang('zh-CN', zhCN, eleZh);

const browserLanguage: string = Cookies.get('lang') || window.navigator.language;

const lang = browserLanguage in locales ? browserLanguage : 'en';

console.log('系统语言:' + lang);

const i18n = new VueI18n({
  locale: lang,
  messages: locales,
});

export default i18n;
