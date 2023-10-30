<template>
  <div class="relative w-[390px] h-[320px] mt-5 bg-[url(@/views/dataScreen/images/chart-bg-top.png)] bg-[length:100%_100%] bg-no-repeat before:content-['实时游客统计'] before:text-white before:text-lg after:w-[68px] after:h-[7px] after:bg-[url(@/views/dataScreen/images/title.png)] after:bg-[length:100%_100%] after:bg-no-repeat after:absolute after:top-8 after:left-0">
    <tourist />

    <liquid-chart />
  </div>
</template>

<script setup lang="ts">
import LiquidChart from './components/LiquidChart/LiquidChart.vue'
import Tourist from './components/LiquidChart/Tourist/Tourist.vue'

defineOptions({
  name: 'TouristStat'
})
</script>
