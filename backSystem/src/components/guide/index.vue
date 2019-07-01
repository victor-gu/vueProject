<template>
  <div v-if="show">
    <el-button type="primary" icon="el-icon-s-promotion" @click.prevent.stop="guide">{{ title }}</el-button>
  </div>
</template>

<script>
import Driver from 'driver.js';
import 'driver.js/dist/driver.min.css';
import steps from './steps';
export default {
  name: 'Guide',
  props: {
    title: {
      type: String,
      default: '新手指引'
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      driver: null,
      timeer: null
    }
  },
  mounted() {
    this.driver = new Driver({
      allowClose: false,
      doneBtnText: '完成',
      closeBtnText: '关闭',
      nextBtnText: '下一步',
      prevBtnText: '上一步',
      stageBackground: 'rgba(0, 199, 255, .4)'
    })
  },
  methods: {
    guide() {
      this.driver.defineSteps(steps);
      this.driver.start();
      // this.timeer = setInterval(() => {
      //   if (this.driver.isActivated) {
      //     this.driver.moveNext();
      //   } else {
      //     clearInterval(this.timeer);
      //   }
      // }, 5000);
    }
  }
}
</script>

