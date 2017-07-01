·<style>
html {
  padding: 0;
  margin: 0;
}
body {
  background-color: #efefef;
  padding: 0;
  margin: 0;
}
</style>
<style lang="less">
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
    .hint {
      font-size: 12px;
      margin-bottom: 8px;
      text-align: center;
      color: #fff;
      font-weight: 300;
      width: 100%;
    }
  }
  .coupon-detail {

    .cell {
      height: 41px;
      font-size: 12px;
      color: #393939;
      padding-left: 16px;
      margin-bottom: 1px;
      .cell-title {
        line-height: 50px;
        font-size: 14px;
        position: relative;
        padding-left: 10px;
        .cell-heihei {
          width: 2px;
          height: 12px;
          background-color: #ff9736;
          top: 19px;
          left: 0px;
          position: absolute;
        }
      }
    }

    .label {
      height: 50px;
      background-color: #fff;
      z-index: 10;
      position: relative;
      padding: 0 16px;
      font-size: 12px;
      display: flex;
      justify-content: space-between;
      transition: all 0.3s ease;
      border-bottom: 1px solid #ebebeb;
      .more {
        position: absolute;
        bottom: -44px;
        box-sizing: border-box;
        padding: 0 16px;
        left: 0;
        width: 100%;
        display: flex;
        height: 44px;
        background-color: #ebebeb;
        line-height: 44px;
        justify-content: space-between;
        border-top: 1px solid #ebebeb;
        visibility: hidden;
      }
      .amount-label {
        line-height: 32px;
        width: 80%;
      }
      .amount-time {
        color: #393939;
        line-height: 10px;
      }
      .amout-change {
        line-height: 50px;
        position: relative;
        .orange {
          color: #ff9736;
          display: inline-block;
          margin-right: 3px;
        }
        span {
          z-index: 100;
        }
        img {
          transform: rotate(-90deg);
          width: 16px;
          transition: all 0.3s ease;
        }
        .origin {
          transform: none;
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
#dialog-p {
  font-size: 18px;
  margin: 0;
  padding: 13px 0;
  position: relative;
  background-color: #fff;
  img {
    width: 20px;
    transform: rotate(-90deg);
    position: absolute;
    top: 19px;
    right: 12px;
  }
}
/**
 * 活动页卡片
 */
.p-card {
  width: calc(~"100% - 32px");
  margin: 10px auto;
  background-color: #efefef;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  .cate-wrapper {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    height: 40px;
    background-color: #fff;
    line-height: 40px;
    color: #393939;
    border-radius: 5px 5px 0 0;
    .cate-label {
      display: flex;
      line-height: 40px;
      .img-wrapper {
        width: 30px;
        height: 30px;
        border-radius: 5px;
        margin-top: 5px;
        margin-right: 10px;
        img {
          width: 100%;
          height: 100%;
          display: block;
          border-radius: 5px;
        }
      }
      .name {
        font-size: 12px;

      }
    }
    .end {
      font-size: 12px;
      line-height: 40px;
      color: #999;
      font-weight: 300;
    }
    .end-active {
        color: #ff9736 !important;
      }
  }
  .brand-wrapper {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    height: 60px;
    background-color: #f8f8f8;
    line-height: 40px;
    color: #393939;
    .brand-label {
      display: flex;
      line-height: 60px;
      .img-wrapper {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
        margin-top: 15px;
        img {
          width: 100%;
          height: 100%;
          display: block;
          border-radius: 50%;
        }
      }
      .name {
        font-size: 15px;
      }
    }
    .end {
      font-size: 12px;
      line-height: 60px;
    }

  }
  .tip {
    display: flex;
    justify-content: space-between;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    font-size: 12px;
    color: #999;
    padding: 0 10px;
    font-weight: 300;
    border-radius: 0 0 5px 5px;
    .rufund-btn {
      height: 100%;
    }
  }
}
.btn-wp {
  width: calc(~"100% - 40px");
  margin: 0 auto;
  height: 44px;
  line-height: 44px;
  margin-top: 70%;
  .btn {
    width: 100%;
    background-color: #ff9736;
    color: #fff;
    text-align: center;
  }
  .btn-tip {
    font-size: 12px;
    color: #cdcdcd;
    text-align: right;
    width: 100%;
    span {
      color: #ff9736;
      text-decoration: underline;
    }
  }
}
</style>

<template>
  <div class="content">
    <div class="amount-wrapper">
      <p class="amount-title">我的服务费</p>
      <p class="amount">{{loanServiceAmount? loanServiceAmount: balance*0.01}}<span>元</span></p>
      <div class="hint">{{serveText}}</div>

      <span class="tel" v-tap="goto('tel:40000390808')">客服电话</span>
    </div>
    <div class="coupon-detail">
      
      <div class="p-card" v-for="loan in loanServes">
        <div class="cate-wrapper">
          <div class="cate-label">
            <!-- <div class="img-wrapper"><img :src="cate.cateImg"></div> -->
            <div class="name">订单号：{{loan.serialNo}}</div>
          </div>
          <div class="end"><span :class="{'end-active': !cate.used}">{{loan.status == 0?'未激活':'已激活'}}</span></div>
        </div>
        <div class="tip">
          <span>支付方式：<span :style="setColor(cate.payMethod)">{{cate.payMethod == 3? '微信支付': '线下刷卡'}}</span></span>
          <div class="end">{{getTime(loan.createdAt)}}</div>
        </div>
      </div>
      <div class="btn-wp" v-if="payShow">
        <div class="btn" v-tap="weChatShow = true">微信支付</div>
        <div class="btn-tip">不想微信支付？试试<span v-tap="bankCardShow = true">线下刷卡</span></div>
      </div>
    </div>
  </div>
  <confirm :show.sync="weChatShow" title=""  confirm-text="是" cancel-text="否" @on-confirm="pay(3)" @on-cancel="weChatShow = false">
  <p style="text-align:center;">确认微信支付？</p>
  </confirm>
   <confirm :show.sync="bankCardShow" title=""  confirm-text="是" cancel-text="否" @on-confirm="pay(1)" @on-cancel="bankCardShow = false">
  <p style="text-align:center;">确认线下刷卡？</p>
  </confirm>

<!--   <dialog :show.sync="dialogShow" >
  <p style="font-size: 18px;">线下刷卡退款申请</p>
  <group>
    <x-input title="姓名" :value.sync="refundBody.accountName" type="text" placeholder="请输入您的姓名"></x-input>
    <x-input title="银行卡号" :value.sync="refundBody.bankcardNo" type="text" placeholder="请输入银行卡号"></x-input>
    <x-input title="开户行" :value.sync="refundBody.depositBank" type="text" placeholder="请输入您的开户行"></x-input>
  <div class="weui_dialog_ft">
    <span @click="dialogShow = false" style="border-right: 1px solid #D5D5D6;">取消</span>
    <span :class="{'primary': isFilled()}" @click="isFilled()?hideShow(): return">确认申请</span>
  </div>
  </group>
</dialog> -->
</template>

<script>
import Lib from 'assets/Lib.js'
import axios from 'axios'
import Dialog from 'vux-components/dialog'
import Group from 'vux-components/group'
import XInput from 'vux-components/x-input'
import Confirm from 'vux-components/confirm'

Lib.M.auth(axios)

export default {
  data() {
    return {
      balance: 0,
      categoryBrands: [],
      withdrawShow: false,
      withdrawAmount: 0,
      totalAmount: 0,
      user: JSON.parse(localStorage.user).userId,
      weChatShow: false,
      bankCardShow: false,
      imgUrl: 'http://ohej1hvbm.bkt.clouddn.com/',
      loanId: null,
      loanServiceRate: 0,
      loanServiceAmount: 0,
      serveText: '未激活',
      loanServes: [],
      payShow: true,
    }
  },
  components: {
    Dialog,
    Group,
    XInput,
    Confirm
  },
  ready() {
    // this.getLoanBalance(),
    // this.isServed()
    this.getLoan()
  },
  methods: {
    goto(url) {
      location.href = url
    },
    // isServed() {
    //   axios.get(`http://wx.jufenqi.com:8080/materialorder/api/materialOrders/rates?userId=${JSON.parse(localStorage.user).userId}&brandId=186`).then((res) => {
    //     if (res.data.data.loanServiceId !== null && res.data.data.loanServicePayed === false ) {
    //       // alert('您需要先交服务费！')
    //       // location.href = `./usercenter.html?loanServiceId=${res.data.data.loanServiceId}`
    //       this.loanId = res.data.data.loanServiceId,
    //       this.loanServiceRate = res.data.data.loanServiceRate,
    //       this.loanServiceAmount = this.loanSeviveAmount
    //     } else if (res.data.data.loanServiceId !== null && res.data.data.loanServicePayed === true) {
    //       this.serveText = '已激活'
    //     }

    //   }).catch((err) => {
    //     console.log(err)
    //   })
    // },
    getLoanBalance() {
      axios.get(`${Lib.C.walletApi}wallets/${JSON.parse(localStorage.getItem('user')).userId}`).then((res) => {
        let walletInfo = res.data.data
        this.loan = walletInfo.loanAmount
        this.balance = walletInfo.consumptionAmount
        this.wallet = walletInfo.balance
      }).catch((err) => {
        throw err
      })
    },
    getLoan() {
      axios.get(`${Lib.C.loanApi}loan-applications?filter=userId:${JSON.parse(localStorage.getItem('user')).userId}`).then((res) => {

        res.data.data.map((e) => {
          if (e.loanService !== null) {
            if (e.loanService.needed == true && e.loanService.status == 0) {
              console.log('heihei')
              this.loanServiceRate = e.loanService.rate/100
              this.loanId = e.loanService.id,
              this.loanServiceAmount = e.loanQuota * this.loanServiceRate
            } else if (e.loanService.needed == true && e.loanService.status == 1) {
              this.serveText = '已激活',
              this.loanServes.push(e.loanService),
              this.payShow = false
            }
          }
        })
        console.log(this.loanServes)
      }).catch((err) => {
        throw err
      })
    },
    pay(loanType) {
      let that = this
      this.showLoading = true
      axios.post(`${Lib.C.loanApi}loan-services/${this.loanId}/pay`, {paymethod: loanType}).then((res) => {
        let paymentId = res.data.data.paymentId
        let payData = new FormData()
        payData.append('notifyUrl', this.loanServiceNotifyUrl)
        if (loanType == 3) {
          axios.get(`${Lib.C.userApi}wechatOpenIds/${JSON.parse(localStorage.user).userId}`).then((res) => {
              let openId = res.data.data.openId
              payData.append('openid', openId)
              axios.post(`${Lib.C.payApi}pay/${paymentId}`, payData).then((res) => {
                pingpp.createPayment(res.data.data, (result, err) => {
                  if (result === 'success') {
                    alert('支付成功')
                    location.reload()
                  } else if (result === 'fail') {
                    alert('支付失败，请稍后重试。。')
                    that.showLoading = false
                    // location.href = './gz-info.html'
                  } else if (result === 'cancel') {
                    alert('支付失败，请稍后重试。。')
                    // location.href = './gz-info.html'
                    that.showLoading = false
                  }
                })
              }).catch((err) => {
                this.showLoading = false
                alert("网络连接中断，请稍候再试")
                throw err
              })
            }).catch((err) => {
              this.showLoading = false
              alert("网络连接中断，请稍候再试")
              throw err
            })
        } else {
          alert('支付成功')
          location.reload();
        }
      }).catch((err) => {
        throw err
        this.showLoading = false
      })
    },
    getTime:Lib.M.getTime,
  }
}
</script>
