<template>
    <div class="message">
        <div class="title">
            基本信息
        </div>
        <div class="detail">
            <div class="detail-msg">
                <span>村龄:</span>
                <span>{{createDays | dayToYear}}</span>
            </div>
            <div class="detail-msg">
                <span>性别:</span>
                <span>{{gender | genderDisplay}}</span>
            </div>
            <div class="detail-msg">
                <span>生日:</span>
                <span>{{birthday | birthdayDisplay}}</span>
            </div>
        </div>
        <div class="btn-all">
            <van-button>查看全部</van-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Message",
        props:['createDays','gender','birthday'],
        filters: {
            dayToYear(val) {
                if(val==0) return '请先登录'
                if(val>=365)
                    return parseInt(val / 365)+'年';
                else return val+'天';
            },
            genderDisplay(val){
                if(val == 1) return '男'
                else if(val == 0) return '女'
                else return '请先登录'
            },
            birthdayDisplay(val){
                //这里得到的是unix时间戳
                // console.log(val);
                if(val==0) return '请先登录'
                var date = new Date(val);
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                var d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                return y + '-' + m + '-' + d;
            }
        }
    }
</script>

<style src="assets/css/mine/message/message.css" scoped>

</style>