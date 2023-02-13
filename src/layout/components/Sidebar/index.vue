<template>
  <div :class="{'has-logo':showLogo}">
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
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
const store = useStore()
const route = useRoute()

const sidebar = computed(() => store.getters.sidebar)
const showingRoutes = computed(() => store.getters.permission_routes.filter((route) => !route.meta.hidden))
// ! if set path, the sidebar will highlight the path you set
const activeMenu = computed(() => route.meta.activeMenu || route.path)
const showLogo = computed(() => store.state.settings.sidebarLogo)
const isCollapse = computed(() => !sidebar.value.opened)
</script>
