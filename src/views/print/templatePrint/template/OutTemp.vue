<template>
  <div class="out_temp w-[730px] mx-auto text-black text-[9px] break-after-page">
    <h1 class="text-[#000] text-[12px] font-bold text-center">XXXXXXXXXXXXXXX公司销售发货单</h1>
    <div class="flex">
      <div class="flex-[.45]">
        <p class="mb-1">供应商名称：{{ head.supplierName }}</p>
        <p>收货地址：{{ head.shippingAddress }}</p>
      </div>
      <div class="flex-[.25]">
        <p class="mb-1">联系方式：{{ head.tel }}</p>
        <p class="text-center">制单人：{{ head.nickname }}</p>
      </div>
      <div class="flex-[.3]">
        <p class="mb-1">单据编号：{{ head.stockOutNo }}</p>
        <p>出库日期： {{ head.createdTime }}</p>
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
        v-for="item in outTempTable"
        :key="item.label"
        v-bind="item"
        align="center"
      />
    </el-table>

    <div class="w-3/5 flex justify-between items-center my-1">
      <p>保管员：</p>
      <p>销售部电话：</p>
      <p>签收人：</p>
    </div>
    <div class="w-3/5 flex justify-between items-center">
      <p>白联：仓库</p>
      <p>红联：客户</p>
      <p>黄联：财务</p>
      <p>蓝联：随货同行</p>
    </div>
    <p>说明：以上货物，如有其他异议，请与收到货物五个工作日内提出，逾期视为认同，谢谢合作。</p>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'OutTemp'
})

defineProps<{
  head: Record<string, any>
  data: Record<string, any>[]
}>()

const outTempTable = [
  { type: 'index', label: '序号', width: '20' },
  { prop: 'productName', label: '商品名称', width: '70' },
  { prop: 'standard', label: '规格', width: '45' },
  { prop: 'productUnit', label: '单位', width: '20' },
  { prop: 'outNumber', label: '数量', width: '45' },
  { prop: 'salePrice', label: '单价', width: '50' },
  { prop: 'outTotalPrice', label: '总金额（元）', width: '60' },
  { prop: 'entrustEnterpriseName', label: '委托生产企业', width: '60' },
  { prop: 'entrustedEnterpriseName', label: '被委托生产企业', width: '60' },
  { prop: 'batchNumber', label: '批号' },
  { prop: 'productionDate', label: '生产日期', width: '70' },
  { prop: 'effectiveTime', label: '保质期', width: '40' },
  { prop: 'foodProductionLicense', label: '食品生产许可号', width: '60' },
  { prop: 'quality', label: '质量情况', width: '30' },
  { prop: 'remark', label: '备注', width: '20' }
]
</script>

<style lang="scss">
.out_temp{
  .el-table--border, .el-table--group {
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
