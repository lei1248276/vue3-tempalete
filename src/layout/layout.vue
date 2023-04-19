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

      <Sidebar />

      <div
        :class="{hasTagsView: settingsStore.tagsView}"
        class="main-container"
      >
        <div :class="{'fixed-header': settingsStore.fixedHeader}">
          <navbar />

          <TagsView v-if="settingsStore.tagsView" />
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
import { Navbar, Sidebar, AppMain, TagsView } from './components'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'// !中文包
import ResizeHandler from '@/layout/mixin/ResizeHandler'
ResizeHandler()

const appStore = useAppStore()
const settingsStore = useSettingsStore()

const classObj = computed(() => ({
  'sidebar--hide': !appStore.sidebar.opened,
  'sidebar--open': appStore.sidebar.opened,
  'without-animation': appStore.sidebar.withoutAnimation,
  mobile: appStore.device === 'mobile'
}))

const handleClickOutside = () => { appStore.closeSideBar(false) }
</script>

<style lang="scss">
  #app {
    .main-container {
      min-height: 100%;
      transition: margin-left .28s;
      margin-left: var(--sideBarWidth);
      position: relative;
    }

    .sidebar--hide{
      .sidebar-container {
        width: 54px !important;
      }

      .main-container {
        margin-left: 54px;
      }
    }

    // mobile responsive
    .mobile {
      .main-container {
        margin-left: 0px;
      }

      .sidebar-container {
        transition: transform .28s;
        width: var(--sideBarWidth) !important;
      }

      &.sidebar--hide {
        .sidebar-container {
          pointer-events: none;
          transition-duration: 0.3s;
          transform: translate3d(-var(--sideBarWidth), 0, 0);
        }
      }
    }

    .without-animation {
      .main-container,
      .sidebar-container {
        transition: none;
      }
    }
  }
</style>

<style lang="scss" scoped>
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.sidebar--open{
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
    width: calc(100% - #{var(--sideBarWidth)});
    transition: width 0.28s;
  }

  .sidebar--hide .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
