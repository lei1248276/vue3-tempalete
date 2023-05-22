<template>
  <div class="app_container">
    <el-button
      type="primary"
      @click="$router.push('/test2')"
    >
      跳转test2
    </el-button>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Role'
})
console.log('Role')

</script>
