<template>
    <div class="cd-and-lyric">
        <div class="title">
            <div class="song-name">{{name}}</div>
            <div class="author">{{author}}</div>
        </div>
        <div class="cd-rotate">
            <img :src="imgUrl" class="rotate_play rotate_stop" ref="img">
        </div>
        <div class="song-lyric">
            <div class="pre">
                <span v-if="preLine||preLine!=''">{{preLine}}</span>
                <span v-else>&nbsp;</span>
            </div>
            <div class="cur">
                <span v-if="curLine||curLine!=''">{{curLine}}</span>
                <span v-else>暂无歌词</span>
            </div>
            <div class="next">
                <span v-if="nextLine||nextLine!=''">{{nextLine}}</span>
                <span v-else>&nbsp;</span>
            </div>
        </div>
    </div>
</template>

<script>
    import Lyric from 'lyric-parser'
    export default {
        name: "CdAndLyric",
        props: ['imgUrl', 'name', 'author', 'status','curTime','sumTime','lyric'],
        data(){
          return{
              curLyric:'',//歌词对象
              preLine:'',//上一行歌词
              curLine:'',//当前歌词
              nextLine:''
          }
        },
        methods: {
            changeIcon() {
                if (this.songUrl != '') {
                    //按钮图标切换,歌曲暂停/播放,图片旋转/停止
                    this.changeStatus();
                }
            },
            handler({lineNum, txt}){
                // console.log('触发handler')
                // console.log(lineNum,txt);
                // console.log(this.curLyric);
                if(lineNum!=0)
                    this.preLine = this.curLyric.lines[lineNum-1].txt;
                this.curLine = txt;
                if(lineNum<=this.curLyric.lines.length-2)//最后一个是length-1 lineNum表示当前行，当前行要在倒数第二行才赋值nextLine
                    this.nextLine = this.curLyric.lines[lineNum+1].txt;
            }
        },
        watch: {
            status() {
                if (this.status == false) {
                    this.$refs.img.className = 'rotate_play rotate_stop';
                } else {
                    this.$refs.img.className = 'rotate_play';
                }
                if(this.curLyric){//设if是因为初始时lyric加载和status有可能会错位导致报错,因此这里从0点击进入播放时不从这里切换播放状态
                    // console.log('status切换了')
                    this.curLyric.togglePlay();//切换歌词播放状态
                }
            },
            lyric(){
                //切换歌曲后触发
                // console.log('lyric改变了');
                if(this.curLyric) {//切换后初始化歌词
                    this.preLine = '';
                    this.nextLine = '';
                    this.curLine = '';
                    this.curLyric.stop();//重置歌词
                }
                this.curLyric = new Lyric(this.lyric, this.handler);
                //因为new出来之后不会立即显示歌词，若在暂停状态进行切歌，会导致显示暂无歌词，避免这种情况发生，下面seek到1s后显示歌词并重置
                //尽管进行了该操作，部分歌曲接口的歌词若取出较慢仍然无法显示
                if(!this.status) {
                    this.curLyric.seek(1000);
                    this.curLyric.stop();

                }
                else{
                    this.curLyric.play();
                }
            },
            curTime(newVal,oldVal){
                if(Math.abs(newVal-oldVal)>1){//拖动滚动条，当拖动超过1s触发(优化)
                    // console.log('触发了')
                    this.curLyric.seek(newVal*1000);//seek会导致歌词开始播放
                    if(!this.status){//如果是暂停状态的歌曲调整了进度或切歌了
                        this.curLyric.togglePlay();//暂停seek导致的播放
                    }
                }
            }
        }

    }
</script>

<style src="assets/css/components/audiobar/songview/cdandlyric.css" scoped>

</style>