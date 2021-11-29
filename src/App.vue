<template>
  <div id="app">
    <div class="main">
      <!-- list系列都是最终去到songlist的,在list期间可能会点击音乐主界面，再返回list要保证其位置不变所以设置keepalive -->
      <keep-alive
        include="Home,Find,Mine,Rank,RankList,CreateList,CollectList,FindRowItemList"
        ><router-view
      /></keep-alive>
      <top-bar v-if="$route.path != '/login'"></top-bar>
      <audio-bar
        v-if="$route.path == '/login' ? false : true"
        v-show="$route.path != '/songview'"
      ></audio-bar>
      <transition name="slide">
        <tab-bar
          v-if="
            $route.path == '/home' ||
            this.$route.path == '/find' ||
            this.$route.path == '/mine' ||
            this.$route.path == '/video'
              ? true
              : false
          "
        ></tab-bar>
      </transition>
    </div>
  </div>
</template>

<style src="./assets/css/base.css">
</style>
<script>
import AudioBar from "components/audiobar/AudioBar";
import TabBar from "components/tabbar/TabBar";
import TopBar from "./components/topbar/TopBar";

export default {
  components: { TopBar, AudioBar, TabBar },
};
</script>