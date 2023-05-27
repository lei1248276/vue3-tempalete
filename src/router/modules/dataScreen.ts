import type { Route } from '@/router'

const dataScreen: [string, Route][] = [
  ['dataScreen', {
    path: '/dataScreen',
    name: 'DataScreen',
    component: () => import('@/views/dataScreen/dataScreen.vue'),
    meta: { title: '', icon: 'data-screen', noCache: true }
  }]
]

export default dataScreen
