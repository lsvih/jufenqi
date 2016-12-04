<template>
<j-apply-process :step="1">
</j-apply-process>

<group title="身份信息">
  <x-input title="姓名" :value.sync="name" name="username" placeholder="请输入您的真实姓名" is-type="china-name"></x-input>
  <x-input title="身份证" :value.sync="creditNum" type="number" placeholder="请输入正确的身份证号码" keyboard="number"></x-input>
  <x-input title="手机" :value.sync="phone" :class="{'weui_vcode':isExist()}" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile" :readonly="!isExist()">
    <x-button v-if="isExist()" slot="right" mini plain style="color:#3ba794;border:none;" v-tap="this.time==0?sendSms():return">{{this.time==0?'获取验证码':this.time+'秒后重试'}}</x-button>
  </x-input>
  <x-input v-if="isExist()" :value.sync="verify" keyboard="number" title="验证码" placeholder="请输入您收到的验证码"></x-input>
</group>
<x-button slot="right" :class="{'btn-active':isFilled()}" style="background-color:#e2e2e2;color:#fff;margin:20px 20px;width:calc( 100% - 40px )" v-tap="isFilled()?nextStep():return">下一步</x-button>
<j-tel></j-tel>
<loading :show.sync="showLoading" :text="loadingText"></loading>
</template>

<script>
import Lib from 'assets/Lib.js'
import JApplyProcess from 'components/j-apply-process'
import XInput from 'vux-components/x-input/'
import Group from 'vux-components/group/'
import Cell from 'vux-components/cell/'
import XButton from 'vux-components/x-button'
import JTel from 'components/j-tel'
import Loading from 'vux-components/loading'
import axios from 'axios'
try {
  let now = Number(new Date().getTime())
  if (Number(JSON.parse(localStorage.user).expiredAt) < now) {
    localStorage.removeItem('user')
    location.href = './wxAuth.html?url=' + encodeURIComponent(location.href)
  }
  axios.defaults.headers.common['Authorization'] = JSON.parse(localStorage.getItem("user")).tokenType + ' ' + JSON.parse(localStorage.getItem("user")).token
} catch (e) {
  localStorage.clear()
  window.location.href = `./wxAuth.html?url=index.html`
}
export default {
  data() {
    return {
      name: window.localStorage.getItem("apply-info") ? JSON.parse(window.localStorage.getItem("apply-info")).fullname : null,
      creditNum: window.localStorage.getItem("apply-info") ? JSON.parse(window.localStorage.getItem("apply-info")).idCardNo : null,
      phone: window.localStorage.getItem("apply-info") ? JSON.parse(window.localStorage.getItem("apply-info")).mobile : null,
      verify: null,
      time: 0,
      timekeeper: null,
      loadingText: "",
      showLoading: false,
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
    isExist() {
      return !localStorage.getItem("apply-info")
    },
    isFilled() {
      if (!this.isExist()) return true
      let creditReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
      return (this.name !== null && creditReg.test(this.creditNum) && this.verify !== null)
    },
    sendSms() {
      let phoneReg = /^[1][358][0-9]{9}$/
      if (!phoneReg.test(this.phone)) {
        alert("请输入正确的手机号码!")
      } else {
        let that = this
        this.loadingText = "正在发送验证码..."
        this.showLoading = true
        axios.post(`${Lib.C.userApi}sms/sendCode`, {}, {
          params: {
            mobile: this.phone
          },
          withCredentials: true,
          responseType: true
        }).then((res) => {
          this.showLoading = false
          this.time = 60
          this.timekeeper = setInterval(() => {
            that.time--
              if (that.time === 0) {
                clearInterval(that.timekeeper)
              }
          }, 1000)
        }).catch((res) => {
          alert("发送验证码失败，请稍后重试...")
          this.showLoading = false
        })
      }
    },
    nextStep() {
      if (!this.isExist()) {
        window.location.href = "./ins-apply-step2.html"
      }
      this.loadingText = "正在验证手机号..."
      this.showLoading = true
      axios.post(`${Lib.C.userApi}sms/consumeCode`, {}, {
        params: {
          mobile: this.phone,
          code: this.verify
        },
        withCredentials: true,
        responseType: true
      }).then((res) => {
        this.loadingText = "验证成功，正在保存数据..."
        window.localStorage.setItem("apply-info", JSON.stringify({
          userId: JSON.parse(window.localStorage.getItem("user")).userId,
          /**姓名*/
          fullname: this.name,
          /**身份证*/
          idCardNo: this.creditNum,
          /**手机*/
          mobile: this.phone,
          /**省份*/
          province: null,
          /**城市*/
          city: null,
          /**区县*/
          county: null,
          /**详细地址*/
          address: null,
          /**房屋面积*/
          houseArea: null,
          /**期望额度*/
          expectQuota: null,
          /**期望分期数*/
          expectInstalment: null,
          /**是否在职*/
          isIncumbent: null,
          /**公司*/
          company: null,
          /**职位*/
          position: null,
          /**月收入*/
          monthlyIncome: null,
          /**状态*/
          "status": "UNSUCCESSFULLY"
        }))
        window.location.href = "./ins-apply-step2.html"
      }).catch((res) => {
        alert("验证失败,请稍后重试...")
        this.showLoading = false
      })
    }
  }
}
</script>

<style>
body {
  background-color: #eee;
}

.btn-active {
  background-color: rgb(136, 201, 40)!important;
}
</style>
