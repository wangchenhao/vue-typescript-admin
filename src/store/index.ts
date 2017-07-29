import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import global from './modules/global'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store: Store<object> = new Vuex.Store({
  strict: debug,
  modules: {
    global
  }
})

if (module.hot) {
  // 使 actions 和 mutations 成为可热重载模块
  module.hot.accept(['./modules/global'], () => {

    const globalHot = require('./modules/global').default

    store.hotUpdate({
      modules: {
        global: globalHot
      }
    })
  })
}

export default store
