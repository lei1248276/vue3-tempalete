import Layout from '@/layout/layout.vue'
import type { Route } from '@/router'

const order: [string, Route][] = [
  ['order', {
    path: '/order',
    name: 'Order',
    component: Layout,
    meta: { title: '', icon: 'table' }
  }],
  ['orderSearch', {
    path: 'orderSearch',
    name: 'OrderSearch',
    component: () => import('@/views/order/orderSearch/orderSearch.vue'),
    meta: { title: '', icon: 'table' }
  }],
  ['user', {
    path: 'user',
    name: 'User',
    component: () => import('@/views/order/user/user.vue'),
    meta: { title: '', icon: 'table' }
  }],
  ['bill', {
    path: 'bill',
    name: 'Bill',
    component: () => import('@/views/order/bill/bill.vue'),
    meta: { title: '', icon: 'table' }
  }]
]

export default order
