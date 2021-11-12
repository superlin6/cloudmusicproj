<template>
    <div class="collect">
        <div class="list-top">
            <div class="top-left">
                <a name="collect-list">收藏歌单({{collectlists.length}}个)</a>
            </div>
            <div class="top-right">
                <div class="option">
                    <img src="~assets/img/home/create/option.png">
                </div>
            </div>
        </div>
        <div class="list-content">
            <div class="content" v-for="(item,index) in collectlists" :key="item.id" @click="toDetail(index)">
                <div class="content-img">
                    <img :src="item.coverImgUrl">
                </div>
                <div class="content-text">
                    <p>{{item.name}}</p>
                    <p class="num">{{item.trackCount}}首</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {request} from "network/request";


    export default {
        name: "Collect",
        data() {
            return {
                collectlists: [],
                num: 0//用于计算index 因为前面是创建歌单，传到收藏歌单需要给路由传入的index加上num
            }
        },
        methods: {
            toDetail(index) {
                this.$router.push({name: 'CollectList', query: {i: (index + this.num)}});
            },
            LoginCheck() {
                this.collectlists = [];
                this.num = 0;
                if (window.localStorage.getItem('userId') != null) {
                    request({
                        url: '/user/playlist',
                        params: {
                            uid: window.localStorage.getItem('userId')
                        },
                        timeout: 5000
                    }).then(res => {
                        res.playlist.forEach((item, index) => {
                            if (item.userId != window.localStorage.getItem('userId')) {
                                //放入createlist
                                this.collectlists.push(item);
                            }
                            if (item.userId == window.localStorage.getItem('userId') && index != 0) {
                                this.num++;
                            }
                        })
                    })
                }
            }
        },
        // created() {
        //     this.LoginCheck();
        // },
        watch: {
            collectlists() {
                this.$emit('finish')
            }
        },
        activated() {
            this.LoginCheck();
        }

    }
</script>

<style src="assets/css/home/collect/collect.css" scoped>

</style>