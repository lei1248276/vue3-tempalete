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
          v-for="routes in permission_routes"
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
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import { useStore } from 'vuex'
const store = useStore()
import { useRoute } from 'vue-router'
const route = useRoute()

const sidebar = computed(() => store.getters.sidebar)
const permission_routes = computed(() => store.getters.permission_routes)
// ! if set path, the sidebar will highlight the path you set
const activeMenu = computed(() => route.meta.activeMenu || route.path)
const showLogo = computed(() => store.state.settings.sidebarLogo)
const isCollapse = computed(() => !sidebar.value.opened)
</script>
