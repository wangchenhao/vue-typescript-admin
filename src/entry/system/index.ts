// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { Vue, i18n } from '../../Basic';
import router from '../../router';
import store from '../../store';
// tslint:disable-next-line:no-unused-expression
new Vue({
  el: '#app',
  router,
  store,
  i18n,
});
