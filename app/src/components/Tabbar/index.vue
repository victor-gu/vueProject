<template>
  <div class="tabbar">
    <van-tabbar v-model="active" @change="change">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="friends-o">分类</van-tabbar-item>
      <van-tabbar-item icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

export default {
  name: 'Tabbar',
  data() {
    return {
      active: 2
    }
  },
  methods: {
    change(params) {
      if (params === 0) {
        this.$router.push({ name: 'Home' });
      } else if (params === 1) {
        this.$router.push({ name: 'Category' });
      } else {
        this.$router.push({ name: 'My' });
      }
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
