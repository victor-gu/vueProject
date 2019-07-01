// 数据  [{provinse: '广东省', name: '', value: 100}]
<!-- 省份地图组件 -->
<template>
  <div ref="provinceMap" :style="{ height:height, width:width }"/>
</template>

<script>
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入提示框
require('echarts/lib/component/tooltip');
// 引入省地图
// require('echarts/map/js/province/guangdong');
// 防抖
import { debounce } from '@/utils';
import { provinceShort, spellProvince } from '@/utils/switchProvince';

export default {
  name: 'ProvinceMap',
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
      sidebarElm: null,
      province: ''
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
    this.provinceConfigure();
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
    provinceConfigure() {
      // 加载对应省地图
      let spell = spellProvince(this.chartData[this.chartData.length - 1].province);
      require('echarts/map/js/province/' + spell);
      let self = this;
      let myChart = echarts.init(this.$refs.provinceMap, 'light');
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
          show: true,
          left: 20,
          bottom: 70,
          min: 0,
          max: self.maxValue(self.chartData),
          text: ['高', '低'],
          realtime: true,
          calculable: false,
          color: ['orangered', 'yellow', '#409eff']
        },
        series: [
          {
            type: 'map',
            mapType: provinceShort(self.chartData[self.chartData.length - 1].province),
            roam: true,
            label: {
              normal: {
                show: true
              },
              emphasis: {
                textStyle: {
                  color: '#000000'
                }
              }
            },
            itemStyle: {
              normal: {
                borderColor: '#389BB7',
                areaColor: '#92d2e4'
              },
              emphasis: {
                areaColor: null,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            data: this.chartData
          }
        ]
      });
      this.chart.resize();
    },
    // 异步数据
    asyncSetOptions(val) {
      // 动态加载地图
      let spell = spellProvince(val[val.length - 1].province);
      if (this.province !== spell) {
        this.province = spell;
        require('echarts/map/js/province/' + spell);
      }
      this.chart.setOption({
        dataRange: {
          max: this.maxValue(val)
        },
        series: [
          {
            type: 'map',
            mapType: provinceShort(val[val.length - 1].province),
            data: val
          }
        ]
      });
    }
  }
};
</script>
