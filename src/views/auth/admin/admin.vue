<template>
  <div class="page-container">
    <el-button
      type="primary"
      @click="$router.push('/dashboard')"
    >
      跳转dashboard
    </el-button>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Admin'
})

console.log('admin')

</script>
