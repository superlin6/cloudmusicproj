<template>
  <div class="songs-list">
    <song-list
      :id="$route.query.id"
      v-if="$route.query.id"
    />
  </div>
</template>

<script>
import SongList from '../../../../components/songlist/SongList.vue'
export default {
  components: { SongList },
  name: 'SongsList'
}
</script>

<style lang="less" scoped>
.songs-list {
  height: 100%;
}
</style>