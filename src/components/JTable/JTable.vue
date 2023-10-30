<template>
  <div>
    <el-table
      ref="tableRef"
      v-bind="Object.assign({}, $props, $attrs)"
    >
      <template
        v-for="column in props.columnProps"
        :key="column.label"
      >
        <!-- * 添加slot来改写某一列的内容 -->
        <el-table-column
          v-if="column['prop'] && $slots[column['prop']]"
          v-bind="column"
          align="center"
        >
          <template #default="slot: { row: any, column: any, $index: number}">
            <slot
              :name="column.prop"
              v-bind="slot"
            >
              {{ slot.row[column['prop']] instanceof Object
                ? ''
                : slot.row[column['prop']] }}
            </slot>
          </template>
        </el-table-column>

        <el-table-column
          v-else
          v-bind="column"
          align="center"
        />
      </template>

      <slot />
    </el-table>

    <slot name="pagination">
      <j-pagination
        v-if="props.showPagination"
        v-model:page="calc.currentPage"
        v-model:limit="calc.pageSize"
        :total="props.total || props.data.length"
        @pagination="onPagination"
      />
    </slot>
  </div>
</template>

<script setup lang="ts">
import type { TableInstance, TableColumnInstance, TableProps as ElTableProps } from 'element-plus'

export type ColumnProps = TableColumnInstance['$props']

defineOptions({
  name: 'JTable'
})

type TableProps<T = any> = ElTableProps<T> & {
  data: T[]
  columnProps: ColumnProps[]
  total?: number
  page?: number
  limit?: number
  showPagination?: boolean
}

const props = withDefaults(defineProps<TableProps>(), {
  total: 0,
  page: 1,
  limit: 10,
  showPagination: true,
  stripe: true,
  border: true,
  highlightCurrentRow: true,
  showHeader: true,
  fit: true,
  size: 'large'
})

// ! 仅仅是为了能有TS代码提示，因为组件事件太多懒得写。。。（没有执行'emit()'所以还是'$attrs'事件）
type TableEmits = Parameters<TableInstance['$emit']>[0]
const emit = defineEmits<{
  (e: TableEmits, ...arg: any[]): void
  (e: 'update:page', val: number): void
  (e: 'update:limit', val: number): void
  (e: 'pagination', options: { page: number, limit: number}): void
}>()

const tableRef = shallowRef<TableInstance>()

const calc = reactive({
  currentPage: computed({
    get() { return props.page },
    set(val) { emit('update:page', val) }
  }),
  pageSize: computed({
    get() { return props.limit },
    set(val) { emit('update:limit', val) }
  })
})

function onPagination(options: { page: number, limit: number }) {
  emit('pagination', options)
}

defineExpose({ tableRef })
</script>
