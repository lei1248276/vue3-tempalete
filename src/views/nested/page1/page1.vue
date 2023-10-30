<template>
  <div class="page-container">
    <el-alert
      :closable="false"
      title="cache页面"
      type="success"
      effect="dark"
    >
      <el-button @click="() => count++">Page1: {{ count }}</el-button>
    </el-alert>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Page1'
})

console.log('Page1')
const count = ref(0)

</script>
