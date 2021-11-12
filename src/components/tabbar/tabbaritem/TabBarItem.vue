<template>
    <div class="tab-bar-item" @click="activeIcon">
<!--默认填入的插槽模板位置-->
        <!--  tabbar点击后改变图标和文字颜色  -->
        <div v-if="!isActive">
            <slot name="item-icon"></slot>
        </div>
        <div v-else>
            <slot name="item-icon-active"></slot>
        </div>
        <div :style="activeStyle">
            <slot name="item-text"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TabBarItem",
        props:{
            path:String,
            activeColor:{
                type:String,
                default:'red'
            }
        },
        computed:{
            isActive(){
            //    点击选中后图标颜色变化更改slot name
                return this.$route.path.indexOf(this.path)!==-1;
            },
            activeStyle(){
                return this.isActive?{color:this.activeColor}:{}
            }
        },
        methods:{
            activeIcon(){
                this.$router.push(this.path)
            }
        }
    }
</script>

<style src="assets/css/components/tabbar/tabbaritem.css" scoped>

</style>