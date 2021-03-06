<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="off" label-position="left">

      <!-- 解决Chrome自动填充问题 start -->
      <div style="width:0px; height:0px; overflow: hidden;">
        <el-input name="username" type="text" tabindex="1" autocomplete="on" />
        <el-input :key="passwordType" :type="passwordType" name="password" autocomplete="on" />
      </div>
      <!-- 解决Chrome自动填充问题 end -->

      <div class="title-container">
        <h3 class="title">TeAmoly</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入邮箱或手机号码"
          name="username"
          type="text"
          tabindex="2"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          tabindex="3"
          autocomplete="off"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" tabindex="4" style="width:100%; height:47px; border-radius:30px; font-size:15px;" @click.native.prevent="handleLogin">立即登陆</el-button>

    </el-form>
    <!-- particles.js container -->
    <div id="particles" />
  </div>
</template>

<script>
import { validEmailOrPhone } from '@/utils/validate';
import particles from './particles';

export default {
  name: 'Login',
  data() {
    // 验证用户名
    const validateUsername = (rule, value, callback) => {
      if (!validEmailOrPhone(value)) {
        callback(new Error('请输入正确的邮箱或手机号码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    // 监听路由
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted() {
    // 动画
    particlesJS('particles', particles) /* global particlesJS */
  },
  methods: {
    // 密码可见
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    // 登陆
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.$message.error('账号或密码有误');
            this.loading = false
          })
        } else {
          this.$message.error('请按提示填写用户名或密码')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
$bg:#4e4e4e;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(0, 0, 0, 0.2);
    border-radius: 30px;
    padding: 0 10px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$dark_gray:#fff;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background: url('../../assets/login/login-bg.jpg') center no-repeat;
  background-size: cover;
  overflow: hidden;
  .login-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -65%);
    width: 410px;
    overflow: hidden;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 30px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  #particles {
    width: 100vw;
    height: 100vh;
    background-color: transparent;
    background-size: cover;
    background-position: 50% 50%;
    background-repeat: no-repeat;
  }
}
</style>
