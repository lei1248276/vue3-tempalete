<template>
  <el-breadcrumb
    class="app-breadcrumb"
    separator="/"
  >
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item,index) in levelList"
        :key="item.path"
      >
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
        >{{ item.meta.title }}</span>
        <a
          v-else
          @click.prevent="handleLink(item)"
        >{{ item.meta.title }}</a>
      </el-breadcrumb-item>
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
import { useRoute, useRouter } from 'vue-router'
const route = useRoute(), router = useRouter()

const levelList = ref<any[]>([])

watch(
  () => route.path,
  () => getBreadcrumb(),
  { immediate: true }
)

function getBreadcrumb() {
  // only show routes with meta.title
  let matched: any[] = route.matched.filter(item => item.meta?.title && !item.meta.noShow)
  const first = matched[0]

  if (!isDashboard(first)) {
    matched = [{ path: '/dashboard', meta: { title: '首页' }}].concat(matched)
  }

  levelList.value = matched
}
function isDashboard(route: { name?: string }) {
  if (typeof route.name !== 'string') return false

  return route.name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
}
function pathCompile(path: string) {
  // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
  const { params } = route
  var toPath = pathToRegexp.compile(path)
  return toPath(params)
}
function handleLink(item: { redirect?: string, path: string }) {
  const { redirect, path } = item
  if (redirect) {
    router.push(redirect)
    return
  }
  router.push(pathCompile(path))
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #3C66F5;
    cursor: text;
  }
}
</style>
