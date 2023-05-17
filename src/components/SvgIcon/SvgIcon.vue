<template>
  <div
    v-if="isExternal(iconClass)"
    :style="{
      'mask': `url(${iconClass}) no-repeat 50% 50%`,
      '-webkit-mask': `url(${iconClass}) no-repeat 50% 50%`
    }"
    class="svg-icon w-[18px] h-[18px] fill-current shrink-0 bg-current inline-block"
    v-on="$attrs"
  />
  <svg
    v-else
    :class="className"
    class="svg-icon w-[18px] h-[18px] fill-current shrink-0"
    aria-hidden="true"
    v-on="$attrs"
  >
    <use :href="`#icon-${iconClass}`" />
  </svg>
</template>

<script lang="ts">
export default {
  name: 'SvgIcon'
}
</script>

<script setup lang="ts">
import { isExternal } from '@/utils/validate'

defineProps<{
  iconClass: string
  className?: string
}>()
</script>
