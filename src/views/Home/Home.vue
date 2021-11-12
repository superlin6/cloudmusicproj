<template>
    <div class="home">
        <scroll ref="scroll">
            <user></user>
            <select-box></select-box>
            <my-favorite></my-favorite>
            <div class="nav">
                <div class="nav-item">
                    <a href="#create-list" @click.prevent="">创建歌单</a>
                </div>
                <div class="line"></div>
                <div class="nav-item">
                    <a href="#collect-list">收藏歌单</a>
                </div>
            </div>
            <create ref="create" class="create"></create>
            <collect @finish="finish"></collect>
        </scroll>
    </div>
</template>

<script>
    import User from "./Child/User/User";
    import SelectBox from "./Child/SelectBox/SelectBox";
    import MyFavorite from "./Child/MyFavorite/MyFavorite";
    import Scroll from "components/scroll/Scroll";
    import Collect from "./Child/Collect/Collect";
    import Create from "./Child/Create/Create";

    export default {
        name: "Home",
        components: {Create, Collect, Scroll, MyFavorite, SelectBox, User},
        methods: {
            finish() {
                this.$refs.scroll.refresh();
            }
        },

    }
</script>

<style src="assets/css/home/home.css" scoped>

</style>