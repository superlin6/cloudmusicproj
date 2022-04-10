<template>
  <div class="selection">
    <selection-block>
      <selection-item
        v-for="(item, index) in items"
        :key="index"
      >
        <img
          slot="selection-item"
          :src="item.img"
          @click="toDo(index)"
        />
        <div slot="selection-name">{{ item.name }}</div>
      </selection-item>
    </selection-block>
  </div>
</template>

<script>
import SelectionBlock from './SelectionBlock';
import SelectionItem from './SelectionItem';
import { Toast } from 'vant';

export default {
  name: 'Selection',
  components: { SelectionItem, SelectionBlock },
  data() {
    return {
      items: [
        {
          img: require('@/static/img/find/selection/daily.png'),
          name: '每日推荐',
        },
        {
          img: require('@/static/img/find/selection/statistic.png'),
          name: '偏好统计',
        },
        {
          img: require('@/static/img/find/selection/songlist.png'),
          name: '歌单',
        },
        {
          img: require('@/static/img/find/selection/rank.png'),
          name: '排行榜',
        },
        // {
        //   img: require('@/static/img/find/selection/cd.png'),
        //   name: '数字专辑',
        // },
      ],
    };
  },
  methods: {
    toDo(i) {
      switch (i) {
        case 0:
          window.localStorage.getItem('userId')
            ? this.$router.push('/daily')
            : Toast({ message: '请先登录' });
          break;
        case 1:
          window.localStorage.getItem('userId')
            ? this.$router.push('/statistic')
            : Toast({ message: '请先登录' });
          break;
        case 2:
          window.localStorage.getItem('userId')
            ? this.$router.push('/songs')
            : Toast({ message: '请先登录' });
          break;
        case 3:
          this.$router.push('/rank');
          break;
        default:
          Toast({ message: '暂未开放,敬请期待' });
      }
    },
  },
};
</script>

<style scoped></style>
