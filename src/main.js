import { createApp } from 'vue'
import App from './App'
import store from './store'
import router from './router'

import 'normalize.css/normalize.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import '@/styles/index.scss' // ! global css

import 'vue-global-api'

import './icons' // ! icon
import SvgIcon from '@/components/SvgIcon'// svg component

import './permission' // ! permission control

const app = createApp(App)

app.use(ElementPlus)
  .use(router)
  .use(store)
  .component('svg-icon', SvgIcon)
  .mount('#app')
