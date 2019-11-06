<!-- home -->
<template>
  <div class="app-container">
    <van-swipe :autoplay="3000" class="swipe">
      <van-swipe-item>
        <img v-lazy="'https://img.yzcdn.cn/vant/apple-1.jpg'">
      </van-swipe-item>
      <van-swipe-item>
        <img v-lazy="'https://img.yzcdn.cn/vant/apple-2.jpg'">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>

export default {
  name: 'Home'
}

</script>
<style lang='scss' scoped>
.swipe{
  height: 240px;
  img{
    width: 100%;
    height: 100%;
  }
}
</style>
