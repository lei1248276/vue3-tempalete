import { createApp } from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './router/index'

import 'normalize.css/normalize.css'

import '@/styles/index.scss' // ! global css

import 'vue-global-api' // ! 全局引入vue3 常用api

import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon/index.vue'// svg component

import './permission' // ! permission control

const app = createApp(App)

app
  .use(router)
  .use(store)
  .component('SvgIcon', SvgIcon)
  .mount('#app')
