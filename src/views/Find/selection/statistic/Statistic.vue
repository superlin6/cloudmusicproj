<template>
  <div class="statistic">
    <div class="recent-songlist">
      <find-row-block
        :num="songList.length"
        title="最近访问"
        class="find-row"
      >
        <find-row-item
          v-for="(item, index) in songList"
          :key="index"
        >
          <div
            class="item-img"
            slot="item-img"
            @click="toItemList(item.id)"
          >
            <img
              @load="verScroll"
              :src="item.picUrl"
            />
            <!-- <div class="playCount">
              <img src="~assets/img/findd/findrow/play.png" />
              <span class="count">{{ item.playCount | playCount }}</span>
            </div> -->
          </div>
          <div
            class="item-text"
            slot="item-text"
          >{{ item.name }}</div>
        </find-row-item>
      </find-row-block>
    </div>
    <div class="recent-songs">
      <div class="title">最近常听</div>
      <div class="song-wrapper">
        <div
          class="song"
          v-for="(song, index) in songs"
          @click="setPlayerId(song.id)"
          :key="song.id"
        >
          <div class="top">{{ index + 1 }}</div>
          <div class="song-item">
            <div class="song-name">
              {{ song.name }}
            </div>
            <div class="song-author">{{ song.author }}-{{ song.album }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="recent-mv">
      <div class="title">最近常看</div>
      <div class="mv-row">
        <div
          class="mv-item"
          v-for="(item, index) in videoList"
          :key="index"
        >
          <div class="content">
            <img
              :src="item.data.coverUrl"
              @click="toMVDetail(item.data.id)"
            />
            <div class="font">{{ item.data.name }}</div>
          </div>
        </div>
      </div>
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
      videoList: [],
      hasSet: false, //保证songlist放入bus后设为true,之后点击歌曲后songlist不再传入option(优化)
      loadCount: 0,
    };
  },
  created() {
    this.getSongs();
    this.getSongList();
    this.getRecentVideo();
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
      // console.log(list);
      list.forEach((item) => {
        const json = {
          id: item.data.id,
          picUrl: item.data.coverImgUrl,
          name: item.data.name,
        };
        this.songList.push(json);
      });
    },
    async getRecentVideo() {
      const { data: { list } } = await getRecentVideo(20);
      this.videoList = list.filter(item => item.resourceType === "MV");
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
    toItemList(id) {
      console.log(id);
      this.$router.push({ name: 'TopList', query: { id } })
    },
    toMVDetail(id) {
      this.$router.push({ name: 'FindRowMVDetail', query: { id } })
    }
  },
  filters: {
    playCount(val) {
      console.log(val);
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
  height: calc(100% - 50px);
  overflow: auto;
  margin: 50px 0 0;
  padding-bottom: 50px;
  box-sizing: border-box;
  // height: 50%;
  // border: 1px solid rgb(230, 230, 230);
  // box-shadow: 0 0 4px #d8d8d8;
  // border-radius: 12px;
  .recent-songlist {
    padding-top: 10px;
    .find-row {
      margin: 0 16px;
    }
    ::v-deep .title {
      margin: 6px 4px 10px;
    }
    ::v-deep .wrapper {
      padding: 4px 0;
    }
    ::v-deep img {
      width: 90px;
      height: 90px;
    }
  }
  .recent-songs {
    .title {
      font-weight: 600;
      padding-left: 20px;
      margin: 10px 0 20px;
    }
    .song-wrapper {
      border: 1px solid rgb(245, 242, 242);
      box-shadow: 0 0 6px #e7e6e6;
      border-radius: 8px;
      margin: 10px 16px 0;
      .song {
        padding: 10px 0;
        font-size: 15px;
        border-bottom: 1px solid rgb(245, 245, 245);
        display: flex;
        align-items: center;
        .top {
          padding-left: 12px;
          padding-right: 12px;
          color: rgb(219, 219, 219);
          font-weight: 600;
        }
        .song-author {
          margin-top: 4px;
          font-size: 12px;
          color: #8c939d;
        }
      }
    }
  }
  .recent-mv {
    .title {
      font-weight: 600;
      padding-left: 20px;
      margin: 10px 0 0;
    }
    .mv-row {
      padding: 20px 10px 0;
      display: flex;
      flex-wrap: wrap;
      .mv-item {
        box-sizing: border-box;
        width: 50%;
        position: relative;
        flex-shrink: 0;
        .content {
          padding: 0 6px;
          img {
            width: 100%;
            height: 120px;
            border-radius: 10px;
            box-shadow: 0 0 2px #789d83;
          }
          .font {
            font-size: 12px;
            padding: 4px 4px;
          }
        }
      }
    }
  }
}
</style>
