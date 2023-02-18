import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
// import mockServer from './mock/mock-server.cjs'

function resolve(dir) {
  return path.join(__dirname, dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 9527,
    proxy: {
      '/dev-api': 'http://localhost:9528'
    }
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: [
        'vue',
        'vue-router',
        'pinia',
        {
          'axios': [
            ['default', 'axios']
          ]
        }
      ],
      dirs: [
        'src/store',
        'src/hooks/**'
      ],
      dts: true, // or a custom path
      eslintrc: {
        enabled: true
      }
    }),
    Components({
      dts: true,
      resolvers: [ElementPlusResolver()]
    }),
    createSvgIconsPlugin({
      iconDirs: [resolve('src/icons/svg')],
      symbolId: 'icon-[dir]-[name]'
    })
  ],
  resolve: {
    alias: {
      '@': resolve('src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/mixin.scss";`
      }
    }
  }
})
