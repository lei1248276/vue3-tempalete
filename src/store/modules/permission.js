import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * @param { Array<route> } routes
 * @param { String } fullPath
 * @return Boolean
 */
export function hasRoute(routes, fullPath) {
  const paths = fullPath.split('/').filter(v => v)
  const to = paths.shift()
  const routeRoot = routes.find(route => route.path.split('/').pop() === to)

  if (routeRoot) {
    if (!paths.length) return true
    else if (routeRoot.children.length) return hasRoute(routeRoot.children, paths.join('/'))
  } else {
    return false
  }

  // ! 暴力搜索
  /* return routes.some(route => {
      console.log(route.path);
      if (route.path === to) return true;
      if (route.children && route.children.length) return hasRoute(route.children, to);
    });*/
}

/**
 * Filter asynchronous routing tables by recursion
 * @param { Array } routes
 * @param { Map } asyncRoutes
 */
export function filterAsyncRoutes(routes, asyncRoutes) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }

    if (tmp.component) {
      const path = tmp.component
      if (asyncRoutes.has(path)) {
        Object.assign(tmp, asyncRoutes.get(path)).meta.title = tmp.title
      } else {
        console.error(`路由地址不存在：${path}`)
        throw new Error(`路由地址不存在`)
      }
    }

    if (tmp.children && tmp.children.length) {
      tmp.children = filterAsyncRoutes(tmp.children, asyncRoutes)
    }

    res.push(tmp)
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, routes) {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes(routes, asyncRoutes)
      // ! 404 页面必须放在最后 !!!
      accessedRoutes.push(asyncRoutes.get('*'))
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
      console.log('%c🚀 ~ file: permission ~ method: generateRoutes ~', 'color: #F25F5C;font-weight: bold;', routes, accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
