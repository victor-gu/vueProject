<template>
    <div>
        <firstHeader title="发现"></firstHeader>
        <div class="myAppColumn">
            发现
        </div>
        <footerNav active="find"></footerNav>
    </div>
</template>

<script>
export default {
    data: function(){
        return {
            modules: [
                {title: "手机号检测", route: "phone"},
                {title: "手机号检测", route: "phone"},
                {title: "手机号检测", route: "phone"},
                {title: "手机号检测", route: "phone"},
            ]
        }
    }
}
</script>

