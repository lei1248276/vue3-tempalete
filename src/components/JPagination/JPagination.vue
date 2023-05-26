<template>
  <div
    :class="{'hidden': hidden}"
    class="bg-white py-8 px-4"
  >
    <el-pagination
      v-model:currentPage="calc.currentPage"
      v-model:pageSize="calc.pageSize"
      :background="background"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$props"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { PaginationProps } from 'element-plus'
import { scrollTo } from '@/utils/scrollTo'

defineOptions({
  name: 'JPagination'
})

interface Props extends Partial<PaginationProps> {
  page: number
  limit?: number
  hidden?: boolean
  autoScroll?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  page: 1,
  limit: 10,
  hidden: false,
  autoScroll: true,

  pageSizes: () => [10, 20, 30, 40],
  layout: 'total, sizes, prev, pager, next, jumper',
  background: true
})

const emit = defineEmits<{
  'update:page': [val: number]
  'update:limit': [val: number]
  pagination: [options: { page: number, limit: number }]
}>()

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

function onSizeChange(val: number) {
  emit('pagination', { page: calc.currentPage, limit: val })
  if (props.autoScroll) scrollTo(0, 800)
}
function onCurrentChange(val: number) {
  emit('pagination', { page: val, limit: calc.pageSize })
  if (props.autoScroll) scrollTo(0, 800)
}
</script>

<style scoped lang="scss">
:deep(.el-pagination){
  justify-content: flex-end;
}
</style>
