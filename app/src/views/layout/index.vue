<template>
  <div class="layout">
    <transition :name="transitionName">
      <router-view />
    </transition>
    <Tabbar />
  </div>
</template>

<script>

export default {
  name: 'Layout',
  computed: {
    transitionName() {
      return this.$store.state.direction.direction
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
