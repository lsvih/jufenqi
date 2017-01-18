<template>
<flexbox>
  <flexbox-item class="block-1">
    <div class="user-icon"><img :src="userIcon"></div>
    <div class="user-name">{{userName}}</div>
    <div class="user-balance">贷款金额: {{loan|currency "" 2}}(元)</div>
  </flexbox-item>
</flexbox>
<flexbox class="block-2">
  <flexbox-item class="balance">
    <!-- <flexbox-item class="balance" onclick="location.href='balance.html'"> -->
    <div>已消费金额 (元)</div>
    <div class="balance-money">{{balance|currency "" 2}}</div>
  </flexbox-item>
  <flexbox-item class="balance" onclick="location.href='wallet.html'">
    <div>我的钱包 (元)</div>
    <div class="balance-money">{{wallet|currency "" 2}}</div>
  </flexbox-item>
</flexbox>

<group style="margin-top:-.6em;">
  <flexbox class="block-3-name">
    我的订单
  </flexbox>
  <flexbox class="block-3 vux-1px-t">
    <flexbox-item class="icon-item vux-1px-r" onclick="location.href='./zx-order-list.html'">
      <img src="icon/zx-order.png">
      <div class="icon-item-name">装修订单</div>
    </flexbox-item>
    <flexbox-item class="icon-item vux-1px-r vux-1px-t" onclick="location.href='./zc-order-list.html'">
      <img src="icon/zc-order.png">
      <div class="icon-item-name">主材订单</div>
    </flexbox-item>
    <flexbox-item class="icon-item vux-1px-t" onclick="location.href='./tk-order-list.html'">
      <img src="icon/repay-order.png">
      <div class="icon-item-name">退款订单</div>
    </flexbox-item>
  </flexbox>
</group>

<group style="margin-top:-.6em;">
  <flexbox class="block-3-name">
    我的工具
  </flexbox>
  <flexbox class="block-3 vux-1px-t">
    <flexbox-item class="icon-item vux-1px-r">
      <img src="icon/repay.png">
      <div class="icon-item-name">我的还款</div>
    </flexbox-item>
    <flexbox-item class="icon-item vux-1px-r vux-1px-t">
      <img src="icon/ID.png">
      <div class="icon-item-name">我的认证</div>
    </flexbox-item>
    <flexbox-item class="icon-item vux-1px-t" v-tap="goto('./favorite.html')">
      <img src="icon/favorite.png">
      <div class="icon-item-name">我的收藏</div>
    </flexbox-item>
  </flexbox>
  <flexbox class="block-3 vux-1px-t">
    <flexbox-item class="icon-item vux-1px-r" v-tap="goto('http://kefu.easemob.com/webim/im.html?tenantId=33093')">
      <img src="icon/online.png">
      <div class="icon-item-name">在线客服</div>
    </flexbox-item>
    <flexbox-item class="icon-item vux-1px-r vux-1px-t" v-tap="goto('tel:4000390808')">
      <img src="icon/tel.png">
      <div class="icon-item-name">电话咨询</div>
    </flexbox-item>
    <flexbox-item class="icon-item vux-1px-t" v-tap="goto('./feed-back.html')">
      <img src="icon/feedback.png">
      <div class="icon-item-name">用户反馈</div>
    </flexbox-item>
  </flexbox>
</group>
<!-- <div class="exit" v-tap="exit">
退出登录</div> -->
<div class="block-f"></div>
<j-footer></j-footer>
</template>

<script>
import Lib from 'assets/Lib.js'
import JFooter from 'components/j-footer'
import Group from 'vux-components/group/'
import Cell from 'vux-components/cell/'
import {
  Flexbox,
  FlexboxItem
} from 'vux-components/flexbox'
import axios from 'axios'
Lib.M.auth(axios, true)
export default {
  data() {
    return {
      showLoading: false,
      loan: 0,
      balance: 0,
      wallet: 0,
      userIcon: JSON.parse(localStorage.getItem('user')).profile.profileImage,
      userName: JSON.parse(localStorage.getItem('user')).profile.nickname,
    }
  },
  components: {
    JFooter,
    Flexbox,
    FlexboxItem,
    Group,
    Cell
  },
  ready() {
    axios.get(`${Lib.C.walletApi}wallets/${JSON.parse(localStorage.getItem('user')).userId}`).then((res) => {
      let walletInfo = res.data.data
      this.loan = walletInfo.loanAmount
      this.balance = walletInfo.consumptionAmount
      this.wallet = walletInfo.balance
    }).catch((err) => {
      throw err
    })
  },
  methods: {
    stopLoading() {
      this.showLoading = false
    },
    startLoading() {
      this.showLoading = true
    },
    goto(url) {
      location.href = url
    },
    exit() {
      localStorage.clear()
    }
  }
}
</script>

<style>
body {
  background-color: #eee;
}
</style>
<style scoped lang="less">@import '~vux/src/styles/1px.less';
.block-1 {
    position: relative;
    height: 110px;
    background-color: #62676C;
    border-bottom: 1px solid #fff;
    color: #fff;
    .user-icon {
        position: absolute;
        top: 20px;
        left: 24px;
        height: 70px;
        width: 70px;
        border-radius: 35px;
        border: 1px solid #fff;
        img {
            position: absolute;
            top: 2px;
            left: 2px;
            height: 66px;
            width: 66px;
            border-radius: 33px;
        }
    }
    .user-name {
        position: absolute;
        top: 36px;
        left: 110px;
        font-size: 16px;
        height: 16px;
        width: auto;
        .user-rank {
            margin-left: 10px;
            font-size: 12px;
            img {
                position: absolute;
                width: 24px;
                height: 24px;
                top: 0;
                right: -5px;
            }
        }
    }
    .user-balance {
        position: absolute;
        top: 66px;
        left: 110px;
        font-size: 12px;
    }
}
.block-2 {
    background-color: #fff;
    color: #393939;
    .balance:first-child {
        border-right: 1px solid #d8d8d8;
    }
    .balance {
        padding: 10px 0;
    }
}

.block-3 {
    height: 80px;
    background-color: #fff;
    .icon-item {
        position: relative;
        height: 100%;
        img {
            position: absolute;
            top: 17px;
            left: 50%;
            margin-left: -12px;
            width: 24px;
            height: 24px;
        }
        .icon-item-name {
            position: absolute;
            bottom: 17px;
            left: 0;
            width: 100%;
            font-size: 12px;
            color: #393939;
            text-align: center;
        }
    }
}
.block-3-name {
    background-color: #fff;
    font-size: 14px;
    color: #393939;
    height: 30px;
    line-height: 30px;
    padding-left: 15px;
}
.balance {
    height: 40px;
    line-height: 20px;
    text-align: center;
    font-size: 12px;
    .balance-money {
        font-size: 18px;
    }
}
.apply {
    height: 44px;
    line-height: 44px;
    width: 200px;
    border-radius: 22px;
    border: 1px solid #5965B2;
    color: #5965B2;
    font-size: 28px;
    text-align: center;
}

.block-f {
    position: relative;
    width: 100%;
    height: 64px;
    background-color: #eee;
}
.exit {
    position: relative;
    margin-top: 12px;
    width: 100%;
    height: 44px;
    line-height: 44px;
    text-align: center;
    color: #ec5835;
    font-size: 16px;
    background-color: #fff;
}
</style>
