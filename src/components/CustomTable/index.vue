<template>
  <div>
    <el-table
      :ref="element => el = element"
      :data="props.data"
      stripe
      highlight-current-row
      border
      size="large"
      v-bind="$attrs"
    >
      <template
        v-for="item in props.props"
        :key="item.label"
      >
        <!--    ! 自定义表格内容    -->
        <el-table-column
          v-if="item.custom"
          v-bind="item"
          align="center"
        >
          <template #default="slot">
            <slot
              :name="item.prop"
              v-bind="slot"
            >
              {{ slot.row[item.prop] instanceof Object ? '' : slot.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>

        <el-table-column
          v-else
          v-bind="item"
          align="center"
        />
      </template>

      <slot />
    </el-table>

    <Pagination
      v-if="props.isPagination"
      v-model:page="calc.currentPage"
      v-model:limit="calc.pageSize"
      :total="props.total"
      @pagination="option => emit('pagination', option)"
    />
  </div>
</template>

<script>
export default {
  name: 'CustomTable'
}
</script>

<script setup>
const emit = defineEmits(['update:page', 'update:limit', 'pagination'])
const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  props: {
    type: Array,
    default: () => []
  },
  total: {
    type: Number,
    default: 0
  },
  page: {
    type: Number,
    default: 1
  },
  limit: {
    type: Number,
    default: 10
  },
  isPagination: {
    type: Boolean,
    default: true
  }
})

const el = ref(null)
defineExpose(el)

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
</script>
