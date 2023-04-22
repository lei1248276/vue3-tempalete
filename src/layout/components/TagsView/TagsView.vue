<template>
  <div
    id="tags-view-container"
    ref="tagsViewRef"
    class="tags-view-container"
  >
    <ScrollPane
      ref="scrollPaneRef"
      class="tags-view-wrapper"
      :tags="tagRefs"
      @scroll="handleScroll"
    >
      <router-link
        v-for="tag in tagsViewStore.visitedViews"
        :key="tag.path"
        ref="tagRefs"
        class="tags-view-item"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path || '', query: tag.query, fullPath: tag.fullPath } as any"
        @click.middle="!isAffix(tag) && closeSelectedTag(tag)"
        @contextmenu.prevent="openMenu(tag, $event)"
        @click="tag.fullPath === route.fullPath && refreshSelectedTag(route)"
      >
        {{ tag.title }}
        <span
          v-if="!isAffix(tag)"
          class="icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        >&#10008;
        </span>
      </router-link>
    </ScrollPane>
    <ul
      v-show="visible"
      :style="{left: left + 'px',top: top + 'px'}"
      class="contextmenu"
    >
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li
        v-if="!isAffix(selectedTag)"
        @click="closeSelectedTag(selectedTag)"
      >
        关闭
      </li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags(selectedTag)">关闭所有</li>
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

watch(
  () => route.path,
  () => {
    addTags()
    moveToCurrentTag()
  }
)

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

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 6px;
        }
      }

      .icon-close {
        width: 16px;
        height: 16px;
        padding: 0 4px;
        border-radius: 50%;
        text-align: center;
        transition: all .3s cubic-bezier(.645, .045, .355, 1);
        transform-origin: 100% 50%;
        &:before {
          transform: scale(.6);
          display: inline-block;
          vertical-align: -3px;
        }
        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
