<template>
  <div class="order-search m-[15px] bg-white rounded-[10px] px-[25px] pt-[30px] pb-[150px]">
    <div class="flex flex-wrap items-center gap-x-[30px] gap-y-[15px] mb-[36px]">
      <el-input class="w-[344px] h-[30px] rounded-[5px] [border:1px_solid_#517EFF]">
        <template #prefix>
          <span class="text-[#517EFF] text-xs !ml-1">订单号</span>
        </template>
      </el-input>

      <el-input class="w-[344px] h-[30px] !leading-[30px] rounded-[5px] [border:1px_solid_#517EFF]">
        <template #prefix>
          <span class="text-[#517EFF] text-xs !ml-1">客户电话</span>
        </template>
      </el-input>

      <el-input class="w-[344px] h-[30px] rounded-[5px] [border:1px_solid_#517EFF]">
        <template #prefix>
          <span class="text-[#517EFF] text-xs !ml-1">服务商</span>
        </template>
      </el-input>

      <el-select
        class="w-[344px] h-[30px] rounded-[5px] [border:1px_solid_#517EFF] overflow-hidden"
        placeholder=" "
        suffix-icon=""
      >
        <template #prefix>
          <span class="text-[#517EFF] text-xs !ml-1">支付类型</span>
          <IconArrow />
        </template>
      </el-select>

      <el-select
        class="w-[344px] h-[30px] rounded-[5px] [border:1px_solid_#517EFF] overflow-hidden"
        placeholder=" "
        suffix-icon=""
      >
        <template #prefix>
          <span class="text-[#517EFF] text-xs !ml-1">订单类型</span>
          <IconArrow />
        </template>
      </el-select>

      <el-select
        class="w-[344px] h-[30px] rounded-[5px] [border:1px_solid_#517EFF] overflow-hidden"
        placeholder=" "
        suffix-icon=""
      >
        <template #prefix>
          <span class="text-[#517EFF] text-xs !ml-1">服务类别</span>
          <IconArrow />
        </template>
      </el-select>

      <el-select
        class="w-[344px] h-[30px] rounded-[5px] [border:1px_solid_#517EFF] overflow-hidden"
        placeholder=" "
        suffix-icon=""
      >
        <template #prefix>
          <span class="text-[#517EFF] text-xs !ml-1">服务主类</span>
          <IconArrow />
        </template>
      </el-select>

      <el-select
        class="w-[344px] h-[30px] rounded-[5px] [border:1px_solid_#517EFF] overflow-hidden"
        placeholder=" "
        suffix-icon=""
      >
        <template #prefix>
          <span class="text-[#517EFF] text-xs !ml-1">服务子类</span>
          <IconArrow />
        </template>
      </el-select>

      <el-select
        class="w-[344px] h-[30px] rounded-[5px] [border:1px_solid_#517EFF] overflow-hidden"
        placeholder=" "
        suffix-icon=""
      >
        <template #prefix>
          <span class="text-[#517EFF] text-xs !ml-1">时间类型</span>
          <IconArrow />
        </template>
      </el-select>

      <JTimePicker
        is-range
        start-placeholder="开始时间"
        end-placeholder="结束时间"
      />

      <el-select
        class="w-[344px] h-[30px] rounded-[5px] [border:1px_solid_#517EFF] overflow-hidden"
        placeholder=" "
        suffix-icon=""
      >
        <template #prefix>
          <span class="text-[#517EFF] text-xs !ml-1">省</span>
          <IconArrow />
        </template>
      </el-select>

      <el-select
        class="w-[344px] h-[30px] rounded-[5px] [border:1px_solid_#517EFF] overflow-hidden"
        placeholder=" "
        suffix-icon=""
      >
        <template #prefix>
          <span class="text-[#517EFF] text-xs !ml-1">市</span>
          <IconArrow />
        </template>
      </el-select>

      <el-select
        class="w-[344px] h-[30px] rounded-[5px] [border:1px_solid_#517EFF] overflow-hidden"
        placeholder=" "
        suffix-icon=""
      >
        <template #prefix>
          <span class="text-[#517EFF] text-xs !ml-1">区</span>
          <IconArrow />
        </template>
      </el-select>

      <el-button
        class="w-[84px] h-[36px]"
        color="#517EFF"
      >
        查询
        <template #icon>
          <SvgIcon icon-class="icon-search" />
        </template>
      </el-button>
    </div>

    <div class="relative flex items-center mb-[27px] gap-x-[120px]">
      <div
        v-for="tag in filterTags"
        :key="tag.text"
        class="flex items-center gap-x-[5px]"
      >
        <SvgIcon
          :icon-class="tag.icon"
          class-name="w-[16px] h-[16px]"
        />
        <span
          class="cursor-pointer"
          :style="{color: tag.color}"
        >{{ tag.text }}</span>
        <span
          class="block px-[10px] py-[5px] text-white rounded-[13px_13px_13px_3px] text-xs"
          :style="{backgroundColor: tag.color}"
        >{{ tag.count }}</span>
      </div>

      <el-button
        class="absolute right-0 w-[84px] h-[36px] rounded-[5px]"
        color="#517EFF"
      >
        导出
        <template #icon>
          <SvgIcon icon-class="icon-download" />
        </template>
      </el-button>
    </div>

    <JTable
      :data="table"
      :column-props="column"
    >
      <template #1="{row}">
        <span class="text-[#517EFF] text-sm cursor-pointer">{{ row['1'] }}</span>
      </template>

      <template #2="{row}">
        <div class="flex items-center gap-x-[22px]">
          <span class="text-sm">{{ row['2'] }}</span>
          <SvgIcon
            icon-class="icon-eye"
            class-name="w-[14px] h-[14px] cursor-pointer"
          />
        </div>
      </template>

      <template #5="{row}">
        <OrderTag :type="row['5']" />
      </template>

      <template #8="{row}">
        <span
          class="inline-block px-[6px] py-[3px] text-xs rounded-[2px]"
          :class="{
            '[border:1px_solid_#FE7E1D] text-[#FE7E1D] bg-[#FFE2CC]': row['8'] === '已完成',
            '[border:1px_solid_#9CD8C8] text-[#03AD82] bg-[#E4F7F2]': row['8'] === '已支付',
            '[border:1px_solid_#FECED5] text-[#FF0000] bg-[#FFE5E9]': row['8'] === '未支付',
            '[border:1px_solid_#BFC9D5] text-[#A1B4C9] bg-[#F8FBFF]': row['8'] === '已取消',
          }"
        >• {{ row['8'] }}</span>
      </template>

      <el-table-column
        prop="9"
        label="订单详情"
        width="95"
      >
        <span class="block text-center text-[#2F69E6] text-sm cursor-pointer">详情</span>
      </el-table-column>
    </JTable>
  </div>
