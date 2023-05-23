<template>
  <div>
    <!-- ! 用于多级嵌套路由时（为了解决多级情况下keep-alive缓存问题） -->
    <router-view v-slot="{ Component }">
      <transition
        name="fade-transform"
        mode="out-in"
        appear
      >
        <keep-alive :include="tagsViewStore.cachedViews">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'NestedView'
})

const tagsViewStore = useTagsViewStore()
</script>
