import { App } from 'vue'
import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw
} from 'vue-router'
import { constantRoutes } from './routes'
import { setupRouterGuard } from './guard/permission'

// ! 与从服务器请求的路由表对应
export interface RouteMap {
  path: string
  title: string
  name: string
  children?: RouteMap[]
}

// ! 自定义的路由记录信息
export type Route = RouteRecordRaw & {
  name?: string // * 提供给 <keep-alive> 使用时（必须设置！！！）
  children?: Route[]
  meta?: {
   title?: string // * 名称显示在侧边栏和面包屑中
   icon?: string // * 'svg-name' 图标显示在侧边栏中
   roles?: string[] // * 参考：['admin','editor']   控制页面角色（可以设置多个角色）
   hidden?: boolean // * 设置为'true'时，将不会显示在侧边栏中（包含子级）
   noShow?: boolean // * 设置为'true'时，只隐藏自身（比如用来隐藏上级装饰页面"Layout"）
   noCache?: boolean // ! 如果设置为true时，页面将不会被缓存（默认为false），三级路由以上情况父级页面使用（component: { name: name, render: () => h(NestedView) } **用于解决路由嵌套时keep-alive缓存失效**）
   noRedirect?: boolean // * 设置为'true'时将不会在面包屑中重定向
   affix?: boolean // * 设置为'true'时，标签将固定在TagView中
  }
}

// * 安装router
export function setupRouter(app: App) {
  app.use(router)
  setupRouterGuard(router)
}

// ! 路由的一级页面统一为布局页面，除了少数的功能页面（默认布局组件：‘Layout’）
export * from './routes'
export * from './modules'
export * from './helper'

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  scrollBehavior() {
    // * 始终滚动到顶部
    return { top: 0 }
  }
})

export default router
