import type { Route } from '@/router'

const routesModules: [string, Route][] = (Object.values(import.meta.glob('./*.ts', { import: 'default', eager: true })) as [string, Route][][]).flat(1)

// * 异步加载的权限路由
export const asyncRoutes = new Map<string, Route>(routesModules.concat([
  ['404', {
    path: '/404',
    name: '404',
    component: () => import('@/views/404.vue'),
    meta: { title: '', icon: '404', noCache: true }
  }]
]))
