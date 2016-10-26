<template>
<div class="verify-block">
  <div class="msg" v-bind:class="{'alarm':alarm}">{{msg}}</div>
  <div class="verify-number" v-tap="activeInput()">
    <div class="number-block">{{getSingleVerify(0)}}</div>
    <div class="number-block">{{getSingleVerify(1)}}</div>
    <div class="number-block">{{getSingleVerify(2)}}</div>
    <div class="number-block">{{getSingleVerify(3)}}</div>
    <div class="number-block">{{getSingleVerify(4)}}</div>
    <div class="number-block">{{getSingleVerify(5)}}</div>
  </div>
  <div class="send-agian" v-bind:class="{'alarm':time!==0}" v-tap="time===0?send():return;">{{time!==0?`${time}秒后可重试`:"重新发送"}}</div>
  <div class="line"></div>
  <div class="close" v-tap="close()">关闭</div>
  <input type="Number" id="verify" v-model="verifyNumber|currency '' 0" @change="input()">
</div>
</template>
<script>
import Lib from 'assets/Lib.js'
export default {
  data() {
    return {
      msg: "请输入验证码",
      alarm: false,
      time:60,
      timekeeper:null,
      verifyNumber:"",
    }
  },
  components: {},
  ready(){
    document.getElementById("verify").focus()
    active()
    this.setTime()
  },
  methods: {
    setTime(){
      this.time = 60
      let that = this
      this.timekeeper = setInterval(()=>{
        that.time--
        if(that.time === 0){
          clearInterval(that.timekeeper)
        }
      },1000)
    },
    send(){
      let that = this
      this.$parent.loading=true
      this.$http.post(`${Lib.C.userApi}sms/sendCode`, {
        mobile: this.$parent.phoneNumber
      }, {
        xhr: {
          withCredentials: true
        },
        emulateJSON: true
      }).then((res)=>{
        this.$parent.loading = false
        this.time = 60
        this.timekeeper = setInterval(()=>{
          that.time--
          if(that.time === 0){
            clearInterval(that.timekeeper)
          }
        },1000)
      },(res)=>{
        this.$parent.loading = false
        alert("发送验证码失败，请稍后重试...")
      })
    },
    close(){
      clearInterval(this.timekeeper)
      this.$parent.inVerify = false
    },
    input(){
      this.verifyNumber = String(this.verifyNumber.replace(/[^0-9]/g,''));
    },
    getSingleVerify(index){
      let num = String(this.verifyNumber)[index]
      num = num===undefined?"":num
      if(index===5&&num!==""){
        blur()
        this.$parent.loading = true
        this.submit()
      }
      return num
    },
    submit(){
      this.$http.post(`${Lib.C.userApi}auth/registerUsingMobile`, {
        mobile: this.$parent.phoneNumber,
        userId: JSON.parse(localStorage.getItem("user")).userId,
        code: this.verifyNumber,
        // password:??
      }, {
        xhr: {
          withCredentials: true
        },
        emulateJSON: true
      }).then((res)=>{
        window.localStorage.setItem("user",JSON.stringify(res.data.data))
        location.href = this.$parent.lastUrl
      },(res)=>{
        this.alarm = true
        this.$parent.loading = false
        this.msg = "验证码错误，请重试"
        this.activeInput()
      })
    },
    activeInput(){
      document.getElementById("verify").focus()
      active()
    }
  }
}
function active(){
  document.getElementById("verify").focus()
}
function blur(){
  document.getElementById("verify").blur()
}
</script>
<style scoped lang="less">
.verify-block {
    z-index: 22;
    position: absolute;
    overflow: hidden;
    height: 145px;
    width: calc( ~"100% - 52px" );
    top: calc( ~"50% - 74px" );
    left: 26px;
    font-size: 14px;
    border-radius: 5px;
    background-color: #fff;
    color: #999;
    .msg {
        position: absolute;
        top: 20px;
        left: 0;
        width: 100%;
        text-align: center;
    }
    .verify-number {
        position: absolute;
        height: 24px;
        width: 235px;
        left: 50%;
        margin-left: -109.5px;
        top: 44px;
        .number-block {
            width: 22px;
            height: 22px;
            border: 1px solid #d8d8d8;
            margin-right: 15px;
            text-align: center;
            line-height: 22px;
            float:left;
        }
    }
    .send-agian{
      font-size: 12px;
      position: absolute;
      bottom: 55px;
      left: 50%;
      margin-left: 48px;
    }
    .line{
      position: absolute;
      height: 1px;
      width: 100;
      background-color: #d8d8d8;
      bottom:44px;
      left:0;
    }
    .close{
      position: absolute;
      bottom: 0;
      left: 0;
      height: 44px;
      width: 100%;
      line-height: 44px;
      text-align: center;
    }
}
.alarm {
    color: #D0021B;
}
#verify{
  position: absolute;
  height: 24px;
  width: calc( ~"100% + 500px" );
  left: 0;
  margin-left: -500px;
  top: 44px;
  z-index:1;
  color:rgba(255,255,255,0);
  background-color: transparent;
  -webkit-appearance: none;
  border:none
}
</style>
