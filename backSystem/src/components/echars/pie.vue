// 数据  [{name: '', value: 100}]
<!-- 饼图 -->
<template>
  <div ref="pie" :style="{ height: height, width: width }"/>
</template>

<script>
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入提示框
require('echarts/lib/component/tooltip');
// 防抖
import { debounce } from '@/utils';

export default {
  name: 'Pie',
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
      type: Array,
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
    this.pieConfigure();
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
    pieConfigure() {
      let myChart = echarts.init(this.$refs.pie, 'light');
      this.chart = myChart;
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          left: '10',
          top: '6',
          pageIconSize: 10,
          tooltip: {
            show: true
          },
          data: this.chartData.map(value => { return value.name })
        },
        series: [
          {
            name: '今日报警数量 / 总数',
            type: 'pie',
            radius: '55%',
            center: this.chartData.length <= 3 ? ['50%', '50%'] : ['60%', '50%'],
            data: this.chartData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
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
        legend: {
          data: val.map(value => { return value.name })
        },
        series: [
          {
            type: 'pie',
            data: val
          }
        ]
      });
    }
  }
};
</script>
