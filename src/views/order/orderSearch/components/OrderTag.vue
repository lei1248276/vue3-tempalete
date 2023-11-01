<template>
  <div
    v-if="type === '公益'"
    class="bg-[#FFE8E8] w-[84px] h-[24px] text-[#FB4D4D] text-center rounded-[4px_12px_4px_12px] flex items-center"
  >
    <div class="inline-block p-1 mx-1 rounded-full bg-[#FB4D4D]">
      <SvgIcon
        icon-class="icon-benefit"
        class-name="w-[12px] h-[12px]"
      />
    </div>
    <span class="text-xs">公益</span>
  </div>

  <div
    v-else-if="type === '市场化'"
    class="bg-[#E2F8FF] w-[84px] h-[24px] text-[#00BFFF] text-center rounded-[4px_12px_4px_12px] flex items-center"
  >
    <div class="inline-block p-1 mx-1 rounded-full bg-[#00BFFF]">
      <SvgIcon
        icon-class="icon-market"
        class-name="w-[12px] h-[12px]"
      />
    </div>
    <span class="text-xs">市场化</span>
  </div>

  <div
    v-else-if="type === '市级补贴'"
    class="bg-[#E9FBF2] w-[84px] h-[24px] text-[#03AD82] text-center rounded-[4px_12px_4px_12px] flex items-center"
  >
    <div class="inline-block p-1 mx-1 rounded-full bg-[#03AD82]">
      <SvgIcon
        icon-class="icon-city"
        class-name="w-[12px] h-[12px]"
      />
    </div>
    <span class="text-xs">市级补贴</span>
  </div>

  <div
    v-else-if="type === '区级补贴'"
    class="bg-[#D1DFFF] w-[84px] h-[24px] text-[#2F69E6] text-center rounded-[4px_12px_4px_12px] flex items-center"
  >
    <div class="inline-block p-1 mx-1 rounded-full bg-[#2F69E6]">
      <SvgIcon
        icon-class="icon-district"
        class-name="w-[12px] h-[12px]"
      />
    </div>
    <span class="text-xs">区级补贴</span>
  </div>

  <div
    v-else-if="type === '居家补贴'"
    class="bg-[#FFF3DE] w-[84px] h-[24px] text-[#FEA104] text-center rounded-[4px_12px_4px_12px] flex items-center"
  >
    <div class="inline-block p-1 mx-1 rounded-full bg-[#FEA104]">
      <SvgIcon
        icon-class="icon-home"
        class-name="w-[12px] h-[12px]"
      />
    </div>
    <span class="text-xs">居家补贴</span>
  </div>

  <div
    v-else-if="type === '家床补贴'"
    class="bg-[#FFDBCF] w-[84px] h-[24px] text-[#FF6130] text-center rounded-[4px_12px_4px_12px] flex items-center"
  >
    <div class="inline-block p-1 mx-1 rounded-full bg-[#FF6130]">
      <SvgIcon
        icon-class="icon-bed"
        class-name="w-[12px] h-[12px]"
      />
    </div>
    <span class="text-xs">家床补贴</span>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'OrderTag'
})

defineProps<{
  type: '公益' | '市场化' | '市级补贴' | '区级补贴' | '居家补贴' | '家床补贴'
}>()
</script>
