import { createRouter, createWebHashHistory } from 'vue-router'
import { h } from 'vue'

/* * Layout */
import Layout from '@/layout'

/* *
 *
 * hidden: true                   如果设置为 true，项目将不会显示在侧边栏中(默认是 false)
 * alwaysShow: true               如果设置为true，将始终显示根菜单，如果不设置 alwaysShow，当 item 有多个子路由时，将变为嵌套模式，否则不显示根菜单
 * redirect: noRedirect           如果设置 noRedirect 将不会在面包屑中重定向
 * name:'router-name'             该名称由 <keep-alive> 使用（必须设置！！！）
 * meta: {
  * roles: ['admin','editor']     控制页面角色（可以设置多个角色）
  * title: 'title'               名称显示在侧边栏和面包屑中（推荐设置）
  * icon: 'svg-name' 图标显示在侧边栏中
  ! noCache: true                如果设置为true，页面将不会被缓存（默认为false），三级路由以上情况上级组件使用（component: { name: name, render: () => h('router-view') }）
  * affix: true                  如果设置为真，标签将固定在TagView中
  * breadcrumb: false            如果设置为 false，该项目将隐藏在面包屑中（默认为 true）
  * activeMenu: '/example/list'  如果设置路径，侧边栏将突出显示您设置的路径
  * }
 * */

/* *
 * constantRoutes 没有权限要求的基页，所有角色都可以访问
 * */
export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard'),
      meta: { title: '首页', icon: 'dashboard', affix: true }
    }]
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect')
      }
    ]
  },

  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }
]

export const asyncRoutes = new Map([
  ['test', {
    path: '/test',
    component: Layout,
    redirect: '/test/test',
    name: 'Permission',
    alwaysShow: true,
    meta: { title: '测试', icon: 'table' }
  }],
  ['nested', {
    path: 'nested',
    component: { name: 'Nested', render: () => h('router-view') },
    name: 'Nested',
    alwaysShow: true,
    meta: { title: '', icon: 'erp_permission', noCache: true }
  }],
  ['test/test', {
    path: 'test',
    name: 'Test',
    component: () => import(/* webpackChunkName: "role"*/'@/views/test'),
    meta: { title: 'test', icon: 'table' }
  }],
  ['test/test2', {
    path: 'test2',
    name: 'Test2',
    component: () => import(/* webpackChunkName: "role"*/'@/views/test2'),
    meta: { title: 'test2', icon: 'table' }
  }],
  // ! 404 页面必须放在最后 !!!
  ['*', { path: '/:pathMatch(.*)*', redirect: '/404', hidden: true }]
])
/* export const asyncRoutes = {
  'test': {
    path: '/test',
    component: Layout,
    redirect: '/test/test',
    name: 'Permission',
    alwaysShow: true,
    meta: { title: '测试', icon: 'table' }
  },
  'test/test': {
    path: 'test',
    name: 'Test',
    component: () => import(/!* webpackChunkName: "role"*!/'@/views/test'),
    meta: { title: 'test', icon: 'table' }
  },

  'test/test2': {
    path: 'test2',
    name: 'Test2',
    component: () => import(/!* webpackChunkName: "role"*!/'@/views/test2'),
    meta: { title: 'test2', icon: 'table' }
  },

  // ! 404 页面必须放在最后 !!!
  '*': { path: '/:pathMatch(.*)*', redirect: '/404', hidden: true }
}*/

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 }
  }
})

export function resetRouter(route) {
  route.forEach(v => {
    router.hasRoute(route) && router.removeRoute(v.name)
    if (v.children && v.children.length) resetRouter(v.children)
  })
}

export default router
