<template>
  <el-breadcrumb
    class="inline-block text-[14px] leading-[50px] ml-2"
    separator="/"
  >
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-if="appStore.device === 'mobile'">
        <span class="text-[#3C66F5] cursor-text">{{ levelList[levelList.length - 1]?.meta?.title }}</span>
      </el-breadcrumb-item>

      <template v-else>
        <el-breadcrumb-item
          v-for="(item,index) in levelList"
          :key="item.path"
        >
          <span
            v-if="item.meta?.noRedirect || index === levelList.length - 1"
            class="text-[#3C66F5] cursor-text"
          >{{ item?.meta?.title }}</span>
          <a
            v-else
            @click.prevent="handleLink(item)"
          >{{ item?.meta?.title }}</a>
        </el-breadcrumb-item>
      </template>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
export default {
  name: 'Breadcrumb'
}
</script>

<script setup lang="ts">
import pathToRegexp from 'path-to-regexp'
import type { RouteLocationMatched } from 'vue-router'

type RouteMatched = Partial<RouteLocationMatched>

const route = useRoute(), router = useRouter()
const appStore = useAppStore()

const levelList = ref<RouteMatched[]>([])

watch(
  () => route.path,
  () => getBreadcrumb(),
  { immediate: true }
)

function getBreadcrumb() {
  // only show routes with meta.title
  const matched: RouteMatched[] = route.matched.filter(item => item?.meta?.title && !item.meta.noShow)
  const first = matched[0]

  if (!isDashboard(first)) {
    matched.unshift({ path: '/dashboard', meta: { title: '首页' }})
  }

  levelList.value = matched
}
function isDashboard(route: RouteMatched) {
  if (!route || typeof route.name !== 'string') return false

  return route.name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
}
function pathCompile(path: string) {
  // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
  const { params } = route
  var toPath = pathToRegexp.compile(path)
  return toPath(params)
}
function handleLink(item: RouteMatched) {
  const { redirect, path } = item

  if (typeof redirect === 'string') return router.push(redirect)

  router.push(pathCompile(path || ''))
}
</script>
