'use strict'
const path = require('path')
const defaultSettings = require('@/settings.ts')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title // page title
const IS_PROD = process.env.NODE_ENV === 'production'

// const timeStamp = new Date().getTime()

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9527 npm run dev OR npm run dev --port = 9527
const port = process.env.port || process.env.npm_config_port || 9527 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    before: process.env.VITE_MOCK && require('./mock/mock-server.js'),
    compress: true,
    port: port,
    open: true,
    hot: true,
    disableHostCheck: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  configureWebpack: config => {
    if (IS_PROD) {
      config.plugins.push(new CompressionWebpackPlugin({
        filename: '[path][base].gz',
        algorithm: 'gzip',
        test: /\.(js|css)$/i,
        threshold: 10240, // * 大于 10240字节，既10k时
        deleteOriginalAssets: false, // * 是否删除原本的js
        minRatio: 0.8 // * 压缩率
      }))
      // config.output.filename = `static/js/[name].${timeStamp}.js`
      // config.output.chunkFilename = `static/js/[name].${timeStamp}.js`
    }
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.name = name
    config.resolve.alias['@'] = resolve('src')

    config.plugins.push(
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      require('unplugin-element-plus/webpack')()
    )
  },
  css: {
    /* extract: {
      filename: `static/css/[name].${timeStamp}.css`,
      chunkFilename: `static/css/[name].${timeStamp}.css`
    },*/
    loaderOptions: {
      scss: {
        prependData: `
          @import "~@/styles/mixin.scss"; 
          @import "~@/styles/variables.scss";
        `
      }
    }
  },
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(IS_PROD,
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              minSize: 20000, // 允许新拆出 chunk 的最小体积，也是异步 chunk 公共模块的强制拆分体积
              maxAsyncRequests: 6, // 每个异步加载模块最多能被拆分的数量
              maxInitialRequests: 6, // 每个入口和它的同步依赖最多能被拆分的数量
              enforceSizeThreshold: 50000, // 强制执行拆分的体积阈值并忽略其他限制
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementPlus: {
                  name: 'chunk-elementPlus', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-plus(.*)/ // in order to adapt to cnpm
                }, /*
                echarts: {
                  name: 'chunk-echarts',
                  test: /[\\/]node_modules[\\/](vue-)?echarts[\\/]/,
                  priority: 4
                },*/
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  chunks: 'initial',
                  minChunks: 2, //  minimum common number
                  maxInitialRequests: 5,
                  minSize: 0,
                  priority: 1,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
