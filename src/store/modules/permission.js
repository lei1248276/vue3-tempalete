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
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 */
export function filterAsyncRoutes(routes) {
  const res = []

  routes.forEach(route => {
    let tmp = { ...route }

    if (tmp.component || tmp.path === '*') {
      const comp = tmp.component || tmp.path
      if (asyncRoutes[comp]) {
        tmp = Object.assign(tmp, asyncRoutes[comp])
      } else {
        console.error(`路由地址不存在：${comp}`)
        throw new Error(`路由地址不存在`)
      }
    }

    if (tmp.children && tmp.children.length) {
      tmp.children = filterAsyncRoutes(tmp.children)
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
    // console.log(state.routes, state.addRoutes);
  }
}

const actions = {
  generateRoutes({ commit }, asyncRoutes) {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes(asyncRoutes)
      console.log('%c🚀 ~ file: permission ~ method: generateRoutes ~', 'color: #F25F5C;font-weight: bold;', asyncRoutes, accessedRoutes)
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
