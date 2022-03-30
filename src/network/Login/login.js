import { request } from "../request";

export function cellphoneLogin(phone,password){
    return request({
        url: '/login/cellphone',
        params: {
            phone,
            password
        }
    })
}


export function getLoginStatus(){
    return request({
        url: "/login/status",
        // params: {
        //     cookie: localStorage.getItem('cookie'),
        //     timeStamp: Date.now()
        // }
      })
}