import router, { Route } from '@/router'

export function addRoutes(routes: Route[]) {
  nextTick(() => {
    routes.forEach((route) => {
      // * 没有子页面的route默认添加到根页面下（为了添加默认的‘Layout’组件样式）
      route.children ? router.addRoute(route) : router.addRoute('/', route)
    })
  })
}

export function resetRouter(routes: Route[]) {
  routes.forEach((route) => {
    if (route.name && router.hasRoute(route.name)) return router.removeRoute(route.name)
    route.children?.length && resetRouter(route.children)
  })
}
