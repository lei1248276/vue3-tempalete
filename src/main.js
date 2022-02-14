import { createApp } from 'vue'
import App from './App'
import store from './store'
import router from './router'

import 'normalize.css/normalize.css'

import '@/styles/index.scss' // ! global css

import 'vue-global-api' // ! 全局引入vue3 常用api

import './icons' // ! icon
import SvgIcon from '@/components/SvgIcon'// svg component

import './permission' // ! permission control

const app = createApp(App)

app
  .use(router)
  .use(store)
  .component('svg-icon', SvgIcon)
  .mount('#app')
