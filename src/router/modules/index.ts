import type { Route } from '@/router'

const routesModules: [string, Route][] = (Object.values(import.meta.glob('./*.ts', { import: 'default', eager: true })) as [string, Route][][]).flat(1)

// * 异步加载的权限路由
export const asyncRoutes = new Map<string, Route>(routesModules)
