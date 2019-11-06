<!-- home -->
<template>
  <div class="app-container">
    <p>TeAmoly</p>
    <van-cell-group>
      <van-field v-model="username" label="用户名" clearable placeholder="请输入用户名" />
      <van-field v-model="password" label="密码" clearable type="password" placeholder="请输入密码" />
    </van-cell-group>
    <van-button type="primary" round size="large" @click="login">登陆</van-button>
  </div>
</template>

<script>
import { Toast } from 'vant';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
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
  methods: {
    login() {
      if (!this.username) {
        Toast('请输入用户名');
      } else if (!this.password) {
        Toast('请输入密码');
      } else {
        this.$store.dispatch('Login', { username: this.username, password: this.password }).then((res) => {
          if (res.id) { this.$router.push({ path: this.redirect || '/' }) }
        }).catch((err) => {
          if (err.response.status === 404 || err.response.status === 401) {
            Toast('账号或密码有误');
          }
        });
      }
    }
  }
}

</script>
<style lang='scss' scoped>
p{
  font-size: 20px;
  font-weight: bolder;
  text-align: center;
}
</style>
