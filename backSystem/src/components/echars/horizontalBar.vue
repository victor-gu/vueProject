// 数据  { xTitle: '金额', content: { '#92 汽油': 1230, '#95 汽油': 2365, '#98 汽油': 5425, '柴油': 1201 } }
<!-- 环形图 -->
<template>
  <div ref="horizontalBar" :style="{ height: height, width: width }" />
</template>

<script>
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
// 防抖
import { debounce } from '@/utils';

export default {
  name: 'HorizontalBar',
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
    this.horizontalBarConfigure();
    // 自适应
    if (this.autoResize) {
      this.__resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize()
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
    horizontalBarConfigure() {
      let myChart = echarts.init(this.$refs.horizontalBar, 'light');
      this.chart = myChart;
      let self = this;
      myChart.setOption({
        grid: {
          left: '8%',
          right: '10%',
          top: '12%',
          bottom: '18%',
          containLabel: true
        },
        yAxis: {
          data: self.chartData.content && Object.keys(self.chartData.content)
        },
        xAxis: [
          {
            name: self.chartData.xTitle,
            axisTick: {
              show: false
            },
            type: 'value'
          }
        ],
        series: [
          {
            type: 'bar',
            barWidth: '55%',
            label: {
              normal: {
                show: true,
                position: 'right',
                textStyle: {
                  color: 'black'
                }
              }
            },
            data: self.chartData.content && Object.values(self.chartData.content)
          }
        ]
      });
      this.chart.resize();
    },
    // 异步加载数据
    asyncSetOptions(val) {
      this.chart.setOption({
        yAxis: {
          data: val.content && Object.keys(val.content)
        },
        xAxis: [
          {
            name: val.xTitle
          }
        ],
        series: [
          {
            data: val.content && Object.values(val.content)
          }
        ]
      });
      if (this.chart) this.chart.resize();
    }
  }
};
</script>
