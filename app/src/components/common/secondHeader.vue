<template>
    <div class="secondHeader">
        <p @click="goBack"><i class="fa fa-angle-left"></i>返回</p>
        <p class="center">{{title}}</p>
        <p><i class="fa fa-ellipsis-h"></i></p>
    </div>
</template>

<script>

export default {
    name: "secondHeader",
    methods: {
        goBack: function(){
            this.$router.go(-1);
        }
    },
    props: {
        title: {
            type: String,
            default: "二级标题"
        }
    }
}
</script>

<style lang="scss">
    @import "../../../static/css/var.scss";
    .secondHeader{
        height: 1.09375rem;
        background: $mainColor;
        color: #fff;
        font-size: $bigFont;
        display: flex;
        align-items: center;
        padding:0 .21875rem;
        .center{
            flex: 1;
        }
        p{
            text-align: center;
            width: 1.25rem;
            i{
                font-size: $bigFont;
                margin-right: .15625rem;
            }
        }
    }
</style>
