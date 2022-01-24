<template>
  <div class="navbar">
    <hamburger
      :is-active="getters.sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="getters.device!=='mobile'">
        <search
          id="header-search"
          class="right-menu-item"
        />

        <el-tooltip
          content="全屏显示"
          effect="dark"
          placement="bottom"
        >
          <screenfull
            id="screenfull"
            class="right-menu-item hover-effect"
          />
        </el-tooltip>

      </template>

      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper divider_left">
          <img
            :src="getters.avatar"
            class="user-avatar"
          >
          <span class="user_name">{{ getters.name }}</span>
          <svg-icon
            icon-class="caret_bottom"
            class-name="caret_bottom"
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
              href="https://github.com/lei1248276/JiaGu-Admin"
            >
              <el-dropdown-item>Github</el-dropdown-item>
            </a>
            <el-dropdown-item
              divided
              @click.native="logout"
            >
              <span style="display:block;">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<script setup>
import { Breadcrumb, Hamburger, Screenfull, Search } from '@/components'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter(), route = useRoute()
import { useStore } from 'vuex'
const store = useStore()

const getters = ['sidebar', 'avatar', 'name', 'device'].reduce((acc, cur) => {
  acc[cur] = computed(() => store.getters[cur])
  return acc
}, {})

const toggleSideBar = () => { store.dispatch('app/toggleSideBar') }
const logout = async() => {
  await store.dispatch('user/logout')
  router.push(`/login?redirect=${route.fullPath}`)
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        padding-left: 20px;

        .user_name{
          display: inline-block;
          vertical-align: middle;
          min-height: 40px;
          margin-left: 5px;
        }

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .caret_bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 20px;
          @include wh(12px, 13px);
        }
      }
    }
  }
}
</style>
