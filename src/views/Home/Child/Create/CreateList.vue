<template>
    <div class="create-list">
        <song-list v-if="$route.query.i!=undefined" :i="$route.query.i"></song-list>
    </div>
</template>

<script>
    import SongList from "components/songlist/SongList";
    export default {
        name: "CreateList",
        components: {SongList}
    }
</script>

<style scoped>
    .create-list{
        height: 100%;
    }
</style>