<template>
  <div class="j-time-picker relative flex items-center w-[344px] h-[30px] [border:1px_solid_#517EFF] rounded-[5px] overflow-hidden">
    <span class="shrink-0 inline-block text-[#517EFF] text-xs ml-[15px]">时间类型</span>
    <el-time-picker
      class="!h-full grow-0 !shadow-none"
      v-bind="$props"
    />
    <IconArrow class="shrink-0 !relative" />
  </div>
</template>

<script setup lang="ts">
import type { TimePickerDefaultProps } from 'element-plus'
import IconArrow from '../../../../components/IconArrow/IconArrow.vue'

interface Props extends Partial<TimePickerDefaultProps> {}

defineOptions({
  name: 'JTimePicker'
})

defineProps<Props>()
</script>

<style lang="scss">
.j-time-picker{
  .el-date-editor {
    .el-range__icon {
      display: none !important;
    }
    .el-range-input{
      color: #999 !important;
    }
  }
}
</style>
