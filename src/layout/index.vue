<template>
  <ElConfigProvider :locale="zhCn">
    <div
      :class="classObj"
      class="app-wrapper"
    >
      <div
        v-if="appStore.device === 'mobile' && appStore.sidebar.opened"
        class="drawer-bg"
        @click="handleClickOutside"
      />
      <sidebar class="sidebar-container" />
      <div
        :class="{hasTagsView: settingsStore.tagsView}"
        class="main-container"
      >
        <div :class="{'fixed-header': settingsStore.fixedHeader}">
          <navbar />
          <tags-view v-if="settingsStore.tagsView" />
        </div>
        <app-main />
      </div>
    </div>
  </ElConfigProvider>
</template>

<script lang="ts">
export default {
  name: 'Layout'
}
</script>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'// !中文包

import { Navbar, Sidebar, AppMain, TagsView } from './components'
import { useAppStore, useSettingsStore } from '@/store'
import ResizeHandler from '@/layout/mixin/ResizeHandler'
ResizeHandler()

const appStore = useAppStore()
const settingsStore = useSettingsStore()

const classObj = computed(() => ({
  hideSidebar: !appStore.sidebar.opened,
  openSidebar: appStore.sidebar.opened,
  withoutAnimation: appStore.sidebar.withoutAnimation,
  mobile: appStore.device === 'mobile'
}))

const handleClickOutside = () => {
  appStore.closeSideBar(false)
}
</script>

<style lang="scss" scoped>
  @import "@/styles/variables.module.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
