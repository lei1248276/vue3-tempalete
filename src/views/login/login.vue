<template>
  <div class="login w-screen min-h-screen overflow-hidden bg-[url('/src/assets/bg.png')]">
    <el-form
      ref="formRef"
      class="max-md:w-[85%] max-2xl:w-[45%] w-[22%] text-center overflow-hidden mid"
      :model="loginForm"
      :rules="loginRules"
      auto-complete="on"
      label-position="left"
    >
      <!--      <img
        class="login-form__logo"
        src="~@/assets/logo.png"
      >-->

      <h3 class="relative mt-0 mx-auto mb-[15%] text-[32px] text-white font-bold">后台模版</h3>

      <el-form-item prop="username">
        <el-input
          ref="usernameRef"
          v-model="loginForm.username"
          class="w-full bg-[#f5f5f5] rounded-[33px] overflow-hidden"
          placeholder="请输入用户名: admin / editor"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          ref="passwordRef"
          :key="passwordType"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码: admin / editor"
          name="password"
          tabindex="2"
          auto-complete="on"
          class="w-full bg-[#f5f5f5] rounded-[33px] overflow-hidden"
          @keypress.enter="handleLogin"
        />
        <SvgIcon
          :icon-class="passwordType ? 'eye' : 'eye-open'"
          class-name="y-mid right-[36px] text-[16px] text-[#889aa4] cursor-pointer select-none"
          @click="showPwd"
        />
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        class="w-full h-[60px] text-[18px] mt-[6%] bg-[#3C66F5] rounded-[33px]"
        @click.prevent="handleLogin"
      >
        登录
      </el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'

defineOptions({
  name: 'Login'
})

const router = useRouter()
const userStore = useUserStore()

const loginRules = {
  username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
  password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
}

const loginForm = ref({ username: '', password: '' })
const loading = ref(false)
const passwordType = ref<'password' | ''>('password')

const formRef = ref<FormInstance>()
const usernameRef = ref<HTMLInputElement>()
const passwordRef = ref<HTMLInputElement>()

function showPwd() { // * 动态控制Input标签type类型（为了浏览器密码提示）
  passwordType.value = passwordType.value ? '' : 'password'
  nextTick(() => { passwordRef.value?.focus() })
}
function handleLogin() {
  formRef.value?.validate((valid: boolean) => {
    if (!valid) {
      console.log('error submit!!')
      return false
    }

    loading.value = true
    userStore.login(loginForm.value)
      .then(() => {
        router.push({ path: '/', replace: true })
      }).finally(() => {
        loading.value = false
      })
  })
}
</script>

<style lang="scss">
$input-bg:#F5F5F5;
$text-color:#333;

@supports (-webkit-mask: none) and (not (cater-color: $text-color)) {
  .login .el-input input {
    color: $text-color;
  }
}

.login {
  .el-input {
    height: 60px;

    &__wrapper{
      background-color: inherit;
      box-shadow: none;
      border-radius: 33px;

      input {
        -webkit-appearance: none;
        color: $text-color;
        caret-color: $text-color;
        text-indent: 20px;

        // ! 隐藏浏览器自动填充的颜色
        &:-webkit-autofill,
        &:-webkit-autofill:hover,
        &:-webkit-autofill:focus,
        &:-webkit-autofill:active {
          box-shadow: 0 0 0px 1000px $input-bg inset;
          -webkit-text-fill-color: $text-color;
        }
      }
    }
  }
}
</style>
