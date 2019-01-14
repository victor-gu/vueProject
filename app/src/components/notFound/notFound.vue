<template>
    <div class="notFound">
        <p>404</p>
        <p class="goBack" @click.self="goBackPage"><i class="fa fa-long-arrow-left"></i>Go Back</p>
    </div>
</template>

<script>
export default {
    methods: {
        goBackPage: function(){
            this.$router.go(-1);
        }
    }
}
</script>
<style lang="scss">
@import "../../../static/css/var.scss";
.notFound{
    height: 100%; 
    width: 100%;
    background-image: url("../../../static/image/notFound.gif");
    background-size: cover;
    p{
        text-align: center;
        color: #fff;
        font-size: .9375rem;
        margin-top: 4.84375rem;
    }
    i{
        margin-right: .3125rem;
    }
}
</style>

