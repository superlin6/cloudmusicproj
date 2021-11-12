<template>
    <div class="box-item" @click="ToPath">
        <slot name="item-icon"></slot>
        <slot name="item-text"></slot>
    </div>
</template>

<script>
    export default {
        name: "BoxItem",
        props: {
            //父组件TabBar向下传递到当前子组件的内容
            path: String,
        },
        methods: {
            ToPath() {
                this.$router.push(this.path)
            }
        }
    }
</script>

<style src="assets/css/home/selectbox/boxitem.css" scoped>

</style>