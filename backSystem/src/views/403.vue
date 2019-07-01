<template>
  <div class="app-container noPermissions">
    <div class="tips">
      您暂无权限访问该页面，请联系管理员
    </div>
    <svg-icon icon-class="noPermissions" />
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .noPermissions{
    .tips{
      font-size: 14px;
      font-weight: bolder;
      font-style: italic;
    }
    svg{
      height: 60vh;
      width: 100%;
    }
  }
</style>
