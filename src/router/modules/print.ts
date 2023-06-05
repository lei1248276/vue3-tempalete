import Layout from '@/layout/layout.vue'
import type { Route } from '@/router'

const print: [string, Route][] = [
  ['print', {
    path: '/print',
    name: 'Print',
    component: Layout,
    meta: { title: '', icon: 'print' }
  }],
  ['partPrint', {
    path: 'partPrint',
    name: 'PartPrint',
    component: () => import('@/views/print/partPrint/partPrint.vue'),
    meta: { title: '', icon: 'print', noCache: true }
  }]
]

export default print
