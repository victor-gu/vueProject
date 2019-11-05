/*
数据：
{
  name: '消费占比',
  content: [
    { value: 335, legendname: '会员', name: '会员' },
    { value: 310, legendname: '非会员', name: '非会员' }
  ]
}
*//
<!-- 饼图 -->
<template>
  <div ref="pie" :style="{ height: height, width: width }" />
</template>

<script>
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入饼图
require('echarts/lib/chart/pie');
// 引入提示框
require('echarts/lib/component/tooltip');
// 引入说明框
require('echarts/lib/component/legendScroll');
// 防抖
import { debounce } from '@/utils';

import { numToSn } from '@/utils';

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
      let self = this;
      myChart.setOption({
        title: [
          {
            text: '总金额',
            subtext: '0',
            textStyle: {
              fontSize: 20,
              color: 'black'
            },
            subtextStyle: {
              fontSize: 14,
              color: 'black'
            },
            textAlign: 'center',
            x: '34.5%',
            y: '42%'
          }
        ],
        tooltip: {
          trigger: 'item',
          formatter: function(parms) {
            var str = parms.seriesName + '</br>' +
            parms.marker + '' + parms.data.legendname + '</br>' +
            '金额：' + parms.data.value + '</br>' +
            '占比：' + parms.percent + '%';
            return str;
          }
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: 10,
          bottom: 10,
          textStyle: {
            color: '#8C8C8C'
          },
          height: 250
        },
        series: [
          {
            name: self.chartData.name,
            type: 'pie',
            center: ['35%', '50%'],
            radius: ['40%', '65%'],
            clockwise: false,
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: 'outter',
                formatter: function(parms) {
                  return parms.data.legendname
                }
              }
            },
            labelLine: {
              normal: {
                length: 5,
                length2: 3,
                smooth: true
              }
            },
            data: self.chartData.content
          }
        ]
      });
      this.chart.resize();
    },
    // 异步数据
    asyncSetOptions(val) {
      this.chart.setOption({
        title: [
          {
            subtext: numToSn(val.content.reduce((total, item) => { return total + item.value }, 0))
          }
        ],
        series: [
          {
            data: val.content
          }
        ]
      });
      if (this.chart) this.chart.resize();
    }
  }
};
</script>
