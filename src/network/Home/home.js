import { request } from "../request";

export function getUserDetail(userId){
    request({
        url: '/user/detail',
        params: {
            uid: userId ? userId : ''
        }
    })
}
