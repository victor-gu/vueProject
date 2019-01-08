<template>
    <ul class="footer">
        <li v-for="(item, index) in modules" :key="index" @click="active(item.route)" :class="classify==item.route ? 'active' : ''">
            <i :class="item.icon"></i>
            <span>{{item.title}}</span>
        </li>
    </ul>
</template>

<script>
export default {
    name: "footerNav",
    data: function(){
        return {
            classify: "/home",
            modules: [
                {title: "首页", icon: "fa fa-square-o", route: "/home"},
                {title: "分类", icon: "fa fa-reorder", route: "/classify"},
                {title: "发现", icon: "fa fa-hand-paper-o", route: "/find"},
                {title: "我的", icon: "fa fa-user-o", route: "/my"}
            ]
        }
    },
    methods: {
        active: function(par){
            this.classify = par;
            this.$router.push(par);
        }
    }
}
</script>

<style lang="scss">
    @import "../../../static/css/var.scss";
    .footer{
        border-top: $border;
        height: 1.40625rem;
        display: flex;
        justify-content: space-around;
        font-size: $bigFont;
        padding-top: .15625rem;
        li{
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            padding: .0625rem;
        }
        .active{
            color: $mainColor;
            font-weight: bolder;
            i{
                font-weight: bolder;
            }
        }
    }
</style>
