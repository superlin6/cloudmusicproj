<template>
    <div class="rank-list">
        <song-list v-if="$route.query.id!=undefined" :id="$route.query.id"></song-list>
    </div>
</template>

<script>
    import TopPicBlock from "components/toppicblock/TopPicBlock";
    import SongList from "components/songlist/SongList";
    export default {
        name: "RankList",
        components: {SongList, TopPicBlock},
        // watch:{
        //     $route(to,from){
        //         //在歌单处点击返回后由于ranklist设置了keep-alive,所以songlist是一定会生成的
        //         //有两个解决方案：1、song-list设v-if  2、在songlist里面改逻辑判断
        //         //原本想着第2种可能性能方面更好，但是当传入id为undefined时songlist的watch会报错，所以选择第1种
        //         // console.log('id'+this.$route.query.id);
        //     }
        // }
    }
</script>

<style scoped>
    .rank-list{
        height: 100%;
    }
</style>