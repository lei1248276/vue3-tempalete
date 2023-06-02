import { App } from 'vue'

export function setupStore(app: App) {
  const pinia = createPinia()
  app.use(pinia)
}
