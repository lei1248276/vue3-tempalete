<template>
  <div class="page-container">
    <panel-group />

    <div class="relative flex justify-between gap-x-24 mt-14 after:content-['库存信息'] after:absolute after:-top-10 after:left-0 after:text-[18px] after:font-bold after:text-[#333]">
      <pie-chart
        class="flex-1 bg-white-1 p-5"
        class-name="pie1"
      />
      <img
        class="w-[470px] h-[300px]"
        src="@/assets/analyze.png"
      >
    </div>

    <div class="relative bg-white-1 mt-14 p-5 text-[#333] after:content-['销售概况'] after:absolute after:-top-10 after:left-0 after:text-[18px] after:font-bold after:text-[#333]">
      <line-chart
        class-name="line1"
        :chart-data="chartData.newVisitis"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import PanelGroup from './components/PanelGroup.vue'
import LineChart from './components/LineChart.vue'
import PieChart from './components/PieChart.vue'

defineOptions({
  name: 'Dashboard'
})

const chartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130, 91, 154, 162, 140, 130]
  }
}
</script>
