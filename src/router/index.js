import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/Home/Home";
import Find from "../views/Find/Find";
import Mine from "../views/Mine/Mine";
import Video from "../views/Video/Video";
import MyFavoriteList from "../views/Home/Child/MyFavorite/MyFavoriteList";
import Login from "../views/Login/Login";
import SongView from "../components/audiobar/songview/SongView";
import CreateList from "../views/Home/Child/Create/CreateList";
import CollectList from "../views/Home/Child/Collect/CollectList";
import Rank from "../views/Find/selection/rank/Rank";
import RankList from "../views/Find/selection/rank/RankList";
import FindRowItemList from "../views/Find/findrow/FindRowItemList";
import FindRowMVDetail from "../views/Find/findrow/FindRowMVDetail";
import Searcher from "../views/Searcher/Searcher";
import SongComment from "../views/SongComment/SongComment";
import Daily from "../views/Find/selection/daily/Daily";

Vue.use(VueRouter)

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法,防止重复点击报红
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    redirect: '/find'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    // meta:{
    //     requireAuth:true,//表示需要认证
    //     requireReLoad:true //从而实现keep-alive的登录信息刷新
    // }
  },
  {
    path: '/find',
    name: 'Find',
    component: Find,
    // meta:{
    //     requireAuth:true,
    //     requireReLoad:true
    // }
  },
  {
    path: '/mine',
    name: 'Mine',
    component: Mine,
    // meta:{
    //     requireAuth:true,
    //     requireReLoad:true
    // }
  },
  {
    path: '/video',
    name: 'Video',
    component: Video
  },
  {
    path: '/searcher',
    name: 'Searcher',
    component: Searcher
  },
  {
    path: '/myfavoritelist',
    name: 'MyFavoriteList',
    component: MyFavoriteList
  },
  {
    path: '/songview',
    name: 'SongView',
    component: SongView
  },
  {
    path: '/createlist',
    name: 'CreateList',
    component: CreateList
  },
  {
    path: '/collectlist',
    name: 'CollectList',
    component: CollectList
  },
  {
    path: '/daily',
    name: 'Daily',
    component: Daily
  },
  {
    path: '/songs',
    name: 'Songs',
    component: () => import('../views/Find/selection/songs/Songs.vue')
  },
  {
    path: '/statistic',
    name: 'Statistic',
    component: () => import('../views/Find/selection/statistic/Statistic.vue')
  },
  {
    path: '/toplist',
    name: 'TopList',
    component: () => import('../views/Find/selection/statistic/TopList/TopList.vue')
  },
  {
    path: '/rank',
    name: 'Rank',
    component: Rank
  },
  {
    path: '/ranklist',
    name: 'RankList',
    component: RankList
  },
  {
    path: '/songslist',
    name: 'SongsList',
    component: () => import('../views/Find/selection/songs/SongsList.vue')
  },
  {
    path: '/findrowitemlist',
    name: 'FindRowItemList',
    component: FindRowItemList
  },
  {
    path: '/findrowmvdetail',
    name: 'FindRowMVDetail',
    component: FindRowMVDetail
  },
  {
    path: '/songcomment',
    name: 'SongComment',
    component: SongComment
  }
]

const router = new VueRouter({
  routes
})
// router.beforeEach((to,from,next)=>{
//     if(to.meta.requireAuth){
//         if(window.localStorage.getItem('userId')){
//             next()
//         }
//         else {

//         }
//     };
//     next();
// })
export default router
