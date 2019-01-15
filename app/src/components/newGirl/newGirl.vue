
<template>
    <div>
        <secondHeader title="淘女郎"></secondHeader>

        <div class="cateList"> 
            <ul>
                <li v-for="(item, index) in cateList" :key="index" @click="query(item)" :class="{active: active == item ? 'active' : ''}">
                    {{item}}
                </li>
            </ul>
        </div>

        <div class="myAppColumn">
            <div class="newGirl">
                <ul class="imgList">
                    <li v-for="(item, index) in imgList" :key="index">
                        <img v-lazy="item.avatarUrl">
                        <p>{{item.realName}}</p>
                    </li>
                </ul>
            </div>
        </div>

        <footerNav active="home"></footerNav>
    </div>
</template>

<script>
import "./newGirl.scss";

export default {
    data: function(){
        return {
            cateList: [],
            imgList: [],
            active: "全部"
        }
    },
    methods: {
        allImage: function(){
            // 查询全部
            this.post("126-2")
            .then((data)=>{
                this.imgList = data.data.showapi_res_body.pagebean.contentlist;
            })
            .catch((err)=>{
            });
        },
        query: function(val){
            this.active = val;
            this.imgList = [];
            if(val == "全部"){
                this.allImage();
            }else{
                this.post("126-2", {type: val})
                .then((data)=>{
                    this.imgList = data.data.showapi_res_body.pagebean.contentlist;
                })
                .catch((err)=>{
                });
            }
        }
    },
    created: function(){

        this.all([this.post("126-1"), this.post("126-2")])
        .then((res)=>{
            this.cateList = res[0].data.showapi_res_body.allTypeList;
            this.cateList.unshift("全部");
            this.imgList = res[1].data.showapi_res_body.pagebean.contentlist;
        })
        
    }
}
</script>

