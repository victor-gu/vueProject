function edgeSelectMixin() {}

edgeSelectMixin.install = function(Vue) {
  Vue.mixin({
    created() {
      if (this.$options.name === 'ElSelect') {
        // 处理edge浏览器select问题
        this.$on('visible-change', function(isVisible) {
          const isEdge = window.navigator.userAgent.includes('Edge');
          if (isEdge && !isVisible) {
            document.querySelectorAll('body > .el-select-dropdown.el-popper').forEach((it) => it.remove());
          }
        });
      }
    }
  });
}

export default edgeSelectMixin;
