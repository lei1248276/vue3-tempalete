<template>
  <span>今年销售额趋势图</span>
  <span class="text-[12px] ml-2">单位：万元</span>
  <div
    ref="lineChartRef"
    :style="{height:height,width:width}"
  />
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts'

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
const { chart, resize } = useEcharts(getOption(props.chartData), lineChartRef, 'macarons')

watch(() => props.chartData, () => {
  chart.value && chart.value.setOption(getOption(props.chartData))
}, { deep: true })

function getOption({ expectedData, actualData }: ChartData) {
  const options: EChartsOption = {
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

  return options
}

defineExpose({ resize })
</script>
