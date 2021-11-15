<template>
    <div class="rank">
        <div class="top-nav">
            <ul>
                <li :class="{'selected':selected==index}" v-for="(title,index) in titles" @click="scrollTo(index)"
                    :key="index">
                    <span>{{title}}</span>
                    <div class="underline"></div>
                </li>
            </ul>
        </div>
        <scroll ref="scroll"
                :listenScroll="true"
                @scroll="scrollHandler">
            <div class="official clearfix">
                <div class="title title0">{{titles[0]}}榜</div>
                <!-- 这里需要对官方榜每个行组件传入对应index的数据 -->
                <rank-row v-for="(item,index) in rowData.length"
                          :style="{backgroundColor:index%2==0?(index%4==0?'#fae5ff':'#ffe7cb'):(index%3==0?'#e6efff':'#deffd5')}"
                          :rowData="rowData[index]"
                          :key="index"></rank-row>
            </div>
            <div class="other clearfix" v-for="(item,i) in titles.filter((item,index)=>index!=0)" :key="i">
                <div ref="title" :class="{'title':true,['title'+(i+1)]:true}">{{item}}榜</div>
                <!-- 这里的block指的是除了标题的整个大block,blockData -->
                <rank-block :blockData="blockData[i]"></rank-block>
            </div>
        </scroll>
    </div>
</template>

<script>
    import Scroll from "components/scroll/Scroll";
    import RankRow from "./RankRow";
    import RankBlock from "./RankBlock";
    import {request} from "network/request";
    import throttle from "../../../../uitls/throttle";

    export default {
        name: "Rank",
        components: {RankBlock, RankRow, Scroll},
        data() {
            return {
                titles: ['官方', '精选', '曲风', '全球', '特色'],
                selected: 0,//表示选中的title
                rowData: [],//id,imgUrl,title,msg
                blockData: [],//id,imgUrl,title
                titleOffsetTop:[],//每个标题到顶部的距离
            }
        },
        methods: {
            getMsg() {
                request({
                    url: '/toplist/detail'
                }).then(res => {
                    console.log(res);
                    let tmpRowData = res.list.filter((item, index) => index <= 3) //前面4个都是官方榜的内容
                    tmpRowData.forEach(item => {
                        let tmpData = {};
                        tmpData.id = item.id;//歌单id
                        tmpData.imgUrl = item.coverImgUrl;//歌单图片
                        tmpData.title = item.name;//歌单标题
                        tmpData.msg = item.tracks;//歌单部分展示内容
                        this.rowData.push(tmpData);
                    })
                    // console.log(this.rowData);
                    //----------------------之后是截取list后面部分(方块状的内容),传到<rank-block>-------------------------
                    let tmpBlockData = res.list.filter((item, index) => index > 3);
                    // console.log(tmpBlockData);
                    let tmpTitle = this.titles.slice(1);//nav栏内容的个数，除了官方榜
                    // console.log(tmpTitle);
                    tmpTitle.forEach((it, i) => {
                        //遍历下面这些块的榜单
                        // console.log("---" + i);
                        let tmpDataArray = [];//拿到的数据要进行分类，放入该数组后再放入blockData
                        tmpBlockData.every((item, index) => {
                            // console.log('进入了'+index)
                            let tmpData = {};
                            tmpData.id = item.id;//歌单id
                            tmpData.imgUrl = item.coverImgUrl;//歌单图片
                            tmpData.title = item.name;//歌单标题
                            if (i == 0) {//精选榜
                                if(index == 0 || index == 25){
                                    tmpDataArray.push(tmpData);
                                    if(index == 25) return false;
                                    else return true
                                }
                                // console.log('zd0');
                                
                            } else if (i == 1) {//曲风榜
                                if (index > 0 && index <= 6 || index >= 15 && index <= 23 && index != 18 && index != 19 && index != 22) {
                                    tmpDataArray.push(tmpData);
                                    if (index == 23) {
                                        // console.log('zd1');
                                        return false;
                                    } else return true;
                                }
                            } else if (i == 2) {//全球榜
                                if (index > 6 && index <= 14 && index != 9 && index != 10 || index == 19) {
                                    tmpDataArray.push(tmpData);
                                    if (index == 19) {
                                        // console.log('zd2');
                                        return false;
                                    } else return true;
                                }
                            } else if (i == 3) {//特色榜
                                if (index == 9 || index == 10 || index == 18 || index == 22 || index == 24) {
                                    tmpDataArray.push(tmpData);
                                    if (index == 24) {
                                        // console.log('zd3');
                                        return false;
                                    } else return true;
                                }
                            }
                            return true;
                        });
                        //放入blockData
                        // console.log('tmpDataArray:'+tmpDataArray);
                        this.blockData.push(tmpDataArray);
                    });
                    // console.log("得到blockData："+this.blockData);
                })
            },
            scrollTo(index) {
                //滚动到对应区域
                // console.log(index);
                // this.selected = index;//切换选中的title
                this.$refs.scroll.scrollToElement(('.title' + index), 100, false, 0);//元素名称 延时 x轴偏移 y轴偏移
            },
            // scroll(pos){
            //     //滚动事件
            //     //这里考虑到滚动时会有多次赋值，需要优化 加上&限制触发条件 缺点是跨度切换会感觉有跳转卡顿
            //     // console.log('触发滚动事件' + pos.y)
                
            // },
            scrollHandler:throttle(function(pos){
                console.log(this.$refs.title)
                let baseTop = 120;
                if (pos.y <= 0 && pos.y > -this.$refs.title[0].offsetTop + baseTop && this.selected != 0) this.selected = 0;
                else if (pos.y <= -this.$refs.title[0].offsetTop + baseTop && pos.y > -this.$refs.title[1].offsetTop + baseTop && this.selected != 1) this.selected = 1;
                else if (pos.y <= -this.$refs.title[1].offsetTop + baseTop && pos.y > -this.$refs.title[2].offsetTop + baseTop && this.selected != 2) this.selected = 2;
                else if (pos.y <= -this.$refs.title[2].offsetTop + baseTop && pos.y > -this.$refs.title[3].offsetTop + baseTop && this.selected != 3) this.selected = 3;
                else if (pos.y <= -this.$refs.title[3].offsetTop + baseTop) this.selected = 4
            },60)
        },
        created() {
            this.getMsg();
        },
        watch: {
            blockData() {
                this.$nextTick(() => {
                    this.$refs.scroll.refresh();
                })
            },
        }
    }
</script>

<style src="assets/css/find/selection/rank/rank.css" scoped>

</style>