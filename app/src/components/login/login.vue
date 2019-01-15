<template>
    <div class="login">
        <div class="loginHead">
            <img class="head" src="../../../static/image/loginHead.png">
            <transition name="fade">
                <img class="left" src="../../../static/image/loginLeft.png" v-show="handShow">
            </transition>
            <transition name="fade">
                <img class="right" src="../../../static/image/loginRight.png" v-show="handShow">
            </transition>
        </div>
        <div class="loginFeed">
            <div class="username">
                <label>
                    <span><i class="fa fa-user"></i></span>
                    <input type="text" v-scale placeholder="请输入用户名" v-model="username">
                </label>
            </div>
            <div class="password">
                <label>
                    <span><i class="fa fa-lock"></i></span>
                    <input v-focus type="password" placeholder="请输入密码" v-model="password">
                </label>
            </div>
            <div class="code">
                <label>
                    <span><i class="fa fa-send-o"></i></span>
                    <input v-model="code" type="text" v-scale placeholder="请输入验证码">
                    <div class="num" @click="rondom">{{num}}</div>
                </label>
            </div>
            <div class="action">
                <span>忘记密码</span>
                <div>
                    <span @click="$router.push('/register')">注册</span>
                    <button @click="login">登录</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "./login.scss";
import { Toast } from 'mint-ui';
export default {
    data: function(){
        return {
            num: Math.floor(Math.random()*10000),
            handShow: false,
            password: "",
            username: "",
            code: ""
        }
    },
    methods: {
        rondom: function(){
            this.num = Math.floor(Math.random()*10000);
            this.code = "";
        },
        login: function(){
            if(this.username == ""){
                Toast({ message: '请输入用户名', duration: 1000 });
            }else if(this.password == ""){
                Toast({ message: '请输入密码', duration: 1000 });
            }else if(this.code == ""){
                Toast({ message: '请输入验证码', duration: 1000 });
            }else if(this.code != this.num){
                Toast({ message: '验证码错误', duration: 1000 });
            }else if(this.username != 'gu' || this.password != "123454"){
                Toast({ message: '用户名或验证码错误', duration: 1000 });
            }else{
                Toast({ message: '登录成功', duration: 1000});
                setTimeout(()=>{
                    this.$router.push("/home");
                }, 1000);
            }
        }
    },
    directives: {
        focus: {
            bind: function(ele, binding, vnode){
                ele.onfocus = ()=>{
                    vnode.context.handShow = true;
                    ele.previousElementSibling.classList.add("active");
                }
                ele.onblur = ()=>{
                    vnode.context.handShow = false;
                    ele.previousElementSibling.classList.remove("active");
                }
            }
        },
        scale: function(ele){
            ele.onfocus = ()=>{
                ele.previousElementSibling.classList.add("active");
            }
            ele.onblur = ()=>{
                ele.previousElementSibling.classList.remove("active");
            }
        }
    }
}

</script>