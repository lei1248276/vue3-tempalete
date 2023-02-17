import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import 'normalize.css/normalize.css'

import '@/styles/index.scss' // ! global css

import 'vue-global-api' // ! 全局引入vue3 常用api

import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon/index.vue'// svg component

import './permission' // ! permission control

const pinia = createPinia()
const app = createApp(App)

app
  .use(pinia)
  .use(router)
  .component('SvgIcon', SvgIcon)
  .mount('#app')
