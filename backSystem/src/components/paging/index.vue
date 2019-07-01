<template>
  <div :class="{'hidden':hidden || !total}" class="pagination-container">
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
      <slot />
    </el-pagination>
  </div>
</template>

<script>
import { scrollTo } from '@/utils/scrollTo';

export default {
  name: 'Paging',
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    size: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50]
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper, slot'
    },
    background: {
      type: Boolean,
      default: false
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.size
      },
      set(val) {
        this.$emit('update:size', val)
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      // 解决执行顺序问题
      setTimeout(() => {
        this.$emit('paging', { page: this.currentPage, size: val })
        if (this.autoScroll) {
          scrollTo(0, 800)
        }
      }, 0);
    },
    handleCurrentChange(val) {
      // 解决执行顺序问题
      setTimeout(() => {
        this.$emit('paging', { page: val, size: this.pageSize })
        if (this.autoScroll) {
          scrollTo(0, 800)
        }
      }, 0);
    }
  }
}
</script>

<style scoped>
.pagination-container {
  background: #fff;
  padding: 32px 16px;
}
.pagination-container.hidden {
  display: none;
}
</style>
