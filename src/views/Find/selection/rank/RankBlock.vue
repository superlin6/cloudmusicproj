<template>
    <div class="rank-block">
        <div class="rank-item" v-for="(item,index) in blockData">
            <img :src="item.imgUrl" @click="toRankList(item.id)">
            <div class="font">{{item.title}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RankBlock",
        props: ['blockData'],
        // created() {//设定时器的原因是blockData有延迟，未获取时为undefined
        //     const t = setTimeout(() => {
        //         console.log(this.blockData);
        //     }, 1000);
        // },
        methods: {
            toRankList(id) {
                this.$router.push({name:'RankList',query:{id}});
            }
        },
        // beforeDestroy() {
        //     clearTimeout(t);
        // }
    }
</script>

<style src="assets/css/find/selection/rank/rankblock.css" scoped>

</style>