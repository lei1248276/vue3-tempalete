<template>
  <div class="login">
    <el-form
      ref="formRef"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <!--      <img
        class="login-form__logo"
        src="~@/assets/logo.png"
      >-->

      <h3 class="login-form__title">后台模版</h3>

      <el-form-item prop="username">
        <el-input
          ref="usernameRef"
          v-model="loginForm.username"
          placeholder="请输入用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
          class="login-form__input"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          ref="passwordRef"
          :key="passwordType"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          class="login-form__input"
          @keypress.enter="handleLogin"
        />
        <SvgIcon
          :icon-class="passwordType ? 'eye' : 'eye-open'"
          class-name="password--show"
          @click="showPwd"
        />
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        round
        class="login-form__btn"
        @click.prevent="handleLogin"
      >
        登录
      </el-button>
    </el-form>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Login'
}
</script>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'

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
    if (valid) {
      loading.value = true
      userStore.login(loginForm.value)
        .then(() => {
          router.push({ path: '/', replace: true })
        }).finally(() => {
          loading.value = false
        })
    } else {
      console.log('error submit!!')
      return false
    }
  })
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#889aa4;
$light_gray:#999999;
$cursor: #999999;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login {
  .el-input {
    height: 60px;

    &__wrapper{
      background-color: inherit;
      box-shadow: none;

      input {
        -webkit-appearance: none;
        color: $light_gray;
        caret-color: $cursor;

        // ! 隐藏浏览器自动填充的颜色
        &:-webkit-autofill,
        &:-webkit-autofill:hover,
        &:-webkit-autofill:focus,
        &:-webkit-autofill:active,{
          -webkit-transition-delay: 99999s;
          -webkit-transition: color 99999s ease-out, background-color 99999s ease-out;
          //box-shadow: 0 0 0px 1000px $bg inset !important;
          //-webkit-text-fill-color: $cursor !important;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$title_color: #333;

.login {
  width: 100vw;
  min-height: 100vh;
  //background-image: url("https://keput.comdao.com.cn:8081/image/cover_admin.png");
  //background-size: 64% 100%;
  //background-repeat: no-repeat;
  //background-position: right;
  background-color: gray;
  overflow: hidden;

  &-form {
    width: 420px;
    text-align: left;
    @include xMid(10.42%);
    top: 6.48%;
    overflow: hidden;

    &__logo{
      @include wh(222px, 58px);
      margin-bottom: 210px;
    }

    &__title {
      position: relative;
      @include fc(32px, $title_color);
      font-weight: bold;
      margin: 10% auto 15%;
      text-align: left;
    }

    &__input{
      width:100%;
      padding-left: 36px;
      background: #F5F5F5;
      border-radius: 33px;
      overflow: hidden;
    }

    &__btn{
      @include wh(180px, 60px);
      font-size: 18px;
      margin-top:6%;
      background: #3C66F5;
      box-shadow: 0 4px 10px rgba(60, 102, 245, 0.65);
      border-radius: 33px;
    }
  }
}

.password--show {
  position: absolute;
  right: 36px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: $dark_gray;
  cursor: pointer;
  user-select: none;
}
</style>
