<template>
  <div
    :class="{'hidden': hidden}"
    class="pagination-container"
  >
    <el-pagination
      v-model:currentPage="calc.currentPage"
      v-model:pageSize="calc.pageSize"
      :background="background"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'Pagination'
}
</script>

<script setup>
import { scrollTo } from '@/utils/scroll-to'

const props = defineProps({
  total: {
    type: Number,
    required: true
  },
  page: {
    type: Number,
    default: 1
  },
  limit: {
    type: Number,
    default: 10
  },
  pageSizes: {
    type: Array,
    default() {
      return [10, 20, 30, 40]
    }
  },
  layout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper'
  },
  background: {
    type: Boolean,
    default: true
  },
  autoScroll: {
    type: Boolean,
    default: true
  },
  hidden: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:page', 'update:limit', 'pagination'])

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

function onSizeChange(val) {
  emit('pagination', { page: calc.currentPage, limit: val })
  if (props.autoScroll) scrollTo(0, 800)
}
function onCurrentChange(val) {
  emit('pagination', { page: val, limit: calc.pageSize })
  if (props.autoScroll) scrollTo(0, 800)
}
</script>

<style scoped lang="scss">
.pagination-container {
  background: #fff;
  padding: 32px 16px;
  .el-pagination{
    justify-content: flex-end;
  }
}
.pagination-container.hidden {
  display: none;
}
</style>
