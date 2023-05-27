<template>
  <div class="h-[126px] flex text-[#29fcff] font-normal">
    <div class="w-[564px] h-9 bg-[url(@/views/dataScreen/images/header-left-bg.png)] bg-[length:100%_100%] bg-no-repeat text-right">
      <span
        class="inline-block w-[135px] h-[42px] leading-[42px] bg-[url(@/views/dataScreen/images/header-btn-bg-l.png)] bg-[length:100%_100%] bg-no-repeat text-[18px] text-center cursor-pointer"
        @click="router.back()"
      >返回</span>
    </div>

    <div class="w-[793px] h-[82px] bg-[url(@/views/dataScreen/images/header-center-bg.png)] bg-[length:100%_100%] bg-no-repeat">
      <div class="text-center leading-[82px] text-[32px]">智慧旅游可视化大数据展示平台</div>
      <div class="w-[622px] h-[44px] leading-[44px] mx-auto bg-[url(@/views/dataScreen/images/header-warn-bg.png)] bg-[length:100%_100%] bg-no-repeat text-center text-[14px] text-white">平台高峰预警信息（2条）</div>
    </div>

    <div class="flex justify-between items-center w-[564px] h-9 bg-[url(@/views/dataScreen/images/header-left-bg.png)] bg-[length:100%_100%] bg-no-repeat text-left">
      <span class="inline-block w-[135px] h-[42px] leading-[42px] bg-[url(@/views/dataScreen/images/header-btn-bg-r.png)] bg-[length:100%_100%] bg-no-repeat text-[18px] text-center cursor-pointer">统计报告</span>
      <time-screen />
    </div>
  </div>
</template>

<script setup lang="ts">
import TimeScreen from './components/TimeScreen/TimeScreen.vue'

defineOptions({
  name: 'Navbar'
})

const router = useRouter()
</script>
