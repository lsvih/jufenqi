<template>
<div class="order">
  <div class="status">
    <img :src="statusImg">
    <div class="status-name">{{Status.zc[order.status].name}}</div>
    <div class="order-date">{{getTime(order.createdAt)}}</div>
  </div>
  <div class="content">
    <div class="user-info">
      <div class="user-name">{{order.customerName||order.appt.customerName}}</div>
      <div class="user-tel" v-tap="goto('tel:'+order.customerMobile||order.appt.customerMobile)">{{order.customerMobile||order.appt.customerMobile}}</div>
      <div class="more" v-tap="goto('./zc-order.html?orderNo='+order.orderNo+'&apptNo='+order.apptNo)">查看详情</div>
    </div>
    <div class="time" v-if="order.status == 1">
      <img :src="clockImg"> {{getTime(order.orderTime)}}
    </div>
    <!-- 店员 -->
    <div v-if="order.status == 4||order.status == 6 ">
      <div v-if="order.orders">
        <div class="clerk" v-for="subOrder in order.orders">
          <img :src="clerkImg"> {{subOrder.clerkName}}
        </div>
      </div>
      <div class="clerk" v-else>
        <img :src="clerkImg"> {{order.clerkName}}
      </div>
    </div>

    <!-- 门店 -->
    <div v-if="order.orders">
      <div v-for="subOrder in order.orders">
        <div class="store">
          <div class="store-name">
            {{subOrder.storeName}}
          </div>
          <div class="value" v-if="order.status != 1">
            {{subOrder.totalAmount|currency '￥' 2}}
          </div>
        </div>
        <div class="brand" v-if="order.status == 4||order.status == 6">
          {{subOrder.brandName}}
        </div>
      </div>
    </div>
    <div v-else>
      <div class="store">
        <div class="store-name">
          {{order.storeName}}
        </div>
        <div class="value" v-if="order.status != 1">
          {{order.totalAmount|currency '￥' 2}}
        </div>
      </div>
      <div class="brand" v-if="order.status == 4||order.status == 6">
        {{order.brandName}}
      </div>
    </div>

    <!-- 用户操作的按钮 -->
    <div class="operate">
      <div class="bottom" v-if="order.status==2" v-tap="goto('./pay.html?apptNo='+order.apptNo)">继续支付</div>
      <div class="bottom" v-if="order.status==4||order.status==6">退款</div>
      <div class="bottom" v-if="order.status==6" v-tap="delete(order.orderNo)">删除</div>
      <div class="bottom" v-if="order.status==2||order.status==1" v-tap="cancel(order.apptNo)">取消订单</div>
      <div class="bottom" v-if="order.status==5" v-tap="receive(order.orderNo)">确认收货</div>
    </div>
  </div>
</div>
</template>




<script>
import Lib from 'assets/Lib.js'
import statusImg from 'common/assets/images/status.png'
import clerkImg from 'common/assets/images/role/clerk.png'
import clockImg from 'common/assets/images/time.png'
import Status from 'common/status'
import axios from 'axios'
try {
  axios.defaults.headers.common['Authorization'] = JSON.parse(localStorage.getItem("user")).tokenType + ' ' + JSON.parse(localStorage.getItem("user")).token
} catch (e) {
  localStorage.clear()
  window.location.href = `./wxAuth.html?url=index.html`
}
export default {
  data() {
    return {
      statusImg,
      clerkImg,
      clockImg,
      Status
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
      var d = new Date(timeStamp * 1000);
      var Y = d.getFullYear() + '-';
      var M = (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) + '-';
      var D = (d.getDate() < 10 ? '0' + (d.getDate()) : d.getDate());
      return Y + M + D
    },
    goto(url) {
      location.href = url
    },
    receive(orderNo) {
      axios.post(`${Lib.C.mOrderApi}materialOrders/${orderNo}/receive`).then((res) => {
        alert('确认收货成功！')
        location.reload()
      }).catch((res) => {
        alert('确认收货失败，请重试')
      })
    },
    cancel(apptNo) {
      axios.post(`${Lib.C.mOrderApi}materialAppts/${apptNo}/cancel`).then((res) => {
        alert('取消订单成功！')
        location.reload()
      }).catch((res) => {
        alert('取消订单失败，请重试')
      })
    },
    delete(orderNo) {
      axios.post(`${Lib.C.mOrderApi}materialOrders/${orderNo}/delete`).then((res) => {
        alert('删除订单成功！')
        location.reload()
      }).catch((res) => {
        alert('删除订单失败，请重试')
      })
    }
  },
  ready() {}
}
</script>
<style scoped lang="less">
.order {
    width: 100%;
    height: auto;
    background-color: #fff;
    margin-bottom: 10px;
    .status {
        position: relative;
        height: 30px;
        width: 100%;
        border-bottom: 1px solid #eee;
        img {
            position: absolute;
            top: 5px;
            left: 15px;
            height: 20px;
            width: 13px;
        }
        .status-name {
            position: absolute;
            height: 100%;
            line-height: 30px;
            font-size: 12px;
            color: #393939;
            top: 0;
            left: 38px;
        }
        .order-date {
            position: absolute;
            height: 100%;
            line-height: 30px;
            font-size: 12px;
            color: #393939;
            top: 0;
            right: 15px;
        }
    }
    .content {
        width: calc(~"100% - 15px");
        padding-left: 15px;
        height: auto;
        .user-info {
            height: 50px;
            width: 100%;
            border-bottom: 1px solid #eee;
            position: relative;
            .user-name {
                position: absolute;
                font-size: 16px;
                top: 6px;
                left: 0;
            }
            .user-tel {
                position: absolute;
                bottom: 6px;
                left: 0;
                font-size: 12px;
                color: #393939;
            }
            .more {
                position: absolute;
                color: #3ba794;
                right: 15px;
                top: 19px;
                font-size: 12px;
            }
        }
        .clerk {
            position: relative;
            color: #393939;
            height: 30px;
            line-height: 30px;
            padding-left: 20px;
            width: 100%;
            border-bottom: 1px solid #eee;
            font-size: 12px;
            img {
                position: absolute;
                height: 20px;
                width: 20px;
                left: 0;
                top: 5px;
            }
        }
        .time {
            position: relative;
            color: #393939;
            height: 30px;
            line-height: 30px;
            padding-left: 16px;
            width: 100%;
            border-bottom: 1px solid #eee;
            font-size: 12px;
            img {
                position: absolute;
                height: 10px;
                width: 10px;
                left: 0;
                top: 10px;
            }
        }
        .store {
            position: relative;
            height: 55px;
            width: 100%;
            border-bottom: 1px solid #eee;
            .store-name {
                line-height: 55px;
                text-align: left;
                font-size: 12px;
                color: #393939;
            }
            .value {
                position: absolute;
                height: 100%;
                line-height: 55px;
                right: 15px;
                top: 0;
                color: #EC5835;
            }
        }
        .brand {
            position: relative;
            height: 30px;
            width: 100%;
            line-height: 30px;
            text-align: left;
            font-size: 12px;
            border-bottom: 1px solid #eee;
        }
        .operate {
            height: 30px;
            width: calc(~"100% - 30px");
            padding: 7px 15px;
            text-align: right;
            .bottom {
                display: inline-block;
                height: 30px;
                width: 70px;
                line-height: 30px;
                text-align: center;
                color: #999;
                border: 1px solid #999;
                border-radius: 5px;
                font-size: 12px;
                margin-left: 20px;
            }
        }
    }
}
</style>
