<template>
  <div class="page-container">
    <el-card>
      <div class="p-2">
        你的权限：
        <span class="font-bold text-lg">"{{ role }}"</span>
      </div>
      <div class="p-2">
        权限切换：
        <el-button
          type="primary"
          size="large"
          :disabled="role === 'admin'"
          @click="onSwitchRole({ username: 'admin', password: 'admin'})"
        >
          admin
        </el-button>
        <el-button
          type="primary"
          size="large"
          :disabled="role === 'editor'"
          @click="onSwitchRole({ username: 'editor', password: 'editor'})"
        >
          editor
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { getToken } from '@/utils/auth'

defineOptions({
  name: 'AuthSwitch'
})

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const role = getToken()?.split('-').shift()

async function onSwitchRole(loginForm: { username: string, password: string }) {
  await userStore.logout()
  await userStore.login(loginForm)
  router.replace({ path: '/redirect' + route.fullPath })
}
</script>
