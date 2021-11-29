<template>
  <div class="find-row-mv">
    <div class="title">MV推荐</div>
    <VerScroll :num="mvLists.length">
      <div class="mv-row">
        <div class="mv-item" v-for="(item, index) in mvLists" :key="index">
          <div class="content">
            <img :src="item.cover" @click="toDetail(item.id)" />
            <div class="font">{{ item.name }}</div>
          </div>
          <div class="playCount">
            <img src="~assets/img/findd/findrow/play.png" />
            <span class="count">{{ item.playCount | playCount }}</span>
          </div>
        </div>
      </div>
    </VerScroll>
  </div>
</template>

<script>
import { getMVAll } from "../../../network/Find/find";
import VerScroll from "../../../components/scroll/VerScroll.vue";

export default {
  name: "FindRowMV",
  data() {
    return {
      mvLists: [],
    };
  },
  methods: {
    getData() {
      getMVAll(6, "最热").then((res) => {
        // console.log(res);
        this.mvLists = res.data;
      });
    },
    toDetail(id) {
      this.$router.push({ name: "FindRowMVDetail", query: { id } });
    },
  },
  created() {
    this.getData();
  },
  filters: {
    playCount(val) {
      if (val >= 10000) {
        if (val < 100000000) return (val / 10000).toFixed(1) + "万";
        else return (val / 100000000).toFixed(1) + "亿";
      } else return val;
    },
  },
  components: { VerScroll },
};
</script>

<style src="assets/css/find/findrow/findrowmv.css" scoped>
</style>