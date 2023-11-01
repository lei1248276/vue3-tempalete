<template>
  <div
    class="relative w-[236px] h-[120px] flex"
    :style="{color}"
  >
    <SvgIcon
      icon-class="bill-card-bg"
      class-name="absolute top-0 right-0 bottom-0 left-0 w-full h-full"
    />
    <img
      :src="transImg(iconName)"
      class="w-[72px] h-[72px] relative left-[10px] top-[16px]"
    >
    <div class="ml-[17px] mt-[35px] relative text-[#00003F]">
      <span class="block text-lg mb-2">{{ text }}</span>
      <span class="text-[24px] font-bold">{{ count }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'BillCard'
})

defineProps<{
  iconName: string
  text: string
  color: string
  count: number | string
}>()

function transImg(iconPath: string) {
  return new URL(`/src/icons/svg/bill/${iconPath}`, import.meta.url).href
}
</script>
