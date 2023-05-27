<template>
  <div class="relative w-[960px] h-[220px] mt-5 bg-[url(@/views/dataScreen/images/chart-bg-center.png)] bg-[length:100%_100%] bg-no-repeat before:content-['未来30天游客量趋势图'] before:text-white before:text-lg after:w-[68px] after:h-[7px] after:bg-[url(@/views/dataScreen/images/title.png)] after:bg-[length:100%_100%] after:bg-no-repeat after:absolute after:top-8 after:left-0">
    <div
      ref="predictiveChartRef"
      class="w-full h-[200px]"
    />
  </div>
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import { rangeRandom } from '@/utils'

defineOptions({
  name: 'PredictiveChart'
})

// 获取当前日期到之后一个月30天的日期区间
const initDate = (): string[] => {
  const dateList = []
  const startDate = new Date()
  const endDate = new Date()
  endDate.setDate(startDate.getDate() + 30)
  startDate.setDate(startDate.getDate() + 1)
  while (endDate.getTime() - startDate.getTime() >= 0) {
    let m = startDate.getMonth() + 1 + ''
    let d = startDate.getDate() + ''
    m.length === 1 && (m = '0' + m)
    d.length === 1 && (d = '0' + d)
    dateList.push(m + '/' + d)
    startDate.setDate(startDate.getDate() + 1)
  }
  return dateList
}
const data = {
  unit: ['访问量'],
  data: new Array(30).fill('').map(() => rangeRandom(1, 20000))
}
const options: EChartsOption = {
  tooltip: {
    trigger: 'axis',
    confine: true,
    formatter: (params: any) => {
      const tipData = params[0]
      const html = `
        <div class="p-5 bg-[url(@/views/dataScreen/images/line-bg.png)] bg-[length:100%_100%] bg-no-repeat text-xs text-white">
          <span>${tipData.name} <i class="text-[#f5b348] font-bold">${tipData.value}</i> 人次访问</span>
        </div>
      `
      return html
    },
    backgroundColor: 'transparent', // 提示标签背景颜色
    borderColor: 'transparent',
    axisPointer: {
      lineStyle: {
        type: 'dashed'
      },
      snap: true
    },
    extraCssText: 'box-shadow: none;padding:0'
  },
  grid: {
    top: '25%',
    left: '5%',
    right: '5%',
    bottom: '20%'
    // containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      axisLine: {
        show: true,
        symbol: ['none', 'arrow'],
        symbolOffset: [0, 30],
        lineStyle: {
          color: '#233653',
          shadowOffsetX: 20,
          shadowColor: '#233653'
        }
      },
      axisLabel: {
        // 坐标轴刻度标签的相关设置
        color: '#7ec7ff',
        padding: 0,
        fontSize: 12
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: '#192a44'
        }
      },
      axisTick: {
        show: false
      },
      data: initDate()
    }
  ],
  yAxis: data.unit.map((val: string, index: number) => {
    return {
      name: '(访问量)',
      nameTextStyle: {
        color: '#7ec7ff',
        fontSize: 12,
        padding: [0, 30, -4, 0]
      },
      // nameGap:18,
      minInterval: 1,
      splitLine: {
        show: false,
        lineStyle: {
          color: '#192a44'
        }
      },
      axisLine: {
        show: index === 0,
        lineStyle: {
          color: '#233653'
        }
      },
      axisLabel: {
        show: true,
        color: '#7ec7ff',
        padding: 0,
        formatter: function(value: string) {
          if (Number(value) >= 10000) {
            value = Number(value) / 10000 + 'w'
          }
          return value
        }
      },
      axisTick: {
        show: false
      }
    }
  }),
  series: data.data.map(() => {
    // console.log("30天预计", val);
    return {
      name: '',
      type: 'line',
      symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
      showSymbol: false,
      smooth: true,
      lineStyle: {
        width: 1,
        color: '#707070', // 线条颜色
        borderColor: '#707070'
      },
      itemStyle: {
        color: '#F5B348',
        shadowColor: 'rgba(245, 179, 72, 0.3)',
        shadowBlur: 3
      },
      emphasis: {
        scale: true
      },
      areaStyle: {
        // 区域填充样式
        // 线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#846B38' // 0% 处的颜色
            },
            {
              offset: 0.5,
              color: '#403E47' // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#11144E' // 100% 处的颜色
            }
          ],
          global: false // 缺省为 false
        },
        shadowColor: 'rgba(255, 199, 37, 0)', // 阴影颜色
        shadowBlur: 20 // shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
      },
      data: data.data
    }
  })
}

const predictiveChartRef = shallowRef<HTMLElement>()
const [chart] = useEcharts(options, predictiveChartRef)

function resize() {
  chart.value?.resize()
}

defineExpose({ resize })
</script>
