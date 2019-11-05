/*
数据：
{
  color: ['#FDFF5C', '#FFDB5C'],
  title: '今日新增',
  value: '1.23e+3'
}
*//
<!-- 饼图 -->
<template>
  <div ref="halfPie" :style="{ height: height, width: width }" />
</template>

<script>
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入饼图
require('echarts/lib/chart/pie');
// 防抖
import { debounce } from '@/utils';

import { numToSn } from '@/utils';

export default {
  name: 'HalfPie',
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
    this.halfPieConfigure();
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
    halfPieConfigure() {
      let myChart = echarts.init(this.$refs.halfPie, 'light');
      this.chart = myChart;
      let self = this;
      myChart.setOption({
        series: [
          {
            name: self.chartData.title,
            type: 'pie',
            radius: ['75%', '90%'],
            startAngle: 225,
            color: [new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: self.chartData.color[0]
            }, {
              offset: 1,
              color: self.chartData.color[1]
            }]), 'transparent'],
            labelLine: {
              normal: {
                show: false
              }
            },
            label: {
              normal: {
                position: 'center'
              }
            },
            data: [
              {
                value: 75,
                name: self.chartData.title,
                label: {
                  normal: {
                    formatter: self.chartData.title,
                    textStyle: {
                      color: '#000',
                      fontSize: 12
                    }
                  }
                }
              },
              {
                value: 25,
                name: '%',
                label: {
                  normal: {
                    formatter: '\n\n' + '0',
                    textStyle: {
                      color: '#007ac6',
                      fontSize: 20
                    }
                  }
                }
              },
              {
                value: 0,
                name: '%',
                label: {
                  normal: {
                    formatter: '',
                    textStyle: {
                      color: '#fff',
                      fontSize: 12
                    }
                  }
                }
              }
            ]
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
            data: [
              {
                value: 75,
                name: val.title
              },
              {
                value: 25,
                name: '%',
                label: {
                  normal: {
                    formatter: '\n\n' + (val.value > 1000 ? numToSn(val.value) : val.value),
                    textStyle: {
                      color: '#007ac6',
                      fontSize: 20
                    }
                  }
                }
              }
            ]
          }
        ]
      });
      if (this.chart) this.chart.resize();
    }
  }
};
</script>
