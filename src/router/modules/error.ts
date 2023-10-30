import type { Route } from '@/router'

const error: [string, Route][] = [
  ['404', {
    path: '/404',
    name: '404',
    component: () => import('@/views/404.vue'),
    meta: { title: '', icon: '404', noCache: true }
  }]
]

export default error
