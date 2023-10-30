<template>
  <div class="w-[300px]">
    当前时间：{{ time }}
  </div>
</template>

<script setup lang="ts">
import { parseTime } from '@/utils'

const time = ref(parseTime(new Date()))

const timer = setInterval(() => {
  time.value = parseTime(new Date())
}, 1000)

onUnmounted(() => { clearInterval(timer) })
</script>
