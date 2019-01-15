<template>
    <div>
        <firstHeader title="首页"></firstHeader>
        <div class="myAppColumn">
            <div class="home">
                <div class="swiper">
                    <mt-swipe :auto="4000">
                        <mt-swipe-item v-for="(item, index) in inmgs" :key="index">
                            <div class="bgImage" :style="{'background-image': 'url('+item+')'}"></div>
                            <div class="bgTitle">{{title}}</div>
                        </mt-swipe-item>
                    </mt-swipe>
                </div>

                <ul class="category">
                    <li v-for="(item, index) in modules" :key="index" @click="route(item.route)">
                        <i :class="item.icon"></i>
                        <p>{{item.msg}}</p>
                    </li>
                </ul>
            </div>
        </div>
        <footerNav active="home"></footerNav>
    </div>
</template>

<script>
import './home.scss';
export default {
    data: function(){
        return {
            inmgs: [],
            title: "",
            modules: [
                {icon: "fa fa-superpowers", msg: "淘女郎", route: "/newGirl"},
                {icon: "fa fa-wikipedia-w", msg: "网页信息", route: "/newGirl"},
                {icon: "fa fa-opencart", msg: "网页信息", route: "/newGirl"},
                {icon: "fa fa-yoast", msg: "网页信息", route: "/newGirl"},
                {icon: "fa fa-free-code-camp", msg: "网页信息", route: "/newGirl"},
                {icon: "fa fa-skyatlas", msg: "网页信息", route: "/newGirl"}
            ]
        }
    },
    methods: {
        route: function(par){
            this.$router.push(par);
        }
    },
    created: function(){
        // 轮播图请求
        this.post("1287-1")
        .then((data)=>{
            this.title = data.data.showapi_res_body.data.subtitle;
            this.inmgs.push(data.data.showapi_res_body.data.img_1366);
            this.inmgs.push(data.data.showapi_res_body.data.img_1366);
        })
        .catch((err)=>{
            console.log(err);
        });
    }
}
</script>

