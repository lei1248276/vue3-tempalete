<template>
  <div
    id="baiduRef"
    class="w-full h-[calc(100vh_-_84px)]"
  />
</template>

<script setup lang="ts">
defineOptions({
  name: 'Baidu'
})

;(window as any).BMAP_PROTOCOL = 'https';
(window as any).BMap_loadScriptTime = new Date().getTime()
const BAI_DU_MAP_URL = 'https://api.map.baidu.com/getscript?v=3.0&ak=uiEul1IBO29C6OEwDAunXXvEs0pIRNV9&services=&t=20230512140248'

useScriptTag(
  BAI_DU_MAP_URL,
  () => {
    nextTick(() => {
      // 百度地图API功能
      const BMap = (window as any).BMap
      const map = new BMap.Map('baiduRef') // 创建Map实例
      const point = new BMap.Point(116.331398, 39.897445)
      map.centerAndZoom(point, 12) // 初始化地图,用城市名设置地图中心点

      function myFun(result: any) {
        const cityName = result.name
        map.setCenter(cityName)
      }
      const myCity = new BMap.LocalCity()
      myCity.get(myFun)
    })
  }
)
</script>
