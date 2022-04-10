<template>
  <div class="home">
    <scroll ref="scroll">
      <user></user>
      <!-- <select-box></select-box> -->
      <my-favorite></my-favorite>
      <div class="nav">
        <div class="nav-item nav-item0">
          <a
            :class="{'active': currentSelected === 0}"
            @click.prevent="scrollTo(0)"
          >创建歌单</a>
        </div>
        <div class="line"></div>
        <div class="nav-item nav-item1">
          <a
            :class="{'active': currentSelected === 1}"
            @click.prevent="scrollTo(1)"
          >收藏歌单</a>
        </div>
      </div>
      <create
        ref="create"
        class="create"
      ></create>
      <collect
        ref="create"
        class="create"
        @finish="finish"
      ></collect>
    </scroll>
  </div>
</template>

<script>
import User from "./Child/User/User";
import SelectBox from "./Child/SelectBox/SelectBox";
import MyFavorite from "./Child/MyFavorite/MyFavorite";
import Scroll from "components/scroll/Scroll";
import Collect from "./Child/Collect/Collect";
import Create from "./Child/Create/Create";

export default {
  name: "Home",
  components: { Create, Collect, Scroll, MyFavorite, SelectBox, User },
  data() {
    return {
      currentSelected: 0
    }
  },
  methods: {
    finish() {
      this.$refs.scroll.refresh();
    },
    scrollTo(index) {
      this.currentSelected = index;
      this.$refs.scroll.scrollToElement(".nav-item" + index, 100, false, 0); //元素名称 延时 x轴偏移 y轴偏移
    }
  }
}
</script>

<style src="assets/css/home/home.css" scoped>
</style>