<style lang="less">
.order {
    width: 100%;
    height: auto;
    background-color: #eee;
    margin-bottom: 10px;
    margin-top: 1px;
    .merchant {
      display: flex;
      justify-content: space-between;
      padding: 0 16px;
      height: 44px;
      line-height: 44px;
      background-color: #fff;
      .merchant-name {
        font-size: 14px;
      }
      .to-detail {
        font-size: 12px;
        span {
          display: inline-block;
        }
        img {
          transform: rotate(-90deg);
          width: 16px;
        }
      }
    }
    .cutoff {
      width: 100%;
      margin-bottom: 10px;
      background-color: #fff;
      img {
        width: 100%;
      }
    }
    .brand-op {
      height: 60px;
      padding-left: 16px;
      font-size: 12px;
      background-color: #fff;
      display: flex;
      margin-bottom: 1px;
      position: relative;
      .brand-logo {
        width: 40px;
        height: 40px;
        line-height: 90px;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .brand-name {
        margin-left: 10px;
        .name {
          line-height: 43px;
        }
        .money {
          line-height: 0px;
          color: #ff9736;
        }
      }
      .btn {
        width: 60px;
        height: 22px;
        font-size: 12px;
        border: 1px solid #999;
        color: #999;
        text-align: center;
        border-radius: 2px;
        line-height: 22px;
        position: absolute;
        right: 16px;
        top: 20px;
      }
    }
    .brand-amount {
      padding-right: 16px;
      height: 44px;
      background-color: #fff;
      margin-bottom: 1px;
      line-height: 44px;
      color: #ff9736;
      .amount-detail {
        float: right;
      }
    }
    .info-btn {
      padding: 0 16px;
      height: 44px;
      display: flex;
      justify-content: space-between;
      line-height: 44px;
      background-color: #fff;
      .order-time {
        font-size: 12px;
      }
      .btn {
        width: 60px;
        height: 22px;
        font-size: 12px;
        border: 1px solid #999;
        color: #999;
        text-align: center;
        border-radius: 2px;
        line-height: 22px;
        margin-top: 10px;
        margin-left: 8px;
      }
      .btn-wrapper {
        display: flex;
      }
    }
  .active {
    color: #ff9736 !important;
    border-color: #ff9736 !important;
  }
  .end-first {
    justify-content: flex-end;
  }
}
</style>

<template>
<div class="order">
  <div class="merchant">
    <div class="merchant-name">{{order.storeName}}</div>
    <div class="to-detail">
      <span v-tap="goto('./zc-order.html?groupNo='+ (order.groupNo||0))">订单详情</span>
      <img src="../module/coupon/select.png">
    </div>
  </div>
  <div class="cutoff"><img src="../assets/img/cutoff.png"></div>
  <div class="brand-op" v-for="brand in order.orders">
    <div class="brand-logo"><img :src="img + brand.brandLogo"></div>
    <div class="brand-name">
      <div class="name">{{brand.brandName}}</div>
      <div class="money">￥{{brand.totalAmount}}</div>
    </div>
    <div class="btn" v-tap="refund(brand.orderNo)" v-if="brand.status > 3">退款</div>
  </div>
  <div class="brand-amount">
    <div class="amount-detail">合计消费：￥{{order.sumTotalAmount}}元</div>
  </div>
  <div class="info-btn" :class="{'end-first': order.status == 3}">
    <div class="order-time" v-if="order.status > 3&&order.appt.payMethod == 1">支付方式：全款支付</div>
    <div class="order-time" v-if="order.status > 3&&order.appt.payMethod == 2">支付方式：分期支付</div>
    <div class="order-time" v-if="order.status > 3&&order.appt.payMethod == 3">支付方式：微信支付</div>
    <div class="btn-wrapper" v-if="order.status == 3">
      <div class="btn" v-tap="cancel(order.groupNo)">取消订单</div>
      <div class="btn active" v-if="order.status == 2" v-tap="goto(`./pay.html?apptNo=${order.appt.apptNo}`)">支付</div>
    </div>
    <div class="btn-wrapper" v-if="order.status == 5">
      <div class="btn active" v-tap="receive(order.groupNo)">确认收货</div>
    </div>
  </div>
    <!-- 用户操作的按钮 -->
   <!--  <div class="operate" v-if="!(order.status==2&&order.waitPaymentConfirm)">
      <div class="bottom" v-if="order.status==2&&!order.waitPaymentConfirm" v-tap="goto('./pay.html?apptNo='+order.apptNo)">继续支付</div>
      <div class="bottom" v-if="order.status==4||order.status==6" v-tap="refund(order.orderNo)">退款</div>
      <div class="bottom" v-if="order.status==6" v-tap="deleteOrder(order.orderNo)">删除</div>
      <div class="bottom" v-if="(order.status==2||order.status==1||order.status==3)&&!order.waitPaymentConfirm" v-tap="cancel(order.apptNo)">取消订单</div>
      <div class="bottom" v-if="order.status==5" v-tap="receive(order.orderNo)">确认收货</div>
    </div> -->
</div>
</template>




<script>
import Lib from 'assets/Lib.js'
import statusImg from 'common/assets/images/status.png'
import clerkImg from 'common/assets/images/role/clerk.png'
import clockImg from 'common/assets/images/time.png'
import Status from 'common/status'
import axios from 'axios'
Lib.M.auth(axios)
export default {
  data() {
    return {
      img: Lib.C.imgUrl,
      statusImg,
      clerkImg,
      clockImg,
      Status,
      statusId: 1
    }
  },
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  computed: {
    order() {
      return this.data
    }
  },
  methods: {
    getTime(timeStamp) {
      var d = new Date(timeStamp * 1000)
      var Y = d.getFullYear() + '-'
      var M = (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) + '-'
      var D = (d.getDate() < 10 ? '0' + (d.getDate()) : d.getDate())
      return Y + M + D
    },
    goto(url) {
      location.href = url
    },
    getStoreAmount(orders) {
      let result = 0
      orders.forEach((order) => {
        result += order.totalAmount
      })
      return result
    },
    cancel(groupNo) {
      this.$parent.$parent.$parent.$parent.tempGroupNo = groupNo
      this.$parent.$parent.$parent.$parent.showConfirm.cancel = true
    },
    deleteOrder(orderNo) {
      this.$parent.$parent.$parent.$parent.tempOrderNo = orderNo
      this.$parent.$parent.$parent.$parent.showConfirm.delete = true
    },
    receive(orderNo) {
      this.$parent.$parent.$parent.$parent.tempOrderNo = orderNo
      this.$parent.$parent.$parent.$parent.showConfirm.receive = true
    },
    refund(orderNo) {
      this.$parent.$parent.$parent.$parent.tempOrderNo = orderNo
      this.$parent.$parent.$parent.$parent.showConfirm.refund = true
    }
  },
}
</script>
