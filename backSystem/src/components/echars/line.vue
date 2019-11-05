/*
数据：
{
  title: '今日新增',
  xTitle: [1, 2, 4],
  value: [1, 2, 3]
}
*//
<!-- 饼图 -->
<template>
  <div ref="liquidFill" :style="{ height: height, width: width }" />
</template>

<script>
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入标题
require('echarts/lib/component/title');
// 引入线图
require('echarts/lib/chart/line');
// 引入提示框
require('echarts/lib/component/tooltip');
// 防抖
import { debounce } from '@/utils';

export default {
  name: 'LiquidFill',
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null,
      sidebarElm: null
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.asyncSetOptions(val)
      }
    }
  },
  mounted() {
    this.liquidFillConfigure();
    // 自适应
    if (this.autoResize) {
      this.__resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize();
        }
      }, 100);
      window.addEventListener('resize', this.__resizeHandler);
    }
    // 监听侧边栏的变化
    this.sidebarElm = document.getElementsByClassName('sidebar-container')[0];
    this.sidebarElm && this.sidebarElm.addEventListener('transitionend', this.sidebarResizeHandler);
  },
  beforeDestroy() {
    if (!this.chart) return;
    if (this.autoResize) window.removeEventListener('resize', this.__resizeHandler);
    this.sidebarElm && this.sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    sidebarResizeHandler(e) {
      if (e.propertyName === 'width') this.__resizeHandler();
    },
    liquidFillConfigure() {
      let myChart = echarts.init(this.$refs.liquidFill, 'light');
      this.chart = myChart;
      let self = this;
      myChart.setOption({
        title: {
          text: self.chartData.title,
          left: 100,
          top: 10
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [{
          type: 'line',
          smooth: true,
          data: []
        }]
      });
      this.chart.resize();
    },
    // 异步数据
    asyncSetOptions(val) {
      this.chart.setOption({
        xAxis: {
          data: val.xTitle
        },
        series: [{
          data: val.value
        }]
      });
      if (this.chart) this.chart.resize();
    }
  }
};
</script>
