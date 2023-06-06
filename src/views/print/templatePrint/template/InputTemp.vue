<template>
  <div class="input_temp w-[730px] mx-auto text-black text-[9px] break-after-page">
    <h1 class="text-[#000] text-[12px] font-bold text-center">XXXXXXXXXXXXX公司商品<span class="text-[16px]">入库单</span><span class="float-right text-[18px]">进</span></h1>
    <div class="flex">
      <div class="flex-[.6] mb-1">
        <p>供应商名称：{{ head.supplierName }}</p>
      </div>
      <div class="flex-[.4]">
        <p class="mb-1">单据编号：{{ head.stockInNo }}</p>
        <p>入库日期：{{ head.stockInDate }}</p>
      </div>
    </div>

    <el-table
      :data="data"
      border
      :header-cell-style="{ 'padding': 0, 'fontSize': '12px' }"
      :cell-style="{ 'padding': 0, 'fontSize': '12px' }"
      class="mb-1"
    >
      <el-table-column
        v-for="item in inputTempTable"
        :key="item.label"
        v-bind="item"
        align="center"
      />
    </el-table>

    <p>保管员：</p>
    <div class="w-3/5 flex justify-between items-center my-1">
      <p>白联：仓库</p>
      <p>红联：客户</p>
      <p>黄联：财务</p>
      <p>蓝联：随货同行</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'InputTemp'
})

defineProps<{
  head: Record<string, any>
  data: Record<string, any>[]
}>()

const inputTempTable = [
  { type: 'index', label: '序号', width: '20' },
  { prop: 'productName', label: '产品名称', width: '90' },
  { prop: 'unit', label: '单位', width: '20' },
  { prop: 'num', label: '数量', width: '30' },
  { prop: 'costPrice', label: '单价', width: '50' },
  { prop: 'stockTotalPrice', label: '总金额（元）', width: '60' },
  { prop: 'entrustedEnterprise', label: '被委托生产企业', width: '80' },
  { prop: 'batchNum', label: '批号' },
  { prop: 'productionDate', label: '生产日期', width: '70' },
  { prop: 'effectiveTime', label: '保质期', width: '50' },
  { prop: 'licence', label: '食品生产许可号' },
  { prop: 'quality', label: '质量情况', width: '30' },
  { prop: 'remark', label: '备注' }
]
</script>

<style lang="scss">
.input_temp{
  .el-table--border,.el-table--group {
    border: 1px solid #333 !important;
  }
  .el-table--border  td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
    border-color: #333 !important;
  }
  .el-table  td, .el-table th.is-leaf  {
    border-color: #333 !important;
  }
  .el-table{
    thead th{
      background: transparent !important;
      border-color: #333;
    }
  }
  .el-table--border .el-table__cell:first-child .cell{
    padding: 0;
  }
  .el-table .cell{
    padding: 0;
    color: #333;
  }

  .el-scrollbar__view{
    display: inline !important;
  }
}
</style>
