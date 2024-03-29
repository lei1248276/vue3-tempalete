import { defineConfig, splitVendorChunkPlugin, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
import mockServer from './mock/mock-server'

function resolve(dir: string) {
  return path.join(__dirname, dir)
}

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const PROD = mode === 'production'

  return defineConfig({
    base: './',
    server: {
      host: true,
      port: 9527
    },
    plugins: [
      env.VITE_MOCK && mockServer(),
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
        imports: [
          'vue',
          'vue-router',
          'pinia',
          '@vueuse/core',
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
        vueTemplate: true,
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
      }),
      splitVendorChunkPlugin()
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
    },
    esbuild: {
      drop: PROD ? ['console', 'debugger'] : []
    }
  })
}
