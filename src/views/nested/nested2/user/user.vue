<template>
  <div class="app_container">
    <el-button
      type="primary"
      @click="$router.push('/dashboard')"
    >
      跳转dashboard
    </el-button>

    <j-table
      :data="table"
      :column-props="column"
      @pagination="option => console.log(option)"
      @cell-click="cell => console.log('cell-click: ', cell)"
      @row-click="row => console.log('row-click: ', row)"
    >
      <template #age="{ row }">
        <span class="text-[red]">{{ row.age }}...</span>
      </template>
    </j-table>
  </div>
</template>

<script setup lang="ts">
import { ColumnProps } from '@/components/JTable/JTable.vue'

defineOptions({
  name: 'User'
})
onMounted(() => { console.log('user') })

const table = ref([
  { name: 'jaye', age: 18, sex: 'man' }
])
const column: ColumnProps[] = [
  { type: 'index', label: '序号', width: 70 },
  { prop: 'name', label: '姓名' },
  { prop: 'age', label: '年龄' },
  { prop: 'sex', label: '性别' }
]
</script>
