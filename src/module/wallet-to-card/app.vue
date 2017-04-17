·<style>
html {
  padding: 0;
  margin: 0;
}
body {
  background-color: #eee;
  padding: 0;
  margin: 0;
}
</style>
<style lang="less">
/* dialog var */
@weuiDialogBackgroundColor: #FAFAFC;
@weuiDialogLineColor: #D5D5D6;
@weuiDialogLinkColor: #3CC51F;
@weuiDialogLinkActiveBc: #EEEEEE;

.content {
  width: 100%;
  height: 100%;
  position: relative;
  .amount-wrapper {
    text-align: center;
    background-image: url('http://ohej1hvbm.bkt.clouddn.com/wallet-back.png');
    background-size: cover;
    padding: 32px 0 0 0;
    height: 150px;
    margin: 0 0 1px 0;
    position: relative;
    p {
      color: #fff;
      margin: 0;
    }
    .amount-title {
      margin-bottom: 10px;
      font-size: 14px;
    }
    .amount {
      font-size: 33px;
      font-weight: 500;
      margin-bottom: 20px;
    }
    .get-money {
      width: 80px;
      height: 30px;
      line-height: 30px;
      color: #fff;
      border: 1px solid #fff;
      border-radius: 5px;
      margin: 0 auto 10px auto;
    }
    .tel {
      position: absolute;
      font-size: 12px;
      color: #fff;
      left: 50%;
      transform: translateX(-50%);
      bottom: 10px;
      width: 60px;
      height: 25px;
      line-height: 25px;
      border: 1px solid #fff;
      border-radius: 5px;
    }
    .hint {
      position: absolute;
      width: 100%;
      text-align: center;
      font-size: 12px;
      bottom: 50px;
      left: 50%;
      transform: translateX(-50%);
      color: #fff;
      font-weight: 300;
    }
  }
  .coupon-detail {
    padding-top: 5vh;
    .cell {
      height: 41px;
      background-color: #fff;
      font-size: 12px;
      color: #393939;
      padding-left: 16px;
      margin-bottom: 1px;
      .cell-title {
        line-height: 41px;
      }
    }

    .input-wrapper {
      width: calc(~"100% - 60px");
      height: 44px;
      line-height: 44px;
      margin: 0 auto;
      display: flex;
      margin-bottom: 2vh;
      .input-label {
        width: 70px;
        height: 44px;
        text-align: center;
        font-size: 15px;
      }
      input {
        width: calc(~"100% - 70px");
        padding: 0 16px;
        font-size: 15px;
        outline: none;
        background-color: #fff;
        border-radius: 5px;
        border: 1px solid #999;
      }
      .input-fake {
        width: calc(~"100% - 70px");
        padding: 0 16px;
        font-size: 15px;
        outline: none;
        background-color: #fff;
        border-radius: 5px;
        border: 1px solid #999;
        color: #777;
      }
    }
    .submit_btn {
      width: calc(~"100% - 150px");
      height: 44px;
      line-height: 44px;
      background-color: #f5f5f5;
      color: #999;
      text-align: center;
      margin: 0 auto;
      border-radius: 5px;
    }
    .active {
      background-color: #ff9736;
      color: #fff;
    }

  }
}
.vux-flexbox-item {
  color: #ff9736 !important;
}
</style>

<template>
  <div class="content">
    <div class="amount-wrapper">
      <p class="amount-title">我的钱包</p>
      <p class="amount">{{balance}}<span>元</span></p>
      <!-- <div class="get-money" v-tap="withdrawShow = true">提现</div> -->
      <div class="hint">注意：个人信息请务必确认后提交！</div>
      <span class="tel" v-tap="goto('tel:40000390808')">客服电话</span>
    </div>
    <div class="coupon-detail">
      <!-- <div class="cell">
        <div class="cell-title">银行卡提现</div>
      </div> -->
      <div class="input-wrapper">
        <div class="input-label">姓名：</div>
        <input type="text" placeholder="请输入您的姓名" v-model="name">
      </div>
      <div class="input-wrapper">
        <div class="input-label">金额：</div>
        <input type="number" placeholder="请输入您的提现金额" v-model="withdrawAmount">
      </div>
      <div class="input-wrapper">
        <div class="input-label">卡号：</div>
        <input type="number" placeholder="请输入您的银行卡号" v-model="bankcardNo">
      </div>
      <div class="input-wrapper" style="margin-bottom: 5vh;">
        <div class="input-label">银行：</div>
        <!-- <div class="input-fake" v-tap="bankShow = true">{{depositBank || '请选择银行卡所属银行'}}</div> -->
        <input type="text" placeholder="请输入银行卡所属银行支行" v-model="depositBank">
      </div>
      <div class="submit_btn" :class="{'active': isFilled()}" v-tap="isFilled()?withdrawPost():return">确认提现</div>
  </div>
