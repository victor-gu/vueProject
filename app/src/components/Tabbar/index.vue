<template>
  <div class="tabbar">
    <van-tabbar v-model="active" @change="change">
      <van-tabbar-item v-for="(item, index) in routeList" :key="index" :name="item.routeName" :icon="item.icon">{{ item.name }}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

export default {
  name: 'Tabbar',
  data() {
    return {
      active: this.$route.name,
      routeList: [
        {
          name: '首页',
          routeName: 'Home',
          icon: 'wap-home'
        },
        {
          name: '分类',
          routeName: 'Category',
          icon: 'shop'
        },
        {
          name: '我的',
          routeName: 'My',
          icon: 'manager'
        }
      ]
    }
  },
  methods: {
    change(params) {
      this.$router.push({ name: params });
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
