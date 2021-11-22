<template>
    <div class="create">
        <div class="list-top">
            <div class="top-left">
                <a name="create-list">创建歌单({{createlists.length}}个)</a>
            </div>
            <div class="top-right">
                <div class="add">
                    <img src="~assets/img/home/create/add.png">
                </div>
                <div class="option">
                    <img src="~assets/img/home/create/option.png">
                </div>
            </div>
        </div>
        <div class="list-content">
            <div class="content" v-for="(item,index) in createlists" :key="index" @click="toDetail(index)">
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
import { getCreaCollList } from '../../../../network/Components/SongList/songlist';

    export default {
        name: "Create",
        data() {
            return {
                createlists: []
            }
        },
        methods: {
            toDetail(index) {
                this.$router.push({name: 'CreateList', query: {i: index}});
            },
            LoginCheck() {//登录验证
                this.createlists = [];
                if (window.localStorage.getItem('userId') != null) {
                    getCreaCollList(window.localStorage.getItem('userId')).then(res => {
                        res.playlist.forEach((item, index) => {
                            //    index=0的歌单是‘我喜欢的音乐’，从1往后为创建的歌单
                            if (item.userId == window.localStorage.getItem('userId') && index != 0) {
                                //放入createlist
                                this.createlists.push(item);
                            }
                        })
                    })
                }
            }
        },
        // created() {
        //     this.LoginCheck()
        // },
        activated() {
            // console.log(this.createlists);
            this.LoginCheck();
        }

    }
</script>

<style src="assets/css/home/create/create.css" scoped>

</style>