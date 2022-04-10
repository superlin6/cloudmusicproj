<template>
  <div class="songs">
    <div class="list-content">
      <div
        class="content"
        v-for="item in songlists"
        :key="item.id"
        @click="toDetail(item.id)"
      >
        <div class="content-img">
          <img :src="item.coverImgUrl">
        </div>
        <div class="content-text">
          <p>{{item.name}}</p>
          <p class="num">{{item.trackCount}}首</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHotRecommend } from '../../../../network/Find/find'
export default {
  name: 'Songs',
  data() {
    return {
      songlists: []
    }
  },
  created() {
    this.getSongList()
  },
  methods: {
    async getSongList() {
      const { playlists } = await getHotRecommend(20);
      this.songlists = playlists;
    },
    toDetail(id) {
      this.$router.push({ name: 'SongsList', query: { id } })
    }
  }
}
</script>

<style lang="less" scoped>
.songs {
  height: 100%;
  overflow: auto;
  .list-content {
    margin-top: 46px;
    margin-bottom: 50px;
    // overflow: auto;
    .content {
      margin: 10px 0;
      padding: 0 10px;
      display: flex;
      /*align-items: center;*/
      .content-img {
        img {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          opacity: 0.8;
        }
      }
      .content-text {
        margin-left: 20px;
        font-size: 14px;
        .num {
          font-size: 12px;
          color: #b3b4b2;
        }
      }
    }
  }
}
</style>