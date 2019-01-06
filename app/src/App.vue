<template>
    <div>
        <mt-header title="固定在顶部"></mt-header>
		
        <router-view/>
		
        <mt-tabbar v-model="selected">
            <mt-tab-item id="外卖">
                <img slot="icon" src="">
                外卖
            </mt-tab-item>
            <mt-tab-item id="订单">
                <img slot="icon" src="">
                订单
            </mt-tab-item>
            <mt-tab-item id="发现">
                <img slot="icon" src="">
                发现
            </mt-tab-item>
            <mt-tab-item id="我的">
                <img slot="icon" src="">
                我的
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>

<script>
export default {
  name: "App",
	data: function () {
		return {
			selected: ""
		}
	},
	watch: {
		selected: function(oldV, newV){
			// 做路由跳转
			console.log(newV);
		}
	}
};
</script>

<style>
</style>
