<template>
    <div class="local-content">
        <top-bar></top-bar>
        <song-list></song-list>
<!-- songlist开发完成后将下面全部数据放入songlist-->
<!--        <div class="play-all">-->
<!--            <img src="~assets/img/home/selectbox/local/play.png">-->
<!--            <span>播放全部({{songlists.length}})</span>-->
<!--        </div>-->
<!--        <div class="local-songs">-->
<!--            <div class="song" v-for="song in songlists">-->
<!--                <div class="song-name">-->
<!--                    {{song.name}}-->
<!--                </div>-->
<!--                <div class="song-author">-->
<!--                    {{song.author}}-{{song.album}}-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
    </div>
</template>

<script>
    import {request} from "network/request";
    import TopBar from "components/topbar/TopBar";
    import SongList from "../../../../../../../components/songlist/SongList";

    export default {
        name: "LocalContent",
        components: {SongList, TopBar},
        data(){
            return{
                songlists:[
                    {id:1,name:'安静',author:'周杰伦',album:'范特西PLUS'},
                    {},
                    {},
                    {},
                ]
            }
        }
    }
</script>

<style src="assets/css/home/selectbox/local/localcontent.css" scoped>

</style>