import axios from 'axios'
import {Dialog} from "vant";

export function request(config) {
    //创建axios实例
    const axios1 = axios.create({
        baseURL: 'http://localhost:3000',
        // baseURL: 'http://superlin.xyz:3000',
        withCredentials:true
    })
    // 2.1.请求拦截的作用
    axios1.interceptors.request.use(config => {
        return config
    }, err => {
        console.log(err);
    })
    // 2.2.响应拦截
    axios1.interceptors.response.use(res => {
        return res.data
    }, err => {
        console.log(err);
        // Dialog.alert({
        //     message:'账户不存在！',
        // })
    })
    // 3.发送真正的网络请求
    return axios1(config)
}


