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
        .address {
            height: 50px;
            width: 100%;
            border-bottom: 1px solid #eee;
            position: relative;
            line-height: 50px;
            font-size: 15px;
            .more {
              position: absolute;
              color: #ff9736;
              right: 15px;
              top: 0px;
              font-size: 12px;
            }
            .reason-btn {
                display: inline-block;
                height: 30px;
                width: 70px;
                line-height: 30px;
                text-align: center;
                color: #999;
                border: 1px solid #999;
                border-radius: 5px;
                font-size: 12px;
                margin-right: 14px;
            }
        }
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
                color: #ff9736;
            }
            .more {
                position: absolute;
                color: #ff9736;
                right: 15px;
                top: 19px;
                font-size: 12px;
                font-weight: 300;
            }
        }
        .people {
            position: relative;
            color: #393939;
            height: 30px;
            line-height: 30px;
            padding-left: 30px;
            width: calc(~"100% - 30px");
            border-bottom: 1px solid #eee;
            font-size: 12px;
            .type {
                position: absolute;
                height: 20px;
                width: 20px;
                left: 0;
                top: 5px;
            }
            .tel {
                position: absolute;
                height: 20px;
                width: 20px;
                right: 15px;
                top: 5px;
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
                margin-right: 20px;
            }
        }
        .refundWrapper {
            display: flex;
            justify-content: space-between;
            width: 100%;
            height: 40px;
            line-height: 40px;
            font-size: 15px;
            font-weight: 300;
            .transacitonAmount {
              span {
                color: #ea4e14;
              }
            }
            .refundApplyAmount {
              padding-right: 15px;
              span {
                color: #EA4E14;
              }
            }
        }
    }
}
</style>
<template>
<div class="order">
  <div class="status">
    <img :src="statusImg">
    <div class="status-name">{{Status.tk[order.status].name}}</div>
    <div class="order-date">{{getTime(order.createdAt)}}</div>
  </div>
  <div class="content">
    <div class="user-info">
      <div class="user-name">{{order.order.customerName||order.order.appt.customerName}}</div>
      <div class="user-tel" v-tap="goto('tel:'+order.order.customerMobile||order.order.appt.customerMobile)">{{order.order.customerMobile||order.order.appt.customerMobile}}</div>
      <div class="more" v-tap="goto(tkOrderDetail)">查看详情</div>
    </div>
    <div class="address">
      {{order.order.brandName}}{{order.order.storeName}}
      <div class="more" v-tap="goto(merchantUrl)">查看品牌</div>
    </div>
    <div class="refundWrapper">
      <div class="transacitonAmount">交易金额：<span>{{order.order.totalAmount |currency '￥' 2}}</span></div>
      <div class="refundApplyAmount">退款申请金额：<span>{{order.totalAmount |currency '￥' 2}}</span></div>
    </div>
    <div class="address" v-if="order.status === 5" style="text-align: right;">
      <div class="reason-btn" @click="findReason(order.id)">查看原因</div>
    </div>
  </div>
</div>
</template>
<script>
import Lib from 'assets/Lib.js'
import statusImg from 'common/assets/images/status-org.png'
import managerImg from 'common/assets/images/role/manager.png'
import foremanImg from 'common/assets/images/role/foreman.png'
import projectManagerImg from 'common/assets/images/role/project-manager.png'
import telImg from 'common/assets/images/tel.png'
import Status from 'common/status'
import axios from 'axios'
import Confirm from 'vux-components/confirm'
Lib.M.auth(axios)

export default {
  data() {
    return {
      statusImg,
      managerImg,
      foremanImg,
      projectManagerImg,
      telImg,
      Status,
      reasonShow: false,
      refusalReason: ''
    }
  },
  components: {
    Confirm
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
    },
    merchantUrl() {
      return `./brand-detail.html?id=${this.data.order.brandId}`
    },
    tkOrderDetail() {
      return `./tk-order.html?id=${this.data.id}`
    }
  },
  methods: {
    getTime:Lib.M.getTime,
    goto(url) {
      location.href = url
    },
    findReason(id) {
      axios.get(`${Lib.C.mOrderApi}materialRefundOrders/${id}`).then((res) => {
        this.$parent.$parent.$parent.$parent.refusalReason = res.data.data.refusalReason
      }).catch((res) => {
        alert("获取订单失败，请稍候再试QAQ")
      })
      this.$parent.$parent.$parent.$parent.reasonShow = true
    }
  }
}
</script>
