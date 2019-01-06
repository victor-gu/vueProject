<template>
    <div class="hello">
        <mt-swipe :auto="4000">
            <mt-swipe-item>1ffff</mt-swipe-item>
            <mt-swipe-item>2ffff</mt-swipe-item>
            <mt-swipe-item>3fff</mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
export default {
    name: "HelloWorld",
    data() {
        return {
            msg: "Welcome to Your Vue.js App"
        };
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
