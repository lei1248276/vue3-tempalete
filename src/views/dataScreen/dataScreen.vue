<template>
  <div
    class="bg-[url(@/views/dataScreen/images/bg.png)] bg-cover bg-no-repeat fixed top-0 right-0 left-0 bottom-0 z-50 font-[YouSheBiaoTiHei] "
  >
    <div
      class="w-full h-full relative transform-gpu transition-transform"
      :style="{transform: `scale(${scale})`}"
    >
      <div class="mid flex flex-wrap justify-center content-start ">
        <navbar />
        <div class="-mt-24">
          <tourist-stat />
          <gender-radio />
          <age-radio />
        </div>

        <div class="flex flex-col justify-between mx-8">
          <scenic-area />
          <predictive-chart />
        </div>

        <div class="-mt-24">
          <hot-ranking />
          <annual />
          <reserve-stat />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Navbar,
  TouristStat,
  GenderRadio,
  AgeRadio,
  ScenicArea,
  PredictiveChart,
  HotRanking,
  Annual,
  ReserveStat
} from './components'

defineOptions({
  name: 'DataScreen'
})

/* 根据浏览器大小推断缩放比例 */
const getScale = (width = 1920, height = 1080) => {
  const ww = window.innerWidth / width
  const wh = window.innerHeight / height
  return ww < wh ? ww : wh
}

const { width, height } = useWindowSize()
const scale = ref(1)

watch([width, height], () => {
  scale.value = getScale() + 0.06
}, { immediate: true })
</script>

<style scoped lang="scss">
@font-face {
	font-family: YouSheBiaoTiHei;
	src: url("./assets/YouSheBiaoTiHei.ttf");
}
</style>
