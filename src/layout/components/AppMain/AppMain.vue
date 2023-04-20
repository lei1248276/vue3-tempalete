<template>
  <section class="app-main">
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
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
    background-color: #F0F2F5;
  }

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
