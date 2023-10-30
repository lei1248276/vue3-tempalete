<template>
  <div class="relative w-[390px] h-[250px] mt-5 bg-[url(@/views/dataScreen/images/chart-bg-middle.png)] bg-[length:100%_100%] bg-no-repeat before:content-['男女比例'] before:text-white before:text-lg after:w-[68px] after:h-[7px] after:bg-[url(@/views/dataScreen/images/title.png)] after:bg-[length:100%_100%] after:bg-no-repeat after:absolute after:top-8 after:left-0">
    <div class="mt-8 mx-[65px] flex justify-between items-center">
      <div class="relative w-[111px] h-[116px] bg-[url(@/views/dataScreen/images/man-bg.png)] bg-[length:100%_100%] bg-no-repeat before:content-['男士'] before:mid before:top-2.5 before:text-white before:text-sm after:w-[60px] after:h-[64px] after:bg-[url(@/views/dataScreen/images/man.png)] after:bg-[length:100%_100%] after:bg-no-repeat after:mid" />

      <div class="relative w-[111px] h-[116px] bg-[url(@/views/dataScreen/images/woman-bg.png)] bg-[length:100%_100%] bg-no-repeat before:content-['女士'] before:mid before:top-2.5 before:text-white before:text-sm after:w-[60px] after:h-[64px] after:bg-[url(@/views/dataScreen/images/woman.png)] after:bg-[length:100%_100%] after:bg-no-repeat after:mid" />
    </div>

    <radio-chart />
  </div>
</template>

<script setup lang="ts">
import RadioChart from './components/RadioChart/RadioChart.vue'

defineOptions({
  name: 'GenderRadio'
})
</script>
