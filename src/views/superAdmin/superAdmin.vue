<template>
  <div class="app_container">
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
  name: 'SuperAdmin'
})

console.log('SuperAdmin')

</script>
