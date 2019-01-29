<template>
    <div class="register">
        <div class="registerHead">
            <img class="head" src="../../../static/image/loginHead.png">
            <transition name="fade">
                <img class="left" src="../../../static/image/loginLeft.png" v-show="handShow">
            </transition>
            <transition name="fade">
                <img class="right" src="../../../static/image/loginRight.png" v-show="handShow">
            </transition>
        </div>
        <div class="registerFeed">
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
            <div class="surePassword">
                <label>
                    <span><i class="fa fa-lock"></i></span>
                    <input v-focus type="password" placeholder="请确认密码" v-model="surePassword">
                </label>
            </div>
            <div class="registerCode">
                <label>
                    <span><i class="fa fa-wifi"></i></span>
                    <input v-scale type="text" placeholder="请输入注册码" v-model="registerCode">
                </label>
            </div>
            <div class="action">
                <span @click="$router.push('/login')">返回登录</span>
                <button @click="register">注册</button>
            </div>
        </div>
    </div>
</template>

<script>
import "./register.scss";
import { Toast } from 'mint-ui';
export default {
    data: function(){
        return {
            handShow: false,
            password: "",
            username: "",
            surePassword: "",
            registerCode: ""
        }
    },
    methods: {
        register: function(){
            if(this.username == ""){
                Toast({ message: '请输入用户名', duration: 1000 });
            }else if(this.password == ""){
                Toast({ message: '请输入密码', duration: 1000 });
            }else if(this.surePassword == ""){
                Toast({ message: '请输入确认密码', duration: 1000 });
            }else if(this.registerCode == ""){
                Toast({ message: '请输入注册码', duration: 1000 });
            }else if(this.password != this.surePassword){
                Toast({ message: '密码不一致', duration: 1000 });
            }else{
                Toast({ message: '目前暂不支持注册功能', duration: 1000 });
                setTimeout(()=>{
                    this.$router.push("/login");
                }, 2000);
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