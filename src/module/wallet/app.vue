<style>
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
      margin-bottom: 10px;
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
      right: 16px;
      bottom: 10px;
      width: 60px;
      height: 25px;
      line-height: 25px;
      border: 1px solid #fff;
      border-radius: 5px;
    }
  }
  .coupon-detail {

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

    .label {
      height: 41px;
      background-color: #fff;
      padding: 0 16px;
      font-size: 12px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 1px;
      .amount-label {
        line-height: 25px;
      }
      .amount-time {
        color: #393939;
        line-height: 10px;
      }
      .amout-change {
        line-height: 41px;
        .orange {
          color: #ff9736;
          display: inline-block;
          margin-right: 3px;
        }
        img {
          transform: rotate(-90deg);
          width: 16px;
        }
      }
    }
  }
}
/*
 * dialog css
 */
.setTapColor(@c:rgba(0,0,0,0)) {
    -webkit-tap-highlight-color: @c;
}
.setTopLine(@c: #C7C7C7) {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    border-top: 1px solid @c;
    color: @c;
    transform-origin: 0 0;
    transform: scaleY(0.5);
}
.setLeftLine(@c: #C7C7C7) {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 1px;
    height: 100%;
    border-left: 1px solid @c;
    color: @c;
    transform-origin: 0 0;
    transform: scaleX(0.5);
}

.weui_dialog_ft {
    position: relative;
    line-height: 42px;
    margin-top: 20px;
    font-size: 17px;
    display: flex;
    span {
        display: block;
        flex: 1;
        color: #888;
        text-decoration: none;
        &:active {
            background-color: @weuiDialogLinkActiveBc;
        }
    }
    &:after {
        content: " ";
        .setTopLine(@weuiDialogLineColor);
    }
    .primary {
        color: #f99736 !important;
    }
}
</style>

<template>
  <div class="content">
    <div class="amount-wrapper">
      <p class="amount-title">我的钱包</p>
      <p class="amount">{{balance}}<span>元</span></p>
      <div class="get-money" v-tap="withdrawShow = true">提现</div>
      <span class="tel" v-tap="goto('tel:40000390808')">客服电话</span>
    </div>
    <div class="coupon-detail">
      <div class="cell">
        <div class="cell-title">收支明细</div>
      </div>
      <div class="label" v-for="balance in balanceChanges">
        <div class="amount-label">
          <div class="amount-type">{{returnType(balance.type, typeList)}}</div>
          <div class="amount-time">{{getTime(balance.createdAt)}}</div>
        </div>
        <div class="amout-change">
          <span v-if="showType(balance.type)" class="orange">+{{balance.amount}}元</span>
          <span v-if="!showType(balance.type)">{{balance.amount}}元</span>
          <img src="./select.png">
         
        </div>
      </div>
    </div>
  </div>
  <Dialog :show.sync="withdrawShow" >
  <p style="font-size: 18px;">提现申请</p>
  <group>
    <x-input title="提现金额" :value.sync="withdrawAmount" type="number" placeholder="请输入微信提现金额"></x-input>
    
  <div class="weui_dialog_ft">
    <span @click="withdrawShow = false" style="border-right: 1px solid #D5D5D6;">取消</span>
    <span :class="{'primary': isFilled()}" @click="isFilled()?withdrawPost(tempOrderNo):return">确认申请</span>
  </div>
  </group>
</Dialog>
</template>

<script>
import Lib from 'assets/Lib.js'
import axios from 'axios'
import Dialog from 'vux-components/dialog'
import Group from 'vux-components/group'
import XInput from 'vux-components/x-input'

Lib.M.auth(axios)

export default {
  data() {
    return {
      balance: 0,
      balanceChanges: [],
      withdrawShow: false,
      withdrawAmount: 0,
      typeList: [{
        id: 1, value: '贴息'
      },{
        id: 2, value: '返现'
      },{
        id: 3, value: '银行卡提现'
      },{
        id: 4, value: '微信提现'
      },{
        id: 5, value: '退款'
      },{
        id: 6, value: '退款扣返现'
      },{
        id: 7, value: '提现返还'
      }]
    }
  },
  components: {
    Dialog,
    Group,
    XInput
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
    /**
     * v-if判断点券的amount
     */
    showType(type) {
      let result 
      switch (type) {
        case 1:
        case 2:
        case 5:
        case 7:
          result = true
          break
        case 3:
        case 4:
        case 6: 
          result = false
          break
        default:
          result = true
      }
      return result
    },
    /**
     * 提交提现申请
     */
    withdrawPost() {
      axios.post(`${Lib.C.walletApi}wallets/${JSON.parse(localStorage.getItem('user')).userId}/withdrawToWechat`, {}, {
        params: {
          amount: this.withdrawAmount
        },
        withCredentials: true,
        responseType: true
      }).then((res) => {
        alert("提现申请已提交")
        this.wallet = res.data.data.balance
        this.withdrawShow = false
      }).catch((res) => {
        alert("提现失败，请稍后再试")
      })
    },
    isFilled() {
      return this.withdrawAmount !== null
    }
    
  }
}

</script>

