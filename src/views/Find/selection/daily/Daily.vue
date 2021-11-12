<template>
    <div class="daily">
        <song-list v-if="isShow"></song-list>
    </div>
</template>

<script>
    import SongList from "components/songlist/SongList";
    export default {
        name: "Daily",
        components: {SongList},
        data(){
            return{
                isShow:false
            }
        },
        methods:{
            toShow(){
                if(window.localStorage.getItem('userId')!=undefined){
                    this.isShow = true;
                }
            }
        },
        created() {
            this.toShow();
        }
    }
</script>

<style src="assets/css/find/selection/daily/daily.css" scoped>

</style>