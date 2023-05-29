import Layout from '@/layout/layout.vue'
import type { Route } from '@/router'

const map: [string, Route][] = [
  ['map', {
    path: '/map',
    name: 'Map',
    component: Layout,
    meta: { title: '', icon: 'map' }
  }],
  ['baidu', {
    path: 'baidu',
    name: 'Baidu',
    component: () => import('@/views/map/baidu/baidu.vue'),
    meta: { title: '', icon: 'map' }
  }]
]

export default map
