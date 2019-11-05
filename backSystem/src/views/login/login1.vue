<template>
  <div class="login-container1">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="off" label-position="left">

      <!-- 解决Chrome自动填充问题 start -->
      <div style="width:0px; height:0px; overflow: hidden;">
        <el-input name="username" type="text" tabindex="1" autocomplete="on" />
        <el-input :key="passwordType" :type="passwordType" name="password" autocomplete="on" />
      </div>
      <!-- 解决Chrome自动填充问题 end -->

      <div class="title-container">
        <p class="title">TeAmoly</p>
        <p class="forShort">TeAmoly</p>
      </div>

      <div class="content">

        <p class="hint">管理员账号：</p>

        <!-- 用户名 -->
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model.trim="loginForm.username"
            placeholder="请输入邮箱或手机号码"
            name="username"
            type="text"
            tabindex="2"
            autocomplete="off"
          />
        </el-form-item>

        <p class="hint">管理员密码：</p>

        <!-- 密码 -->
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model.trim="loginForm.password"
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

        <el-button :loading="loading" type="primary" class="submit" tabindex="4" @click.native.prevent="handleLogin">立即登录</el-button>
      </div>

    </el-form>
    <!-- particles.js container -->
    <div id="particles" />
  </div>
</template>

<script>
import { validEmailOrPhone } from '@/utils/validate';
import particles from './particles';

export default {
  name: 'Login1',
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
$bg:#fff;
$light_gray:#000;
$cursor: #000;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container1 .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container1 {
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
      height: 43px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    height: 44px;
    border-bottom: 1px solid #d7dde4;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
.login-container1 {
  min-height: 100%;
  width: 100%;
  background: url('../../assets/login/login-bg1.jpg') center no-repeat;
  background-size: cover;
  overflow: hidden;
  .login-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 450px;
    background: #fff;
    overflow: hidden;
    padding: 60px 0;
    box-shadow: 0 5px 20px rgba(19, 32, 48, 0.25);
    border-bottom: 5px #009688 solid;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #4f5f6f;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    text-align: center;
    border-bottom: 1px #4bcf99 solid;
    padding-bottom: 30px;
    .title {
      font-size: 22px;
      color: #4f5f6f;
      font-weight: 400;
      margin: 0;
      letter-spacing: 10px;
    }
    .forShort{
      font-size: 12px;
      color: #d7dde4;
      letter-spacing: 6px;
      margin: 14px 0 0 0;
    }
  }
  .content{
    padding: 0 60px;
    .hint{
      color: #4f5f6f;
      font-size: 14px;
      margin: 30px 0 2px 0;
    }
    .submit{
      width: 100%;
      height: 40px;
      border-radius: 12px;
      font-size: 15px;
      margin-top: 20px;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: #4f5f6f;
      cursor: pointer;
      user-select: none;
    }
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
