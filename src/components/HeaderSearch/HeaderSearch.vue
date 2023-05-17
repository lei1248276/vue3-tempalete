<template>
  <div class="flex items-center">
    <SvgIcon
      class-name="cursor-pointer"
      icon-class="search"
      @click.stop="onClick"
    />
    <el-select
      ref="headerSearchSelectRef"
      v-model="searchData.search"
      :class="{ 'w-[210px] ml-[10px]': isShow }"
      class="w-0 text-[18px] transition-[width] duration-200 overflow-hidden"
      :remote-method="querySearch"
      filterable
      default-first-option
      remote
      placeholder="Search"
      @change="onChange"
      @blur="onClose"
    >
      <el-option
        v-for="item in searchData.options"
        :key="item.path"
        :value="item"
        :label="item.title.join(' > ')"
      />
    </el-select>
  </div>
</template>

<script lang="ts">
export default {
  name: 'HeaderSearch'
}
</script>

<script setup lang="ts">
// fuse is a lightweight fuzzy-search module
// make search results more in line with expectations
import Fuse from 'fuse.js'
import path from 'path-browserify'
import type { ElSelect } from 'element-plus'
import type { Route } from '@/router'

const permissionStore = usePermissionStore()
const router = useRouter()

interface Search {
  search: string
  searchPool: SearchOption[]
  options: any[]
}
interface SearchOption {
  path: string
  title: string[]
}

let fuse: Fuse<SearchOption>

const searchData = reactive<Search>({
  search: '',
  searchPool: [],
  options: []
})
const isShow = ref<boolean>(false)
const headerSearchSelectRef = ref<InstanceType<typeof ElSelect> | null>(null)

watch(
  () => permissionStore.routes,
  () => { searchData.searchPool = generateRoutes(toRaw(permissionStore.routes)) },
  { immediate: true }
)
watch(
  () => searchData.searchPool,
  (list: SearchOption[]) => { initFuse(list) },
  { immediate: true }
)

function initFuse(list: SearchOption[]) {
  fuse = new Fuse(list, {
    threshold: 0.4,
    keys: [{
      name: 'title',
      weight: 0.7
    }, {
      name: 'path',
      weight: 0.3
    }]
  })
}
function querySearch(query: string) {
  if (!fuse || !query) return

  searchData.options = fuse.search(query).map((v) => v.item)
}

function onClick() {
  isShow.value = !isShow.value
  isShow.value ? headerSearchSelectRef.value?.focus() : onClose()
}
function onClose() {
  headerSearchSelectRef.value?.blur()
  searchData.options = []
  searchData.search = ''
  isShow.value = false
}
function onChange(item: SearchOption) {
  router.push(item.path)
  searchData.search = ''
  searchData.options = []
  nextTick(() => { isShow.value = false })
}

// Filter out the routes that can be displayed in the sidebar
// And generate the internationalized title
function generateRoutes(routes: Route[], basePath: string = '/', prefixTitle: string[] = []) {
  const res: SearchOption[] = []

  for (const route of routes) {
    // skip hidden route
    if (route.meta?.hidden) { continue }

    const data: SearchOption = {
      path: path.join(basePath, route.path),
      title: [...prefixTitle]
    }

    if (route.meta?.title) {
      // * skip noShow route title
      if (!route.meta?.noShow) {
        data.title.push(route.meta.title)
      }

      // only push the routes with title
      // special case: need to exclude parent route without redirect
      if (route.redirect !== 'noRedirect' && !route.children) {
        res.push(data)
      }
    }

    // recursive child routes
    if (route.children) {
      const tempRoutes = generateRoutes(route.children, data.path, data.title)
      if (tempRoutes.length >= 1) {
        res.push(...tempRoutes)
      }
    }
  }

  return res
}
</script>
