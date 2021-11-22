import { request } from "../../request";


//获取对应歌曲的详细信息
export function getSongDetail(ids){
    return request({
        url: '/song/detail',
        params: {
            ids
        }
    })
}

export function getSongUrl(id){
    return request({//获取对应音乐的url
        url: '/song/url',
        params: {
            id
        },
    })
}

export function getLyric(id){
    return request({
        url: '/lyric',
        params: {
            id
        }
    })
}