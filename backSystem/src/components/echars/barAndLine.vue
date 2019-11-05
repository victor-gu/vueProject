/*
数据：
{
  title: '油品销售分析',
  leftYTitle: '升数',
  rightYTitle: '总金额',
  category: ['汽油', '柴油'],
  category1: ['总销量', '总金额'],
  legend: ['汽油', '柴油', '总金额', '总销量'],
  xAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  '汽油': [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4],
  '柴油': [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4],
  '总金额': [11, 22, 31, 41, 11, 21, 31, 41, 11, 21, 31, 41],
  '总销量': [12, 22, 32, 42, 12, 22, 32, 42, 12, 22, 32, 42]
}
*/
<!-- 柱状图和线形图结合 -->
<template>
  <div ref="barAndLine" :style="{ height: height, width: width }" />
</template>

<script>
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入提示框
require('echarts/lib/component/tooltip');
// 引入说明框
require('echarts/lib/component/legend');
// 引入标题
require('echarts/lib/component/title');
// 引入柱状图
require('echarts/lib/chart/bar');
// 引入线图
require('echarts/lib/chart/line');
// 引入收缩组件
require('echarts/lib/component/dataZoom');
// 防抖
import { debounce } from '@/utils';

export default {
  name: 'BarAndLine',
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
    this.barAndLineConfigure();
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
    barAndLineConfigure() {
      let myChart = echarts.init(this.$refs.barAndLine, 'light');
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
        legend: {
          show: true,
          data: self.chartData.legend,
          top: 10,
          right: 'center'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: self.chartData.xAxis
        }],
        yAxis: [
          {
            type: 'value',
            name: self.chartData.leftYTitle
          },
          {
            type: 'value',
            name: self.chartData.rightYTitle
          }
        ],
        dataZoom: [
          {
            show: true,
            realtime: true,
            startValue: [0],
            endValue: [9],
            xAxisIndex: [0]
          },
          {
            type: 'inside',
            realtime: true,
            startValue: [0],
            endValue: [9],
            xAxisIndex: [0]
          }
        ]
      });
      this.chart.resize();
    },
    // 异步加载数据
    asyncSetOptions(val) {
      let category = val.category.map(item => {
        return {
          name: item,
          type: 'bar',
          data: val[item],
          itemStyle: {
            normal: {
              barBorderRadius: [10, 10, 10, 10],
              borderWidth: 1,
              borderType: 'solid'
            }
          }
        }
      });
      this.chart.setOption({
        legend: {
          data: val.legend
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        title: {
          text: val.title,
          left: 100,
          top: 10
        },
        xAxis: [{
          data: val.xAxis
        }],
        yAxis: [
          {
            type: 'value',
            name: val.leftYTitle
          },
          {
            type: 'value',
            name: val.rightYTitle
          }
        ],
        dataZoom: [
          {
            show: true,
            realtime: true,
            startValue: [0],
            endValue: [9],
            xAxisIndex: [0]
          },
          {
            type: 'inside',
            realtime: true,
            startValue: [0],
            endValue: [9],
            xAxisIndex: [0]
          }
        ],
        series: [
          ...category,
          {
            name: val.category1[0],
            type: 'line',
            data: val[val.category1[0]],
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(0, 136, 212, 0.2)'
                }, {
                  offset: 1,
                  color: 'rgba(0, 136, 212, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: 'rgb(0,136,212)',
                borderColor: 'rgba(0,136,212,0.2)',
                borderWidth: 12
              }
            }
          },
          {
            name: val.category1[1],
            yAxisIndex: 1,
            type: 'line',
            data: val[val.category1[1]],
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#00FFE3'
                }, {
                  offset: 1,
                  color: 'rgba(0, 136, 212, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: 'rgba(0,154,120,1)',
                borderColor: '#00FFE3',
                borderWidth: 12
              }
            }
          }
        ]
      }, true);
      if (this.chart) this.chart.resize();
    }
  }
};
</script>
