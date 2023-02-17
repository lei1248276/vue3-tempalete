import { defineStore } from 'pinia'
import defaultSettings from '@/settings'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    ...defaultSettings
  }),
  actions: {
    changeSetting(setting: Partial<typeof defaultSettings>) {
      Object.keys(setting).forEach((key) => {
        // @ts-ignore
        this[key] = setting[key]
      })
    }
  }
})
