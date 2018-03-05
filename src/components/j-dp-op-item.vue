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
      padding: 0 16px;
      height: 44px;
      background-color: #fff;
      margin-bottom: 1px;
      line-height: 44px;
      color: #ff9736;
      display: flex;
      justify-content: space-between;
      .amount-detail {
        
      }
      .address {
        font-size: 12px;
        color: #999;
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
    <div class="merchant-name">{{order.item.itemName}}</div>
    <div class="to-detail">
      <!-- <span v-tap="goto('./zc-order.html?groupNo='+ (order.groupNo||0))">订单详情</span> -->
      <!-- <img src="../module/coupon/select.png"> -->

    </div>
  </div>
  <div class="cutoff"><img src="../assets/img/cutoff.png"></div>
  <div class="brand-op">
    <div class="brand-logo"><img :src="cover"></div>
    <div class="brand-name">
      <div class="name">{{order.name}}</div>
      <div class="money">{{order.mobile}}</div>
    </div>
    <!-- <div class="btn" v-tap="refund(brand.orderNo)" v-if="brand.status > 3">退款</div> -->
    <div class="btn active" v-tap="receive(order.orderNo)" v-if="order.status == 3">确认收货</div>
  </div>
  <div class="brand-amount">
    <div class="amount-detail">购买{{parseInt(order.count, 10)}}个</div>
    <div class="amount-detail">合计消费：￥{{order.amount}}元</div>
  </div>
  <div class="brand-amount">
    <div class="address">收货地址：{{address}}</div>
  </div>
  <!-- <div class="info-btn" :class="{'end-first': order.status == 3}">
    <div class="order-time" v-if="order.status > 3&&order.appt.payMethod == 1">支付方式：全款支付</div>
    <div class="order-time" v-if="order.status > 3&&order.appt.payMethod == 2">支付方式：分期支付</div>
    <div class="order-time" v-if="order.status > 3&&order.appt.payMethod == 3">支付方式：微信支付</div>
    <div class="btn-wrapper" v-if="order.status == 3">
      <div class="btn" v-tap="cancel(order.groupNo)">取消订单</div>
      <div class="btn active" v-if="order.status == 2" v-tap="goto(`./pay.html?apptNo=${order.appt.apptNo}`)">支付</div>
    </div>
    <div class="btn-wrapper" v-if="order.status == 3">
      <div class="btn active" v-tap="receive(order.groupNo)">确认收货</div>
    </div>
    <div class="btn-wrapper" v-if="order.status == 2" style="position: absolute; right: 16px">
      <div class="btn" v-tap="cancel(order.groupNo)">退款</div>
      <div class="btn active" v-tap="gotoPay(order.appt.apptNo)">继续支付</div>
    </div>
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
      statusId: 1,
      address: '',
      name: '',
      phone: '',
      cover: ''
    }
  },
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  ready() {
    this.getName(this.order.userId)
    this.address = `${this.order.userAddress.province} ${this.order.userAddress.city} ${this.order.userAddress.district} ${this.order.userAddress.address}`
    console.log('我的地址', this.order)
  },
  computed: {
    order() {
      return this.data
    }
  },
  methods: {
    goto(url) {
      location.href = url
    },
    getAddress(id) {
      axios.get(`${Lib.C.mOrderApi}user-addresses/${id}`).then((res) => {
        let r = res.data.data
        this.address = `${r.province} ${r.city} ${r.district} ${r.address}`
      }).catch((err) => {
        console.log('获取地址失败，请稍后再试。。')
        throw err
      })
    },
    getName(id) {
      axios.get(`${Lib.C.userApi}customerProfiles/${id}`).then((res) => {
        this.name = res.data.data.nickname
        this.phone = res.data.data.mobile
        this.cover = res.data.data.profileImage
      }).catch((err) => {
        console.log('获取个人信息失败，请稍后再试。。')
        throw err
      })
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
    },
    gotoPay(apptNo) {
      location.href = `./pay.html?apptNo=${apptNo}`
    }
  },
}
</script>
