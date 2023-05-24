import Layout from '@/layout/Layout.vue'
import type { Route } from '@/router'

const auth: [string, Route][] = [
  ['auth', {
    path: '/auth',
    name: 'Auth',
    component: Layout,
    meta: { title: '', icon: 'auth' }
  }],
  ['role', {
    path: 'role',
    name: 'Role',
    component: () => import('@/views/auth/role/role.vue'),
    meta: { title: '', icon: 'people' }
  }],
  ['user', {
    path: 'user',
    name: 'User',
    component: () => import('@/views/auth/user/user.vue'),
    meta: { title: '', icon: 'user' }
  }],
  ['admin', {
    path: 'admin',
    name: 'Admin',
    component: () => import('@/views/auth/admin/admin.vue'),
    meta: { title: '', icon: 'lock', noCache: true }
  }]
]

export default auth
