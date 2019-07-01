<template>
  <el-table v-loading="loading" :data="data" :header-cell-style="{background:'#F5F7FA'}" highlight-current-row style="width: 100%;" stripe border>
    <slot />
  </el-table>
</template>

<script>
export default {
  name: 'MyTable',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>
.sortable-ghost{
  opacity: .8;
  color: #fff!important;
  background: #42b983!important;
}
</style>
