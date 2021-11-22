import { request } from "../../request";

export function getLikeList(userId){
    return request({
        url: '/likelist',
        params: {
            uid: userId
        }
    })
}

export function getCreaCollList(userId){
    return request({
        url: '/user/playlist',
        params: {
            uid: userId
        }
    })
}

export function getPlayListDetail(id){
    return request({
        url: '/playlist/detail',
        params: {
            id
        }//歌单的id
    })
}

export function getSongDetail(ids){
    return request({
        url: '/song/detail',
        params: {
            ids
        }
    })
}

//每日推荐的 list
export function getRecommendSongs(){
    return request({
        url: '/recommend/songs'
    })
}