<template>
    <div class="searcher">
        <scroll :data="lists">
            <div class="hot-search">
                <div class="history">
                    <div class="history-title">
                        <span>历史记录</span>
                        <span><van-button class="clearbtn" @click="clearHis">清空</van-button></span>
                    </div>
                    <div class="history-block">
                        <van-button class="btn" :ref="'btn'+index" v-for="(item,index) in his" :key="index"
                                    @click="pushContent(index)">{{item}}</van-button>
                    </div>
                </div>
                <div class="hot">
                    <div class="hot-title">热门搜索</div>
                    <div class="hot-block">
                        <van-button class="btn" :ref="'btn'+(index+his.length)" @click="pushContent(index+his.length)"
                                    v-for="(item,index) in hots" :key="index">
                            {{item.first}}
                        </van-button>
                    </div>
                </div>
            </div>
            <div class="list">
                <song-list :lists="lists" :style="{marginTop:'10px'}"></song-list>
            </div>
        </scroll>
    </div>
</template>

<script>
    import {request} from "network/request";
    import SongList from "components/songlist/SongList";
    import Scroll from "../../components/scroll/Scroll";

    export default {
        name: "Searcher",
        components: {Scroll, SongList},
        data() {
            return {
                his: ['薛之谦','周杰伦','李荣浩','晴天'],
                hots: [],
                lists: []//搜索的歌曲
            }
        },
        methods: {
            getData() {
                request({
                    url: '/search/hot',
                }).then(res => {
                    this.hots = res.result.hots;
                    // console.log(this.hots)
                });
                this.history = window.sessionStorage.getItem('history');
            },
            pushContent(index) {
                this.$bus.emit('content', this.$refs['btn' + index][0].innerText);//将内容传到搜索框
            },
            debounce(func, wait = 1000) {
                let timeout;
                return function (event) {
                    clearTimeout(timeout)
                    timeout = setTimeout(() => {
                        func.call(this, event)
                    }, wait)
                }
            },
            search() {
                this.$bus.on('lists', val => {
                    this.lists = val;//得到的结果传给lists,再传给songlists
                    // console.log('searcher得到lists：'+this.lists);
                })
            },
            clearHis(){
                this.his = [];
            },
        },
        created() {
            this.getData();
            this.search();
            this.$bus.on('setHis',val=>{
                let index = this.his.indexOf(val);//检查his数组是否有该值
                if(index==-1)
                    this.his.push(val);
            })
        }
    }
</script>

<style src="assets/css/searcher/searcher.css" scoped>

</style>