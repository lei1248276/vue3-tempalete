<template>
  <div>
    <div class="m-[15px] bg-white rounded-[10px] pt-[15px] pb-[40px] px-[20px]">
      <p class="text-[#333] font-bold">账单统计</p>

      <div class="mt-2 flex justify-center items-center gap-x-[205px]">
        <BillCard
          icon-name="order-total.png"
          color="#ebf0fe"
          text="总订单数"
          count="2，563"
        />
        <BillCard
          icon-name="order-price.png"
          color="#ECF9FF"
          text="订单总金额"
          count="149，966"
        />
        <BillCard
          icon-name="subsidy.png"
          color="#FFF6ED"
          text="补贴总金额(元)"
          count="149，966"
        />
        <BillCard
          icon-name="service.png"
          color="#FFEFEF"
          text="服务商数"
          count="12"
        />
      </div>
    </div>

    <div class="m-[15px] p-[25px] pb-[170px] bg-white rounded-[10px]">
      <div class="flex items-center space-x-[40px] mb-[25px]">
        <el-button
          class="w-[84px] h-[44px] rounded-[20px_20px_20px_4px] text-[18px]"
          color="#517EFF"
        >
          未对账
        </el-button>
        <el-button
          class="text-[#333] text-[18px] p-0"
          type=""
          text
        >
          已对账
        </el-button>
      </div>

      <JTable
        :data="table"
        :column-props="column"
      >
        <el-table-column
          label="操作"
          width="200"
        >
          <div class="space-x-[15px]">
            <span class="text-[#2F69E6] text-sm cursor-pointer">对账</span>
            <span class="text-[#2F69E6] text-sm cursor-pointer">查看详情</span>
          </div>
        </el-table-column>
      </JTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ColumnProps } from '@/components/JTable/JTable.vue'
import BillCard from './components/BillCard.vue'

defineOptions({
  name: 'Bill'
})

const table = ref([
  { 1: '建桥办事处', 2: 7200, 3: 300, 4: 1300 },
  { 1: '建桥办事处', 2: 7200, 3: 300, 4: 1300 },
  { 1: '建桥办事处', 2: 7200, 3: 300, 4: 1300 },
  { 1: '建桥办事处', 2: 7200, 3: 300, 4: 1300 }
])
const column: ColumnProps[] = [
  { type: 'index', label: '序号', minWidth: '50' },
  { prop: '1', label: '街道名称' },
  { prop: '2', label: '订单总金额（元）' },
  { prop: '3', label: '订单总数' },
  { prop: '4', label: '补贴总金额（元）' }
]
</script>
