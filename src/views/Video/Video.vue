<template>
    <div class="video">
        <scroll :pullup="true"
                @scrollToEnd="scrollToEnd"
                :data="listData">
            <ul>
                <li v-for="(item,index) in listData" :key="index">
                    <div class="mv" :style="{background:'url('+item.cover+') no-repeat',backgroundSize:'cover'}">
                        <div class="imgs" v-show="playNum!=index" @click="getUrl(item.id,index)">
                            <img src="~assets/img/video/audio_pause.png">
                        </div>
                        <div class="imgs" v-show="playNum==index" @click="mvPlayLeave">
                            <video :src="item.mvUrl" :ref="'video'+index" controls @loadeddata="loadDataFun"></video>
                        </div>
                    </div>
                    <div class="text">{{item.name}}</div>
                </li>
            </ul>
            <van-loading v-show="loading" style="text-align: center" color="#1989fa"/>
        </scroll>
    </div>
</template>

<script>
    import {request} from "network/request";
    import Scroll from "components/scroll/Scroll";

    export default {
        name: "Video",
        components: {Scroll},
        data() {
            return {
                listData: [],
                playNum: null,
                loading: false,
                offset: 0,//获取的偏移量
            }
        },
        methods: {
            changePlayNum(num) {
                this.playNum = num;
            },
            loadDataFun(event) {
                event.target.play();
            },
            mvPlayLeave() {
                if (this.playNum != undefined) {
                    this.$refs['video' + this.playNum][0].pause();//暂停离开的视频
                    this.playNum = null;//重置
                }
            },
            getData() {//获取mv数据
                if (this.offset < 30) {//一共30个数据
                    this.loading = true;
                    request({
                        url: '/mv/exclusive/rcmd',
                        params: {
                            limit: 5,
                            offset: this.offset
                        }
                    }).then(res => {
                        // console.log(res);
                        if (this.offset != 30) {
                            this.offset += 5;
                        }
                        // this.listData = res.data;
                        setTimeout(() => {
                            res.data.forEach(item => {
                                this.listData.push(item);
                            })
                            // console.log(this.listData);
                            this.loading = false;
                        }, 1000)
                    })
                }
            },
            getUrl(id, index) {
                this.mvPlayLeave();//暂停之前的内容
                this.changePlayNum(index);//播放对应index的内容
                request({
                    url: '/mv/url',
                    params: {
                        id,
                        r: 360//分辨率
                    }
                }).then(res => {
                    // console.log(res);
                    // this.listData[index].mvUrl = res.data.url;
                    this.$set(this.listData[index], 'mvUrl', res.data.url);
                })
            },
            
            scrollToEnd() {
                console.log('上拉加载');
                this.getData();
            }
        },
        created() {
            this.getData();
        },

    }
</script>

<style src="assets/css/video/video.css" scoped>

</style>