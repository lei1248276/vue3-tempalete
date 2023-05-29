<template>
  <ElConfigProvider :locale="zhCn">
    <div
      :class="{ 'fixed top-0': isMobile && appStore.sidebar.opened }"
      class="w-full h-full"
    >
      <div
        v-if="isMobile && appStore.sidebar.opened"
        class="bg-[#000] bg-opacity-30 w-full h-full absolute top-0 z-50"
        @click="appStore.closeSideBar(false)"
      />

      <Sidebar />

      <div
        :class="{
          '!ml-0': isMobile,
          '!ml-[54px]': !appStore.sidebar.opened && !isMobile,
          '!duration-0': appStore.sidebar.withoutAnimation
        }"
        class="min-h-screen flex flex-col transition-[margin-left] duration-300 ml-[var(--sideBarWidth)] relative"
      >
        <div
          :class="{
            'fixed top-0 right-0 z-10 w-[calc(100%_-_var(--sideBarWidth))] transition-[width] duration-300': settingsStore.fixedHeader,
            '!w-[calc(100%_-_54px)]': !appStore.sidebar.opened && settingsStore.fixedHeader,
            '!w-full': isMobile,
            '!duration-0': appStore.sidebar.withoutAnimation
          }"
        >
          <Navbar />

          <TagsView v-show="settingsStore.tagsView" />
        </div>

        <AppMain />
      </div>
    </div>
  </ElConfigProvider>
</template>

<script setup lang="ts">
import { Navbar, Sidebar, AppMain, TagsView } from './components'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'// !中文包
import useResizeHandler from './hooks/ResizeHandler'

defineOptions({
  name: 'Layout'
})

useResizeHandler()

const appStore = useAppStore()
const settingsStore = useSettingsStore()

const isMobile = computed(() => appStore.device === 'mobile')
</script>
