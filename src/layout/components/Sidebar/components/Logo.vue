<template>
  <div
    class="relative w-full h-[50px] leading-[50px] p-1 first-letter:text-center overflow-hidden"
    :class="{'collapse':collapse}"
  >
    <transition name="sidebarLogoFade">
      <router-link
        key="expand"
        class="w-full h-full"
        to="/"
      >
        <img
          :src="logo"
          class="w-full h-full"
        >
      </router-link>
    </transition>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SidebarLogo'
}
</script>

<script setup lang="ts">
defineProps<{
  collapse: boolean
}>()

const logo = ref<string>('https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png')

</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.collapse {
  visibility: visible;
  // .sidebar-logo {

  // }
}
</style>
