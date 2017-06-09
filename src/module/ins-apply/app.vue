<style>
body {
  background-color: #eee;
}

.btn-active {
  background-color: #ff9736 !important;
}
</style>

<template>
<j-apply-process :step="1">
</j-apply-process>

<group title="身份信息">
  <x-input title="姓名" :value.sync="name" name="username" placeholder="请输入您的真实姓名" is-type="china-name"></x-input>
  <x-input title="身份证" :value.sync="creditNum" type="number" placeholder="请输入正确的身份证号码" keyboard="number"></x-input>
  <x-input title="手机" :value.sync="phone" :class="{'weui_vcode':isPhoneChange()}" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile">
    <x-button v-if="isPhoneChange()" slot="right" mini plain style="color:#3ba794;border:none;" v-tap="this.time==0?sendSms():return">{{this.time==0?'获取验证码':this.time+'秒后重试'}}</x-button>
  </x-input>
  <x-input v-if="isPhoneChange()" :value.sync="verify" keyboard="number" title="验证码" placeholder="请输入您收到的验证码"></x-input>
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
Lib.M.auth(axios)
export default {
  data() {
    return {
      name: window.localStorage.getItem("apply-info") ? JSON.parse(window.localStorage.getItem("apply-info")).fullname : null,
      creditNum: window.localStorage.getItem("apply-info") ? JSON.parse(window.localStorage.getItem("apply-info")).idCardNo : null,
      phone: window.localStorage.getItem("apply-info") ? JSON.parse(window.localStorage.getItem("apply-info")).mobile : JSON.parse(window.localStorage.getItem("user")).profile.mobile,
      // JSON.parse(window.localStorage.getItem("user")).profile.mobile,
      // window.localStorage.getItem("apply-info") ? JSON.parse(window.localStorage.getItem("apply-info")).mobile : null,
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
  methods: {
    isExist() {
      return !localStorage.getItem("apply-info")
    },
    isPhoneChange() {
      return !(this.phone === JSON.parse(localStorage.getItem("user")).profile.mobile)
    },
    isFilled() {
      let creditReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
      if (!this.isPhoneChange()) {
        return (this.name !== null && creditReg.test(this.creditNum) && this.phone !==null)
      } else {
        return this.name !== null && creditReg.test(this.creditNum) && this.phone !== null && this.verify !== null
      }
    },
    sendSms() {
      let phoneReg = /^[1][3578][0-9]{9}$/
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
    localSetItem() {
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
        country: null,
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
        statusEnum: 0
      }))
    },
    nextStep() {
      if (!this.isExist()) {
        window.location.href = "./ins-apply-step2.html"
      } else if (!this.isPhoneChange()) {
        this.localSetItem()
        window.location.href = "./ins-apply-step2.html"
      }else {
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
          this.localSetItem()
          window.location.href = "./ins-apply-step2.html"
        }).catch((res) => {
          alert("验证失败,请稍后重试...")
          this.showLoading = false
        })
      }
    }
  }
}
</script>
