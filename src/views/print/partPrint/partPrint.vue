<template>
  <div class="page-container flex">
    <div class="flex-1">
      <el-button
        type="primary"
        @click="usePrint(pieChartRef)"
      >
        打印图表
      </el-button>

      <div ref="pieChartRef">
        <pie-chart />
      </div>

      <el-button
        type="primary"
        @click="usePrint(lineChartRef)"
      >
        打印图表
      </el-button>

      <div ref="lineChartRef">
        <line-chart
          :chart-data="{
            expectedData: [100, 120, 161, 134, 105, 160, 165, 161, 134, 105, 160, 165],
            actualData: [120, 82, 91, 154, 162, 140, 145, 91, 154, 162, 140, 145]
          }"
        />
      </div>
    </div>

    <div class="flex-1">
      <el-button
        type="primary"
        @click="usePrint(tableRef)"
      >
        打印表格
      </el-button>

      <div ref="tableRef">
        <j-table
          :data="table"
          :column-props="column"
          class="w-[1000px]"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ColumnProps } from '@/components/JTable/JTable.vue'
import PieChart from '@/views/dashboard/components/PieChart.vue'
import LineChart from '@/views/dashboard/components/LineChart.vue'
import { getArticle } from '@/api/print'

defineOptions({
  name: 'AreaPrint'
})

const column: ColumnProps[] = [
  { type: 'index', label: '序号', width: 70 },
  { prop: 'cname', label: '名字' },
  { prop: 'email', label: '邮箱' },
  { prop: 'city', label: '城市' },
  { prop: 'display_time', label: '时间', sortable: true }
]
const table = ref([])

const pieChartRef = shallowRef()
const lineChartRef = shallowRef()
const tableRef = shallowRef()

fetchArticle()
async function fetchArticle() {
  const { result } = await getArticle()
  console.log('🚀 ~ file: partPrint.vue:16 ~ getArticle ~ result:', result)
  table.value = result.items
}
</script>
