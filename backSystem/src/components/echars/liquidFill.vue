/*
数据：{ value: 0 }
*/
<!-- 饼图 -->
<template>
  <div ref="liquidFill" :style="{ height: height, width: width }" />
</template>

<script>
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入水晶球
import 'echarts-liquidfill/src/liquidFill.js';
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
        series: [
          {
            type: 'liquidFill',
            radius: '85%',
            center: ['50%', '50%'],
            data: new Array(4).fill(self.chartData.value),
            itemStyle: {
              normal: {
                opacity: 0.4,
                shadowBlur: 0,
                shadowColor: 'blue'
              }
            },
            backgroundStyle: {
              color: '#fff'
            },
            outline: {
              itemStyle: {
                borderColor: '#86c5ff',
                borderWidth: 2
              },
              borderDistance: 0
            },
            label: {
              normal: {
                formatter: (self.chartData.value * 100).toFixed(2) + '%',
                textStyle: {
                  fontSize: 20
                }
              }
            }
          }
        ]
      });
      this.chart.resize();
    },
    // 异步数据
    asyncSetOptions(val) {
      this.chart.setOption({
        series: [
          {
            data: new Array(4).fill(val.value),
            label: {
              normal: {
                formatter: (val.value * 100).toFixed(2) + '%'
              }
            }
          }
        ]
      });
      if (this.chart) this.chart.resize();
    }
  }
};
</script>
