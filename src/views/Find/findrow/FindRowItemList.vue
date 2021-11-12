<template>
    <div class="item-list">
        <song-list v-if="$route.query.id!=undefined" :id="$route.query.id"></song-list>
    </div>
</template>

<script>
    import SongList from "components/songlist/SongList";
    export default {
        name: "ItemList",
        components: {SongList},
    }
</script>

<style scoped>
    .item-list{
        height:100%;
    }
</style>