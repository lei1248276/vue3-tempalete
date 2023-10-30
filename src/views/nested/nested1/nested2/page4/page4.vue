<template>
  <div class="page-container">
    <el-alert
      :closable="false"
      title="noCache页面"
      type="error"
      effect="dark"
    >
      <el-button @click="() => count++">Page4: {{ count }}</el-button>
    </el-alert>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Page4'
})

console.log('Page4')
const count = ref(0)

</script>
