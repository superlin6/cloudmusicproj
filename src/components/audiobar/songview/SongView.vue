<template>
    <div class="song-view">
        <div class="top">
            <div class="img">
                <img src="~assets/img/components/topbar/pulldown.png" @click="back">
            </div>
            <div class="share">
                <img src="~assets/img/components/topbar/share.png">
            </div>
        </div>
        <cd-and-lyric :imgUrl="imgUrl" :name="name"
                      :author="author" :status="status"
                      :curTime="curTime" :sumTime="sumTime"
                      :lyric="lyric"></cd-and-lyric>
        <operation :status="status" @changeStatus="changeStatus"
                   @changeCurTime="changeCurTime" @toOptionList="toOptionList"
                   @toLast="toLast" @toNext="toNext" :id="id" @back="back"
                   :curTime="curTime" :sumTime="sumTime"></operation>
    </div>
</template>

<script>
    import CdAndLyric from "./CdAndLyric/CdAndLyric";
    import Operation from "./Operation/Operation";
    import TopBar from "components/topbar/TopBar";

    export default {
        name: "SongView",
        components: {TopBar, Operation, CdAndLyric},
        props: ['imgUrl', 'name', 'author', 'status', 'curTime', 'sumTime','lyric','id'],
        methods: {
            back() {
                this.$emit('change');
            },
            changeStatus() {
                this.$emit('changeStatus');
            },
            changeCurTime(val) {
                this.$emit('changeCurTime', val);
            },
            toOptionList(){
                this.$emit('toOptionList');
            },
            toLast(){
                this.$emit('toLast')
            },
            toNext(){
                this.$emit('toNext');
            }
        },
    }
</script>

<style src="assets/css/components/audiobar/songview/songview.css" scoped>

</style>