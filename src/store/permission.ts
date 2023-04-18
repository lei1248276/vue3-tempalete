import { asyncRoutes, constantRoutes, Route, RouteMap } from '@/router'

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    routes: [] as Route[],
    addRoutes: [] as Route[]
  }),
  actions: {
    generateRoutes(routeMaps: RouteMap[]) {
      const accessedRoutes: Route[] = filterAsyncRoutes(routeMaps, asyncRoutes)
      console.log('🚀 ~ file: permission.ts:11 ~ generateRoutes ~ accessedRoutes:', accessedRoutes)
      this.addRoutes = accessedRoutes
      this.routes = constantRoutes.concat(accessedRoutes)

      return accessedRoutes
    }
    // * 查询是否有权限
    /* hasPermission(roles: string[], route: Route): boolean {
      return route?.meta?.roles
        ? roles.some(role => route.meta?.roles?.includes(role))
        : false
    },*/
    // * 查询路由是否存在（备用品）
    /* hasRoute(routes: Route[], fullPath: string): boolean {
      const paths = fullPath.split('/').filter(v => v)
      const to = paths.shift()
      const routeRoot = routes.find(route => route.path.split('/').pop() === to)

      if (routeRoot) {
        if (!paths.length) return true
        else if (routeRoot.children?.length) return this.hasRoute(routeRoot.children, paths.join('/'))
      }

      return false
    }*/
  }
})

// * 筛选异步路由以及合并自定义路由记录
function filterAsyncRoutes(routeMaps: RouteMap[], asyncRoutes: Map<string, Route>): Route[] {
  const res: Route[] = []

  routeMaps.forEach(map => {
    const path: string = map.path
    let tmp: Route

    if (asyncRoutes.has(path)) { // * 搜索并合并路由记录
      tmp = Object.assign({}, asyncRoutes.get(path))
      tmp.meta!.title = map.title
    } else {
      console.error(`路由地址不存在：${path}`)
      throw new Error(`路由地址不存在`)
    }

    if (map.children?.length) {
      tmp.children = filterAsyncRoutes(map.children, asyncRoutes)
    }

    res.push(tmp)
  })

  return res
}
