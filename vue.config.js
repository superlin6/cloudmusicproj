const path = require('path');        //引入path模块
function resolve(dir){
    return path.join(__dirname,dir)  //path.join(__dirname)设置绝对路径
}
module.exports={
    chainWebpack:(config)=>{
        config.resolve.alias
            //set第一个参数：设置的别名，第二个参数：设置的路径
            .set('@',resolve('src'))
            .set('assets',resolve('src/assets'))
            .set('components',resolve('src/components'))
            .set('views',resolve('src/views'))
            .set('network',resolve('src/network'))
    },
    publicPath:'./',
    // devServer:{
    //     proxy:{
    //         "/":{
    //             target:"http://192.168.100.48:3000",
    //             changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
    //         }
    //     }
    // }
}