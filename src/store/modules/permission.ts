import { asyncRoutes, constantRoutes, Route, RouteMap } from '@/router'
import { ActionContext } from 'vuex'

// * 查询是否有权限
/* function hasPermission(roles: string[], route: Route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta?.roles?.includes(role))
  } else {
    return true
  }
}*/

// * 查询路由是否存在（在路由还没有生成时）
/* export function hasRoute(routes: Route[], fullPath: string): boolean {
  const paths = fullPath.split('/').filter(v => v)
  const to = paths.shift()
  const routeRoot = routes.find(route => route.path.split('/').pop() === to)

  if (routeRoot) {
    if (!paths.length) return true
    else if (routeRoot.children?.length) return hasRoute(routeRoot.children, paths.join('/'))
    return false
  } else {
    return false
  }
}*/

// * 筛选异步路由以及合并自定义路由记录
export function filterAsyncRoutes(routeMaps: RouteMap[], asyncRoutes: Map<string, Route>): Route[] {
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

interface PermissionRoutes {
  routes: Route[]
  addRoutes: Route[]
}

const state: PermissionRoutes = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state: PermissionRoutes, routes: Route[]) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }: ActionContext<PermissionRoutes, any>, routeMaps: RouteMap[]) {
    return new Promise(resolve => {
      const accessedRoutes: Route[] = filterAsyncRoutes(routeMaps, asyncRoutes)

      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
