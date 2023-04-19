<template>
  <div
    :class="{'has-logo': showLogo}"
    class="sidebar-container"
  >
    <logo
      v-if="showLogo"
      :collapse="isCollapse"
    />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
        unique-opened
      >
        <sidebar-item
          v-for="routes in showingRoutes"
          :key="routes.path"
          :item="routes"
          :base-path="routes.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'Sidebar'
}
</script>

<script setup>
import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'
import variables from '@/styles/variables.module.scss'

const route = useRoute()
const appStore = useAppStore()
const settingsStore = useSettingsStore()
const permissionStore = usePermissionStore()

const showingRoutes = computed(() => permissionStore.routes.filter((route) => !route?.meta?.hidden))
// ! if set path, the sidebar will highlight the path you set
const activeMenu = computed(() => route?.meta?.activeMenu || route.path)
const showLogo = computed(() => settingsStore.sidebarLogo)
const isCollapse = computed(() => !appStore.sidebar.opened)
</script>

<style lang="scss">
@import "@/styles/variables.module.scss";

#app {
  .sidebar-container {
    transition: width 0.28s;
    width: $sideBarWidth !important;
    background-color: $menuBg;
    height: 100%;
    position: fixed;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;

    // reset element-ui css
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
        background-color: $subMenuActiveBg !important;
      }
    }

    // menu hover
    .submenu-title-noDropdown,
    .el-sub-menu__title {
      &:hover {
        background-color: $subMenuHover !important;
      }
    }

    .is-active>.el-sub-menu__title {
      color: $menuActiveText !important;
      background-color: $subMenuBg !important;
    }

    & .el-sub-menu>.el-sub-menu__title,
    & .el-menu-item {
      color: $subMenuText;
      background-color: $subMenuBg !important;

      &.is-active{
        color: $subMenuActiveText !important;
        background-color: $subMenuActiveBg !important;
      }

      &:hover {
        background-color: $subMenuHover !important;
      }
    }
  }
}

// when menu collapsed
.el-menu--vertical {
  &>.el-menu {
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
    &:hover {
      background-color: $subMenuHover !important;
    }
  }

  >.el-menu--popup {
    &::-webkit-scrollbar-track-piece {
      background: #d3dce6;
    }

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background: #99a9bf;
      border-radius: 20px;
    }
  }
}
</style>
