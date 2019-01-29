<template>
    <div class="phone">
        <p>手机号段判断运营商类型</p>
        <input type="text" placeholder="请输入手机号码" @input="result" v-model="num">
        <p>类型：{{type}}</p>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    data: function(){
        return {
            num: "",
            timer: "",
            type: "",
            err: ""
        }
    },
    methods: {
        result: function(){
            clearTimeout(this.timer);
            // 输入判断
            if(!/^[0-9]*$/.test(this.num)){
                this.num = "";
                Toast({ message: '请输入数字', duration: 1000 });
                return false;
            };

            // 发送请求判断类型
            this.timer = setTimeout(()=>{
                this.get("1055-1", {mobile: this.num})
                .then((res)=>{
                    var type = res.data.showapi_res_body.type;
                    var valid = res.data.showapi_res_body.valid;
                    if(type == 1){
                        this.type = "移动";
                    };
                    if(type == 2){
                        this.type = "联通";
                    };
                    if(type == 3){
                        this.type = "电信";
                    };
                    if(type == 0){
                        this.type = "不确定";
                    };
                    if(type == -1 && !valid){
                        this.type = "手机号格式错误";
                    };
                })
                .catch((err)=>{
                    console.log(err);
                });
            }, 1000);
        }
    }
}
</script>

<style lang="scss">
    @import "../../../static/css/var.scss";
    .phone{
        text-align: center;
        font-size: $bigFont;
        input{
            width: 80%;
            height: .9375rem;
            border: $border;
            padding: 0 .3125rem;
            margin: .78125rem 0;
            text-align: center;
        }
        p{
            margin-top: .78125rem;
        }
    }
</style>
