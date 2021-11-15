<template>
  <div class="wrapper" ref="wrapper">
    <div class="content" ref="content">
        <!-- 确保插槽内渲染完成了才调用verscroll获取高度 -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "VerScroll",
  props: ["num"],
  created() {
    //在这里写会导致控制台undefined错误，因为slot里面的组件可能没加载完
    // this.$nextTick(() => {
    //     console.log('nexttick');
    //     this.verScroll();
    // // console.log("scroll:" + this.num);
    // });
    console.log('created')
  },
  mounted(){
        // 完美解决 但是触发次数非常多，需要做计数器的处理 已做
    this.$bus.on('verScroll',() => {
        // console.log('bus');
        this.verScroll();
    })
  },
  methods: {
    verScroll() {
        //default[0]找到slot里面的div也就是find-row-wrapper，再.elm.childNodes获取里面的item
        let itemWidth = this.$slots.default[0].elm.childNodes[0].clientWidth;
        // console.log(this.$slots.default[0]);
        let width = this.num * itemWidth;
        // console.log(width);
        this.$refs.content.style.width = width + "px";
        // console.log(this.$refs.content)
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.wrapper, {
            startX: 0,
            click: true,
            scrollX: true,
            // 忽略竖直方向的滚动
            scrollY: false,
            eventPassthrough: "vertical",
          });
        } else {
          // console.log(this.scroll);
          this.scroll.refresh();
        }
    }
  },
}
</script>

<style scoped>
.wrapper {
  overflow: hidden;
}
.content {
  width: auto;
}
</style>