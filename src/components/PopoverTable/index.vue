<template>
  <el-popover
    v-model:visible="calc.visible"
    :title="props.title"
    :width="props.width"
    :trigger="props.trigger"
    :placement="props.placement"
    v-bind="$attrs"
    style="position: relative"
    @after-leave="emit('update:visible', false)"
  >
    <svg-icon
      icon-class="icon_close"
      class-name="icon-close"
      @click="emit('update:visible', false)"
    />
    <el-table
      :data="props.table"
      border
      stripe
      highlight-current-row
      :height="parseInt(props.maxHeight) > 500 ? props.maxHeight : 500"
      :max-height="props.maxHeight"
      @row-click="row => {emit('rowClick', row)}"
      @row-dblclick="row => {emit('update:visible', false);emit('rowDblclick', row)}"
    >
      <el-table-column align="center">
        <template #header>
          <el-input
            :ref="el => state.inputRef = el"
            v-model="calc.search"
            :placeholder="props.placeholder"
            clearable
            style="width: 150px;margin-right: 10px"
            @keypress.enter="val => emit('enter', val)"
            @change="val => !val && emit('search', undefined)"
          />
          <el-button
            type="primary"
            size="small"
            @click="emit('search', calc.search)"
          >
            查询
          </el-button>
        </template>

        <el-table-column
          v-for="item in props.tableList"
          :key="item.label"
          align="center"
          v-bind="item"
        />
      </el-table-column>
    </el-table>

    <Pagination
      v-model:page="calc.current"
      v-model:limit="calc.size"
      :total="props.pagination.total"
      @pagination="emit('pagination')"
    />

    <template #reference>
      <slot name="reference" />
    </template>
  </el-popover>
</template>

<script>
export default {
  name: 'PopoverTable'
}
</script>

<script setup>
const emit = defineEmits(
  ['update:visible', 'update:current', 'update:size', 'update:search', 'enter', 'search', 'pagination', 'rowClick', 'rowDblclick', 'update:pagination']
)
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  table: {
    type: Array,
    default: () => []
  },
  tableList: {
    type: Array,
    default: () => []
  },
  search: {
    type: String,
    default: undefined
  },
  placeholder: {
    type: String,
    default: '名称或助记码'
  },
  pagination: {
    type: Object,
    default: () => ({ current: 1, size: 10, total: 0 })
  },
  title: {
    type: String,
    default: undefined
  },
  width: {
    type: Number || String,
    default: 586
  },
  maxHeight: {
    type: Number,
    default: 500
  },
  trigger: {
    type: String,
    default: 'click'
  },
  placement: {
    type: String,
    default: 'right-start'
  }
})
watch(
  () => props.visible,
  visible => visible && state.inputRef.focus() && state.inputRef.select()
)

const state = reactive({
  inputRef: null
})
const calc = reactive({
  visible: computed({
    get() { return props.visible },
    set(val) { emit('update:visible', val) }
  }),
  search: computed({
    get() { return props.search },
    set(val) { emit('update:search', val) }
  }),
  current: computed({
    get() { return props.pagination.current },
    set(val) { emit('update:pagination', { ...props.pagination, current: val }) }
  }),
  size: computed({
    get() { return props.pagination.size },
    set(val) { emit('update:pagination', { ...props.pagination, size: val }) }
  })
})
</script>

<style scoped lang="scss">
.icon-close{
  position: absolute;
  top: 12px;
  right: 12px;
  cursor: pointer;
  &:hover{
    fill: #409eff;
  }
}
</style>
