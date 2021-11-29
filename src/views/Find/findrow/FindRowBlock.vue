<template>
    <div class="find-row-block">
        <div class="title">{{title}}</div>
        <VerScroll :num="num">
            <div class="find-row-wrapper">
                <slot></slot>
            </div>
        </VerScroll>
    </div>
</template>

<script>
    import VerScroll from "components/scroll/VerScroll.vue";


    export default {
        name: "FindRowBlock",
        components: { VerScroll },
        // props: ['num', 'title'],
        props:{
            num: {
                type: Number,
                default: 6
            },
            title: {
                type: String,
                default: '热门歌单'
            }
        }
        // created() {
        //     // console.log("blocknum:"+this.num);
        //     // console.log("blocktitle:"+this.title)
        // },
    }
</script>

<style src="assets/css/find/findrow/findrowblock.css" scoped>

</style>