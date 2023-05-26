<template>
  <span>今年销售额趋势图</span>
  <span class="text-[12px] ml-2">单位：万元</span>
  <div
    ref="lineChartRef"
    :style="{height:height,width:width}"
  />
</template>

<script setup lang="ts">
import * as echarts from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { TooltipComponent, GridComponent } from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

// 系列类型的定义后缀都为 SeriesOption
import type { LineSeriesOption } from 'echarts/charts'
// 组件类型的定义后缀都为 ComponentOption
import type { TooltipComponentOption, GridComponentOption } from 'echarts/components'
import type { ComposeOption } from 'echarts/core'

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = ComposeOption<
  | LineSeriesOption
  | TooltipComponentOption
  | GridComponentOption
>;

// 注册必须的组件
echarts.use([
  TooltipComponent,
  GridComponent,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
])
// import resize from '@/utils/resize'

interface ChartData {
  expectedData: number[]
  actualData: number[]
}

interface Props {
  chartData: ChartData
  width?: string
  height?: string
  autoResize?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '350px',
  autoResize: true
})

const lineChartRef = shallowRef()
const chart = shallowRef<ReturnType<typeof echarts.init>>()

watch(() => props.chartData, (data) => {
  setOptions(data)
}, { deep: true })

onMounted(() => {
  nextTick(() => { initChart() })
})
onUnmounted(() => {
  chart.value && chart.value.dispose()
})

function initChart() {
  chart.value = echarts.init(lineChartRef.value, 'macarons')
  setOptions(props.chartData)
}
function setOptions({ expectedData, actualData }: ChartData) {
  const options: ECOption = {
    legend: {
      data: ['预期', '实际']
    },
    xAxis: {
      data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      boundaryGap: false
    },
    yAxis: {
      axisTick: {
        show: false
      }
    },
    grid: {
      show: true,
      left: 10,
      right: 20,
      bottom: 20,
      top: 30,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      },
      padding: [5, 10]
    },
    series: [{
      type: 'line',
      name: '预期',
      data: expectedData,
      itemStyle: {
        color: '#FF005A'
      },
      lineStyle: {
        color: '#FF005A',
        width: 2
      },
      smooth: true,
      animationDuration: 2800,
      animationEasing: 'cubicInOut'
    },
    {
      type: 'line',
      name: '实际',
      data: actualData,
      itemStyle: {
        color: '#3888fa'
      },
      lineStyle: {
        color: '#3888fa',
        width: 2
      },
      areaStyle: {
        color: '#f3f8ff'
      },
      smooth: true,
      animationDuration: 2800,
      animationEasing: 'quadraticOut'
    }]
  }

  chart.value && chart.value.setOption(options)
}

function resize() {
  chart.value && chart.value.resize()
}

defineExpose({ resize })
</script>
