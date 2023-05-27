<template>
  <div class="relative w-[390px] h-[246px] mt-5 bg-[url(@/views/dataScreen/images/chart-bg-bottom.png)] bg-[length:100%_100%] bg-no-repeat before:content-['年龄比例'] before:text-white before:text-lg after:w-[68px] after:h-[7px] after:bg-[url(@/views/dataScreen/images/title.png)] after:bg-[length:100%_100%] after:bg-no-repeat after:absolute after:top-8 after:left-0">
    <age-radio-chart />
  </div>
</template>

<script setup lang="ts">
import AgeRadioChart from './components/AgeRadioChart/AgeRadioChart.vue'

defineOptions({
  name: 'AgeRadio'
})
</script>
