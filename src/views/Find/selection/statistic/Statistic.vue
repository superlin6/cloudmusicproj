<template>
  <div class="statistic">
    <div class="recent-songs">
      <div class="title">最近播放</div>
      <div class="song-wrapper">
        <div
          class="song"
          v-for="song in songs"
          @click="setPlayerId(song.id)"
          :key="song.id"
        >
          <div class="song-name">
            {{ song.name }}
          </div>
          <div class="song-author">{{ song.author }}-{{ song.album }}</div>
        </div>
      </div>
    </div>
    <div class="recent-songlist">
      <find-row-block :num="songList.length" title="最近歌单">
        <find-row-item v-for="(item, index) in songList" :key="index">
          <div class="item-img" slot="item-img" @click="toItemList(item.id)">
            <img @load="verScroll" :src="item.picUrl" />
            <!-- <div class="playCount">
              <img src="~assets/img/findd/findrow/play.png" />
              <span class="count">{{ item.playCount | playCount }}</span>
            </div> -->
          </div>
          <div class="item-text" slot="item-text">{{ item.name }}</div>
        </find-row-item>
      </find-row-block>
    </div>
  </div>
</template>

<script>
import SongList from '../../../../components/songlist/SongList.vue';
import {
  getRecentVideo,
  getRecentSongs,
  getRecentSongList,
} from '../../../../network/Find/statistic';
import FindRowItem from '../../findrow/FindRowItem.vue';
import FindRowBlock from '../../../Find/findrow/FindRowBlock.vue';
export default {
  components: { SongList, FindRowItem, FindRowBlock },
  name: 'Statistic',
  data() {
    return {
      songs: [],
      songList: [],
      hasSet: false, //保证songlist放入bus后设为true,之后点击歌曲后songlist不再传入option(优化)
      loadCount: 0,
    };
  },
  created() {
    this.getSongs();
    this.getSongList();
  },
  methods: {
    async getSongs() {
      const {
        data: { list },
      } = await getRecentSongs(3);
      // console.log(list);
      list.forEach((item) => {
        const { data: temp } = item;
        const json = {};
        json.id = temp.id;
        json.name = temp.name;
        json.author = temp.ar[0].name ? temp.ar[0].name : null;
        json.album = temp.al.name ? temp.al.name : null;
        this.songs.push(json);
      });
    },
    async getSongList() {
      const {
        data: { list },
      } = await getRecentSongList(6);
      console.log(list)
      list.forEach((item) => {
        const json = {
          id: item.data.id,
          picUrl: item.data.coverImgUrl,
          name: item.data.name,
        };
        this.songList.push(json);
      });
    },
    setPlayerId(id) {
      this.$bus.emit('playerId', id);
      if (this.hasSet == false) {
        this.$bus.emit('songlists', this.songs); //点击了歌曲之后option栏会传入所有歌曲
        this.hasSet = true;
      }
    },
    verScroll() {
      //传给verscroll包裹的img
      this.loadCount++;
      if (this.loadCount >= this.songList.length) {
        //这里if的意思是 this.comData comData2都是[{},{},...] 而comData3是[]直接装入 *6是为了方便 可以直接取
        // console.log(this.loadCount);
        this.$bus.emit('verScroll');
        this.loadCount = 0; //初始化
      }
    },
  },
  filters: {
    playCount(val) {
      console.log(val)
      if (val >= 10000) {
        if (val < 100000000) return (val / 10000).toFixed(1) + '万';
        else return (val / 100000000).toFixed(1) + '亿';
      } else return val;
    },
  },
};
</script>

<style lang="less" scoped>
.statistic {
  padding-top: 40px;
  height: 100%;
  .recent-songs {
    .title {
      font-weight: 600;
      padding-left: 20px;
    }
    .song-wrapper {
      .song {
        padding: 10px 20px;
        .song-author {
          font-size: 12px;
          color: #8c939d;
        }
      }
    }
  }
}
</style>
