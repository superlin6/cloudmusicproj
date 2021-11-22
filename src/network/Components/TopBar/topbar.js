import { request } from "../../request";

export function getCloudSearch(keywords,type){
    return request({
        url: '/cloudsearch',
        params: {
            keywords,
            type
        }
    })
}

export function toLogOut(){
    return request({
        url: '/logout'
    })
}