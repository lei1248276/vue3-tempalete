<template>
  <div class="page-container mid flex gap-3 flex-wrap">
    <div
      v-for="(icon, index) in icons"
      :key="index"
    >
      <svg-icon
        :icon-class="icon"
        class-name="w-10 h-10 mx-auto"
      />
      <p class="text-center">{{ icon }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Icon'
})

const icons = Object.keys(import.meta.glob('@/icons/svg/*.svg'))
  .map(path => path.split('/').pop()?.replace('.svg', '')) as string[]
console.log('🚀 ~ file: icon.vue:18 ~ icons:', icons)

</script>
