<template>
<div class="verify-block">
  <div class="msg" v-bind:class="{'alarm':alarm}">{{msg}}</div>
  <div class="verify-number">
    <div class="number-block"></div>
    <div class="number-block"></div>
    <div class="number-block"></div>
    <div class="number-block"></div>
    <div class="number-block"></div>
    <div class="number-block"></div>
  </div>
  <div class="send-agian" v-bind:class="{'alarm':time!==0}" v-tap="time!==0?send():return;">{{time!==0?`${time}秒后可重试`:"重新发送"}}</div>
  <div class="line"></div>
  <div class="close" v-tap="close()">关闭</div>
</div>
</template>
<script>
export default {
  data() {
    return {
      msg: "请输入验证码",
      alarm: false,
      time:60,
      timekeeper:null
    }
  },
  components: {},
  ready(){
    this.setTime()
  },
  methods: {
    setTime(){
      this.time = 60
      let that = this
      this.timekeeper = setinterval(()=>{
        that.time--
        if(that.time === 0){
          clearInterval(that.timekeeper)
        }
      },1000)
    },
    send(){
      this.$http.post(`${Lib.C.userApi}sms/sendCode`, {
        mobile: this.$parent.phoneNumber
      }, {
        xhr: {
          withCredentials: true
        },
        emulateJSON: true
      }).then((res)=>{
        this.time = 60
        this.timekeeper = setinterval(()=>{
          that.time--
          if(that.time === 0){
            clearInterval(that.timekeeper)
          }
        },1000)
      },(res)=>{
        alert("发送验证码失败，请稍后重试...")
      })
    },
    close(){
      clearInterval(this.timekeeper)
      this.$parent.inVerify = false
    }
  }
}
</script>
<style scoped lang="less">
.verify-block {
    z-index: 22;
    position: absolute;
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
</style>
