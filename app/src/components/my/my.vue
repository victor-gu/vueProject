<template>
    <div>
        <firstHeader title="我的"></firstHeader>
        <div class="myAppColumn">
            <div class="my">
                <p>欢迎Victor</p>
                <button @click="loginOut">退出登录</button>
            </div>
        </div>
        <footerNav active="my"></footerNav>
    </div>
</template>

<script>

import { Toast } from 'mint-ui';
import "./my.scss";
import { setTimeout } from 'timers';
export default {
    methods: {
        loginOut: function(){
            this.Cookie.remove("loginState");
            Toast({ message: '退出成功', duration: 1000 });
            setTimeout(()=>{
                this.$router.push("/login");
            }, 1500);
        }
    }
}
</script>

