// 数据  [{name: '', value: 100}]
<!-- 中国地图组件  -->
<template>
  <div ref="chinaMap" :style="{ height:height, width:width }"/>
</template>

<script>
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入提示框
require('echarts/lib/component/tooltip');
// 引入中国地图
require('echarts/map/js/china');
// 防抖
import { debounce } from '@/utils';

export default {
  name: 'ChinaMap',
  props: {
    width: {
      type: String,
      default: 'calc(100% + 50px)'
    },
    height: {
      type: String,
      default: 'calc(100% + 50px)'
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
    this.chinaConfigure();
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
    maxValue(val) {
      if (val.length === 0) return 0;
      let arr = val.map((item, index) => {
        return item.value;
      });
      return Math.max(Math.max.apply(null, arr));
    },
    chinaConfigure() {
      let self = this;
      let myChart = echarts.init(this.$refs.chinaMap, 'light');
      this.chart = myChart;
      myChart.setOption({
        title: {
          text: '报警分布图',
          textStyle: {
            fontStyle: 'italic',
            fontWeight: 'bold',
            fontSize: 16
          },
          x: '8%',
          y: '15%'
        },
        tooltip: {
          show: true,
          formatter: function(params) {
            if (params.data) return params.name + '报警数量：' + params.data['value'];
          }
        },
        dataRange: {
          itemWidth: 14,
          itemHeight: 100,
          left: 20,
          bottom: 70,
          show: true,
          min: 0,
          max: self.maxValue(self.chartData) || 0.1,
          text: ['高', '低'],
          realtime: true,
          calculable: false,
          color: ['orangered', 'yellow', '#92d2e4']
        },
        geo: {
          map: 'china',
          roam: true,
          label: {
            normal: {
              show: true,
              textStyle: {
                color: 'rgba(0,0,0,0.4)'
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: '#389BB7',
              areaColor: '#92d2e4',
              color: '#92d2e4'
            },
            emphasis: {
              color: '',
              areaColor: null,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },
        series: [
          {
            type: 'scatter',
            coordinateSystem: 'geo'
          },
          {
            name: '报警数量',
            type: 'map',
            geoIndex: 0,
            data: this.chartData
          }
        ]
      })
      this.chart.resize();
    },
    // 异步数据
    asyncSetOptions(val) {
      this.chart.setOption({
        dataRange: {
          max: this.maxValue(val) || 0.1
        },
        series: [
          {
            name: '报警数量',
            type: 'map',
            geoIndex: 0,
            data: val
          }
        ]
      })
    }
  }
}
</script>
