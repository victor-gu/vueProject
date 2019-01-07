<template>
    <div id="myApp">
        <headerComponent></headerComponent>
		
        <router-view></router-view>
		
        <footerComponent></footerComponent>
    </div>
</template>

<script>
import footerComponent from "@/components/footer/footer.vue";
import headerComponent from "@/components/header/header.vue";
export default {
	data: function () {
		return {
			selected: ""
		}
    },
    components: {
        footerComponent,
        headerComponent
    }
};
</script>

<style>
</style>
