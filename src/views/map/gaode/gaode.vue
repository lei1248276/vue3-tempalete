<template>
  <div
    id="amapRef"
    class="w-full h-[calc(100vh_-_84px)]"
  />
</template>

<script setup lang="ts">
import AMapLoader from '@amap/amap-jsapi-loader'

defineOptions({
  name: 'Gaode'
})

const map = shallowRef()

onMounted(() => {
  AMapLoader.load({
    key: 'e3260cfb6841b95c3c1a7cb6bc0b92b1', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0' // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
  }).then((AMap: any) => {
    map.value = new AMap.Map('amapRef', {
      viewMode: '3D', // 是否为3D地图模式
      zoom: 5, // 初始化地图级别
      center: [105.602725, 37.076636] // 初始化地图中心点位置
    })

    AMap.plugin(['AMap.Scale', 'AMap.ToolBar'], function() { // 异步加载插件
      var Scale = new AMap.Scale()
      map.value.addControl(Scale)
      var toolbar = new AMap.ToolBar()
      map.value.addControl(toolbar)
    })

    const positionArr = [
      [113.357224, 34.977186],
      [114.555528, 37.727903],
      [112.106257, 36.962733],
      [109.830097, 31.859027],
      [116.449181, 39.98614]
    ]
    for (const item of positionArr) {
      const marker = new AMap.Marker({ position: [...item] })
      map.value.add(marker)
    }
  }).catch((e: any) => {
    console.error(e) // 加载错误提示
  })
})
</script>
