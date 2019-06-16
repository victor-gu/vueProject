<template>
    <div>
        <firstHeader title="分类"></firstHeader>
        <div class="myAppColumn">
            <div class="classify">
                <ul class="classifyNav">
                    <li v-for = "(item, index) in modules" :key="index" @click="itemActive(item.route)" :class="{active: active == item.route ? 'active' : ''}">{{item.title}}</li>
                </ul>
                <div class="classifyContent">
                    <router-view></router-view>
                </div>
            </div>
        </div>
        <footerNav active="classify"></footerNav>
    </div>
</template>

<script>
import "./classify.scss";
export default {
    data: function(){
        return {
            modules: [
                {title: "手机号段", route: "/phone"},
                {title: "生僻字", route: "/rareWord"},
                {title: "成语大全", route: "/phrase"},
            ],
            active: "/phone"
        }
    },
    methods: {
        itemActive: function(route){
            this.active = route;
            this.$router.push("/classify"+route);
        }
    },
    beforeRouteEnter:function(from, to, next){
        console.log(to);
        next(vm => {
            vm.active = "/phone";
        });
    }
}
</script>

