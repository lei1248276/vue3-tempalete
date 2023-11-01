<template>
  <div class="m-[15px] bg-white rounded-[10px] px-[25px] py-[20px] pb-[500px]">
    <div class="space-x-[30px] mb-[18px]">
      <el-input class="w-[344px] h-[30px] rounded-[5px] [border:1px_solid_#517EFF]">
        <template #prefix>
          <span class="text-[#517EFF] text-xs !ml-1">姓名/手机号/身份证</span>
        </template>
      </el-input>

      <el-input class="w-[344px] h-[30px] rounded-[5px] [border:1px_solid_#517EFF]">
        <template #prefix>
          <span class="text-[#517EFF] text-xs !ml-1">用户属性</span>
        </template>
      </el-input>

      <el-input class="w-[344px] h-[30px] rounded-[5px] [border:1px_solid_#517EFF]">
        <template #prefix>
          <span class="text-[#517EFF] text-xs !ml-1">所属机构</span>
        </template>
      </el-input>
    </div>

    <div class="space-x-[30px] mb-[15px]">
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

    <div class="flex justify-end space-x-[20px] mb-[15px]">
      <el-button
        class="w-[84px] h-[36px]"
        color="#517EFF"
      >
        添加
        <template #icon>
          <SvgIcon icon-class="icon-add" />
        </template>
      </el-button>

      <el-button
        class="w-[84px] h-[36px]"
        color="#517EFF"
      >
        编辑
        <template #icon>
          <SvgIcon icon-class="icon-edit" />
        </template>
      </el-button>

      <el-button
        class="w-[84px] h-[36px]"
        color="#517EFF"
      >
        删除
        <template #icon>
          <SvgIcon icon-class="icon-delete" />
        </template>
      </el-button>
    </div>

    <JTable
      :data="table"
      :column-props="column"
    >
      <template #1>
        <ClientInfo />
      </template>

      <template #2="{row}">
        <span class="text-[#03AD82] text-sm cursor-pointer">{{ row['2'] }}</span>
      </template>

      <el-table-column
        label="操作"
        width="200"
      >
        <div class="space-x-[15px]">
          <span class="text-[#2F69E6] text-sm cursor-pointer">停用</span>
          <span class="text-[#2F69E6] text-sm cursor-pointer">地址管理</span>
          <span class="text-[#2F69E6] text-sm cursor-pointer">重置密码</span>
        </div>
      </el-table-column>
    </JTable>
  </div>
</template>

<script setup lang="ts">
import type { ColumnProps } from '@/components/JTable/JTable.vue'
import ClientInfo from './components/ClientInfo.vue'

defineOptions({
  name: 'User'
})

const table = ref([
  { 1: 'A11HDAH1COG00002', 2: '启用' }
])
const column: ColumnProps[] = [
  { type: 'selection', width: 40 },
  { type: 'index', label: '序号', width: 110 },
  { prop: '1', label: '客户信息' },
  { prop: '2', label: '状态', width: 70 }
]
</script>
