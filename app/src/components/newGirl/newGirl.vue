
<template>
    <div class="myAppColumn">
        <div class="newGirl">
            <div class="cateList"> 
                <ul>
                    <li v-for="(item, index) in cateList" :key="index" @click="query(item)">
                        {{item}}
                    </li>
                </ul>
            </div>

            <ul class="imgList">
                <li v-for="(item, index) in imgList" :key="index">
                    <img v-lazy="item.avatarUrl">
                    <p>{{item.realName}}</p>
                </li>
            </ul>
        </div>
        <!-- <vue-preview :slides="slide1"></vue-preview> -->
    </div>
</template>

<script>
import "./newGirl.scss";
import http from "@/utils/httpclient";

export default {
    data: function(){
        return {
            cateList: [],
            imgList: [],
            // slide1: [
            //             {
            //                 src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
            //                 msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
            //                 alt: 'picture1',
            //                 title: 'Image Caption 1',
            //                 w: 600,
            //                 h: 400
            //             },
            //             {
            //                 src: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg',
            //                 msrc: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg',
            //                 alt: 'picture2',
            //                 title: 'Image Caption 2',
            //                 w: 1200,
            //                 h: 900
            //             }
            //         ]
        }
    },
    methods: {
        allImage: function(){
            // 查询全部
            http.post("126-2")
            .then((data)=>{
                this.imgList = data.data.showapi_res_body.pagebean.contentlist;
                console.log(this.imgList);
            })
            .catch((err)=>{
            });
        },
        query: function(val){
            if(val == "全部"){
                this.imgList = [];
                this.allImage();
            }else{
                this.imgList = [];
                http.post("126-2", {type: val})
                .then((data)=>{
                    this.imgList = data.data.showapi_res_body.pagebean.contentlist;
                })
                .catch((err)=>{
                });
            }
        }
    },
    created: function(){
        // 查询分类列表
        http.post("126-1")
        .then((data)=>{
            this.cateList = data.data.showapi_res_body.allTypeList;
            this.cateList.unshift("全部");
        })
        .catch((err)=>{
        });

        // 查询全部
        this.allImage();
    }
}
</script>

