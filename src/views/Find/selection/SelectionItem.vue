<template>
    <div class="selection-item">
        <slot name="selection-item"></slot>
        <slot name="selection-name"></slot>
    </div>
</template>

<script>
    export default {
        name: "SelectionItem",
    }
</script>

<style src="assets/css/find/selection/selectionitem.css" scoped>

</style>