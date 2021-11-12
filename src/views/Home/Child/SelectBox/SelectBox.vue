<template>
    <div class="selectBox">
        <box-block>
            <box-item>
                <div slot="item-icon" @click="tips">
                    <img src="~assets/img/home/selectbox/local.png">
                </div>
                <div slot="item-text">本地/下载</div>
            </box-item>
            <box-item>
                <div slot="item-icon" @click="tips">
                    <img src="~assets/img/home/selectbox/cloud.png">
                </div>
                <div slot="item-text">云盘</div>
            </box-item>
            <box-item>
                <div slot="item-icon" @click="tips">
                    <img src="~assets/img/home/selectbox/haspaid.png">
                </div>
                <div slot="item-text">已购</div>
            </box-item>
            <box-item>
                <div slot="item-icon" @click="tips">
                    <img src="~assets/img/home/selectbox/recent.png">
                </div>
                <div slot="item-text">最近播放</div>
            </box-item>
            <box-item>
                <div slot="item-icon" @click="tips">
                    <img src="~assets/img/home/selectbox/friends.png">
                </div>
                <div slot="item-text">我的好友</div>
            </box-item>
            <box-item>
                <div slot="item-icon" @click="tips">
                    <img src="~assets/img/home/selectbox/application.png">
                </div>
                <div slot="item-text">应用</div>
            </box-item>
            <box-item></box-item>
            <box-item></box-item>
        </box-block>
    </div>
</template>

<script>
    import BoxBlock from "./Child/BoxBlock/BoxBlock";
    import BoxItem from "./Child/BoxItem/BoxItem";
    import {Toast} from 'vant';
    export default {
        name: "SelectBox",
        components: {BoxItem, BoxBlock},
        methods:{
            tips(){
                Toast({
                    message:'暂未开放'
                })
            }
        }
    }
</script>

<style src="assets/css/home/selectbox/selectbox.css" scoped>

</style>