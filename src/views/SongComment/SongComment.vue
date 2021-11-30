<template>
  <div class="song-comment">
    <div class="song">
      <div class="img">
        <img :src="imgUrl" />
      </div>
      <span class="name">{{ name }}</span>
      <span class="author">&nbsp;-&nbsp;{{ author }}</span>
    </div>
    <scroll ref="scroll" :data="comments" :style="'height:calc(100% - 77px)'" pullup @scrollToEnd="getComments($route.query.id)">
      <div class="comment">
        <div class="title">评论({{ total }})</div>
        <div class="comment-block">
          <div
            class="comment-item"
            v-for="(item, index) in comments"
            :key="index"
          >
            <div class="img">
              <img :src="item.user.avatarUrl" />
              <div class="commenter">
                <span>{{ item.user.nickname }}</span>
                <div class="time">{{ item.time | commentTime }}</div>
              </div>
            </div>
            <div class="like" @click="toLike(index)">
              <img
                v-show="!item.liked"
                src="~assets/img/findd/findrow/like.png"
              />
              <img
                v-show="item.liked"
                src="~assets/img/findd/findrow/like-active.png"
              />
              <div class="count">{{ item.likedCount }}</div>
            </div>
            <div class="item-content">{{ item.content }}</div>
          </div>
          <div class="bottom">
            <div
              class="content"
              v-if="!isLoading && !finish"
            >
              上拉加载更多...
            </div>
            <div class="content" v-if="finish">已经到底部啦...</div>
            <van-loading
              v-show="isLoading"
              style="text-align: center"
              size="14px"
              >加载中...</van-loading
            >
          </div>
        </div>
        <!--            <div v-else class="no-comment">暂无评论</div>-->
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/scroll/Scroll";
import { getSongDetail } from "../../network/Components/AudioBar/audiobar";
import { getMusicComment } from "../../network/SongComment/songcomment";
import throttle from '../../uitls/throttle';

export default {
  name: "SongComment",
  components: { Scroll },
  created() {
    this.getDetail(this.$route.query.id);
    this.getComments(this.$route.query.id);
  },
  data() {
    return {
      isLoading: false,
      finish: false,
      imgUrl: require("@/static/img/home/create/D.jpg"),
      name: "",
      author: "",
      offset: 0,
      total: 0,
      comments: [],
    };
  },
  methods: {
    getDetail(id) {
      getSongDetail(id).then((res) => {
        // console.log(res);
        this.name = res.songs[0].name;
        let au = "";
        res.songs[0].ar.forEach((item) => {
          au += item.name + "/";
        });
        au = au.substring(0, au.length - 1); //把末尾/去掉
        this.author = au;
      });
    },
    getComments:throttle(function(id) {
      this.isLoading = true;
      //获取评论
      if (!this.finish) {
        getMusicComment(id,this.offset).then((res) => {
          // console.log(res);
          // this.comments = res.comments;//获取评论
          this.total = res.total;
          setTimeout(() => {
            res.comments.forEach((item) => {
              this.comments.push(item);
            });
            this.offset += 20;
            if (this.offset >= this.total) {
              this.finish = true;
            }
            this.isLoading = false;
          }, 1000);
        });
      }
    },1000),
    toLike(index) {
      this.comments[index].liked = !this.comments[index].liked;
      if (this.comments[index].liked) {
        this.comments[index].likedCount++;
      } else this.comments[index].likedCount--;
    },
  },
  filters: {
    commentTime(val) {
      var date = new Date(val);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "年" + m + "月" + d + "日";
    },
  },
};
</script>

<style src="assets/css/songcomment/songcomment.css" scoped>
</style>