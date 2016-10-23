<template>

</template>

<script>
import Lib from 'assets/Lib.js'
export default {
  data() {
    return {
      lastUrl: Lib.M.GetRequest().url?`./verifyPhone.html?url=${unescape(Lib.M.GetRequest().url)}`:'./verifyPhone.html?url=index.html',
      code: Lib.M.GetRequest().code,
      appId: "wxe1d923f20f84fac5"
    }
  },
  ready() {
    if (Lib.M.isAuth()) {
      location.href = lastUrl
    } else {
      this.getCode()
    }
  },
  methods: {
    getCode() {
      if (this.code) {
        this.$http.post(`${Lib.C.authApi}loginUsingWechat`, {
          code: this.code
        }, {
          xhr: {
            withCredentials: true
          },
          emulateJSON: true
        }).then((res) => {
          window.localStorage.setItem("user",JSON.stringify(res.data))
          location.href = lastUrl
        }, (res) => {
          alert("微信登录失败，请稍后重试")
          return false;
        })
      } else {
        location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appId}&redirect_uri=${location.href}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirec`
      }
    }
  }
}
</script>
