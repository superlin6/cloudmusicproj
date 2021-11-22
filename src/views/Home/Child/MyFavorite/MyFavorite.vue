<template>
    <div class="myfavorite clearfix" @click="toMyFavorite">
        <div class="myfavorite-img">
            <img :src="imgUrl">
        </div>
        <div class="myfavorite-text">
            <p class="text1">我喜欢的音乐</p>
            <p class="text2">
                <img src="~assets/img/home/myfavorite/finish.png">
                <span>共{{total}}首</span>
            </p>
        </div>
    </div>
</template>

<script>
import { getCreaCollList } from '../../../../network/Components/SongList/songlist';

    export default {
        name: "MyFavorite",
        data() {
            return {
                total: '',
                imgUrl: ''
            }
        },
        methods: {
            toMyFavorite() {
                this.$router.push('/myfavoritelist')
            },
            LoginCheck(){
                if(window.localStorage.getItem('userId')!=null){
                    getCreaCollList(window.localStorage.getItem('userId')).then(res => {
                        this.total = res.playlist[0].trackCount;
                        this.imgUrl = res.playlist[0].coverImgUrl;
                    });
                }
                else{
                    this.total = 0;
                    this.imgUrl = require('@/static/img/home/create/D.jpg')
                }
            }
        },
        created() {
            this.LoginCheck();
        },
        activated() {
            this.LoginCheck();
        }
    }
</script>

<style src="assets/css/home/myfavorite/myfavorite.css" scoped>

</style>