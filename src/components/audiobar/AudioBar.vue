<template>
    <div class="sum-audio-bar" ref="song">
        <div class="view" v-show="showView">
            <song-view @change="toSongView"
                       :imgUrl="imgUrl" :name="name"
                       :author="author" :status="status"
                       :curTime="curTime" :sumTime="sumTime"
                       :lyric="lyric" :id="id"
                       @toLast="toLast" @toNext="toNext"
                       @changeCurTime="changeCurTime"
                       @toOptionList="toOptionList"
                       @changeStatus="changeStatus">
            </song-view>
        </div>
        <div class="audio-bar" :style="style" v-show="!showView">
            <div class="content clearfix" @click="toSongView">
                <div class="cd">
                    <img :src="imgUrl" class="rotate_play rotate_stop" ref="img">
                </div>
                <div class="song-name">
                    <span class="name">{{name}}</span>
                    <span class="author">&nbsp;-&nbsp;{{author}}</span>
                </div>
                <div class="audio-play" @click.stop="changeStatus">
                    <img v-show="!status" src="@/static/img/components/audiobar/audio_stop.png">
                    <img v-show="status" src="@/static/img/components/audiobar/audio_play.png">
                </div>
                <div class="audio-option" @click.stop="toOptionList">
                    <img src="@/static/img/components/audiobar/audio_option.png">
                </div>
            </div>
        </div>
        <audio ref="audio" :src="songUrl" @loadeddata="initTime"></audio>
        <van-popup v-model="showList" position="bottom"
                   :close-on-click-overlay="true" :style="{ height: '50%',width:'calc(100% - 36px)'}">
            <div class="title">
                <span>当前播放&nbsp;</span>
                <span class="num">({{songlists.length}})</span>
            </div>
            <div class="list" v-for="item in newSongLists" :key="item.id">
                <div class="msg" @click="setPlayerId(item.id)">
                    <span :style="{color:(item.id==id?'#ff0000':'#000000')}">{{item.name}}</span>
                    <span class="author">&nbsp;-&nbsp;{{item.author}}</span>
                </div>
                <div class="del" @click="del(item.id)">
                    <img src="@/static/img/components/audiobar/del.png">
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import { getLyric, getSongDetail, getSongUrl } from "../../network/Components/AudioBar/audiobar";
import SongView from "./songview/SongView";

    export default {
        name: "AudioBar",
        components: {SongView},
        data() {
            return {
                style: '',//有tabbar则向上移动
                showView: false,//是否显示songview以及隐藏audiobar
                showList: false,//显示音乐列表
                status: false,//false代表暂停 true播放
                imgUrl: require("@/static/img/components/audiobar/CDimg.jpg"),//默认图片
                id: '',//getData处获取的id
                name: '欢迎使用',
                author: 'superlin',
                songUrl: '',
                sumTime: 0,//歌曲总时间
                curTime: 0,//当前时间
                interval: null,//定时器
                songlists: [],//songlist传过来的完整歌单
                newSongLists: [],//给option进行crud的歌单
                lyric: ''
            }
        },
        methods: {
            toSongView() {
                //进入音乐主界面，隐藏audiobar
                this.showView = !this.showView;
                this.$refs.song.style.height = this.showView ? '100%' : '0%';
            },
            getData() {//一旦playerId修改后会触发
                this.$bus.on("playerId", val => {
                    // console.log(val);//获取到点击的歌曲id
                    let value = val;
                    this.id = value;//歌曲id
                    getSongDetail(value).then(res => {
                        // console.log(res);//得到歌曲详细信息
                        this.imgUrl = res.songs[0].al.picUrl;
                        this.name = res.songs[0].name;
                        this.author = res.songs[0].ar[0].name;
                    }).then(()=>{
                        getSongUrl(value).then(res1 => {
                            // console.log(res1);
                            this.songUrl = res1.data[0].url;
                            // console.log(this.songUrl);
                        });
                    });
                    getLyric(value).then(res => {
                        // console.log(res.lrc.lyric);
                        this.lyric = res.lrc.lyric;
                    });//获取歌词
                });
            },
            getSongList() {
                this.$bus.on("songlists", val => {
                    // console.log('songlists:'+val);
                    // console.log(this.songlists);
                    this.songlists = val;//songlists用于显示
                    this.newSongLists = JSON.parse(JSON.stringify(this.songlists));//newsonglists用于crud
                })
            },
            changeStatus() {
                //歌曲播放、暂停状态
                if (this.songUrl != '') {
                    //按钮图标切换,歌曲暂停/播放,图片旋转/停止,播放进度监视
                    // console.log('改变状态')
                    this.status = !this.status;//播放状态切换
                    if (this.status) {
                        // console.log(this.$refs.audio);
                        console.log('播放' + this.status)
                        this.$refs.audio.play();
                        this.$refs.img.className = 'rotate_play';
                        this.interval = setInterval(() => {
                            this.curTime = this.$refs.audio.currentTime;//设curTime
                            this.sumTime = this.$refs.audio.duration;//总时间
                            console.log('定时器')
                            if (this.curTime == this.sumTime) {
                                console.log('定时器销毁')
                                clearInterval(this.interval);
                            }
                        }, 100);
                    } else {
                        // console.log('暂停' + this.status);
                        this.$refs.audio.pause();
                        this.$refs.img.className = 'rotate_play rotate_pause';
                        clearInterval(this.interval);//清除定时器
                    }
                    // console.log(this.$refs.audio.currentTime+','+this.$refs.audio.duration);
                }
                // else {
                //     console.log('url为空');
                // }
            },
            changeCurTime(val) {
                //子类滑动条改变父类curTime
                // console.log('父类接收到'+val);//得到的val是百分比 要进行相乘
                this.curTime = val * this.$refs.audio.duration / 100;
                this.$refs.audio.currentTime = this.curTime;
            },
            toOptionList() {
                //显示option
                // console.log('click-overlay')
                this.showList = !this.showList;
            },
            toLast() {
                // console.log('tolast');
                clearInterval(this.interval);//点击切歌要把之前的定时器清除
                for (let i = 0; i < this.newSongLists.length; i++) {
                    if (this.id == this.newSongLists[i].id) {
                        //找到对应歌曲
                        if (i > 0) {//修改为上一首的数据
                            this.$bus.emit('playerId', this.newSongLists[i - 1].id);//修改总线上的playerId
                        } else {//i==0
                            this.$bus.emit('playerId', this.newSongLists[this.newSongLists.length - 1].id);
                        }
                        break;
                    }
                }
            },
            toNext() {
                // console.log('tonext');
                clearInterval(this.interval);//点击切歌要把之前的定时器清除
                for (let i = 0; i < this.newSongLists.length; i++) {
                    if (this.id == this.newSongLists[i].id) {//修改为下一首的数据
                        //找到对应歌曲
                        if (i == this.newSongLists.length - 1) {
                            this.$bus.emit('playerId', this.newSongLists[0].id);//修改总线上的playerId
                        } else {//i==0
                            this.$bus.emit('playerId', this.newSongLists[i + 1].id);
                        }
                        break;
                    }
                }
            },
            setPlayerId(id) {
                this.$bus.emit('playerId', id)
            },
            del(id) {
                // console.log("del" + id);
                let index = this.newSongLists.findIndex(item => item.id == id);
                if (id == this.id) {//如果删除了当前播放歌曲
                    this.toNext();//因为删除当前播放歌曲后，tonext操作会变化playerId，watch会监视到songurl变化，
                    // songurl有个判断status的步骤，因此这里不需要判断
                }
                this.newSongLists.splice(index, 1);//删除当前songlists的该元素
            },
            initTime() {//初始化播放器的时间
                this.curTime = this.$refs.audio.currentTime = 0;
                this.sumTime = this.$refs.audio.duration;
                if (this.status) {
                    this.$refs.audio.play();
                }
            },
        },
        created() {
            this.getData();
            this.getSongList();
        },
        mounted() {
            if (this.$route.path == '/home' || this.$route.path == '/find' ||
                this.$route.path == '/mine' || this.$route.path == '/video') {
                this.style = {bottom: '60px'};
                this.$refs.song.style.height = this.showView ? '100%' : '0%';
            }
        },
        watch: {
            $route(to, from) {
                if (this.$route.path == '/home' || this.$route.path == '/find' ||
                    this.$route.path == '/mine' || this.$route.path == '/video') {
                    this.style = {bottom: '60px'};
                } else {
                    this.style = {}
                }
            },
            songUrl(newVal, oldVal) {//音乐url获取到值后自动进行播放，按钮变成点击暂停 (playerId一变他也跟着变)
                clearInterval(this.interval);
                if (newVal) {
                    if (oldVal == '' || this.status) {//无音乐时点击进入自动播放||有音乐且正在播放状态时也自动播放
                        this.status = true;//设为播放状态(针对oldVal=''的)
                        this.interval = setInterval(() => {
                            this.curTime = this.$refs.audio.currentTime;//设curTime
                            this.sumTime = this.$refs.audio.duration;//总时间
                            console.log('定时器1')
                            if (this.curTime == this.sumTime && this.sumTime!=0) {
                                console.log('定时器销毁1')
                                clearInterval(this.interval);
                            }
                        }, 100);
                    } else {//上一首不为空且为暂停状态
                        // console.log('上一首不为空且暂停')
                        this.$refs.img.className = 'rotate_play rotate_pause';
                        this.curTime = this.$refs.audio.currentTime;//设curTime
                        this.sumTime = this.$refs.audio.duration;//总时间
                    }
                }
            }
        },
    }
</script>

<style src="assets/css/components/audiobar/audiobar.css" scoped>

</style>