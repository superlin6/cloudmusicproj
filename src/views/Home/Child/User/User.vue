<template>
    <div>
        <div class="user clearfix">
            <div class="headImg">
                <img class="img" :src="imgUrl">
            </div>
            <div class="mine" @click="ToMine(type)">
                <!-- 此处点击导航到Mine -->
                <div class="mine-left">
                    <div class="text-name">{{name}}</div>
                    <div class="vipBtn">Lv.{{level}}</div>
                </div>
                <div class="mine-right">
                    <img src="~assets/img/home/user/right.png">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getUserDetail } from "../../../../network/Home/home";

    export default {
        name: "User",
        props: ['id'],
        data() {
            return {
                name: '未登录,点击登录',
                level: null,
                type: 0,
                imgUrl: '',
            }
        },
        methods: {
            LoginCheck() {//登录验证
                if (window.localStorage.getItem('userId')!=null) {
                    this.type = 1;//type=1表示点击进入主页 否则未登录 点击跳转登录页
                    // console.log(res)
                    getUserDetail(window.localStorage.getItem('userId')).then(res1 => {
                        // console.log(res1);
                        this.imgUrl = res1.profile.avatarUrl;
                        this.name = res1.profile.nickname;
                        this.level = res1.level;
                    })
                }
                else{
                    this.imgUrl = require('@/static/img/home/user/logout.png')
                    this.name='未登录,点击登录';
                    this.level = null;
                    this.type = 0;
                }
            },
            ToMine(type) {
                if (type == 1)
                    this.$router.push('/mine')
                else if (type == 0) {
                    this.$router.push('/login')
                }
            }
        },
        activated() {//写在这里的原因在于keep-alive不销毁组件，在登录完成后回到页面时dom没有重新渲染导致用户不显示
            this.LoginCheck();
        }
    }
</script>

<style src="assets/css/home/user/user.css" scoped>

</style>