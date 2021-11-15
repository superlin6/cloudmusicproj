 <template>
    <div class="login clearfix">
        <div class="icon">
            <img src="@/static/img/login/login.jpg">
        </div>
        <div class="form clearfix">
            <van-field v-model="account" placeholder="请输入账号"></van-field>
            <van-field v-model="password" placeholder="请输入密码" type="password"></van-field>
            <van-button @click="toLogin">登录</van-button>
            <div class="tips" style="font-size: 12px; color: #42515e; margin-top: 30px">暂时只支持手机密码方式登录，其他方式正在开发中...</div>
        </div>
    </div>
</template>
<script>
    import {request} from "network/request";
    import {Dialog} from 'vant';

    export default {
        name: "Login",
        data() {
            return {
                account: '',
                password: ''
            }
        },
        methods: {
            toLogin() {
                request({
                    url: '/login/cellphone',
                    params: {
                        phone: this.account,
                        password: this.password
                    }
                }).then(res => {
                        console.log(res);
                        if (res.code == 501 || res.code == 502 || res.code == 509) {
                            Dialog.alert({
                                message: res.msg,
                            }).then(() => {
                                this.password = '';
                            })
                        } else if (res.code == 200) {
                            Dialog.alert({
                                message: '登录成功',
                            }).then(() => {
                                window.localStorage.setItem('userId', res.account.id);//用户
                                this.$router.push({name: 'Home'});
                                // console.log('router'+this.$router.options.routes)
                            })
                        } else if (res.code == 400) {
                            Dialog.alert({
                                message: '手机格式错误！',
                            })
                        }
                    }
                )
            }
        }
    }
</script>

<style src="assets/css/login/login.css">

</style>