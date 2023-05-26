<template>
  <div
    ref="pieChartRef"
    :style="{height:height,width:width}"
  />
</template>

<script setup lang="ts">
import * as echarts from 'echarts/core'
import { PieChart } from 'echarts/charts'
import {
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent
} from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

// 系列类型的定义后缀都为 SeriesOption
import type { PieSeriesOption } from 'echarts/charts'
// 组件类型的定义后缀都为 ComponentOption
import type {
  LegendComponentOption,
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption
} from 'echarts/components'
import type { ComposeOption } from 'echarts/core'

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = ComposeOption<
  | PieSeriesOption
  | TitleComponentOption
  | LegendComponentOption
  | TooltipComponentOption
  | GridComponentOption
>;

// 注册必须的组件
echarts.use([
  TitleComponent,
  LegendComponent,
  TooltipComponent,
  GridComponent,
  PieChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
])
// import resize from '@/utils/resize'

interface Props {
  width?: string
  height?: string
  autoResize?: boolean
}

withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '350px',
  autoResize: true
})

const pieChartRef = shallowRef()
const chart = shallowRef<ReturnType<typeof echarts.init>>()

onMounted(() => {
  nextTick(() => { initChart() })
})
onUnmounted(() => {
  chart.value && chart.value.dispose()
})

function initChart() {
  chart.value = echarts.init(pieChartRef.value, 'macarons')
  setOptions()
}

function setOptions() {
  const options: ECOption = {
    title: {
      text: '商品库存信息',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      top: 'middle',
      left: 'left'
    },
    series: [
      {
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: '矿泉水' },
          { value: 735, name: '可乐' },
          { value: 580, name: '雪碧' },
          { value: 484, name: '红茶' },
          { value: 300, name: '绿茶' },
          { value: 621, name: '咖啡' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }

  chart.value && chart.value.setOption(options)
}

function resize() {
  chart.value && chart.value.resize()
}

defineExpose({ resize })
</script>
