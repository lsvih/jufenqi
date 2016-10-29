<template>
<j-apply-process :step="1">
</j-apply-process>

<group title="身份信息">
  <x-input title="姓名" :value.sync="name" name="username" placeholder="请输入您的真实姓名" is-type="china-name"></x-input>
  <x-input title="身份证" :value.sync="creditNum"  type="number" placeholder="请输入正确的身份证号码" keyboard="number"></x-input>
  <x-input title="手机" :value.sync="phone" class="weui_vcode" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile">
    <x-button slot="right" mini plain style="color:#3ba794;border:none;">获取验证码</x-button>
  </x-input>

  <x-input :value.sync="verify" keyboard="number" title="验证码" placeholder="请输入您收到的验证码"></x-input>
</group>
<x-button slot="right" :class="{'btn-active':isFilled()}" style="background-color:#e2e2e2;color:#fff;margin:20px 20px;width:calc( 100% - 40px )" v-tap="isFilled()?nextStep():return">下一步</x-button>
<j-tel></j-tel>
<loading :show.sync="showLoading" value="正在验证,请稍候..."></loading>
</template>

<script>
import Lib from 'assets/Lib.js'
import JApplyProcess from 'components/JApplyProcess.vue'
import XInput from 'vux-components/x-input/'
import Group from 'vux-components/group/'
import Cell from 'vux-components/cell/'
import XButton from 'vux-components/x-button'
import JTel from 'components/JTel.vue'
import Loading from 'vux-components/loading'
export default {
  data() {
    return {
      name:null,
      creditNum:null,
      phone:null,
      verify:null
    }
  },
  components: {
    JApplyProcess,
    XInput,
    Group,
    Cell,
    XButton,
    JTel,
    Loading
  },
  ready() {


  },
  methods: {
    isFilled(){
      let creditReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
      return (this.name!==null&&creditReg.test(this.creditNum)&&this.verify!==null)
    },
    setTime(){
      this.time = 60
      let that = this
      this.timekeeper = setInterval(()=>{
        that.time--
        if(that.time === 0){
          clearInterval(that.timekeeper)
        }
      },1000)
    }
  }
}
</script>

<style>
body{
  background-color: #eee;
}
.btn-active{
  background-color: rgb(136,201,40)!important;
}
</style>
