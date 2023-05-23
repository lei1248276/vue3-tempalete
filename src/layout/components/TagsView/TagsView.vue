<template>
  <div
    ref="tagsViewRef"
    class="w-full h-[34px] bg-[#fff] border-b-[1px] border-[#d8dce5] shadow-[0_1px_3px_0_rgba(0,0,0,.12),0_0_3px_0_rgba(0,0,0,.04)]"
  >
    <ScrollPane
      ref="scrollPaneRef"
      :tags="tagRefs"
      @scroll="handleScroll"
    >
      <router-link
        v-for="tag in tagsViewStore.visitedViews"
        :key="tag.path"
        ref="tagRefs"
        :class="{
          '!bg-[#42b983] !border-[#42b983] text-[#fff] before:inline-block before:w-[8px] before:h-[8px] before:bg-[#fff] before:rounded-full before:mr-[6px]': isActive(tag)
        }"
        class="inline-block h-[26px] leading-[26px] border border-[#d8dce5] bg-[#fff] py-0 px-2 mt-1 ml-[5px] text-[12px] cursor-pointer first-of-type:ml-[15px] last-of-type:mr-[15px]"
        :to="{ path: tag.path || '', query: tag.query, fullPath: tag.fullPath } as any"
        @click.middle="!isAffix(tag) && closeSelectedTag(tag)"
        @contextmenu.prevent="openMenu(tag, $event)"
        @click="tag.fullPath === route.fullPath && refreshSelectedTag(route)"
      >
        {{ tag.title }}
        <span
          v-if="!isAffix(tag)"
          class="w-[16px] h-[16px] py-0 px-1 rounded-full text-center transition-all duration-300 hover:bg-[#b4bccc]"
          @click.prevent.stop="closeSelectedTag(tag)"
        >&#10008;
        </span>
      </router-link>
    </ScrollPane>
    <ul
      v-show="visible"
      :style="{left: left + 'px',top: top + 'px'}"
      class="bg-[#fff] absolute z-50 py-[5px] px-0 rounded text-[12px] font-normal text-[#333] shadow-[2px_2px_3px_0_rgba(0,0,0,.3)]"
    >
      <li
        class="py-[7px] px-[16px] cursor-pointer hover:bg-[#eee]"
        @click="refreshSelectedTag(selectedTag)"
      >
        刷新
      </li>
      <li
        v-if="!isAffix(selectedTag)"
        class="py-[7px] px-[16px] cursor-pointer hover:bg-[#eee]"
        @click="closeSelectedTag(selectedTag)"
      >
        关闭
      </li>
      <li
        class="py-[7px] px-[16px] cursor-pointer hover:bg-[#eee]"
        @click="closeOthersTags"
      >
        关闭其他
      </li>
      <li
        class="py-[7px] px-[16px] cursor-pointer hover:bg-[#eee]"
        @click="closeAllTags(selectedTag)"
      >
        关闭所有
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TagsView'
}
</script>

<script setup lang="ts">
import ScrollPane from './components/ScrollPane.vue'
import path from 'path-browserify'
import type { RouterLinkProps } from 'vue-router'
import type { Route } from '@/router'
import type { TagView } from '@/store/tagsView'

const router = useRouter()
const route = useRoute()
const permissionStore = usePermissionStore()
const tagsViewStore = useTagsViewStore()

const visible = ref(false)
const top = ref(0)
const left = ref(0)
const selectedTag = ref<TagView>()
const affixTags = ref<TagView[]>([])

const tagsViewRef = ref<HTMLDivElement>()
const tagRefs = ref<RouterLinkProps[]>([])
const scrollPaneRef = ref()

onMounted(() => {
  initTags()
  addTags()
})

watch(() => route.path, () => {
  addTags()
  moveToCurrentTag()
})

watch(() => visible, (value) => {
  value
    ? document.body.addEventListener('click', closeMenu)
    : document.body.removeEventListener('click', closeMenu)
},
{ immediate: true })

function isActive(activeTag: TagView) {
  return activeTag.path === route.path
}

function isAffix(tag?: TagView) {
  return !!tag?.meta?.affix
}

function filterAffixTags(routes: Route[], basePath = '/'): TagView[] {
  let tags: TagView[] = []
  routes.forEach(route => {
    if (route.meta && route.meta.affix) {
      const tagPath = path.resolve(basePath, route.path)
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name || '',
        title: '',
        meta: { ...route.meta }
      })
    }
    if (route.children) {
      const tempTags = filterAffixTags(route.children, route.path)
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags]
      }
    }
  })
  return tags
}

function initTags() {
  const tags = (affixTags.value = filterAffixTags(permissionStore.routes))
  for (const tag of tags) {
    // Must have tag name
    tag.name && tagsViewStore.addVisitedView(tag)
  }
}

function addTags() {
  route.name && tagsViewStore.addView(route)

  // ! 为保障keep-alive对三级以上的嵌套路由有效，需要将父级页面也加入缓存列表
  if (!route.meta.noCache && route.matched.length >= 3) {
    tagsViewStore.addCachedView(route.matched.at(-2) as TagView)
  }
}

function moveToCurrentTag() {
  nextTick(() => {
    for (const tag of tagRefs.value) {
      const { path, fullPath } = tag.to as { path: string, fullPath: string }

      if (path === route.path) {
        scrollPaneRef.value.moveToTarget(tag)
        // when query is different then update
        if (fullPath !== route.fullPath) {
          tagsViewStore.updateVisitedView(route)
        }
        break
      }
    }
  })
}

function refreshSelectedTag(view?: TagView) {
  if (!view) return

  tagsViewStore.delCachedView(view)
  router.replace({ path: '/redirect' + view.fullPath })
}

function closeSelectedTag(view?: TagView) {
  if (!view) return

  const { visitedViews } = tagsViewStore.delView(view)
  isActive(view) && toLastView(visitedViews, view)
}

function closeOthersTags() {
  if (!selectedTag.value) return

  router.push(selectedTag.value as any)
  tagsViewStore.delOthersViews(selectedTag.value)
  moveToCurrentTag()
}

function closeAllTags(view?: TagView) {
  if (!view) return

  const { visitedViews } = tagsViewStore.delAllViews()

  if (affixTags.value.some(tag => tag.path === view.path)) return

  toLastView(visitedViews, view)
}

function toLastView(visitedViews: TagView[], view: TagView) {
  const latestView = visitedViews.slice(-1)[0]
  if (latestView) {
    router.push(latestView.fullPath || '')
  } else {
    // now the default is to redirect to the home page if there is no tags-view,
    // you can adjust it according to your needs.
    if (view.name === 'Dashboard') {
      // to reload home page
      router.replace({ path: '/redirect' + view.fullPath })
    } else {
      router.push('/')
    }
  }
}

function openMenu(tag: TagView, e: MouseEvent) {
  if (!tagsViewRef.value) return

  const menuMinWidth = 105
  const offsetLeft = tagsViewRef.value.getBoundingClientRect().left // container margin left
  const offsetWidth = tagsViewRef.value.offsetWidth // container width
  const maxLeft = offsetWidth - menuMinWidth // left boundary
  const $left = e.clientX - offsetLeft + 15 // 15: margin right

  $left > maxLeft ? (left.value = maxLeft) : (left.value = $left)
  top.value = e.clientY
  visible.value = true
  selectedTag.value = tag
}

function closeMenu() {
  visible.value = false
}

function handleScroll() {
  closeMenu()
}
</script>
