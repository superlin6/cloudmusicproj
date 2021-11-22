<template>
    <div class="carousel">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(item,index) in carouselData" :key="index">
                <img :src="item.pic">
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
import { getBlockPage } from '../../../network/Find/find';

    export default {
        name: "Carousel",
        data(){
            return{
                carouselData:{}
            }
        },
        created() {
            getBlockPage().then(res=>{
                // console.log(res.data.blocks);
                //blocks共4个 轮播图0 其他三行1 2 3
                this.carouselData = res.data.blocks[0].extInfo.banners;
                // console.log(this.carouselData);
            })
        }
    }
</script>

<style src="assets/css/find/carousel/carousel.css">

</style>