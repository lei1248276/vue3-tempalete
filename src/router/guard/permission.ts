import { Router } from 'vue-router'
import { addRoutes, Route } from '@/router'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

import getPageTitle from '@/utils/get-page-title'
import { getRoutes } from '@/api/user'

export function setupRouterGuard(router: Router) {
  NProgress.configure({ showSpinner: false }) // NProgress Configuration

  const userStore = useUserStore()
  const permissionStore = usePermissionStore()

  const whiteList = ['/login'] // no redirect whitelist

  router.beforeEach(async(to, from, next) => {
    // console.log('🚀 ~ file: permission.ts:17 ~ router.beforeEach ~ to:', to)
    // * 开启进度条
    NProgress.start()

    // * 设置文档title
    document.title = getPageTitle((to.meta?.title as string) || '')

    // * 如果已经登录了，跳转到login页面重定向到首页
    if (userStore.token && to.path === '/login') return next({ path: '/', replace: true })

    // * 如果进入的whitelist页面，放行
    if (whiteList.includes(to.path)) return next()

    if (!userStore.token) return next({ path: '/login', replace: true })

    // * 已经获取到用户信息标识（获取用户信息和token是分开的）
    if (userStore.userId) return next()

    try {
      // ! 每次进入都要获取用户信息
      await userStore.getUserInfo()

      // * 请求获取服务端路由表
      const { result: routeMaps } = await getRoutes()
      // * 完善路由信息（合并自定义的‘route.meta’）
      const accessRoutes: Route[] = permissionStore.generateRoutes(routeMaps)
      // * 动态添加权限路由
      addRoutes(accessRoutes)

      return to.path === '/404' ? next({ path: '/', replace: true }) : next()
    } catch (error) {
      userStore.resetToken()
      next({ path: '/login', replace: true })
      ElMessage.error(error || 'Has Error')
      NProgress.done()
      console.error('%c🚀 ~ method: ??? ~', 'color: #F25F5C;font-weight: bold;', error)
    }
  })

  router.afterEach(() => {
    // finish progress bar
    NProgress.done()
  })
}

