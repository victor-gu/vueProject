// 数据  { title: '今日新增加油机', total: 100, reality: 40 }
<!-- 环形图 -->
<template>
  <div ref="panel" :style="{ height: height, width: width }"/>
</template>

<script>
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入提示框
require('echarts/lib/component/tooltip');
// 防抖
import { debounce } from '@/utils';

export default {
  name: 'Panel',
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
    this.panelConfigure();
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
    panelConfigure() {
      let myChart = echarts.init(this.$refs.panel, 'light');
      this.chart = myChart;
      let self = this;
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            if (params.name.indexOf('新增') > -1) return self.chartData.title + '/总数:' + params.percent + '%';
          }
        },
        title: {
          text: this.chartData.reality,
          subtext: '今日新增',
          bottom: '30%',
          right: 'center',
          textStyle: {
            fontSize: 30,
            fontWeight: 'normal',
            color: '#00f5ff'
          },
          subtextStyle: {
            color: '#000000',
            fontSize: 12,
            fontWeight: 'normal'
          }
        },
        legend: {
          selectedMode: false,
          bottom: '5%',
          icon: 'circle',
          itemWidth: 0,
          itemHeight: 0,
          data: ['新增：' + this.chartData.reality, '总数：' + this.chartData.total]
        },
        series: [{
          type: 'pie',
          radius: ['55%', '65%'],
          labelLine: {
            show: false
          },
          data: [
            {
              name: '新增：' + this.chartData.reality,
              value: this.chartData.reality,
              hoverOffset: 1,
              itemStyle: {
                color: '#00f5ff'
              },
              label: {
                show: false
              }
            },
            {
              name: '总数：' + this.chartData.total,
              value: this.chartData.total - this.chartData.reality,
              markArea: {
                silent: true
              },
              itemStyle: {
                color: '#dcdcdc'
              },
              label: {
                show: false
              }
            }
          ]
        }]
      });
      this.chart.resize();
    },
    // 异步加载数据
    asyncSetOptions(val) {
      this.chart.setOption({
        title: {
          text: this.chartData.reality
        },
        legend: {
          data: ['新增：' + this.chartData.reality, '总数：' + this.chartData.total]
        },
        series: [{
          data: [
            {
              name: '新增：' + this.chartData.reality,
              value: this.chartData.reality,
              hoverOffset: 1,
              itemStyle: {
                color: '#00f5ff'
              },
              label: {
                show: false
              }
            },
            {
              name: '总数：' + this.chartData.total,
              value: this.chartData.total - this.chartData.reality,
              markArea: {
                silent: true
              },
              itemStyle: {
                color: '#dcdcdc'
              },
              label: {
                show: false
              }
            }
          ]
        }]
      });
    }
  }
};
</script>
