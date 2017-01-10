<template>
<div class="block-1">
  <div class="balance-title">我的钱包(元)</div>
  <div class="balance-money">{{wallet|currency '' 2}}</div>
</div>

<div class="pal-1" v-if="status === 0">
  <x-button class="postal-1" slot="right" style="color:#fff;background-color:#88C928;margin:0 20px;width:calc( 100% - 40px )" v-tap="status = 1">银行卡提现</x-button>
  <x-button class="postal-2" slot="right" style="color:#fff;background-color:#88C928;margin:0 20px;width:calc( 100% - 40px )" v-tap="status = 2">微信提现</x-button>
  <div class="tip">提现将于5-10个工作日内到账</div>
  <j-tel></j-tel>
</div>

<div class="pal-2" v-if="status === 1">
  <group style="margin-top:-1.17647059em;">
    <x-input title="金额" type="Number" keyboard="number" :value.sync="po1.money" placeholder="请输入提现金额"></x-input>
    <x-input title="收款人" type="Text" :value.sync="po1.people" placeholder="与账号开户姓名一致"></x-input>
    <x-input title="开户行" type="Text" :value.sync="po1.depositBank" placeholder="请输入正确的开户行"></x-input>
    <x-input title="卡号" type="Number" keyboard="number" :value.sync="po1.cardNumber" placeholder="请输入正确的银行卡号"></x-input>
  </group>
  <x-button class="postal-1" :class="{active:isFilledPo1()}" slot="right" style="background-color:#e2e2e2;color:#fff;margin:0 20px;width:calc( 100% - 40px )" v-tap="isFilledPo1()?submitPo1():return">提交</x-button>
  <div class="tip">提现将于3个工作日内到账</div>
  <j-tel></j-tel>
</div>


<div class="pal-3" v-if="status === 2">
  <group style="margin-top:-1.17647059em;">
    <x-input title="金额" type="Number" :value.sync="po2.money" placeholder="请输入提现金额"></x-input>
    <x-input title="微信号" type="Text" :value.sync="po2.account" placeholder="请输入正确的微信号"></x-input>
  </group>
  <x-button class="postal-1" :class="{active:isFilledPo2()}" slot="right" style="background-color:#e2e2e2;color:#fff;margin:0 20px;width:calc( 100% - 40px )" v-tap="isFilledPo2()?submitPo2():return">提交</x-button>
  <j-tel></j-tel>
</div>
</template>

<script>
import Lib from 'assets/Lib.js'
import XButton from 'vux-components/x-button'
import JTel from 'components/j-tel'
import XInput from 'vux-components/x-input'
import Group from 'vux-components/group'
import axios from 'axios'
Lib.M.auth(axios)
export default {
  data() {
    return {
      wallet: 0,
      status: 0, //0=待选择提现，1=银行卡提现，2=微信提现
      po1: {
        money: "",
        people: "",
        depositBank: "",
        cardNumber: ""
      },
      po2: {
        money: "",
        account: ""
      }
    }
  },
  components: {
    XButton,
    JTel,
    XInput,
    Group
  },
  methods: {
    //银行提现
    isFilledPo1() {
      let info = this.po1
      return (/^[1-9]\d*$|^[1-9]\d*\.\d*$|^0\.\d*[1-9]\d*$/g.test(info.money) && info.money <= this.wallet && info.people !== "" && this.depositBank !== "" && /^(\d{16}|\d{19})$/.test(info.cardNumber))
    },
    submitPo1() {
      axios.post(`${Lib.C.walletApi}wallets/${JSON.parse(localStorage.getItem('user')).userId}/withdrawToBankcard`, {}, {
        params: {
          amount: this.po1.money,
          accountName: this.po1.people,
          bankcardNo: this.po1.cardNumber,
          depositBank: this.po1.depositBank
        },
        withCredentials: true,
        responseType: true
      }).then((res) => {
        alert("提现申请已提交")
        this.wallet = res.data.data.balance
        this.status = 0
      }).catch((res) => {
        alert("提现失败，请稍后再试")
      })
    },
    //微信提现
    isFilledPo2() {
      let info = this.po2
      return (/^[1-9]\d*$|^[1-9]\d*\.\d*$|^0\.\d*[1-9]\d*$/g.test(info.money) && info.money <= this.wallet && info.account !== "")
    },
    submitPo2() {
      axios.post(`${Lib.C.walletApi}wallets/${JSON.parse(localStorage.getItem('user')).userId}/withdrawToWechat`, {}, {
        params: {
          amount: this.po2.money,
          wechatId: this.po2.account,
        },
        withCredentials: true,
        responseType: true
      }).then((res) => {
        alert("提现申请已提交")
        this.wallet = res.data.data.balance
        this.status = 0
      }).catch((res) => {
        alert("提现失败，请稍后再试")
      })
    }
  },
  ready() {
    axios.get(`${Lib.C.walletApi}wallets/${JSON.parse(localStorage.getItem('user')).userId}`).then((res) => {
      this.wallet = res.data.data.balance
    }).catch((res) => {
      alert("网络连接失败，请稍候重试")
      window.location.reload()
    })
  }
}
</script>

<style>
body {
  background-color: #eee;
}
</style>
<style lang="less" scoped>
.block-1 {
    width: 100%;
    height: 130px;
    background-color: #62676c;
    position: relative;
    .balance-title {
        height: 16px;
        width: 100%;
        text-align: center;
        position: absolute;
        top: 29px;
        left: 0;
        font-size: 16px;
        color: #fff;
    }
    .balance-money {
        height: 36px;
        width: 100%;
        text-align: center;
        position: absolute;
        bottom: 29px;
        font-size: 36px;
        color: #fff;
    }
}
.pal-1 {
    .postal-1 {
        margin-top: 186px !important;
    }
    .postal-2 {
        margin-top: 20px !important;
    }
}
.pal-2 {
    .postal-1 {
        margin-top: 50px !important;
    }
}
.pal-3 {
    .postal-1 {
        margin-top: 94px !important;
        margin-bottom: 20px !important;
    }
}
.active {
    background-color: #88C928!important;
}
.tip {
    font-size: 12px;
    height: 12px;
    line-height: 12px;
    width: 100%;
    text-align: center;
    margin: 20px 0 10px;
}
</style>
