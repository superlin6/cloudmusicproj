<template>
    <div class="top-pic-block"
         :style="{backgroundImage:bgUrl? 'url('+bgUrl+')':'',backgroundSize:'cover'}">
        <div class="pic">
            <img :src="imgUrl">
        </div>
        <div class="font">
            <div class="title">{{name}}</div>
            <div class="author">{{author}}</div>
        </div>
        <div class="operation-block">
            <div class="operation">
                <div class="collect">收藏</div>
                <div class="line"></div>
                <div class="comment">评论</div>
                <div class="line"></div>
                <div class="share">分享</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TopPicBlock",
        props:['name','author','imgUrl','bgUrl']
    }
</script>

<style src="assets/css/components/toppicblock/toppicblock.css" scoped>

</style>