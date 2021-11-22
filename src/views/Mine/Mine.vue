<template>
  <div class="mine">
    <scroll ref="scroll">
      <mine-top
        :headImg="headImg"
        :fans="fans"
        :follows="follows"
        :level="level"
        :bgImg="bgImg"
      ></mine-top>
      <message
        :createDays="createDays"
        :gender="gender"
        :birthday="birthday"
      ></message>
      <create></create>
      <collect @finish="finish"></collect>
    </scroll>
  </div>
</template>

<script>
import MineTop from "./MineTop/MineTop";
import Message from "./Message/Message";
import Scroll from "components/scroll/Scroll";
import Create from "../Home/Child/Create/Create";
import Collect from "../Home/Child/Collect/Collect";
import { getUserDetail } from "../../network/Home/home";

export default {
  name: "Mine",
  components: { Collect, Create, Message, MineTop, Scroll },
  data() {
    return {
      headImg: "", //默认图片
      bgImg: "",
      level: 0,
      fans: 0,
      follows: 0,
      createDays: 0,
      birthday: 0,
      gender: null,
    };
  },
  methods: {
    initData() {
      //默认图片
      this.headImg = require("@/static/img/home/user/logout.png");
      this.bgImg = require("@/static/img/home/create/A.jpg");
      this.level = 0;
      this.fans = 0;
      this.follows = 0;
      this.createDays = 0;
      this.birthday = 0;
      this.gender = null;
    },
    LoginCheck() {
      //登录验证
      if (window.localStorage.getItem("userId") != null) {
        getUserDetail(window.localStorage.getItem("userId")).then((res) => {
          // console.log(res);
          this.headImg = res.profile.avatarUrl;
          this.bgImg = res.profile.backgroundUrl;
          this.level = res.level;
          this.fans = res.profile.followeds;
          this.follows = res.profile.follows;
          this.createDays = res.createDays;
          this.gender = res.profile.gender; //性别 1男 0女
          this.birthday = res.profile.birthday;
          // console.log(this.birthday)
        });
      } else {
        this.initData(); //初始化数据
      }
    },
    finish() {
      this.$refs.scroll.refresh();
    },
  },
  activated() {
    this.LoginCheck();
  },
};
</script>

<style src="assets/css/mine/mine.css" scoped>
</style>