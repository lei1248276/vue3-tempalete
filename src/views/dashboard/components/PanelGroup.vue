<template>
  <div class="relative mt-5 mb-10 pt-5 flex flex-wrap items-center gap-x-10 gap-y-14">
    <div class="relative max-2xl:w-[46%] max-md:w-full w-[23%] h-[180px] bg-[#DFE4F6] cursor-pointer after:content-['当月数据'] after:absolute after:-top-10 after:left-0 after:text-[18px] after:font-bold after:text-black">
      <div class="flex flex-col gap-y-5 font-bold mt-[34px] ml-[34px] mr-[48px]">
        <div class="text-[#666] before:inline-block before:align-text-top before:w-4 before:h-4 before:rounded-full before:bg-[#738FEE]">
          本月收入（元）
        </div>
        <count-to
          :start-val="0"
          :end-val="102400"
          :duration="2600"
          class="text-4xl text-black"
        />
      </div>

      <div class="absolute bottom-0 right-0 w-[100px] h-[68px] rounded py-3 px-7 bg-[#738FEE] text-white before:absolute before:left-[-17px] before:bottom-0 before:w-[17px] before:h-[54px] before:bg-[#bfcaf4] before:rounded-tl before:rounded-bl">
        <svg-icon
          icon-class="icon_income"
          class-name="w-10 h-10"
        />
      </div>
    </div>

    <div class="relative max-2xl:w-[46%] max-md:w-full w-[23%] h-[180px] bg-[#F9E8E1] cursor-pointer">
      <div class="flex flex-col gap-y-5 font-bold mt-[34px] ml-[34px] mr-[48px]">
        <div class="text-[#666] before:inline-block before:align-text-top before:w-4 before:h-4 before:mr-1 before:rounded-full before:bg-[#F18E62]">
          本月订单数（笔）
        </div>
        <count-to
          :start-val="0"
          :end-val="81212"
          :duration="3000"
          class="text-4xl text-black"
        />
      </div>

      <div class="absolute bottom-0 right-0 w-[100px] h-[68px] rounded py-3 px-7 bg-[#F18E62] text-white before:absolute before:left-[-17px] before:bottom-0 before:w-[17px] before:h-[54px] before:bg-[#f7cdba] before:rounded-tl before:rounded-bl">
        <svg-icon
          icon-class="icon_order"
          class-name="w-10 h-10"
        />
      </div>
    </div>

    <div class="relative max-2xl:w-[46%] max-md:w-full w-[23%] h-[180px] bg-white cursor-pointer before:absolute before:left-0 before:w-2 before:h-[180px] before:bg-[#738FEE] before:rounded-tl before:rounded-bl after:content-['历史数据'] after:absolute after:-top-10 after:left-0 after:text-[18px] after:font-bold after:text-black">
      <div class="flex flex-col gap-y-5 font-bold mt-[34px] ml-[34px] mr-[48px]">
        <div class="text-[#666]">
          累计收入（元）
        </div>
        <count-to
          :start-val="0"
          :end-val="9280"
          :duration="3200"
          class="text-4xl text-black"
        />
        <div class="absolute top-[23%] right-[12%] w-[100px] h-[68px] rounded py-3 px-7">
          <svg-icon
            icon-class="icon_total_income"
            class-name="w-[60px] h-[60px]"
          />
        </div>
      </div>
    </div>

    <div class="relative max-2xl:w-[46%] max-md:w-full w-[23%] h-[180px] bg-white cursor-pointer before:absolute before:left-0 before:w-2 before:h-[180px] before:bg-[#F18E62] before:rounded-tl before:rounded-bl">
      <div class="flex flex-col gap-y-5 font-bold mt-[34px] ml-[34px] mr-[48px]">
        <div class="text-[#666]">
          累计订单数（笔）
        </div>
        <count-to
          :start-val="0"
          :end-val="13600"
          :duration="3600"
          class="text-4xl text-black"
        />
        <div class="absolute top-[23%] right-[12%] w-[100px] h-[68px] rounded py-3 px-7">
          <svg-icon
            icon-class="icon_total_order"
            class-name="w-[60px] h-[60px]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CountTo } from 'vue3-count-to'

defineOptions({
  name: 'PanelGroup'
})

</script>
