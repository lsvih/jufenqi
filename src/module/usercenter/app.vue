<style>
body {
  background-color: #f4f4f4;
}
</style>
<style scoped lang="less">
@import '~vux/src/styles/1px.less';
@font: #F1E2BE;
@bac: #EF913B;
.block-1 {
    position: relative;
    height: 215px;
    background-image: url('/static/new/usercenter/01.png');
    background-size: 100% 100%;
    color: #fff;
    box-shadow: inset 0px -9px 40px -4px rgba(0, 0, 0, 0.1);
    z-index: 100;
    .hello {
      position: absolute;
      top: 90px;
      left: 128px;
      font-size: 20px;
      font-weight: lighter;
      color: @font;
    }
    .setting {
      position: absolute;
      top: 13px;
      right: 16px;
      width: 18px;
      height: 18px;
      img {
        width: 100%;
      }
    }
    .user-icon {
        position: absolute;
        top: 32px;
        left: 26px;
        height: 70px;
        width: 70px;
        border-radius: 35px;
        img {
            position: absolute;
            top: 2px;
            left: 2px;
            height: 66px;
            width: 66px;
            border-radius: 33px;
        }
    }
    .manager {
      width: 12px;
      height: 22px;
      position: absolute;
      top: 96px;
      left: 177px;
      img {
        width: 100%;
      }
    }
    .user-name {
      position: absolute;
      top: 45px;
      left: 113px;
      font-size: 25px;
      width: auto;
    }
    .user-balance {
      position: absolute;
      top: 51px;
      right: 0px;
      font-size: 15px;
      img {
        width: 100px;
        height: auto;
        display: block;
      }
    }
    .user-service {
      position: absolute;
      top: 160px;
      right: 40px;
      width: 50px;
      height: 20px;
      line-height: 20px;
      font-weight: 300;
      font-size: 12px;
      border-radius: 5px;
      border: 1px solid #fff;
      text-align: center;
    }
}
.block-2 {
    color: #fff;
    position: absolute;
    z-index: 1000;
    bottom: 0;
    left: 0;
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
        font-size: 20px;
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
    background-color: #fff;
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
.mask-wrapper {
    position: relative;
    margin-top: -12px;
    .mask-up {
      width: 100%;
      height: 2px;
      background-color: #fff;
      position: absolute;
      top: 0px;
      left: 0;
    }
    .mask-down {
      position: absolute;
      width: 100%;
      height: 2px;
      background-color: #fff;
      bottom: -1px;
      left: 0;
      z-index: 100;
    }
    .mask-left {
      position: absolute;
      width: 16px;
      height: 82px;
      top: 79px;
      left: 0;
      background-color: #fff;
    }
    .mask-right {
      position: absolute;
      width: 16px;
      height: 82px;
      top: 79px;
      right: 0;
      background-color: #fff;
    }
}
// .vux-flexbox-item {
//   color: #ff9736 !important;
// }
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
.flexb {
  display: flex;
  justify-content: space-around;
  text-align: center;
  margin: 20px auto;
  width: calc(~"100% - 20px");
  height: 100px;
  background-color: #fff;
  align-items: center;
  .item {
    .img-wp {
      width: 23px;
      height: 23px;
      margin: 0 auto 10px auto;
      img {
        display: block;
        width: 100%;
        height: auto;
      }
    }
    
    .text {
      font-size: 14px;
      color: #333;
    }
  }
}
.labell {
  width: calc(~"100% - 20px");
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  line-height: 60px;
  background-color: #fff;
  margin: 0 auto;
  .left {
    display: flex;
    align-items: center;
    font-size: 14px;
    .icon-wp {
      width: 20px;
      height: 20px;
      margin: 0 10px 0 20px;
      img {
        display: block;
        width: 20px;
        height: auto;
      }
    } 
  }
  .right {
    width: 6px;
    height: 12px;
    margin-right: 20px;
    img {
      display: block;
      width: 100%;
    }
  }
}
</style>

<template>
<flexbox>
  <flexbox-item class="block-1">
    <div class="user-icon"><img :src="userIcon"></div>
    <div class="user-name">{{userName}}</div>
    <!-- <div class="manager" v-if="managerService"><img src="/static/images/usercenter/manager-final.png"></div> -->
    <!-- <div class="user-balance" v-tap="goto('./loan-application.html')">贷款金额: {{loan|currency "" 2}}(元) ></div> -->
    <div class="user-balance" v-tap="goto('./loan-application.html')"><img src="/static/new/usercenter/06.png"></div>
    <!-- 设置页 -->
    <!-- <div class="setting" ><img src="/static/images/usercenter/setting.png"></div> -->
    <flexbox class="block-2">
      <flexbox-item class="balance">
        <!-- <flexbox-item class="balance" onclick="location.href='balance.html'"> -->
          <div class="balance-money">{{balance|currency "" 2}}</div>
          <div style="font-weight: 300;">已消费金额</div>
        </flexbox-item>
        <flexbox-item class="balance" onclick="location.href='wallet.html'">
          <div class="balance-money">{{wallet|currency "" 2}}</div>
          <div style="font-weight: 300;">我的钱包</div>
        </flexbox-item>
      </flexbox>
  </flexbox-item>
</flexbox>


<!-- <group class="mask-wrapper">
  <flexbox class="block-3 vux-1px-t">
    <flexbox-item class="icon-item vux-1px-r" onclick="location.href='./dp-order-list.html'">
      <img src="/static/images/usercenter/zx-order.png">
      <div class="icon-item-name">单品订单</div>
    </flexbox-item>
    <flexbox-item class="icon-item vux-1px-r vux-1px-t" onclick="location.href='./zc-order-list.html'">
      <img src="/static/images/usercenter/zc-order.png">
      <div class="icon-item-name">主材订单</div>
    </flexbox-item>
    <flexbox-item class="icon-item vux-1px-t" onclick="location.href='./tk-order-list.html'">
      <img src="/static/images/usercenter/refund.png">
      <div class="icon-item-name">退款订单</div>
    </flexbox-item>
  </flexbox>
  <flexbox class="block-3 vux-1px-t">
    <flexbox-item class="icon-item vux-1px-r">
      <img src="/static/images/usercenter/repayment.png" v-tap="goto('./my-event.html')">
      <div class="icon-item-name">我的活动</div>
    </flexbox-item>
    <flexbox-item class="icon-item vux-1px-r vux-1px-t" v-tap="goto('./coupon.html')">
      <img src="/static/images/usercenter/coupon.png">
      <div class="icon-item-name">我的积分</div>
    </flexbox-item>
    <flexbox-item class="icon-item vux-1px-t" v-tap="goto('./favorite.html')">
      <img src="/static/images/usercenter/collection.png">
      <div class="icon-item-name">我的收藏</div>
    </flexbox-item>
  </flexbox>
  <flexbox class="block-3 vux-1px-t">
    <flexbox-item class="icon-item vux-1px-r" v-tap="goto('http://kefu.easemob.com/webim/im.html?tenantId=33093')">
      <img src="/static/images/usercenter/service.png">
      <div class="icon-item-name">在线客服</div>
    </flexbox-item>
    <flexbox-item class="icon-item vux-1px-r vux-1px-t" v-tap="goto('tel:4000390808')">
      <img src="/static/images/usercenter/phonecall.png">
      <div class="icon-item-name">电话咨询</div>
    </flexbox-item>
    <flexbox-item class="icon-item vux-1px-t" v-tap="goto('./feed-back.html')">
      <img src="/static/images/usercenter/feedback.png">
      <div class="icon-item-name">兑换礼品</div>
    </flexbox-item>
  </flexbox>
  <div class="mask-up"></div>
  <div class="mask-down"></div>
  <div class="mask-left"></div>
  <div class="mask-right"></div>
</group> -->
<div class="flexb">
  <div class="item">
    <div class="img-wp" v-tap="goto('./pic-price.html')">
      <img src="/static/new/usercenter/04.png">
    </div>
    <div class="text">查看案例</div>
  </div>
  <div class="item" v-tap="goto('./dp-order-list.html')">
    <div class="img-wp">
      <img src="/static/new/usercenter/09.png">
    </div>
    <div class="text">单品订单</div>
  </div>
  <div class="item" v-tap="goto('./zc-order-list.html')">
    <div class="img-wp">
      <img src="/static/new/usercenter/07.png">
    </div>
    <div class="text">主材订单</div>
  </div>
  <div class="item" v-tap="goto('./tk-order-list.html')">
    <div class="img-wp">
      <img src="/static/new/usercenter/08.png">
    </div>
    <div class="text">退款订单</div>
  </div>
</div>
<div class="labell">
    <div class="left" v-tap="goto('./goodlist.html')">
      <div class="icon-wp">
        <img src="/static/new/usercenter/mall.png">
      </div>
      <div>
        积分商城
      </div>
    </div>
    <div class="right"  v-tap="goto('./goodlist.html')">
      <img src="/static/new/usercenter/20.png">
    </div>
</div>
<div class="labell">
    <div class="left" v-tap="goto('./coupon.html')">
      <div class="icon-wp">
        <img src="/static/new/usercenter/18.png">
      </div>
      <div>
        我的积分
      </div>
    </div>
    <div class="right"  v-tap="goto('./coupon.html')">
      <img src="/static/new/usercenter/20.png">
    </div>
</div>
<div class="labell">
    <div class="left" v-tap="goto('./dp-list.html')">
      <div class="icon-wp">
        <img src="/static/new/usercenter/mall.png">
      </div>
      <div>
        热卖单品
      </div>
    </div>
    <div class="right"  v-tap="goto('./dp-list.html')">
      <img src="/static/new/usercenter/20.png">
    </div>
</div>
<div class="labell">
    <div class="left" v-tap="goto('./vote.html')">
      <div class="icon-wp">
        <img src="/static/new/usercenter/gift.png">
      </div>
      <div>
        注册礼品
      </div>
    </div>
    <div class="right"  v-tap="goto('./vote.html')">
      <img src="/static/new/usercenter/20.png">
    </div>
</div>
<div class="labell">
    <div class="left" v-tap="goto('./feed-back.html')">
      <div class="icon-wp">
        <img src="/static/new/usercenter/exchange.png">
      </div>
      <div>
        兑换礼品
      </div>
    </div>
    <div class="right" v-tap="goto('./feed-back.html')">
      <img src="/static/new/usercenter/20.png">
    </div>
</div>
<div class="labell">
    <div class="left" v-tap="goto('http://kefu.easemob.com/webim/im.html?tenantId=33093')">
      <div class="icon-wp">
        <img src="/static/new/usercenter/25.png">
      </div>
      <div>
        在线客服
      </div>
    </div>
    <div class="right" v-tap="goto('http://kefu.easemob.com/webim/im.html?tenantId=33093')">
      <img src="/static/new/usercenter/20.png">
    </div>
</div>
<div class="labell">
    <div class="left" v-tap="goto('tel:4000390808')">
      <div class="icon-wp">
        <img src="/static/new/usercenter/26.png">
      </div>
      <div>
        电话咨询
      </div>
    </div>
    <div class="right" v-tap="goto('tel:4000390808')">
      <img src="/static/new/usercenter/20.png">
    </div>
</div>
<div class="labell" style="margin-bottom: 64px;">
    <div class="left" v-tap="goto('./user-setting.html')">
      <div class="icon-wp">
        <img src="/static/new/usercenter/30.png">
      </div>
      <div>
        个人设置
      </div>
    </div>
    <div class="right" v-tap="goto('./user-setting.html')">
      <img src="/static/new/usercenter/20.png">
    </div>
</div>
<!-- <group style="margin-top:-.6em;">
  <flexbox class="block-3 vux-1px-t">
    <flexbox-item class="icon-item vux-1px-r">
      <img src="icon/repay.png">
      <div class="icon-item-name">我的还款</div>
    </flexbox-item>
    <flexbox-item class="icon-item vux-1px-r vux-1px-t" v-tap="goto('./coupon.html')">
      <img src="icon/ID.png">
      <div class="icon-item-name">我的点券</div>
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
</group> -->
<!-- <div class="exit" v-tap="exit">
退出登录</div> -->
<Dialog :show.sync="payShow" >
  <p id="dialog-p" style="border-bottom: 1px solid #f5f5f5;" v-tap="pay(3)">
    微信支付
    <img src="./select.png">
  </p>
  <p id="dialog-p" style="border-bottom: 1px solid #f5f5f5;" v-tap="pay(1)">
    线下刷卡
    <img src="./select.png">
  </p>
  <p id="dialog-p" style="border-bottom: 1px solid #f5f5f5;" v-tap="goto('./contact.html')">
    服务协议
    <img src="./select.png">
  </p>
  <p id="dialog-p" v-tap="payShow = false">取消</p>
</Dialog>
<j-footer></j-footer>
<loading :show="showLoading" text="请稍后。。"></loading>
</template>

<script>
import Lib from 'assets/Lib.js'
import JFooter from 'components/j-footer'
import Group from 'vux-components/group/'
import Cell from 'vux-components/cell/'
import Dialog from 'vux-components/dialog/'
import Loading from 'vux-components/loading'
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
      managerService: false,
      payShow: false,
      loanServiceNotifyUrl: 'http://materialorder/api/loan-services/noticePaymentResult',
      loanId: Lib.M.GetRequest().loanId ? Lib.M.GetRequest().loanId : null,
      hasServed: false,
      hasPayed: false
    }
  },
  components: {
    JFooter,
    Flexbox,
    FlexboxItem,
    Group,
    Cell,
    Dialog,
    Loading
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
    axios.get(`${Lib.C.userApi}customerProfiles/${JSON.parse(localStorage.getItem('user')).userId}`).then((res) => {
      if (res.data.data.managerService === true) {
        this.managerService = true
      } else {
        this.managerService = false
      }
    }).catch((err) => {
      alert('获取信息失败，请稍后重试。。')
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
    },
    showDialog() {
      this.payShow = true;
    },
    // 提交服务费
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
  }
}
</script>
