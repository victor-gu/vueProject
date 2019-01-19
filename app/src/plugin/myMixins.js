function myMixins(){

}

myMixins.install = function(Vue){
    Vue.mixin({
        created(){
            setTimeout(()=>{
                if(this.$options.name == "firstHeader"){
                    console.log("我是混合器");
                }
            }, 1000);
        }
    });
}

export default myMixins;