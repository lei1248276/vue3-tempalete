<template>
  <div>
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
  name: 'Nested'
})

const tagsViewStore = useTagsViewStore()
</script>
