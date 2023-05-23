<template>
  <div class="page-container">
    <el-alert
      :closable="false"
      title="noCache页面"
      type="success"
      effect="dark"
    >
      <el-button @click="() => count++">Page5: {{ count }}</el-button>
    </el-alert>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Page5'
})

console.log('Page5')
const count = ref(0)

</script>
