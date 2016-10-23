<template>
</template>

<script>
import Lib from 'assets/Lib.js'
export default {
  data() {
    return {
      lastUrl:Lib.M.GetRequest().url,
      code:Lib.M.GetRequest().code,
      appId:"wxe1d923f20f84fac5"
    }
  },
  ready(){
    if(Lib.M.isAuth()){
      location.href = lastUrl
    }else{
      this.getCode()
    }
  },
  methods: {
    getCode(){
      if(this.code){
        this.$http.post(`${Lib.C.authApi}loginUsingWechat`,{body:{code:this.code}},{xhr: {withCredentials: true}}),then((res)=>{
          console.log(res)
        },(res)=>{
          alert("微信登录失败，请稍后重试")
          location.href = `./index.html`
        })
      }else{
        location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appId}&redirect_uri=${location.href}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirec`
      }
    }
  }
}
</script>
