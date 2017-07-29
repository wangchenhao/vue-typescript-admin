import Cookies from 'js-cookie'
import { Module, ActionTree, GetterTree, MutationTree } from 'vuex'
import * as types from '../types/global-types'

interface NavStatus {
  isShow: boolean
}

interface UserInfo {
  username: string | undefined
  position: string | undefined
  avatar: string | undefined
}

interface State {
  userInfo: UserInfo
  lockScreen: boolean
  navStatus: NavStatus
}

const state: State = {
  userInfo: {
    username: '',
    position: '',
    avatar: ''
  },
  lockScreen: Cookies.get('lockScreen') === 'true',
  navStatus: {
    isShow: document.body.offsetWidth > 768
  }
}

const getters: GetterTree<State, object> = {
  userInfo: (status: State): UserInfo => status.userInfo,
  lockScreen: (status: State): boolean => status.lockScreen,
  navStatus: (status: State): boolean => status.navStatus.isShow
}
const actions: ActionTree<State, object> = {
  addUserInfo({ commit }, info) {
    commit(types.ADD_USER_INFO, info)
  },
  navToggle({ commit }, isShow) {
    commit(types.NAV_TOGGLE, isShow)
  },
  toggleLockScreen({ commit }, isShow) {
    commit(types.LOCK_SCREEN_TOGGLE, isShow)
  }
}
const mutations: MutationTree<State> = {
  [types.ADD_USER_INFO](status: State, info) {
    if (info) {
      const s = status
      s.userInfo = info
    }
  },
  [types.NAV_TOGGLE](status: State, isShow) {
    const navStatus = status.navStatus
    navStatus.isShow = typeof isShow === 'boolean' ? isShow : !navStatus.isShow
  },
  [types.LOCK_SCREEN_TOGGLE](status: State, isShow) {
    const s = status
    s.lockScreen = typeof isShow === 'boolean' ? isShow : !s.lockScreen
    Cookies.set('lockScreen', s.lockScreen)
  }
}
const module: Module<State, object> = {
  state,
  getters,
  actions,
  mutations
}
export default module

