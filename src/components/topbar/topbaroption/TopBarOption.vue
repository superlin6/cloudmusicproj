<template>
    <div class="top-bar-option">
        <div class="content">
            <div class="block_vip">
                <div class="title">{{lists.vip.title}}</div>
                <div class="font">{{lists.vip.name}}</div>
            </div>
            <div class="block_1">
                <div class="font" v-for="item in lists.block1.name">{{item}}</div>
            </div>
            <div class="block_2">
                <div class="title">{{lists.block2.title}}</div>
                <div class="font" v-for="item in lists.block2.name">{{item}}</div>
            </div>
            <div class="block_3">
                <div class="title">{{lists.block3.title}}</div>
                <div class="font" v-for="item in lists.block3.name">{{item}}</div>
            </div>
            <div class="block_4">
                <div class="font" v-for="item in lists.block4.name">{{item}}</div>
            </div>
            <div class="block_5">
                <van-button @click="Logout">退出登录/关闭</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import Scroll from "components/scroll/Scroll";
    import {request} from "network/request";
    import {Dialog} from 'vant';

    export default {
        name: "TopBarOption",
        components: {Scroll},

        data() {
            return {
                lists: {
                    vip: {title: '黑胶VIP', name: '黑胶低至0.3元/天！还有万份好礼'},
                    block1: {title: '', name: ['我的消息', '云贝中心', '创作者中心']},
                    block2: {title: '音乐服务', name: ['云村有票', '商城', '游戏专区', '口袋彩铃']},
                    block3: {
                        title: '其他', name: ['设置', '夜间模式', '定时关闭', '个性装扮',
                            '边听边存', '在线听歌免流量', '音乐黑名单', '青少年模式', '音乐闹钟']
                    },
                    block4: {title: '', name: ['我的订单', '优惠券', '我的客服', '分享网易云音乐', '关于']},
                },
            }
        },
        methods: {
            Logout() {
                if (window.localStorage.userId != null) {
                    request({
                        url: '/logout'
                    }).then(res1 => {
                        Dialog.alert({
                            message: '退出成功'
                        }).then(() => {
                            window.localStorage.clear('userId');
                            history.go(-1);
                            // request({
                            //     url: '/login/refresh',
                            // })//该接口需要登录后才能使用，退出登录无法刷新
                        })
                    })
                } else {
                    Dialog.alert({
                        message: '当前无登录，无需退出'
                    })
                }
            }
        }
    }
</script>

<style src="assets/css/components/topbar/topbaroption.css" scoped>

</style>