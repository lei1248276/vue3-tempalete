<template>
  <div class="app_container">
    <el-button
      type="primary"
      @click="$router.push('/login')"
    >跳转login</el-button>
    <el-button
      type="primary"
      @click="$router.push('/test')"
    >跳转test</el-button>
    <el-button
      type="primary"
      @click="$router.push('/test2')"
    >跳转test2</el-button>

    <el-button
      type="primary"
      @click="resetRouter"
    >resetRouter</el-button>

    <el-button @click="calcCount">{{ count }}</el-button>
    <el-button @click="calcAge">{{ person.age }}</el-button>
  </div>
</template>

<script>
export default {
  name: 'Dashboard'
}
</script>

<script setup>
// import { ref, reactive, onMounted, watch } from 'vue'
import { resetRouter } from '@/router'

/* onMounted(() => {
  console.log('onMounted')
  resetRouter()
})*/
const count = ref(0)
const person = reactive({ age: 1 })
const calcCount = () => count.value++
const calcAge = () => person.age++

watch(
  () => person.age,
  (v) => console.log('%c🚀 ~ file: index ~ method: person.age ~', 'color: #F25F5C;font-weight: bold;', v)
)
watch(
  count,
  (v) => console.log('%c🚀 ~ file: index ~ method: count ~', 'color: #F25F5C;font-weight: bold;', v)
)
</script>
