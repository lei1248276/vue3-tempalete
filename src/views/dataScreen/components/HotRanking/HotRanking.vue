<template>
  <div class="relative w-[390px] h-[320px] mt-5 bg-[url(@/views/dataScreen/images/chart-bg-top.png)] bg-[length:100%_100%] bg-no-repeat before:content-['热门景区排行'] before:text-white before:text-lg after:w-[68px] after:h-[7px] after:bg-[url(@/views/dataScreen/images/title.png)] after:bg-[length:100%_100%] after:bg-no-repeat after:absolute after:top-8 after:left-0">
    <div class="w-[90%] h-[36px] mx-auto mt-7 bg-[url(@/views/dataScreen/images/rankingChart-bg.png)] bg-[length:100%_100%] bg-no-repeat flex items-center text-[#fdbc52] text-sm font-bold">
      <span class="flex-[2.5] text-center">排名</span>
      <span class="flex-[2.5] text-left indent-4">景区</span>
      <span class="flex-[5] text-left indent-4">预约数量</span>
    </div>

    <ranking-chart />
  </div>
</template>

<script setup lang="ts">
import RankingChart from './components/RankingChart/RankingChart.vue'

defineOptions({
  name: 'HotRanking'
})
</script>
