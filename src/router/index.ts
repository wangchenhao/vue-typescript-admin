import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'
import main from '../views/main'

Vue.use(Router)

const routes: RouteConfig[] = [{
  path: '/',
  name: 'index',
  component: main
}]
export default new Router({
  routes: routes
})
