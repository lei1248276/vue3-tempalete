<template>
  <div class="relative w-[390px] h-[246px] mt-5 bg-[url(@/views/dataScreen/images/chart-bg-bottom.png)] bg-[length:100%_100%] bg-no-repeat before:content-['预约渠道数据统计'] before:text-white before:text-lg after:w-[68px] after:h-[7px] after:bg-[url(@/views/dataScreen/images/title.png)] after:bg-[length:100%_100%] after:bg-no-repeat after:absolute after:top-8 after:left-0">
    <div
      ref="statChartRef"
      class="w-full h-[225px]"
    />
  </div>
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts'

defineOptions({
  name: 'ReserveStat'
})

const data = [
  {
    value: 40,
    name: '智慧文旅平台',
    percentage: '40%'
  },
  {
    value: 10,
    name: '携程',
    percentage: '10%'
  },
  {
    value: 20,
    name: '飞猪',
    percentage: '20%'
  },
  {
    value: 30,
    name: '其他渠道',
    percentage: '30%'
  }
]
// const colors = ["#078dbc", "#6ad40b", "#6172fc", "#1786ff", "#ffbe2f", "#4dc89d", "#b797df", "#ffd3aa"];
const options: EChartsOption = {
  grid: {
    top: '0%',
    left: '2%',
    right: '2%',
    bottom: '0%'
    // containLabel: true
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b} :  {c}人'
  },
  legend: {
    show: true,
    top: 'middle',
    left: '10px',
    icon: 'circle',
    orient: 'vertical',
    align: 'auto',
    itemWidth: 10,
    textStyle: {
      color: '#fff'
    },
    itemGap: 20,
    formatter: function(name: string) {
      return name + ' -- ' + data.find(item => item.name === name)?.percentage
    },
    data: data.map((val) => val.name)
  },
  series: [
    {
      type: 'pie',
      radius: ['60%', '85%'],
      center: ['68%', '45%'],
      color: ['#0E7CE2', '#FF8352', '#E271DE', '#F8456B', '#00FFFF', '#4AEAB0'],
      itemStyle: {
        borderColor: '#031845',
        borderWidth: 10
      },
      data: data,
      labelLine: {
        show: false
      },
      label: {
        show: false
      }
    },
    {
      type: 'pie',
      radius: ['20%', '28%'],
      center: ['68%', '45%'],
      color: ['#ffffff', 'red'],
      startAngle: 105,
      data: [
        {
          value: 30,
          name: '',
          itemStyle: {
            color: 'transparent'
          }
        },
        {
          value: 5,
          name: '',
          itemStyle: {
            color: 'transparent'
          }
        },
        {
          value: 65,
          name: 'ddd',
          itemStyle: {
            color: '#ffffff'
          }
        }
      ],
      silent: true,
      labelLine: {
        show: false
      },
      label: {
        show: false
      }
    },
    {
      type: 'pie',
      radius: [0, '30%'],
      center: ['68%', '45%'],
      startAngle: 90,
      data: [
        {
          value: 25,
          name: '1',
          itemStyle: {
            color: 'transparent',
            borderWidth: 4,
            borderColor: '#ffffff'
          }
        },
        {
          value: 75,
          name: '2',
          itemStyle: {
            color: 'transparent'
          }
        }
      ],
      selectedOffset: 10,
      silent: true,
      labelLine: {
        show: false
      },
      label: {
        show: false
      }
    },
    {
      type: 'pie',
      radius: ['96%', '97%'],
      center: ['68%', '45%'],
      color: ['#007afe', 'transparent', '#007afe', 'transparent', '#007afe', 'transparent'],
      data: [
        {
          value: 17,
          name: '11'
        },
        {
          value: 17,
          name: '22'
        },
        {
          value: 17,
          name: '33'
        },
        {
          value: 17,
          name: '44'
        },
        {
          value: 17,
          name: '55'
        },
        {
          value: 17,
          name: '66'
        }
      ],
      silent: true,
      labelLine: {
        show: false
      },
      label: {
        show: false
      }
    },
    {
      type: 'pie',
      zlevel: 0,
      silent: true,
      radius: ['45%', '46%'],
      center: ['68%', '45%'],
      z: 10,
      label: {
        show: false
      },
      labelLine: {
        show: false
      },
      data: [{
        value: 10,
        itemStyle: {
          color: '#fff',
          borderWidth: 0,
          borderColor: 'rgba(0,0,0,0)'
        }
      }]
    }
  ]
}

const statChartRef = shallowRef<HTMLElement>()
const [chart] = useEcharts(options, statChartRef)

function resize() {
  chart.value?.resize()
}

defineExpose({ resize })
</script>