<!-- <popup-picker title="银行" :data="bank" :columns="1" :show-cell="false" :show.sync="bankShow" :value.sync="tmpDepositBank" show-name v-ref:bank @on-hide="selectBank()"></popup-picker> -->
</template>

<script>
import Lib from 'assets/Lib.js'
import axios from 'axios'
import Dialog from 'vux-components/dialog'
import Group from 'vux-components/group'
import XInput from 'vux-components/x-input'
import PopupPicker from 'vux-components/popup-picker'

Lib.M.auth(axios)

export default {
  data() {
    return {
      balance: 0,
      balanceChanges: [],
      bankShow: false,
      withdrawShow: false,
      withdrawAmount: '',
      name: '',
      bankcardNo: '',
      tmpDepositBank: [],
      depositBank: '',
      bank: [{
        name: '北京银行',
        value: '0'
      },{
        name: '工商银行',
        value: '1'
      },{
        name: '建设银行',
        value: '2'
      },{
        name: '浦发银行',
        value: '3'
      },{
        name: '中国银行',
        value: '4'
      },{
        name: '农业银行',
        value: '5'
      },{
        name: '招商银行',
        value: '6'
      },{
        name: '广发银行',
        value: '6'
      },{
        name: '交通银行',
        value: '7'
      }]
    }
  },
  components: {
    Dialog,
    Group,
    XInput,
    PopupPicker
  },
  ready() {
    axios.get(`${Lib.C.walletApi}wallets/${JSON.parse(localStorage.getItem('user')).userId}`).then((res) => {
      this.balance = res.data.data.balance
      this.balanceChanges = res.data.data.balanceChanges
    }).catch((res) => {
      alert("网络连接失败，请稍候重试")
      window.location.reload()
    })
  },
  methods: {
    goto(url) {
      location.href = url
    },

    /**
     * 通过点券的type获取typeList中的点券类型
     */
    returnType(type, array) {
      for (let i = 0; i < array.length; i++ ) {
        if (array[i].id == type ) return array[i].value
      }
    },
    /**
     * 将时间戳格式化
     */
    getTime(timeStamp) {
      var d = new Date(timeStamp * 1000)
      var Y = d.getFullYear() + '-'
      var M = (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) + '-'
      var D = (d.getDate() < 10 ? '0' + (d.getDate()) : d.getDate())
      return Y + M + D
    },
    // 选择银行
    selectBank() {
      if (this.tmpDepositBank.length) {
        let id = Number(this.tmpDepositBank[0])
        this.depositBank = this.bank[id].name
      }
      this.tmpDepositBank = []
    },
    /**
     * 提交提现申请
     */
    withdrawPost() {
      axios.post(`${Lib.C.walletApi}wallets/${JSON.parse(localStorage.getItem('user')).userId}/withdrawToBankcard?amount=${this.withdrawAmount}&accountName=${this.name}&bankcardNo=${this.bankcardNo}&depositBank=${this.depositBank}`
      ).then((res) => {
        alert("提现申请已提交!")
        location.href = './usercenter.html'
      }).catch((res) => {
        alert("提现失败，请稍后再试")
      })
    },
    /**
     * 一系列判断
     */
    isBankcard() {
      let reg = /^(\d{16}|\d{19})$/
      return reg.test(this.bankcardNo)
    },
    isFilled() {
      return this.withdrawAmount !== null && this.isBankcard() && this.depositBank && this.name 
    }
    
  }
}

</script>

