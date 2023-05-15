<template>
  <section class="app-main grow w-full bg-white-bg relative overflow-hidden">
    <router-view
      v-slot="{ Component }"
      :key="route.path"
    >
      <transition
        name="fade-transform"
        mode="out-in"
        appear
      >
        <keep-alive
          v-if="settingsStore.keepAlive"
          :include="tagsViewStore.cachedViews"
        >
          <component :is="Component" />
        </keep-alive>

        <component
          :is="Component"
          v-else
        />
      </transition>
    </router-view>
  </section>
</template>

<script lang="ts">
export default {
  name: 'AppMain'
}
</script>

<script setup lang="ts">
const route = useRoute()
const tagsViewStore = useTagsViewStore()
const settingsStore = useSettingsStore()
</script>

<style scoped lang="scss">
.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
