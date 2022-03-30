import { request } from "../request";

export function getRecentSongs(limit) {
    return request({
        url: '/record/recent/song',
        params: {
            limit
        }
    })
}

export function getRecentSongList(limit) {
    return request({
        url: '/record/recent/playlist',
        params: {
            limit
        }
    })
}

export function getRecentVideo(limit) {
    return request({
        url: '/record/recent/video',
        params: {
            limit
        }
    })
}