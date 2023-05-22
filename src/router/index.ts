import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
  RouteRecordRedirectOption
} from 'vue-router'

/* * Layout */
import Layout from '@/layout/Layout.vue'

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
   hidden?: boolean // * 设置为'true'时，将不会显示在侧边栏中（包含子级）
   noShow?: boolean // * 设置为'true'时，只隐藏自身（比如用来隐藏上级装饰页面"Layout"）
   noCache?: boolean // ! 如果设置为true时，页面将不会被缓存（默认为false），三级路由以上情况父级页面使用（component: { name: name, render: () => h(resolveComponent('router-view')) }）
   affix?: boolean // * 设置为'true'时，标签将固定在TagView中
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
      component: () => import('@/views/dashboard/dashboard.vue'),
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
        component: () => import('@/views/redirect/redirect.vue')
      }
    ]
  },

  {
    path: '/login',
    component: () => import('@/views/login/login.vue'),
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
    meta: { title: '', icon: 'table' }
  }],
  ['nested', {
    path: 'nested',
    name: 'Nested',
    component: () => import('@/views/nested/nested.vue'),
    meta: { title: '', icon: 'table' }
  }],
  ['nested2', {
    path: 'nested2',
    name: 'Nested2',
    component: () => import('@/views/nested/nested2/nested2.vue'),
    meta: { title: '', icon: 'table' }
  }],
  ['role', {
    path: 'role',
    name: 'Role',
    component: () => import('@/views/nested/role/role.vue'),
    meta: { title: '', icon: 'table' }
  }],
  ['user', {
    path: 'user',
    name: 'User',
    component: () => import('@/views/nested/nested2/user/user.vue'),
    meta: { title: '', icon: 'table', noCache: true }
  }],
  ['superAdmin', {
    path: 'superAdmin',
    name: 'SuperAdmin',
    component: () => import('@/views/superAdmin/superAdmin.vue'),
    meta: { title: '', icon: 'table' }
  }],
  ['admin', {
    path: 'admin',
    name: 'Admin',
    component: () => import('@/views/admin/admin.vue'),
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
