<template>
<div></div>
</template>

<script>
import Lib from 'assets/Lib.js'
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
export default {
  data() {
    return {
      lastUrl: Lib.M.GetRequest().url ? decodeURIComponent(Lib.M.GetRequest().url) : decodeURIComponent('./index.html'),
      code: Lib.M.GetRequest().code,
      appId: "wx4b13962d7d02786e"
    }
  },
  ready() {
    if (this.code) {
      axios.post(`${Lib.C.userApi}auth/loginUsingWechat`, {}, {
        params: {
          code: this.code
        },
        withCredentials: true,
        responseType: 'json'
      }).then((res) => {
        let data = res.data.data
        data.loginAt = new Date().getTime()
        data.expiredAt = String(Number(data.loginAt) + Number(data.expiresIn * 1000 - 60 * 1000 * 100))
        window.localStorage.setItem("user", JSON.stringify(data))
        if (type === 1) {
          if (JSON.parse(localStorage.getItem('user')).profile.mobile) {
            location.href = decodeURIComponent(this.lastUrl)
          } else {
            location.href = `./phonenum.html?url=${encodeURIComponent(this.lastUrl)}`
          }
        }

      }).catch((res) => {
        alert("微信登录失败，请稍后重试")
        console.log(res)
        return false;
      })
    } else {
      location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appId}&redirect_uri=${encodeURIComponent(location.href)}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirec`
    }
  }
}
</script>
