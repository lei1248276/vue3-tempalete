<template>
  <div :class="{'has-logo': showLogo}">
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
