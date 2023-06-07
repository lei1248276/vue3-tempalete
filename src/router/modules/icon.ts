import type { Route } from '@/router'

const icon: [string, Route][] = [
  ['icon', {
    path: '/icon',
    name: 'Icon',
    component: () => import('@/views/icon/icon.vue'),
    meta: { title: '', icon: 'icon' }
  }]
]

export default icon
