<template>
  <SvgIcon
    :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
    @click="onClick"
  />
</template>

<script lang="ts">
export default {
  name: 'Screenfull'
}
</script>

<script setup lang="ts">
import screenfull from 'screenfull'

onMounted(() => { init() })
onUnmounted(() => { destroy() })

const isFullscreen = ref<boolean>(false)

function onClick() {
  if (!screenfull.isEnabled) {
    ElMessage({
      message: '你的浏览器不能执行',
      type: 'warning'
    })
    return false
  }
  screenfull.toggle()
}
function onChange() {
  isFullscreen.value = screenfull.isFullscreen
}

function init() {
  if (screenfull.isEnabled) {
    screenfull.on('change', onChange)
  }
}

function destroy() {
  if (screenfull.isEnabled) {
    screenfull.off('change', onChange)
  }
}
</script>
