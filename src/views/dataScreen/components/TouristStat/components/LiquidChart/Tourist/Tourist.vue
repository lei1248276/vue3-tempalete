<template>
  <div class="text-right text-sm text-white font-[PingFangSC] mr-1">可预约总量<i class="text-[#ff8100] mx-1">999999</i>人</div>

  <div class="mt-2 flex justify-center items-center gap-[1px]">
    <span
      v-for="(item, index) in touristCount.split('')"
      :key="index"
      class="w-[52px] h-[50px] bg-[url(@/views/dataScreen/images/total.png)] bg-[length:100%_100%] bg-no-repeat text-[36px] text-[#66ffff] text-center"
    >{{ item }}</span>
  </div>
</template>

<script setup lang="ts">
const touristCount = ref('216908人')

const timer = setInterval(() => {
  touristCount.value = parseInt(touristCount.value, 10) + Math.floor(Math.random() * 100) + '人'
}, 5000)

onUnmounted(() => { clearInterval(timer) })
</script>
