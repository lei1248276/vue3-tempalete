<template>
  <section
    :class="{
      'pt-[50px]': settingsStore.fixedHeader,
      '!pt-[84px]': settingsStore.fixedHeader && settingsStore.tagsView
    }"
    class="grow w-full bg-white-bg relative overflow-hidden"
  >
    <route-page />
  </section>
</template>

<script lang="ts">
export default {
  name: 'AppMain'
}
</script>

<script setup lang="ts">
import { NestedView as RoutePage } from '@/layout/components'

const settingsStore = useSettingsStore()
</script>
