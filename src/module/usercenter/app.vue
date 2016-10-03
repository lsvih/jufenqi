<template>
<flexbox>
  <flexbox-item class="block-1">
    <div class="user-icon"><img :src="userIcon"></div>
    <div class="user-name">{{userName}}<span class="user-rank">{{userRank}}<img src="icon/rank.png"></span></div>
    <div class="user-balance">可用提现金额: {{balance|currency "" 2}}(元)</div>
  </flexbox-item>
</flexbox>
<flexbox class="block-2">
  <flexbox-item class="balance">
    <div>授信额度 (元)</div>
    <div class="balance-money">{{limit|currency "" 2}}</div>
  </flexbox-item>
  <flexbox-item class="balance">
    <div>剩余额度 (元)</div>
    <div class="balance-money">{{balance|currency "" 2}}</div>
  </flexbox-item>
</flexbox>
<flexbox class="block-3">
  <flexbox-item class="icon-item">
    <img src="icon/favorite.png"> <div class="icon-item-name">我的收藏</div>
  </flexbox-item>
  <flexbox-item class="icon-item">
    <img src="icon/order.png"> <div class="icon-item-name">我的订单</div>
  </flexbox-item>
  <flexbox-item class="icon-item">
    <img src="icon/refunds.png"> <div class="icon-item-name">我的退款/取消</div>
  </flexbox-item>
</flexbox>
<group style="margin-top:-15px">
  <cell link="repayment-list.html" is-link class="cell-item">
    <div class="cell-icon"><img src="icon/repayment.png"></div>
    <div class="cell-name">我的还款</div>
    <div class="cell-right">今日待还999元</div>
  </cell>
  <cell class="cell-item">
    <div class="cell-icon"><img src="icon/access.png"></div>
    <div class="cell-name">我的认证</div>
  </cell>
</group>
<group style="margin:-15px 0 44px 0;">
  <cell link="tel:4000000000" class="cell-item">
    <div class="cell-icon"><img src="icon/service.png"></div>
    <div class="cell-name">售后服务</div>
    <div class="cell-right tel">4000-000-000</div>
  </cell>
  <cell link="tel:4000000000" class="cell-item">
    <div class="cell-icon"><img src="icon/phone.png"></div>
    <div class="cell-name">咨询电话</div>
    <div class="cell-right tel">4000-000-000</div>
  </cell>
  <cell link="complaint.html" is-link class="cell-item">
    <div class="cell-icon"><img src="icon/complaint.png"></div>
    <div class="cell-name">我要投诉</div>
  </cell>
  <cell link="feed-back.html" is-link class="cell-item">
    <div class="cell-icon"><img src="icon/feedback.png"></div>
    <div class="cell-name">用户反馈</div>
  </cell>
</group>
<j-footer></j-footer>
</template>

<script>
import Lib from 'assets/Lib.js'
import JFooter from 'components/JFooter.vue'
import Group from 'vux-components/group/'
import Cell from 'vux-components/cell/'
import {
  Flexbox,
  FlexboxItem
} from 'vux-components/flexbox'
export default {
  data() {
    return {
      showLoading: false,
      limit: this.isDataExist("limit"),
      balance: this.isDataExist("balance"),
      ins: this.isDataExist("ins"),
      userIcon: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1397694479,818244779&fm=111&gp=0.jpg",
      userName: "lsvih",
      userRank: "V2"
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

  },
  methods: {
    stopLoading() {
      this.showLoading = false
    },
    startLoading() {
      this.showLoading = true
    },
    isDataExist(what) {
      return !localStorage.getItem(what) || !JSON.parse(localStorage.user)[what] ? 0 : JSON.parse(localStorage.user)[what]
    }
  }
}
</script>

<style>
body {
  background-color: #eee;
}
</style>
<style scoped lang="less">
.block-1 {
    position: relative;
    height: 110px;
    background-color: #9EBC2B;
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
    background-color: #869F42;
    color: #fff;
    .balance:first-child {
        border-right: 1px solid #fff;
    }
    .balance {
        padding: 10px 0;
    }
}

.block-3 {
    height: 80px;
    background-color: #fff;
    margin-top: 6px;
    .icon-item {
        position: relative;
        height: 100%;
        img {
            position: absolute;
            top: 9px;
            left: 50%;
            margin-left: -20px;
            width: 40px;
            height: 40px;
        }
        .icon-item-name{
          position: absolute;
          bottom: 9px;
          left:0;
          width: 100%;
          font-size: 12px;
          color:#393939;
          text-align: center;
        }
    }
}
.balance {
    height: 40px;
    line-height: 20px;
    text-align: center;
    font-size: 12px;
    .balance-money {
        font-size: 16px;
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
.cell-item {
    height: 24px;
    position: relative;
    .cell-icon {
        position: absolute;
        top: 12px;
        left: 15px;
        height: 20px;
        width: 20px;
        img {
            height: 20px;
            width: 20px;
        }
    }
    .cell-name {
        position: absolute;
        top: 12px;
        left: 45px;
        font-size: 16px;
        color: #393939;
    }
    .cell-right {
        position: absolute;
        font-size: 12px;
        top: 15px;
        right: 25px;
    }
    .cell-right.tel {
        color: #5965B2;
    }
}
</style>
