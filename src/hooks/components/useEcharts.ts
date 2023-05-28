import echarts from '@/utils/lib/echarts'
import type { ShallowRef } from 'vue'

export default function useEcharts(
  options: echarts.EChartsCoreOption,
  ref: ShallowRef<HTMLElement | undefined> | Ref<HTMLElement | undefined>,
  theme?: string | object
) {
  const chart = shallowRef<ReturnType<typeof echarts.init>>()

  onMounted(() => {
    nextTick(() => { initChart() })
  })
  onUnmounted(() => {
    chart.value && chart.value.dispose()
  })

  function initChart() {
    if (!ref.value) return

    chart.value = echarts.init(ref.value, theme)
    chart.value.setOption(options)
  }

  function resize() {
    chart.value && chart.value.resize()
  }

  return { chart, resize }
}
