<template>
  <div class="top-list">
    <song-list
      v-if="$route.query.id"
      :id="$route.query.id"
    />
  </div>
</template>

<script>
import SongList from '../../../../../components/songlist/SongList.vue'
export default {
  components: { SongList },
  name: 'TopList'

}
</script>

<style lang="less" scoped>
.top-list {
  height: 100%;
}
</style>