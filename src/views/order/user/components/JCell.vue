<template>
  <div class="flex items-center gap-x-[5px]">
    <SvgIcon
      :icon-class="icon"
      class-name="w-[14px] h-[14px]"
    />
    <span class="text-[#517EFF] text-sm whitespace-nowrap">{{ value }}</span>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'JCell'
})

defineProps<{
  value: string
  icon: string
}>()
</script>
