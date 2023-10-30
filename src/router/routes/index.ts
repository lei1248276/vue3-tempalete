import type { Route } from '@/router'
import Layout from '@/layout/layout.vue'

// * constantRoutes 没有权限要求的基页，所有角色都可以访问
export const constantRoutes: Route[] = [
  {
    path: '/',
    name: '/',
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
