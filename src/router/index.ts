import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
  RouteRecordRedirectOption
} from 'vue-router'
import { h, resolveComponent } from 'vue'

/* * Layout */
import Layout from '@/layout/index.vue'

// ! 与从服务器请求的路由表对应
export interface RouteMap {
  path: string
  title: string
  name: string
  children?: RouteMap[]
}

// ! 自定义的路由记录信息
export type Route = RouteRecordRaw & {
  redirect?: RouteRecordRedirectOption | 'noRedirect' // * 如果设置'noRedirect'将不会在面包屑中重定向
  name?: string // * 提供给 <keep-alive> 使用时（必须设置！！！）
  children?: Route[]
  meta?: {
   title?: string // * 名称显示在侧边栏和面包屑中
   icon?: string // * 'svg-name' 图标显示在侧边栏中
   roles?: string[] // * 参考：['admin','editor']   控制页面角色（可以设置多个角色）
   hidden?: boolean // * （默认是"false"）设置为"true"时，将不会显示在侧边栏中（包含子级）
   noShow?: boolean // * （默认是 false）设置为"true"时，只隐藏自身（用来隐藏上级装饰页面，比如"Layout"）
   noCache?: boolean // ! 如果设置为true，页面将不会被缓存（默认为false），三级路由以上情况上级组件使用（component: { name: name, render: () => h(resolveComponent('router-view')) }）
   affix?: boolean // * 如果设置为真，标签将固定在TagView中
   activeMenu?: string // * '参考：/example/list'  如果设置路径，侧边栏将突出显示您设置的路径
  }
}

/* *
 * constantRoutes 没有权限要求的基页，所有角色都可以访问
 * */
export const constantRoutes: Route[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: { noShow: true },
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index.vue'),
      meta: { title: '首页', icon: 'dashboard', affix: true }
    }]
  },
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },

  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true }
  },

  {
    path: '/404',
    component: () => import('@/views/404.vue'),
    meta: { hidden: true }
  },

  { path: '/:pathMatch(.*)*', redirect: '/404', meta: { hidden: true }}
]

export const asyncRoutes = new Map<string, Route>([
  ['test', {
    path: '/test',
    name: 'Test',
    component: Layout,
    meta: { title: '测试', icon: 'table' }
  }],
  ['nested', {
    path: 'nested',
    name: 'Nested',
    component: { name: 'Nested', render: () => h(resolveComponent('router-view')) },
    meta: { title: '', icon: 'table' }
  }],
  ['nested2', {
    path: 'nested2',
    name: 'Nested2',
    component: { name: 'Nested2', render: () => h(resolveComponent('router-view')) },
    meta: { title: '', icon: 'table', noShow: true }
  }],
  ['nested3', {
    // noShow: true,
    path: 'nested3',
    name: 'Nested3',
    component: { name: 'Nested3', render: () => h(resolveComponent('router-view')) },
    meta: { title: '', icon: 'table' }
  }],
  ['role', {
    path: 'role',
    name: 'Role',
    component: () => import(/* webpackChunkName: "role"*/'@/views/test/index.vue'),
    meta: { title: '', icon: 'table' }
  }],
  ['user', {
    path: 'user',
    name: 'User',
    component: () => import(/* webpackChunkName: "user"*/'@/views/test2/index.vue'),
    meta: { title: '', icon: 'table' }
  }],
  ['admin', {
    path: 'admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "user"*/'@/views/test3/index.vue'),
    meta: { title: '', icon: 'table' }
  }]
])

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  scrollBehavior() {
    // * 始终滚动到顶部
    return { top: 0 }
  }
})

export function resetRouter(routes: Route[]) {
  routes.forEach((route) => {
    if (route.name && router.hasRoute(route.name)) return router.removeRoute(route.name)
    route.children?.length && resetRouter(route.children)
  })
}

export default router