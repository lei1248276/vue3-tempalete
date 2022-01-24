<template>
  <div class="login-container">
    <el-form
      ref="formRef"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >

      <img
        class="logo"
        src="~@/assets/logo.png"
      >

      <div class="title-container">
        <h3 class="title">商城后台账户登录</h3>
      </div>

      <el-form-item
        prop="username"
        style="border: none;background: transparent;"
      >
        <el-input
          ref="usernameRef"
          v-model="loginForm.username"
          placeholder="请输入用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
          class="form_input"
        />
      </el-form-item>

      <el-form-item
        prop="password"
        style="border: none;background: transparent;"
      >
        <el-input
          :key="passwordType"
          ref="passwordRef"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          class="form_input"
          @keypress.enter="handleLogin"
        />
        <span
          class="show-pwd"
          @click="showPwd"
        >
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        round
        class="login_btn"
        @click.prevent="handleLogin"
      >登录
      </el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<script setup>
import { useRoute, useRouter } from 'vue-router'
const router = useRouter(), route = useRoute()
import { useStore } from 'vuex'
const store = useStore()

const loginForm = reactive({
  username: '',
  password: ''
})
const loginRules = reactive({
  username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
  password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
})

const formRef = ref(undefined)
const usernameRef = ref(undefined)
const passwordRef = ref(undefined)
const loading = ref(false)
const passwordType = ref('password')
const redirect = ref(undefined)

watch(
  () => route,
  (route) => (redirect.value = route.query && route.query.redirect),
  { immediate: true }
)

const showPwd = () => {
  passwordType.value = passwordType.value === 'password' ? '' : 'password'
  nextTick(() => { passwordRef.value.focus() })
}
const handleLogin = () => {
  formRef.value.validate(valid => {
    if (valid) {
      loading.value = true
      store.dispatch('user/login', loginForm)
        .then(() => {
          router.push({ path: redirect.value || '/' })
          loading.value = false
        }).catch(() => {
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
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 60px;
    width: 85%;

    input {
      background: transparent;
      border: 0;
      -webkit-appearance: none;
      color: $light_gray;
      height: 60px;
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
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$title_color: #333;

.login-container {
  width: 100vw;
  min-height: 100vh;
  background-image: url("https://keput.comdao.com.cn:8081/image/cover_admin.png");
  background-size: 64% 100%;
  background-repeat: no-repeat;
  background-position: right;
  overflow: hidden;

  .logo{
    @include wh(222px, 58px);
    margin-bottom: 210px;
  }

  .login-form {
    width: 420px;
    text-align: left;
    @include xMid(10.42%);
    top: 6.48%;
    overflow: hidden;
  }

  .title-container {
    position: relative;

    .title {
      @include fc(32px, $title_color);
      font-weight: bold;
      margin: 10% auto 15%;
      text-align: left;
    }
  }

  .form_input{
    width:100%;
    padding-left: 36px;
    background: #F5F5F5;
    border-radius: 33px;
  }

  .show-pwd {
    position: absolute;
    right: 36px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .login_btn{
    @include wh(180px, 60px);
    font-size: 18px;
    margin-top:6%;
    background: #3C66F5;
    box-shadow: 0 4px 10px rgba(60, 102, 245, 0.65);
    border-radius: 33px;
  }
}
</style>
