<template>
  <section class="app-main">
    <!--   ! 开发时使用会造成热更新失效   -->
    <router-view
      v-slot="{ Component }"
      :key="key"
    >
      <transition
        name="fade-transform"
        mode="out-in"
        appear
      >
        <keep-alive
          v-if="keepAlive"
          :include="cachedViews"
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

<script>
export default {
  name: 'AppMain'
}
</script>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
import { useStore } from 'vuex'
const store = useStore()

const cachedViews = computed(() => store.state.tagsView.cachedViews)
const key = computed(() => route.path)
const keepAlive = computed(() => store.state.settings.keepAlive)
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
