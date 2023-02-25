import App from './App.vue'
import router from './router'

import 'normalize.css/normalize.css'

import '@/styles/index.scss' // ! global css

import 'virtual:svg-icons-register'

import './permission' // ! permission control

const pinia = createPinia()
const app = createApp(App)

app
  .use(pinia)
  .use(router)
  .mount('#app')
