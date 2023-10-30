<template>
  <div class="relative w-[390px] h-[250px] mt-5 bg-[url(@/views/dataScreen/images/chart-bg-middle.png)] bg-[length:100%_100%] bg-no-repeat before:content-['年度游客量对比'] before:text-white before:text-lg after:w-[68px] after:h-[7px] after:bg-[url(@/views/dataScreen/images/title.png)] after:bg-[length:100%_100%] after:bg-no-repeat after:absolute after:top-8 after:left-0">
    <annual-chart />
  </div>
</template>

<script setup lang="ts">
import AnnualChart from './components/AnnualChart/AnnualChart.vue'

defineOptions({
  name: 'Annual'
})
</script>
