<template>
  <template
    v-for="childRoute in showingRoutes"
    :key="childRoute.path"
  >
    <el-sub-menu
      v-if="childRoute.children"
      :index="resolvePath(props.basePath, childRoute.path)"
    >
      <template #title>
        <SvgIcon :icon-class="childRoute.meta?.icon || ''" />
        <span>{{ childRoute.meta?.title || '' }}</span>
      </template>

      <sidebar-item
        v-for="child in childRoute.children.filter((dir: Route) => !dir.meta.hidden)"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(props.basePath, child.path)"
        class="nest-menu"
      />
    </el-sub-menu>

    <el-menu-item
      v-else
      :index="resolvePath(props.basePath, childRoute.path)"
      :class="{'submenu-title-noDropdown': !isNest}"
      @click="toMenuRoute(resolvePath(props.basePath, childRoute.path))"
    >
      <SvgIcon :icon-class="childRoute.meta?.icon || ''" />
      <template #title>{{ childRoute.meta?.title || '' }}</template>
    </el-menu-item>
  </template>
</template>

<script lang="ts">
// import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  inheritAttrs: false
  // mixins: [FixiOSBug]
}
</script>

<script setup lang="ts">
import path from 'path-browserify'
import { isExternal } from '@/utils/validate'
import type { Route } from '@/router'
const router = useRouter(), route = useRoute()

interface Props {
  item: Route
  isNest?: boolean
  basePath: string
}

const props = withDefaults(defineProps<Props>(), {
  isNest: false
})

let showingRoutes: Route[] = []

filterShowingChild(props.item.children, props.item)
function filterShowingChild(children: Route[] | undefined, parent: Route): any {
  if (!children) return showingRoutes.push(parent)

  if (!parent.meta?.noShow) return showingRoutes.push(parent)

  showingRoutes = children.filter((route: Route) => !route.meta?.hidden)
}

function resolvePath(parentPath: string, childPath: string) {
  if (isExternal(childPath)) return childPath

  const chiPath = childPath[0] === '/' ? childPath.substring(1) : childPath
  if (parentPath.split('/').includes(chiPath)) return parentPath

  return path.join(parentPath, childPath)
}
function toMenuRoute(path: string) {
  const { fullPath } = route
  if (path === fullPath) {
    router.replace({ path: '/redirect' + fullPath })
  } else {
    isExternal(path) ? window.open(path) : router.push(path)
  }
}
</script>
