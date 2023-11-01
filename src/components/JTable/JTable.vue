<template>
  <div class="j-table">
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
          v-if="$slots[column['prop']!]"
          v-bind="column"
        >
          <template #default="slot: { row: any, column: any, $index: number}">
            <slot
              :name="column.prop"
              v-bind="slot"
            >
              {{ slot.row[column['prop']!] }}
            </slot>
          </template>
        </el-table-column>

        <el-table-column
          v-else
          v-bind="column"
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

type TableProps<T = any> = ElTableProps<T> & {
  data: T[]
  columnProps: ColumnProps[]
  total?: number
  page?: number
  limit?: number
  showPagination?: boolean
}

defineOptions({
  name: 'JTable'
})

const props = withDefaults(defineProps<TableProps>(), {
  total: 0,
  page: 1,
  limit: 10,
  showPagination: false,
  stripe: false,
  border: false,
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

<style lang="scss">
.j-table{
    // ! 设置自定义表格头部样式
  .el-table{
    thead th{
      background: #F5F7FC !important;
      color: #333 !important;
      font-weight: 500;
      .cell{
        padding: 0 10px !important;
        border-left: 1px solid #BFC9D5;
      }
      &:nth-child(1) .cell{
        border-left: none !important;
      }
    }

    tbody td{
      .cell{
        padding: 0 10px !important;
        color: #333;
      }
    }
  }
  .el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell{
    background: #F5F7FC !important;
  }

  // ! 设置table row点击后状态颜色
  .el-table__body tr.el-table__row.current-row td.el-table__cell,
  .el-table__body tr.el-table__row--striped.current-row td.el-table__cell{
    background-color: #F0F4FF !important;
  }
}
</style>
