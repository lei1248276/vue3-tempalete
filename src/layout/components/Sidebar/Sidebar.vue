<template>
  <div
    :class="{
      'has-logo': showLogo,
      '!w-[54px]': !appStore.sidebar.opened && !isMobile,
      '-translate-x-full': !appStore.sidebar.opened && isMobile,
      '!duration-0': appStore.sidebar.withoutAnimation
    }"
    class="sidebar-container w-[var(--sideBarWidth)] h-full bg-[var(--menuBg)] fixed top-0 left-0 bottom-0 z-50 text-[0] overflow-hidden transition-[transform,width] duration-300 transform-gpu"
  >
    <Logo
      v-if="showLogo"
      :collapse="isCollapse"
    />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :collapse-transition="false"
        mode="vertical"
        unique-opened
      >
        <SidebarItem
          v-for="routes in showingRoutes"
          :key="routes.path"
          :item="routes"
          :base-path="routes.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Sidebar'
}
</script>

<script setup lang="ts">
import Logo from './components/Logo.vue'
import SidebarItem from './components/SidebarItem.vue'

const route = useRoute()
const appStore = useAppStore()
const settingsStore = useSettingsStore()
const permissionStore = usePermissionStore()

const showingRoutes = computed(() => permissionStore.routes.filter((route) => !route?.meta?.hidden))
const activeMenu = computed(() => route.path)
const showLogo = computed(() => settingsStore.sidebarLogo)
const isCollapse = computed(() => !appStore.sidebar.opened)
const isMobile = computed(() => appStore.device === 'mobile')
</script>

<style lang="scss">
// * 重置 element-plus css
.sidebar-container {
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
  }

  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar__bar.is-vertical {
    right: 0px;
  }

  .el-scrollbar {
    height: 100%;
  }

  &.has-logo {
    .el-scrollbar {
      height: calc(100% - 50px);
    }
  }

  .is-horizontal {
    display: none;
  }

  a {
    display: inline-block;
    width: 100%;
  }

  .svg-icon {
    margin-right: 20px;
  }

  .sub-el-icon {
    margin-right: 20px;
  }

  .el-menu {
    border: none;
    height: 100%;
    width: 100% !important;
    .is-active{
      background-color: var(--subMenuActiveBg) !important;
    }
  }

  // menu hover
  .submenu-title-noDropdown,
  .el-sub-menu__title {
    &:hover {
      background-color: var(--subMenuHover) !important;
    }
  }

  .is-active>.el-sub-menu__title {
    color: var(--menuActiveText) !important;
    background-color: var(--subMenuBg) !important;
  }

  & .el-sub-menu>.el-sub-menu__title,
  & .el-menu-item {
    color: var(--subMenuText);
    background-color: var(--subMenuBg) !important;

    &.is-active{
      color: var(--subMenuActiveText) !important;
      background-color: var(--subMenuActiveBg) !important;
    }

    &:hover {
      background-color: var(--subMenuHover) !important;
    }
  }
}

// when menu collapsed
.el-popper{
  .el-menu--vertical {
    &>.el-menu {
      background-color: var(--subMenuBg) !important;
      padding: 0;
      .svg-icon {
        margin-right: 16px;
      }
      .sub-el-icon {
        margin-right: 12px;
        margin-left: -2px;
      }
    }

    .el-sub-menu>.el-sub-menu__title,
    .el-menu-item {
      color: var(--subMenuText);
      background-color: var(--subMenuBg) !important;

      &.is-active{
        color: var(--subMenuActiveText) !important;
        background-color: var(--subMenuActiveBg) !important;
      }

      &:hover {
        background-color: var(--subMenuHover) !important;
      }
    }

    >.el-menu--popup {
      @include scrollBar;
    }
  }
}
</style>
