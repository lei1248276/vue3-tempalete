import router, { Route } from './router'
import store from './store'

import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

import getPageTitle from '@/utils/get-page-title'
import { getRoutes } from '@/api/user'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title as string)

  // determine whether the user has logged in
  if (store.getters.token) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      // ! 通过getInfo判断用户是否获得了他的权限角色和路由
      if (store.getters.userId) {
        next()
      } else {
        try {
          // get user info
          // note: roles must be an object array! such as: ['admin'] or ,['developer','editor']
          await store.dispatch('user/getInfo')
          // * 请求获取服务端路由
          const { result: routes } = await getRoutes()
          const accessRoutes: Route[] = await store.dispatch('permission/generateRoutes', routes)
          console.log('%c🚀 ~ method: generateRoutes ~', 'color: #F25F5C;font-weight: bold;', accessRoutes)

          // dynamically add accessible routes
          nextTick(() => { accessRoutes.forEach((route) => { router.addRoute(route) }) })

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ path: '/', replace: true })
        } catch (error) {
          console.log('%c🚀 ~ method: ??? ~', 'color: #F25F5C;font-weight: bold;', error)
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          ElMessage.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
