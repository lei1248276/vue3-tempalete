<template>
  <div class="page-container">
    <j-table
      :data="table"
      :column-props="column"
    />
  </div>
</template>

<script setup lang="ts">
import { getRoles } from '@/api/user'

defineOptions({
  name: 'Role'
})

fetchRoles()

const table = ref([])
const column = [
  { type: 'index', label: '序号', width: 70 },
  { prop: 'name', label: '角色' },
  { prop: 'description', label: '角色描述' }
]

async function fetchRoles() {
  const { result } = await getRoles()
  console.log('🚀 ~ file: role.vue:21 ~ fetchRoles ~ data:', Object.values(result))
  table.value = Object.values(result)
}

</script>
