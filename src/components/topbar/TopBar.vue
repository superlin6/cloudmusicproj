<template>
  <div class="topbar">
    <top-bar-block
      :style="{
        backgroundColor:
          $route.path == '/home' || $route.path == '/find'
            ? '#f6f6f6'
            : $route.path == '/mine'
            ? 'rgba(255,255,255,.9)'
            : '#fff',
      }"
    >
      <top-bar-item>
        <!-- 个人菜单 -->
        <div slot="item-option">
          <img
            src="~assets/img/components/topbar/option_left.png"
            @click="option"
          />
        </div>
        <!-- 返回 -->
        <div slot="item-back">
          <img src="~assets/img/components/topbar/back.png" @click="back" />
        </div>
      </top-bar-item>
      <top-bar-item
        v-if="$route.path != '/home' || $route.path != '/songview'"
        class="center"
      >
        <!-- 歌单 -->
        <div slot="item-songlist">
          <span>歌单</span>
        </div>
        <!-- 排行榜 -->
        <div slot="item-rank">排行榜</div>
        <!-- 发现+搜索 -->
        <div slot="item-find">
          <van-field
            v-model="value"
            placeholder="搜索歌曲、MV"
            @click.prevent="toSearch"
            @keyup.13="search"
          />
        </div>
        <!-- 我的 -->
        <div slot="item-mine">我的</div>
        <!-- 视频 -->
        <div slot="item-video">视频</div>
        <div slot="item-daily">每日推荐</div>
        <div slot="item-comment">评论</div>
      </top-bar-item>
      <top-bar-item>
        <div slot="item-search">
          <img
            src="~assets/img/components/topbar/search.png"
            @click="toSearch"
          />
        </div>
        <div slot="item-mine">
          <img src="~assets/img/components/topbar/option.png" />
        </div>
        <div slot="item-find">
          <img src="~assets/img/components/topbar/mic.png" />
        </div>
        <div slot="item-mvdetail">
          <img src="~assets/img/components/topbar/share.png" />
        </div>
      </top-bar-item>
    </top-bar-block>
    <van-popup
      v-model="show"
      position="left"
      :style="{ height: '100%', width: '70%', backgroundColor: '#f6f6f6' }"
      :lock-scroll="false"
      @click.stop=""
    >
      <top-bar-option></top-bar-option>
    </van-popup>
  </div>
</template>

<script>
import TopBarBlock from "./TopBarBlock";
import TopBarItem from "./TopBarItem";
import TopBarOption from "./topbaroption/TopBarOption";
import { getCloudSearch } from "../../network/Components/TopBar/topbar";

export default {
  name: "TopBar",
  components: { TopBarOption, TopBarItem, TopBarBlock },
  data() {
    return {
      show: false,
      value: "",
    };
  },
  methods: {
    option() {
      this.show = !this.show;
    },
    back() {
      // this.type==1;
      if (this.$route.path == "/searcher") {
        this.value = "";
      }
      this.$router.go(-1);
    },
    toSearch() {
      this.$router.push("/searcher");
    },
    search() {
      this.$bus.emit("setHis", this.value); //传setHis信号到searcher
      getCloudSearch(this.value, 1).then((res) => {
        // console.log(res.result.songs);
        this.$bus.emit("lists", res.result.songs); //搜索结果传给searcher
        this.value = ""; //清空input
      });
    },
  },
  created() {
    this.$bus.on("content", (val) => {
      //接收searcher点击按钮传过来的值
      // console.log('触发content')
      this.value = val;
      this.search(); //接收成功后调用search获取搜索结果
    });
  },
};
</script>

<style src="assets/css/components/topbar/topbar.css" scoped>
</style>