import App from './App.vue'
import router from './router'

import '@/styles/index.scss' // ! global css

import 'virtual:svg-icons-register'

import './permission' // ! permission control

// @ts-ignore
import { mockXHR } from '../mock'
if (import.meta.env.PROD) {
  mockXHR()
}

const pinia = createPinia()
const app = createApp(App)

app
  .use(pinia)
  .use(router)
  .mount('#app')
