<template>
  <div class="h-[50px] bg-white-1 shadow-[0_1px_4px_rgba(0,21,41,.08)] flex justify-between items-center">
    <div class="flex items-center">
      <Hamburger
        :is-active="appStore.sidebar.opened"
        class="cursor-pointer"
        @toggleClick="appStore.toggleSideBar"
      />

      <Breadcrumb />
    </div>

    <div class="flex items-center gap-x-[16px]">
      <template v-if="appStore.device !== 'mobile'">
        <HeaderSearch class="text-[18px] text-black-1" />

        <el-tooltip
          content="全屏显示"
          effect="dark"
          placement="bottom"
        >
          <Screenfull class="text-[18px] text-black-1 cursor-pointer" />
        </el-tooltip>
      </template>

      <el-dropdown
        class="h-full text-[18px] text-black-1 cursor-pointer border-l-2 border-[#CBCBCB]"
        trigger="click"
      >
        <div class="flex items-center gap-x-3 mx-[30px]">
          <img
            :src="userStore.avatar"
            class="w-[40px] h-[40px] rounded-[10px] cursor-pointer"
          >

          <p>{{ userStore.username }}</p>

          <SvgIcon
            icon-class="caret_bottom"
            class-name="cursor-pointer"
          />
        </div>

        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>
                首页
              </el-dropdown-item>
            </router-link>

            <a
              target="_blank"
              href="https://github.com/lei1248276/vue3-tempalete"
            >
              <el-dropdown-item>Github</el-dropdown-item>
            </a>

            <el-dropdown-item
              divided
              @click="logout"
            >
              <p>退出登录</p>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Navbar'
}
</script>

<script setup lang="ts">

const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()

const logout = async() => {
  await userStore.logout()
  router.replace({ path: '/login', replace: true })
}
</script>
