import { request } from "../request";

export function getUserDetail(userId){
    return request({
        url: '/user/detail',
        params: {
            uid: userId ? userId : ''
        }
    })
}
