// @ts-ignore
import Cookies from 'js-cookie'
import { ActionContext } from 'vuex'

interface State {
  sidebar: {
    opened: boolean,
    withoutAnimation: boolean
  },
  device: string
}

const state: State = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop'
}

const mutations = {
  TOGGLE_SIDEBAR: (state: State) => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state: State, withoutAnimation: boolean) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state: State, device: string) => {
    state.device = device
  }
}

const actions = {
  toggleSideBar({ commit }: ActionContext<State, any>) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }: ActionContext<State, any>, { withoutAnimation }: { withoutAnimation: boolean }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }: ActionContext<State, any>, device: string) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
