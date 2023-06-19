<template>
  <div class="page-container mid">
    <!-- * 直接传递'组件'和'props'进行一键打印 -->
    <!-- <el-button
      type="primary"
      size="large"
      @click="usePrint(InputTemp, inputOrder[0])"
    >
      模板打印
    </el-button> -->
    <!-- * 或者提前渲染获取'DOM'元素后进行打印 -->
    <el-button
      type="primary"
      size="large"
      class="mr-2"
      @click="usePrint(inputTempRef)"
    >
      模板打印
    </el-button>
    <div class="hidden">
      <div ref="inputTempRef">
        <input-temp
          v-for="(item, index) in inputOrder"
          :key="index"
          :head="item.head"
          :data="item.data"
        />
      </div>
    </div>

    <!-- * 直接传递'组件'和props'进行一键打印 -->
    <el-button
      type="primary"
      size="large"
      @click="usePrint(OutTemp, outOrder[0])"
    >
      异步模板打印
    </el-button>
    <!-- * 或者提前渲染获取'DOM'元素后进行打印 -->
    <!-- <el-button
      type="primary"
      size="large"
      @click="isShow ? usePrint(outTempRef) : (isShow = true)"
    >
      异步模板打印
    </el-button>
    <div
      v-if="isShow"
      class="hidden"
    >
      <div ref="outTempRef">
        <Suspense @resolve="usePrint(outTempRef)">
          <out-temp
            v-for="(item, index) in outOrder"
            :key="index"
            :head="item.head"
            :data="item.data"
          />
        </Suspense>
      </div>
    </div> -->

    <el-button
      type="primary"
      size="large"
      @click="usePrint(InvoiceTemp)"
    >
      异步模板打印发票
    </el-button>
  </div>
</template>

<script setup lang="ts">
import InputTemp from './template/InputTemp.vue'
const OutTemp = defineAsyncComponent(() => import('./template/OutTemp.vue'))
const InvoiceTemp = defineAsyncComponent(() => import('./template/InvoiceTemp.vue'))

defineOptions({
  name: 'TemplatePrint'
})

const inputOrder = [
  {
    head: {
      supplierName: 'XXXXXXXXX',
      stockInNo: 'No1231232121',
      stockInDate: '2022-02-22'
    },
    data: [
      {
        productName: '矿泉水',
        unit: '瓶',
        num: '12',
        costPrice: '2',
        stockTotalPrice: '24',
        entrustedEnterprise: '??',
        batchNum: 'asdas12',
        productionDate: '2022-02-02',
        effectiveTime: '??',
        licence: '??',
        quality: '??',
        remark: '....'
      }
    ]
  },
  {
    head: {
      supplierName: 'XXXXXXXXX',
      stockInNo: 'No1523251232',
      stockInDate: '2012-01-22'
    },
    data: [
      {
        productName: '可乐',
        unit: '瓶',
        num: '24',
        costPrice: '3',
        stockTotalPrice: '72',
        entrustedEnterprise: '??',
        batchNum: 'asdas12',
        productionDate: '2011-11-11',
        effectiveTime: '??',
        licence: '??',
        quality: '??',
        remark: '....'
      }
    ]
  }
]

const outOrder = [
  {
    head: {
      supplierName: 'XXXXXXXXX',
      shippingAddress: 'XXXXXXX',
      tel: '13823123122',
      nickname: '??',
      stockOutNo: 'No12312213',
      createdTime: '2022-2-22'
    },
    data: [
      {
        productName: '矿泉水',
        standard: '12/箱',
        productUnit: '瓶',
        outNumber: '24',
        salePrice: '2',
        outTotalPrice: '48',
        entrustEnterpriseName: '??',
        entrustedEnterpriseName: '??',
        batchNumber: 'asda124',
        productionDate: '2021-02-02',
        effectiveTime: '12个月',
        foodProductionLicense: '??',
        quality: '??',
        remark: '....'
      }
    ]
  },
  {
    head: {
      supplierName: 'XXXXXXXXX',
      shippingAddress: 'XXXXXXX',
      tel: '13823123122',
      nickname: '??',
      stockOutNo: 'No12312213',
      createdTime: '2022-2-22'
    },
    data: [
      {
        productName: '可乐',
        standard: '12/箱',
        productUnit: '瓶',
        outNumber: '24',
        salePrice: '2',
        outTotalPrice: '48',
        entrustEnterpriseName: '??',
        entrustedEnterpriseName: '??',
        batchNumber: 'asda124',
        productionDate: '2021-02-02',
        effectiveTime: '12个月',
        foodProductionLicense: '??',
        quality: '??',
        remark: '....'
      }
    ]
  }
]

const inputTempRef = shallowRef()
const outTempRef = shallowRef()
const isShow = ref(false)
</script>
