import { request } from "../request";

//app发现页信息 轮播图
export function getBlockPage(){
    return request({
        url: "/homepage/block/page",
    })
}

//每日推荐歌单 需要登录
export function getDailyRecommend(){
    return request({
        url: "/recommend/resource",
      })
}

//热门推荐 无需登录
export function getHotRecommend(limit){
    let url = limit ? `/top/playlist/highquality?limit=${limit}` : '/top/playlist/highquality';
    return request({
        url
    })
}

export function getToplist(){
    return request({
        url: '/toplist/detail'
    })
}

export function getMVAll(limit){
    return request({
        url: '/mv/all',
        params:{
            limit,
        }
    })
}

export function getMVUrl(id,r){
    return request({
        url: '/mv/url',
        params: {
            id,
            r
        }
    })
}

export function getMVDetail(mvid){
    return request({
        url: "/mv/detail",
        params: {
          mvid,
        },
      })
}

export function getMVDetailInfo(mvid){
    return request({
        url: "/mv/detail/info",
        params: {
          mvid,
        },
      })
}

export function getMVComment(id,offset){
    return request({
        url: "/comment/mv",
        params: {
          id,
          offset,
        },
      })
}