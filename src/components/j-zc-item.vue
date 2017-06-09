<style lang="less">
.order {
    width: 100%;
    height: auto;
    background-color: #eee;
    margin-bottom: 15px;
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
      margin-bottom: 1px !important;
      background-color: #fff;
      img {
        width: 100%;
      }
    }
    .brand {
      height: 60px;
      padding-left: 16px;
      font-size: 12px;
      background-color: #fff;
      display: flex;
      margin-bottom: 1px;
      .brand-icon {
        width: 20px;
        line-height: 69px;
        img {
          width: 100%;
        }
      }
      .brand-name {
        margin-left: 10px;
        line-height: 60px;
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
      }
    }
}
</style>

<template>
<div class="order">
  <div class="merchant">
    <div class="merchant-name">预约门店</div>
    <div class="to-detail">
      <span v-tap="goto(`./zc-order.html?apptNo=${order.apptNo}`)">订单详情</span>
      <img src="../module/coupon/select.png">
    </div>
  </div>
  <div class="cutoff"><img src="../assets/img/cutoff.png"></div>
  <div class="brand" v-for="merchant in order.groups">
    <div class="brand-icon"><img src="../assets/img/subscribe.png"></div>
    <div class="brand-name">{{merchant.storeName}}</div>
  </div>
  <div class="info-btn">
    <div class="order-time">预约时间：{{getTime(order.createdAt)}}</div>
    <div class="btn" v-tap="cancelAppt(order.apptNo)">取消预约</div>
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
      statusImg,
      clerkImg,
      clockImg,
      Status,
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
  ready() {

  },
  methods: {
    getTime:Lib.M.getTime,
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
    cancelAppt(apptNo) {
      this.$parent.$parent.$parent.$parent.tempApptNo = apptNo
      this.$parent.$parent.$parent.$parent.showConfirm.cancelAppt = true
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
