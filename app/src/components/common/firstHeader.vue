<template>
    <div class="firstHeader">
        <p>{{title}}</p>
    </div>
</template>

<script>

export default {
    name: "firstHeader",
    props: {
        title: {
            type: String,
            default: "一级标题"
        }
    }
}
</script>

<style lang="scss">
    @import "../../../static/css/var.scss";
    .firstHeader{
        line-height: 1.09375rem;
        text-align: center;
        background: $mainColor;
        color: #fff;
        font-size: $bigFont;
    }
</style>
