<template>
    <div class="song-list">
        <scroll :data="songlists" :style="'height:calc(100% - 89px)'">
            <top-pic-block v-if="name!=''&&author!=''&&imgUrl!=''"
                           :name="name" :author="author" :imgUrl="imgUrl" :bgUrl="bgUrl"></top-pic-block>
            <div class="play-all" v-if="$route.path!='/searcher' && $route.path!='/statistic'" @click="setSongLists">
                <img src="~assets/img/home/selectbox/local/play.png">
                <span>播放全部({{songlists.length}})</span>
            </div>
            <div class="songs">
                <div class="song" v-for="song in songlists" @click="setPlayerId(song.id)" :key="song.id">
                    <div class="song-name">
                        {{song.name}}
                    </div>
                    <div class="song-author">
                        {{song.author}}-{{song.album}}
                    </div>
                </div>
            </div>
        </scroll>
    </div>
</template>

<script>
import TopPicBlock from "../toppicblock/TopPicBlock";
import Scroll from "../scroll/Scroll";
import { getCreaCollList, getLikeList, getPlayListDetail, getRecommendSongs } from "../../network/Components/SongList/songlist";
import { getUserDetail } from "../../network/Home/home";
import { getSongDetail } from '../../network/Components/AudioBar/audiobar';

    export default {
        name: "SongList",
        components: {Scroll, TopPicBlock},
        props: ['i', 'id', 'lists'],//i是传主页index,id为歌单id,lists代表搜索后得到的lists
        data() {
            return {
                songlists: [],
                name: '',//标题
                author: '',//歌单作者
                imgUrl: '',//top-pic-block的imgUrl
                bgUrl: '',//top-pic-block背景图
                hasSet: false//保证songlist放入bus后设为true,之后点击歌曲后songlist不再传入option(优化)
            }
        },
        methods: {
            getLikeList() {
                getLikeList(window.localStorage.getItem('userId')).then(res => {
                    console.log(res);
                    getUserDetail(window.localStorage.getItem('userId')).then(res => {
                        // console.log(res);
                        this.name = '我喜欢的音乐';
                        this.author = res.profile.nickname;
                    });
                    // console.log(res);
                    let ids = res.ids;
                    let idsurl = ids.join();
                    // console.log(typeof idsurl);//string
                    getSongDetail(idsurl).then(res => {
                            // console.log(res);
                            this.imgUrl = res.songs[0].al.picUrl;
                            res.songs.forEach(item => {
                                // console.log(item.name)
                                let json = {};
                                json.id = item.id;
                                json.name = item.name;
                                json.author = item.ar[0].name;
                                json.album = item.al.name;
                                this.songlists.push(json);
                            })
                        }
                    )
                })
            },
            getCreaCollList(i) {
                getCreaCollList(window.localStorage.getItem('userId')).then(res => {
                    let data = res.playlist.filter((item, index) => index != 0);//拿到除了喜欢的音乐以外其他歌单列表
                    let ids = [];//ids存放歌单的id
                    data.forEach(item => {
                        ids.push(item.id);
                    })
                    // console.log(ids);
                    switch (i) {//传入的i为歌单index
                        case i:
                            getPlayListDetail(ids[i]).then(res => {
                                // console.log(res);
                                this.name = res.playlist.name;//取出歌单名和作者，传到toppicblock
                                this.author = res.playlist.creator.nickname;
                                this.imgUrl = res.playlist.coverImgUrl;
                                this.bgUrl = res.playlist.backgroundCoverUrl;
                                // console.log(res.playlist.creator.nickname);
                                let trackIds = [];
                                //这里拿到的歌单不完整，非自身用户的歌单只能拿20个，但歌曲id仍然完整获取在trackIds，
                                //因此这里需要再请求一次根据歌曲id取歌曲 /song/detail?ids=
                                // console.log(trackIds);
                                res.playlist.trackIds.forEach(item => {
                                    trackIds.push(item.id);
                                })
                                // console.log(trackIds.join(','));
                                getSongDetail(trackIds.join(',')).then(res => {
                                    // console.log(res);
                                    res.songs.forEach(item => {
                                        // console.log(item)
                                        let json = {};
                                        json.id = item.id;
                                        json.name = item.name;
                                        json.author = item.ar[0].name;
                                        json.album = item.al.name;
                                        this.songlists.push(json);
                                    });
                                })
                            });
                            break;
                    }

                })
            },
            getOtherList(id) {
                if (this.$route.path != '/findrowmvdetail') {
                    //这里设置条件是因为发现页有歌单、视频，一旦有id会使songlist的v-if为true songlist只在歌单页获取，视频不需要
                    getPlayListDetail(id).then(res => {
                            // console.log(res);
                            this.name = res.playlist.name;//取出歌单名和作者，传到toppicblock
                            this.author = res.playlist.creator.nickname;
                            this.imgUrl = res.playlist.coverImgUrl;
                            this.bgUrl = res.playlist.backgroundCoverUrl;
                            // console.log(res.playlist.creator.nickname);
                            let trackIds = [];
                            //track拿到的歌单不完整，非自身用户的歌单只能拿20个，但歌曲id仍然完整获取在trackIds，
                            //因此这里需要再请求一次根据歌曲id取歌曲 /song/detail?ids=
                            // console.log(trackIds);
                            res.playlist.trackIds.forEach(item => {
                                trackIds.push(item.id);
                            })
                            // console.log(trackIds.join(','));
                            getSongDetail(trackIds.join(',')).then(res => {
                                // console.log(res);
                                res.songs.forEach(item => {
                                    // console.log(item.name)
                                    let json = {};
                                    json.id = item.id;
                                    json.name = item.name;
                                    json.author = item.ar[0].name;
                                    json.album = item.al.name;
                                    this.songlists.push(json);
                                });
                            })
                        }
                    )
                }
            },
            getDailyList() {
                this.name = '每日推荐';
                this.author = '网易云音乐'
                getRecommendSongs().then(res => {
                    // console.log(res);
                    this.imgUrl = res.data.dailySongs[0].al.picUrl;
                    res.data.dailySongs.forEach(item => {
                        // console.log(item.name)
                        let json = {};
                        json.id = item.id;
                        json.name = item.name;
                        json.author = item.ar[0].name;
                        json.album = item.al.name;
                        this.songlists.push(json);
                    });
                })
            },
            getSearcherList(lists) {
                this.songlists = [];
                lists.forEach(item => {
                    // console.log(item);
                    let json = {};
                    json.id = item.id;
                    json.name = item.name;
                    json.author = item.ar[0].name;
                    json.album = item.al.name;
                    this.songlists.push(json);
                })
            },
            setPlayerId(id) {
                this.$bus.emit('playerId', id);
                if (this.hasSet == false) {
                    this.$bus.emit('songlists', this.songlists);//点击了歌曲之后option栏会传入所有歌曲
                    this.hasSet = true;
                }
            },
            setSongLists() {
                this.$bus.emit('songlists', this.songlists)//将songlists发送到audiobar
                this.$bus.emit('playerId', this.songlists[0].id);//点击播放全部时播放第一首歌
            },
        },
        created() {
            switch (this.$route.path) {
                case '/myfavoritelist':
                    this.getLikeList();
                    break;
                case '/createlist' :
                    this.getCreaCollList(this.i);
                    break;
                case '/collectlist' :
                    this.getCreaCollList(this.i);
                    break;
                case '/searcher':
                    this.getSearcherList(this.lists);
                    break;
                case '/daily':
                    this.getDailyList();
                    break;
                default:
                    this.getOtherList(this.id);
            }
        },
        watch: {
            lists() {
                // console.log('songlist接收到lists');
                this.getSearcherList(this.lists);
            }
        }
    }
</script>

<style src="assets/css/components/songlist/songlist.css" scoped>

</style>