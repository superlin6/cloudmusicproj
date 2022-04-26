<template>
    <div class="mine-top">
        <div class="pic">
            <img :src="bgImg">
        </div>
        <div class="head">
            <div class="head-img">
                <img :src="headImg">
            </div>
            <div class="head-font">
                <div class="font-top">
                    <div class="font">
                        <div class="num">{{fans}}</div>
                        <div class="font">粉丝</div>
                    </div>
                    <div class="font">
                        <div class="num">{{follows}}</div>
                        <div class="font">关注</div>
                    </div>
                    <div class="font">
                        <div class="num">{{level}}</div>
                        <div class="font">等级</div>
                    </div>
                </div>
                <!-- <div class="font-bottom">
                    <van-button>编辑信息</van-button>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MineTop",
        props:['headImg','follows','fans','level','bgImg']
    }
</script>

<style src="assets/css/mine/minetop/minetop.css" scoped>

</style>