<template>
  <div
    :class="{'isShow': isShow}"
    class="header-search"
  >
    <SvgIcon
      class-name="search-icon"
      icon-class="search"
      @click.stop="onClick"
    />
    <el-select
      ref="headerSearchSelectRef"
      v-model="searchData.search"
      :remote-method="querySearch"
      filterable
      default-first-option
      remote
      placeholder="Search"
      class="header-search-select"
      @change="onChange"
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

const searchData = reactive<Search>({
  search: '',
  searchPool: [],
  options: []
})
const fuse = ref<any>(null)
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
watch(
  () => isShow,
  (value) => {
    value
      ? document.body.addEventListener('click', onClose)
      : document.body.removeEventListener('click', onClose)
  }
)

function onClick() {
  isShow.value = !isShow.value
  if (isShow.value) {
    headerSearchSelectRef.value?.focus()
  }
}
function onClose() {
  headerSearchSelectRef.value?.blur()
  searchData.options = []
  isShow.value = false
}
function onChange(item: SearchOption) {
  router.push(item.path)
  searchData.search = ''
  searchData.options = []
  nextTick(() => { isShow.value = false })
}
function initFuse(list: SearchOption[]) {
  fuse.value = new Fuse(list, {
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [{
      name: 'title',
      weight: 0.7
    }, {
      name: 'path',
      weight: 0.3
    }]
  })
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
function querySearch(query: string) {
  searchData.options = query !== '' ? fuse.value.search(query) : []
}

</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;

  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }

  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    :deep(.el-input__inner) {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }

  &.isShow {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
