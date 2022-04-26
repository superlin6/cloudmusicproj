<template>
  <div class="topbar-item">
    <!--item-option按钮显示个人菜单 左-->
    <slot
      v-if="
        $route.path == '/home' ||
        $route.path == '/mine' ||
        $route.path == '/find' ||
        $route.path == '/video'
      "
      name="item-option"
    >
    </slot>
    <!-- item-back显示返回菜单 左 -->
    <slot
      v-if="
        $route.path == '/myfavoritelist' ||
        $route.path == '/collectlist' ||
        $route.path == '/createlist' ||
        $route.path == '/rank' ||
        $route.path == '/ranklist' ||
        $route.path == '/findrowitemlist' ||
        $route.path == '/searcher' ||
        $route.path == '/findrowmvdetail' ||
        $route.path == '/songcomment' ||
        $route.path == '/daily' ||
        $route.path == '/statistic' ||
        $route.path == '/toplist' ||
        $route.path == '/songs' ||
        $route.path == '/songslist'
      "
      name="item-back"
    >
    </slot>
    <!-- item-search小搜索按钮 右 -->
    <slot
      v-if="
        $route.path == '/home' ||
        $route.path == '/myfavoritelist' ||
        $route.path == '/collectlist' ||
        $route.path == '/createlist' ||
        $route.path == '/ranklist' ||
        $route.path == '/findrowitemlist' ||
        $route.path == '/local' ||
        $route.path == '/songslist'
      "
      name="item-search"
    ></slot>
    <!-- item-songlist歌单 中 -->
    <slot
      v-if="
        $route.path == '/myfavoritelist' ||
        $route.path == '/collectlist' ||
        $route.path == '/createlist' ||
        $route.path == '/ranklist' ||
        $route.path == '/findrowitemlist' ||
        $route.path == '/toplist' ||
        $route.path == '/songslist'
      "
      name="item-songlist"
    ></slot>
    <!-- item-find搜索框 中-->
    <slot
      v-if="$route.path == '/find' || $route.path == '/searcher'"
      name="item-find"
    ></slot>

    <slot v-if="$route.path == '/daily'" name="item-daily"></slot>
    <slot v-if="$route.path == '/rank'" name="item-rank"></slot>
    <slot v-if="$route.path == '/video'" name="item-video"></slot>
    <slot v-if="$route.path == '/mine'" name="item-mine"></slot>
    <slot v-if="$route.path == '/findrowmvdetail'" name="item-mvdetail"></slot>
    <slot v-if="$route.path == '/songcomment'" name="item-comment"></slot>
    <slot v-if="$route.path == '/statistic'" name="item-statistic"></slot>
    <slot v-if="$route.path == '/songs'" name="item-songlist"></slot>
  </div>
</template>

<script>
export default {
  name: "TopBarItem",
};
</script>

<style src="assets/css/components/topbar/topbaritem.css" scoped>
</style>