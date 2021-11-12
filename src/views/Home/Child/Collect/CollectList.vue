<template>
    <div class="collect-list">
        <song-list v-if="$route.query.i!=undefined" :i="$route.query.i"></song-list>
    </div>
</template>

<script>
    import SongList from "components/songlist/SongList";
    export default {
        name: "CollectList",
        components: {SongList},
    }
</script>

<style scoped>
    .collect-list{
       height: 100%;
    }
    .content{
        height: 2000px;
    }
</style>