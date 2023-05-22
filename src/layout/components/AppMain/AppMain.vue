<template>
  <section
    :class="{
      'pt-[50px]': settingsStore.fixedHeader,
      '!pt-[84px]': settingsStore.fixedHeader && settingsStore.tagsView
    }"
    class="grow w-full bg-white-bg relative overflow-hidden"
  >
    <router-view v-slot="{ Component }">
      <transition
        name="fade-transform"
        mode="out-in"
        appear
      >
        <keep-alive :include="views">
          <component :is="Component" />
        </keep-alive>
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
const views = computed(() => ['Nested', ...tagsViewStore.cachedViews])
</script>
