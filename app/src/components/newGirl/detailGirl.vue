<template>
    <div class="myAppColumn">
        <ul class="detailGirl">
            <li v-for="(item, index) in imgList" :key="index">
                <img v-lazy="item">
            </li>
        </ul>
    </div>
</template>

<script>
import "./detailGirl.scss";
export default {
    data: function(){
        return {
            imgList: []
        }
    },
    mounted: function(){
        this.imgList = JSON.parse(this.$route.params.imgList);
    }
}
</script>

