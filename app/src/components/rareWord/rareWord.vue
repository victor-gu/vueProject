<template>
    <div class="rareWord">
            <p>生僻字查询，例如：月+月+鸟</p>
            <input type="text" placeholder="生僻字拆分" v-model="value">
            <button @click="result">查询</button>
            <p>结果：{{rareWord}}</p>
    </div>
</template>

<script>
export default {
    data: function(){
        return {
            value: "",
            rareWord: ""
        }
    },
    methods: {
        result: function(){
            this.get("905-1", {parts: this.value})
            .then((res)=>{
                this.rareWord = res.data.showapi_res_body.words[0].pinyin +" "+res.data.showapi_res_body.words[0].word;
            })
            .catch((err)=>{
                console.log(err);
            });
        }
    }
}
</script>

<style lang="scss">
    @import "../../../static/css/var.scss";
    .rareWord{
        text-align: center;
        font-size: $bigFont;
        input{
            width: 70%;
            height: .9375rem;
            border: $border;
            padding: 0 .3125rem;
            margin: .78125rem 0;
        }
        button{
            width: 1.5625rem;
            line-height: .9375rem;
            color: #fff;
            background: $mainColor;
            font-size: $generalFont;
            border-radius: .3125rem;
        }
        p{
            margin-top: .78125rem;
            line-height: 1.5625rem;
        }
    }
</style>
