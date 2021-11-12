<template>
    <div class="operation">
        <div class="operation-top">
            <div class="like" @click="like">
                <img v-show="!islike" src="~assets/img/song/operation/like.png">
                <img v-show="islike" src="~assets/img/song/operation/like_active.png">
            </div>
            <div class="download" @click="download">
                <img src="~assets/img/song/operation/download.png">
            </div>
            <div class="comment" @click="toComment(id)">
                <img src="~assets/img/song/operation/comment.png">
            </div>
            <div class="option_song">
                <img src="~assets/img/song/operation/option_song.png">
            </div>
        </div>
        <div class="operation-middle">
            <span class="time-left">{{curTime | playTime}}</span>
            <van-slider :value="curTime / sumTime * 100" @change="changeCurTime" bar-height="4px"
                        active-color='#9c9cff'>
                <template #button>
                    <div class="custom-button"></div>
                </template>
            </van-slider>
            <span class="time-right">{{sumTime | playTime}}</span>
        </div>
        <div class="operation-bottom">
            <div class="sequence">
                <img src="~assets/img/song/operation/sequence.png">
            </div>
            <div class="last" @click="toLast">
                <img src="~assets/img/song/operation/last.png">
            </div>
            <div class="stop-and-play" @click="changeStatus">
                <!-- 这里以后点击播放暂停要切换按钮  -->
                <img v-show="!status" src="@/static/img/components/audiobar/stop_song.png">
                <img v-show="status" src="@/static/img/components/audiobar/play_song.png">
            </div>
            <div class="next" @click="toNext">
                <img src="~assets/img/song/operation/next.png">
            </div>
            <div class="option_list" @click="toOptionList">
                <img src="~assets/img/song/operation/option_list.png">
            </div>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'vant';

    export default {
        name: "Operation",
        props: ['status', 'curTime', 'sumTime', 'id'],
        data() {
            return {
                islike: false
            }
        },
        methods: {
            changeStatus() {
                this.$emit('changeStatus');
            },
            changeCurTime(val) {
                // console.log('修改了'+val)
                if (this.curTime != 0 && this.sumTime != 0)//防止无歌曲时拖动
                    this.$emit('changeCurTime', val);
            },
            toOptionList() {
                this.$emit('toOptionList');
            },
            toNext() {
                this.$emit('toNext')
            },
            toLast() {
                this.$emit('toLast')
            },
            download() {
                Toast({
                    message: '当前版本暂时不支持下载',
                    position: 'bottom',
                });
            },
            like() {
                if (this.id) {
                    if (!this.islike) {
                        if (window.localStorage.getItem('userId')) {
                            Toast({
                                message: '喜欢成功',
                                position: 'bottom',
                            });
                            this.islike = !this.islike;
                        } else Toast({
                            message: '未登录',
                            position: 'bottom'
                        })
                    } else {
                        Toast({
                            message: '取消喜欢成功',
                            position: 'bottom',
                        });
                        this.islike = !this.islike;
                    }

                } else {
                    Toast({
                        message: '无歌曲',
                        position: 'bottom',
                    });
                }
            },
            toComment(id) {
                if (id) {
                    this.$router.push({name: 'SongComment', query: {id}})
                    this.$emit('back');
                } else {
                    Toast({
                        message: '无歌曲',
                        position: 'bottom',
                    });
                }
            }
        },
        watch: {
            curTime() {
                if (this.curTime == this.sumTime) {
                    console.log('播放完毕');
                    setTimeout(() => {//隔0.5s后播放下一首
                        this.toNext();
                    }, 500)
                }
            },
        },
        filters: {
            playTime(val) {
                let m = parseInt(val / 60);//分钟
                let s = parseInt(val % 60) < 10 ? ('0' + parseInt(val % 60)) : parseInt(val % 60);//秒
                if (m == 0 && s == 0) {
                    return '0:00'
                } else {
                    return m + ':' + s;
                }
            }
        }
    }
</script>

<style src="assets/css/components/audiobar/songview/operation.css">

</style>