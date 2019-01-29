<template>
    <div class="phrase">
        <div class="phraseNav">
            <input type="text" placeholder="输入关键字或成语" v-model="value">
            <button @click="releaseBtn">释义</button>
            <button @click="queryBtn">查询</button>
        </div>
        <div class="phraseContent">
            <div class="release" v-if="release">
                <div>
                    <p>成语名称：</p>
                    <p>{{title}}</p>
                </div>
                <div>
                    <p>拼写读音：</p>
                    <p>{{spell}}</p>
                </div>
                <div>
                    <p>解释：</p>
                    <p>{{content}}</p>
                </div>
                <div>
                    <p>出自典故：</p>
                    <p>{{derivation}}</p>
                </div>
                <div>
                    <p>例子：</p>
                    <p>{{samples}}</p>
                </div>
            </div>
            <div class="query" v-if="query">
                <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                    <li v-for="(item, index) in queryList" :key="index">
                        {{item.title}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import "./phrase.scss";
export default {
    data: function(){
        return {
            release: false,
            query: false,
            value: "",
            content: "",
            derivation: "",
            samples: "",
            spell: "",
            title: "",
            queryList: [],
            page: 1,
            total: 0,
            loading: false
        }
    },
    methods: {
        releaseBtn: function(){
            if(!this.value){
                return false;
            };
            this.release = true;
            this.query = false;
            this.get("1196-2", {keyword: this.value})
            .then((res)=>{
                this.content = res.data.showapi_res_body.data.content;
                this.derivation = res.data.showapi_res_body.data.derivation;
                this.samples = res.data.showapi_res_body.data.samples;
                this.spell = res.data.showapi_res_body.data.spell;
                this.title = res.data.showapi_res_body.data.title;
                console.log(res);
            })
            .catch((err)=>{
                console.log(err);
            });
        },
        queryBtn: function(){
            if(!this.value){
                return false;
            };
            this.page = 1;
            this.release = false;
            this.query = true;
            this.get("1196-1", {keyword: this.value, page: this.page, rows: 50})
            .then((res)=>{
                this.queryList = res.data.showapi_res_body.data;
                this.total = res.data.showapi_res_body.total;
            })
            .catch((err)=>{
                console.log(err);
            });
        },
        loadMore() {
            if(this.queryList.length >= this.total){
                return false;
            }else{
                this.loading = true;
                this.page++;
                this.get("1196-1", {keyword: this.value, page: this.page, rows: 50})
                .then((res)=>{
                    console.log(res);
                    for(var i of res.data.showapi_res_body.data){
                        this.queryList.push(i);
                    };
                })
                .catch((err)=>{
                    console.log(err);
                });
                this.loading = false;
            }
        }
    }

}
</script>

