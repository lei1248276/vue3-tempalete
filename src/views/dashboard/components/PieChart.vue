<template>
  <div
    ref="pieChartRef"
    :style="{height:height,width:width}"
  />
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts'

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

const options: EChartsOption = {
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

const pieChartRef = shallowRef()
const { resize } = useEcharts(options, pieChartRef, 'macarons')

defineExpose({ resize })
</script>
