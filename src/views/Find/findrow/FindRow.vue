<template>
  <div class="find-row">
    <div class="recommend-row">
      <!-- 推送的歌单 -->
      <div class="recommend-wrapper" v-if="comData">
        <find-row-block
          v-for="(itema, indexa) in comData"
          :num="itema.creatives.length"
          :title="itema.uiElement.subTitle.title"
          :key="indexa"
        >
          <find-row-item
            v-for="(itemb, indexb) in itema.creatives"
            :key="indexb"
          >
            <div
              class="item-img"
              slot="item-img"
              @click="toItemList(itemb.creativeId)"
            >
              <img :src="itemb.uiElement.image.imageUrl" />
              <div class="playCount">
                <img src="~assets/img/findd/findrow/play.png" />
                <span class="count">{{
                  itemb.resources[0].resourceExtInfo.playCount | playCount
                }}</span>
              </div>
            </div>
            <div class="item-text" slot="item-text">
              {{ itemb.uiElement.mainTitle.title }}
            </div>
          </find-row-item>
        </find-row-block>
      </div>
      <!-- 登录后的歌单 -->
      <div class="recommend-wrapper" v-if="comData2">
        <find-row-block
          v-for="(itema, indexa) in comData2"
          :num="itema.length"
          :title="itema[0].copywriter"
          :key="indexa"
        >
          <find-row-item v-for="(itemb, indexb) in itema" :key="indexb">
            <div class="item-img" slot="item-img" @click="toItemList(itemb.id)">
              <img :src="itemb.picUrl" />
              <div class="playCount">
                <img src="~assets/img/findd/findrow/play.png" />
                <span class="count">{{ itemb.playcount | playCount }}</span>
              </div>
            </div>
            <div class="item-text" slot="item-text">{{ itemb.name }}</div>
          </find-row-item>
        </find-row-block>
      </div>
      <!-- 热门推荐歌单 -->
      <div class="recommend-wrapper">
        <find-row-block :num="comData3.length">
          <find-row-item v-for="(item, index) in comData3" :key="index">
            <div class="item-img" slot="item-img" @click="toItemList(item.id)">
              <img @load="verScroll" :src="item.coverImgUrl" />
              <div class="playCount">
                <img src="~assets/img/findd/findrow/play.png" />
                <span class="count">{{ item.playCount | playCount }}</span>
              </div>
            </div>
            <div class="item-text" slot="item-text">{{ item.name }}</div>
          </find-row-item>
        </find-row-block>
      </div>
    </div>
    <div class="mv-row">
      <find-row-m-v></find-row-m-v>
    </div>
  </div>
</template>

<script>
import FindRowBlock from "./FindRowBlock";
import FindRowItem from "./FindRowItem";
import { request } from "network/request";
import FindRowMV from "./FindRowMV";

export default {
  name: "FindRow",
  components: { FindRowMV, FindRowItem, FindRowBlock },
  data() {
    return {
      comData: "",
      comData2: "",
      comData3: "",
      loadCount:0
    };
  },
  methods: {
    InitData() {
      this.type = false;
      this.comData = [];
      this.comData2 = [];
      this.comData3 = [];
    },
    getData() {
      request({
        url: "/homepage/block/page",
      }).then((res) => {
        //下一步取数据格式相同的数据
        if (window.localStorage.userId == null) {
          //未登录
          let tmpData = res.data.blocks.filter(
            (item1) => item1.showType == "HOMEPAGE_SLIDE_PLAYLIST"
          );
          // console.log(tmpData);

          tmpData.forEach((it) => {
            let { creatives, uiElement } = it;
            this.comData.push({ creatives, uiElement });
          });
          // console.log(this.comData)
        } else {
          //已登录 目前发现自己账号只有4条 只有1可以拿 所以换成取登录后的推荐歌单
          request({
            url: "/recommend/resource",
          }).then((res) => {
            // console.log(res);
            // 每次取6个数据 使得可以水平滑动
            let number = 0;
            //遍历次数length
            // let length = res.recommend.length % 6 == 0 ? parseInt(res.recommend.length / 6) : parseInt(res.recommend.length / 6) + 1;
            let length = parseInt(res.recommend.length / 6); //考虑美观，后面余数歌单不取
            // console.log('length=' + length);
            for (let i = 0; i < length; i++) {
              let tmpData = res.recommend.slice(number, number + 6);
              number += 6;
              // console.log("tmpData:"+tmpData);
              this.comData2.push(tmpData);
            }
            // console.log(this.comData2);
          });
        }
      });
      request({
        //热门推荐(无需登录)
        url: "/top/playlist/highquality?limit=6",
      }).then((res) => {
        // console.log(res);
        // this.comData3 = res.playlists;
        res.playlists.forEach(item => {
          this.comData3.push(item);
        })
      });
    },
    toItemList(id) {
      this.$router.push({ name: "FindRowItemList", query: { id } });
    },
    verScroll(){
      this.loadCount++;
      // console.log(this.loadCount);
      if(this.loadCount>=6)
        this.$bus.emit('verScroll');
    }
  },
  updated() {
    this.$emit("finish"); //刷新scroll
  },
  activated() {
    this.InitData();
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
};
</script>

<style src="assets/css/find/findrow/findrow.css" scoped>
</style>