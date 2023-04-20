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

<script lang="ts">
export default {
  name: 'User'
}
</script>

<style scoped>

</style>