</template>

<script setup lang="ts">
import type { ColumnProps } from '@/components/JTable/JTable.vue'
import JTimePicker from './components/JTimePicker.vue'
import OrderTag from './components/OrderTag.vue'

defineOptions({
  name: 'OrderSearch'
})

const table = ref([
  { 1: 'A11HDAH1COG00002', 2: '刘先生', 3: '2023-10-22 09:47:19', 4: '湖北安福星健康产业发展有限公司', 5: '公益', 6: 100, 7: 0, 8: '已完成' },
  { 1: 'A11HDAH1COG00002', 2: '刘先生', 3: '2023-10-22 09:47:19', 4: '湖北安福星健康产业发展有限公司', 5: '市场化', 6: 100, 7: 0, 8: '已支付' },
  { 1: 'A11HDAH1COG00002', 2: '刘先生', 3: '2023-10-22 09:47:19', 4: '湖北安福星健康产业发展有限公司', 5: '市级补贴', 6: 100, 7: 0, 8: '未支付' },
  { 1: 'A11HDAH1COG00002', 2: '刘先生', 3: '2023-10-22 09:47:19', 4: '湖北安福星健康产业发展有限公司', 5: '区级补贴', 6: 100, 7: 0, 8: '已支付' },
  { 1: 'A11HDAH1COG00002', 2: '刘先生', 3: '2023-10-22 09:47:19', 4: '湖北安福星健康产业发展有限公司', 5: '居家补贴', 6: 100, 7: 0, 8: '已取消' },
  { 1: 'A11HDAH1COG00002', 2: '刘先生', 3: '2023-10-22 09:47:19', 4: '湖北安福星健康产业发展有限公司', 5: '家床补贴', 6: 100, 7: 0, 8: '已支付' }
])
const column: ColumnProps[] = [
  { type: 'selection', width: 40 },
  { prop: '1', label: '订单号', width: 250 },
  { prop: '2', label: '客户姓名', width: 150 },
  { prop: '3', label: '下单时间', width: 250 },
  { prop: '4', label: '商家名称' },
  { prop: '5', label: '订单类型', width: 150 },
  { prop: '6', label: '订单金额', width: 150 },
  { prop: '7', label: '实付金额', width: 150 },
  { prop: '8', label: '订单状态', width: 150 }
]

const filterTags = [
  { icon: 'icon-all', text: '全部', count: '49700', color: '#517EFF' },
  { icon: 'icon-unpay', text: '未支付', count: '49', color: '#FE6281' },
  { icon: 'icon-pay', text: '已支付', count: '49', color: '#00A87E' },
  { icon: 'icon-service', text: '已服务', count: '49', color: '#FEA104' },
  { icon: 'icon-complete', text: '已完成', count: '49', color: '#0799EC' },
  { icon: 'icon-order', text: '已接单', count: '49', color: '#FF6130' },
  { icon: 'icon-cancel', text: '已取消', count: '49700', color: '#BFC9D5' }
]
</script>
