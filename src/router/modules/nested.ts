import Layout from '@/layout/Layout.vue'
import { NestedView } from '@/layout/components'
import type { Route } from '@/router'

const nested: [string, Route][] = [
  ['nested', {
    path: '/nested',
    name: 'Nested',
    component: Layout,
    meta: { title: '', icon: 'nested' }
  }],
  ['page1', {
    path: 'page1',
    name: 'Page1',
    component: () => import('@/views/nested/page1/page1.vue'),
    meta: { title: '', icon: 'table' }
  }],
  ['nested1', {
    path: 'nested1',
    name: 'Nested1',
    component: { name: 'Nested1', render: () => h(NestedView) },
    meta: { title: '', icon: 'nested' }
  }],
  ['page2', {
    path: 'page2',
    name: 'Page2',
    component: () => import('@/views/nested/nested1/page2/page2.vue'),
    meta: { title: '', icon: 'table' }
  }],
  ['page3', {
    path: 'page3',
    name: 'Page3',
    component: () => import('@/views/nested/nested1/page3/page3.vue'),
    meta: { title: '', icon: 'table', noCache: true }
  }],
  ['nested2', {
    path: 'nested2',
    name: 'Nested2',
    component: { name: 'Nested2', render: () => h(NestedView) },
    meta: { title: '', icon: 'nested' }
  }],
  ['page4', {
    path: 'page4',
    name: 'Page4',
    component: () => import('@/views/nested/nested1/nested2/page4/page4.vue'),
    meta: { title: '', icon: 'table', noCache: true }
  }],
  ['page5', {
    path: 'page5',
    name: 'Page5',
    component: () => import('@/views/nested/nested1/nested2/page5/page5.vue'),
    meta: { title: '', icon: 'table' }
  }]
]

export default nested
