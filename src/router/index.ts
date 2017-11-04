import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';
import ucenter from '../views/ucenter/index.vue';

Vue.use(Router);

const routes: RouteConfig[] = [{
  path: '/',
  name: 'index',
  component: ucenter,
}];
export default new Router({
  routes: routes,
});
