import { createApp } from 'vue'
import App from './App'
import store from './store'
import router from './router'

import 'normalize.css/normalize.css'

import '@/styles/index.scss' // ! global css

import 'vue-global-api' // ! 全局引入vue3 常用api

import { setupSvgIcon } from './icons' // ! icon

import './permission' // ! permission control

const app = createApp(App)

setupSvgIcon(app)

app
  .use(router)
  .use(store)
  .mount('#app')
