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
      lastUrl: this.GetRequest().url ? decodeURIComponent(this.GetRequest().url) : decodeURIComponent('./index.html'),
      code: this.GetRequest().code,
      appId: "wx4b13962d7d02786e"
    }
  },
  ready() {
    console.log(this.code)
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
          if (JSON.parse(localStorage.getItem('user')).profile.mobile) {
            location.href = decodeURIComponent(this.lastUrl)
          } else {
            location.href = `./phonenum.html?url=${encodeURIComponent(this.lastUrl)}`
          }
      }).catch((err) => {
        alert("微信登录失败，请稍后重试")
        throw err
      })
    } else {
      // location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appId}&redirect_uri=${encodeURIComponent(location.href)}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirec`
      console.log('没有code')
    }
  },
  methods: {
    GetRequest() {
      let url = window.location.search
      let theRequest = {}
      if (url.includes('?')) {
        let strs = url.substr(1).split('&')
        for (let str of strs) {
          theRequest[str.split('=')[0]] = decodeURIComponent(str.split('=')[1])
        }
      }
      return theRequest
    }
  }
}
</script>
