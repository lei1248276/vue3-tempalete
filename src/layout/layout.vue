<template>
  <ElConfigProvider :locale="zhCn">
    <div
      :class="classObj"
      class="app-wrapper relative w-full h-full clearfix"
    >
      <div
        v-if="appStore.device === 'mobile' && appStore.sidebar.opened"
        class="bg-[#000] bg-opacity-30 w-full h-full absolute top-0 z-50"
        @click="appStore.closeSideBar(false)"
      />

      <Sidebar class="sidebar-container" />

      <div
        :class="{hasTagsView: settingsStore.tagsView}"
        class="main-container min-h-screen flex flex-col transition-[margin-left] duration-300 ml-[var(--sideBarWidth)] relative"
      >
        <div :class="{'fixed-header': settingsStore.fixedHeader}">
          <Navbar />

          <TagsView v-if="settingsStore.tagsView" />
        </div>

        <AppMain />
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
import useResizeHandler from './hooks/ResizeHandler'
useResizeHandler()

const appStore = useAppStore()
const settingsStore = useSettingsStore()

const classObj = computed(() => ({
  'sidebar--hide': !appStore.sidebar.opened,
  'sidebar--open': appStore.sidebar.opened,
  'without-animation': appStore.sidebar.withoutAnimation,
  'mobile': appStore.device === 'mobile'
}))
</script>

<style lang="scss">
#app {
  .sidebar--hide{
    .sidebar-container {
      width: 54px !important;
    }
  }

  // mobile responsive
  .mobile {
    .sidebar-container {
      transition: transform .28s;
      width: var(--sideBarWidth) !important;
    }
  }
  .mobile.sidebar--hide {
    .sidebar-container {
      pointer-events: none;
      transition-duration: 0.3s;
      transform: translate3d(calc(0px - var(--sideBarWidth)), 0, 0);
    }
  }

  .without-animation {
    .sidebar-container {
      transition: none;
    }
  }
}
</style>

<style lang="scss" scoped>
.app-wrapper.mobile.sidebar--open {
  position: fixed;
  top: 0;
}

.sidebar--hide{
  .main-container {
    margin-left: 54px;
  }
}

.mobile {
  .main-container {
    margin-left: 0px;
  }
}

.without-animation {
  .main-container {
    transition: none;
  }
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - var(--sideBarWidth));
  transition: width 0.28s;
}

.sidebar--hide .fixed-header {
  width: calc(100% - 54px)
}

.mobile .fixed-header {
  width: 100%;
}
</style>
