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
  ['authSwitch', {
    path: 'authSwitch',
    name: 'AuthSwitch',
    component: () => import('@/views/auth/authSwitch/authSwitch.vue'),
    meta: { title: '', icon: 'lock', noCache: true }
  }]
]

export default auth
