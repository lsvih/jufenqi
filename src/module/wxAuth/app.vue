<template>

</template>

<script>
import Lib from 'assets/Lib.js'
export default {
  data() {
    return {
      lastUrl: Lib.M.GetRequest().url?unescape(Lib.M.GetRequest().url):'./index.html',
      code: Lib.M.GetRequest().code,
      appId: "wx4b13962d7d02786e"
    }
  },
  ready() {
    if (Lib.M.isAuth()) {
      location.href = this.lastUrl
    } else {
      this.getCode()
    }
  },
  methods: {
    getCode() {
      if (this.code) {
        this.$http.post(`${Lib.C.userApi}auth/loginUsingWechat`, {
          code: this.code
        }, {
          xhr: {
            withCredentials: true
          },
          emulateJSON: true
        }).then((res) => {
          window.localStorage.setItem("user",JSON.stringify(res.data.data))
          if(res.data.data.profile.mobile){
            location.href = this.lastUrl
          }else{
            location.href = `./verifyPhone.html?url=${encodeURIComponent(this.lastUrl)}`
          }
        }, (res) => {
          alert("微信登录失败，请稍后重试")
          console.log(res)
          return false;
        })
      } else {
        location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appId}&redirect_uri=${location.href}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirec`
      }
    }
  }
}
</script>
