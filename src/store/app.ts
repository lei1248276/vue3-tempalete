import { defineStore } from 'pinia'
import Cookies from 'js-cookie'

export const useAppStore = defineStore('app', {
  state: () => ({
    sidebar: {
      opened: Cookies.get('sidebarStatus') ? !!Number(Cookies.get('sidebarStatus')) : true,
      withoutAnimation: false
    },
    device: 'desktop' as 'desktop' | 'mobile'
  }),
  actions: {
    toggleSideBar() {
      this.sidebar.opened = !this.sidebar.opened
      this.sidebar.withoutAnimation = false
      Cookies.set('sidebarStatus', this.sidebar.opened ? '1' : '0')
    },
    closeSideBar(withoutAnimation: boolean) {
      Cookies.set('sidebarStatus', '0')
      this.sidebar.opened = false
      this.sidebar.withoutAnimation = withoutAnimation
    },
    toggleDevice(device: 'desktop' | 'mobile') {
      this.device = device
    }
  }
})
