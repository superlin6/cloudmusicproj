<template>
    <div class="rank-row" @click="toRankList(rowData.id)">
        <div class="title">{{rowData.title}}</div>
        <div class="content">
            <div class="pic">
                <img :src="rowData.imgUrl">
            </div>
            <div class="font">
                <div class="describe">
                    <div class="des" v-for="(item,index) in rowData.msg">
                        <span class="name">{{index+1}}.{{item.first}}</span>
                        <span class="author">&nbsp;-&nbsp;{{item.second}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RankRow",
        props: ['rowData',],
        methods: {
            toRankList(id) {
                this.$router.push({name: 'RankList', query: {id}});
            }
        },

    }
</script>

<style src="assets/css/find/selection/rank/rankrow.css" scoped>

</style>