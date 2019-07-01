<template>
  <div class="myDialog">
    <el-dialog
      v-dragDialog
      :visible.sync="visibleSync"
      :title="title"
      :width="width"
      :center="center"
    >
      <slot />
      <div slot="footer" class="dialog-footer">
        <el-button @click="visibleSync = false">取 消</el-button>
        <el-button type="primary" @click="comfim">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'MyDialog',
  props: {
    hidden: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '弹窗'
    },
    width: {
      type: String,
      default: '40%'
    },
    center: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    visibleSync: {
      get() {
        return this.hidden;
      },
      set(val) {
        this.$emit('update:hidden', val)
      }
    }
  },
  methods: {
    comfim() {
      this.$emit('comfim', 1);
      this.visibleSync = false;
    }
  }
}
</script>

<style lang="scss">
  .myDialog{
    .el-dialog__body{
      max-height: 450px;
      overflow-y: auto;
    }
  }
</style>
