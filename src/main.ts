import App from './App.vue'
import { setupStore } from './store'
import { setupRouter } from './router'

import '@/styles/index.scss' // ! global css
import 'virtual:svg-icons-register'

// @ts-ignore
import { mockXHR } from '../mock'

function setupApp() {
  const app = createApp(App)

  setupStore(app)
  setupRouter(app)

  if (import.meta.env.PROD) mockXHR()

  app.mount('#app')
}

setupApp()
