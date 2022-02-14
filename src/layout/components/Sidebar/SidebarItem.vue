<template v-if="!item.hidden">
  <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
    <el-menu-item
      v-if="onlyOneChild.meta"
      :index="resolvePath(onlyOneChild.path)"
      :class="{'submenu-title-noDropdown':!isNest}"
      @click="toMenuRoute(resolvePath(onlyOneChild.path))"
    >
      <svg-icon :icon-class="onlyOneChild.meta.icon || item.meta.icon || ''" />
      <template #title>{{ onlyOneChild.meta.title }}</template>
    </el-menu-item>
  </template>

  <el-sub-menu
    v-else
    ref="subMenu"
    :index="resolvePath(item.path)"
    popper-append-to-body
  >
    <template #title>
      <svg-icon :icon-class="item.meta.icon || ''" />
      <span>{{ item.meta.title }}</span>
    </template>
    <sidebar-item
      v-for="child in item.children"
      :key="child.path"
      :is-nest="true"
      :item="child"
      :base-path="resolvePath(child.path)"
      class="nest-menu"
    />
  </el-sub-menu>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {
      // onlyOneChild: null
    }
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) return routePath

      if (isExternal(this.basePath)) return this.basePath

      return path.resolve(this.basePath, routePath)
    },
    toMenuRoute(path) {
      isExternal(path) ? window.open(path) : this.$router.push(path)
    }
  }
}
</script>
