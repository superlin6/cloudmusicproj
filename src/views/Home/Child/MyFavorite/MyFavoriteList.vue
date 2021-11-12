<template>
    <div class="myfavorite-list">
        <song-list v-if="isShow"></song-list>
    </div>
</template>

<script>
    import SongList from "components/songlist/SongList";
    import {request} from "network/request";
    import {Toast} from 'vant'

    export default {
        name: "MyFavoriteList",
        components: {SongList},
        data(){
            return{
                isShow:false
            }
        },
        created() {
            //因为我喜欢的音乐需要登录，在这里验证登录状态
            request({
                url:'login/status'
            }).then(res=>{
                console.log(res);
                if(res.data.account!=null){
                    this.isShow = true;
                }
                else{
                    Toast({
                        message:'登录后显示'
                    })
                }
            })
        }
    }
</script>

<style scoped>
    .myfavorite-list{
        height: 100%;
        margin-top: 40px;
    }
</style>