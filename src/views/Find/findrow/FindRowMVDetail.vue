<template>
  <div class="find-row-mv-detail">
    <scroll :data="comments">
      <div class="video" @click="changeStatus">
        <video :src="url" ref="video" controls autoplay></video>
      </div>
      <div class="title">
        <div class="title-name">
          <span>{{ detail.name }}</span>
        </div>
        <div class="detail">
          <span class="author">作者：{{ detail.artistName }}</span>
          <span class="playcount"
            >播放：{{ detail.playCount | countFilter }}</span
          >
          <span class="publishtime">发布时间：{{ detail.publishTime }}</span>
        </div>
        <div class="message">描述：{{ detail.desc | desc }}</div>
      </div>
      <div class="comment">
        <div class="count">评论({{ detail.commentCount }})</div>
        <div class="comment-block" v-if="detail.commentCount != 0">
          <div
            class="comment-item"
            v-for="(item, index) in comments"
            :key="index"
          >
            <div class="img">
              <img :src="item.user.avatarUrl" />
              <div class="commenter">
                <div class="name">{{ item.user.nickname }}</div>
                <div class="time">{{ item.time | commentTime }}</div>
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
            </div>
            <div class="item-content">{{ item.content }}</div>
          </div>
          <div class="bottom">
            <div
              class="content"
              v-if="!isLoading && !finish"
              @click="getComments($route.query.id)"
            >
              点击加载更多...
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
        <div v-else class="no-comment">暂无评论</div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/scroll/Scroll";
import { getMVComment, getMVDetail, getMVDetailInfo, getMVUrl } from "../../../network/Find/find";

export default {
  name: "FindRowMVDetail",
  components: { Scroll },
  data() {
    return {
      url: "",
      status: true, //默认播放,
      detail: [],
      comments: [],
      offset: 0,
      isLoading: false, //加载评论状态
      finish: false, //表示获取完所有评论
    };
  },
  methods: {
    getUrl(id) {
      getMVUrl(id,360)
        .then((res) => {
          this.url = res.data.url; //获取mv的url
        })
        .then(() => {
          getMVDetail(id)
            .then((res1) => {
              // console.log(res2);
              this.detail = res1.data;
            })
            .then(() => {
              getMVDetailInfo(id).then((res2) => {
                // console.log(res2);
                this.$set(this.detail, "commentCount", res2.commentCount); //获取评论数
              });
            });
        });
    },
    changeStatus() {
      this.status = !this.status;
      if (this.status) this.$refs.video.play();
      else this.$refs.video.pause();
    },
    getComments(id) {
      this.isLoading = true;
      //获取评论
      if (!this.finish) {
        getMVComment(id,this.offset).then((res3) => {
          console.log(res3.comments);
          // this.comments = res3.comments;//获取评论
          setTimeout(() => {
            res3.comments.forEach((item) => {
              this.comments.push(item);
            });
            this.offset += 20;
            if (this.offset >= this.detail.commentCount) {
              this.finish = true;
            }
            this.isLoading = false;
          }, 1000);
        });
      }
    },
    toLike(index) {
      this.comments[index].liked = !this.comments[index].liked;
      if (this.comments[index].liked) {
        this.comments[index].likedCount++;
      } else this.comments[index].likedCount--;
    },
  },
  created() {
    this.getUrl(this.$route.query.id);
    this.getComments(this.$route.query.id); //获取初始评论20条
  },
  filters: {
    countFilter(val) {
      if (val >= 10000) {
        if (val < 100000000) return val / 10000 + "万";
        else return val / 100000000 + "亿";
      } else return val;
    },
    desc(val) {
      if (!val) {
        return "暂无";
      } else {
        return val.substring(0, 52) + "...";
      }
    },
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

<style src="assets/css/find/findrow/findrowmvdetail.css" scoped>
</style>