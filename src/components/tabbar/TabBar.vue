<template>
    <div class="tabbar">
<!--  填入插槽需要插入的所有内容      -->
        <tab-bar-block>
            <tab-bar-item path="/home">
                <img slot="item-icon" src="~assets/img/components/tabbar/home.png">
                <img slot="item-icon-active" src="~assets/img/components/tabbar/home_active.png">
                <div slot="item-text">首页</div>
            </tab-bar-item>
            <tab-bar-item path="/find">
                <img slot="item-icon" src="~assets/img/components/tabbar/find.png">
                <img slot="item-icon-active" src="~assets/img/components/tabbar/find_active.png">
                <div slot="item-text">发现</div>
            </tab-bar-item>
            <tab-bar-item path="/mine">
                <img slot="item-icon" src="~assets/img/components/tabbar/mine.png">
                <img slot="item-icon-active" src="~assets/img/components/tabbar/mine_active.png">
                <div slot="item-text">我的</div>
            </tab-bar-item>
            <tab-bar-item path="/video">
                <img slot="item-icon" src="~assets/img/components/tabbar/video.png">
                <img slot="item-icon-active" src="~assets/img/components/tabbar/video_active.png">
                <div slot="item-text">视频</div>
            </tab-bar-item>
        </tab-bar-block>
    </div>
</template>

<script>
    import TabBarItem from "./tabbaritem/TabBarItem";
    import TabBarBlock from "./tabbarblock/TabBarBlock";

    export default {
        name: "TabBar",
        components: {TabBarBlock, TabBarItem}
    }
</script>

<style src="assets/css/components/tabbar/tabbar.css" scoped>

</style>