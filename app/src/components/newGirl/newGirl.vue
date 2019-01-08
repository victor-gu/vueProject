
<template>
    <div class="myAppColumn">
        <div class="newGirl">
            <div class="cateList"> 
                <ul>
                    <li v-for="(item, index) in cateList" :key="index" @click="query()">
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
    </div>
</template>

<script>
import "./newGirl.scss";
import http from "@/utils/httpclient";

export default {
    data: function(){
        return {
            cateList: [],
            imgList: []
        }
    },
    methods: {
        
    },
    created: function(){
        // 查询列表
        http.post("126-1")
        .then((data)=>{
            this.cateList = data.data.showapi_res_body.allTypeList;
            this.cateList.unshift("全部");
        })
        .catch((err)=>{
        });

        // 查询全部
        http.post("126-2")
        .then((data)=>{
            this.imgList = data.data.showapi_res_body.pagebean.contentlist
        })
        .catch((err)=>{
        });
    }
}
</script>

