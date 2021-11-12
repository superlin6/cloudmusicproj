<template>
    <div class="find">
        <scroll ref="scroll">
            <carousel></carousel>
            <selection></selection>
            <find-row @finish="finish"></find-row>
        </scroll>
    </div>
</template>

<script>
    import TopBar from "components/topbar/TopBar";
    import Carousel from "./carousel/Carousel";
    import Selection from "./selection/Selection";
    import FindRow from "./findrow/FindRow";
    import Scroll from "components/scroll/Scroll";

    export default {
        name: "Find",
        components: {Scroll, FindRow, Selection, Carousel, TopBar},
        methods:{
            finish(){//子组件完成数据接收，动态更新scroll
                // console.log('finish');
                this.$refs.scroll.refresh();
            }
        },
    }
</script>

<style src="assets/css/find/find.css" scoped>

</style>