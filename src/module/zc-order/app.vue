<template>
<header>
  <img src="status.png">
  <div class="status">{{zcStatusList[order.status].name}}</div>
  <div class="btn" v-if="order.status==1||order.status==2" v-tap="cancelOrder()">取消预约</div>
</header>
<div class="butler">
  <div class="zc-butler-img"><img :src="order.manager.profileImage"></div>
  <div class="zc-butler-name">{{order.manager.nickname}}</div>
  <div class="zc-butler-tel" onclick="location.href='tel:{{order.manager.mobile}}'"><img src="tel.png"></div>
</div>
<div class="content">

  <div class="zc-list">
    <group v-for="shop in order.subOrders">
      <div class="line-1">
        <div class="shop-name">{{shop.store.name}}</div>
        <div class="btn" v-if="order.status==5" onclick="location.href='order-judge.html'">去评价</div>
      </div>
      <cell v-for="zc in shop.brands" class="zc-cell">
        <div class="zc-name">{{zc}}</div>
      </cell>
      <div class="line-2" v-if="order.status > 1">
        <div class="line-2-title">正价总额</div>
        <div class="line-2-right" style="color:rgb(255, 204, 102);">{{shop.normalAmount|currency "￥" 2}}</div>
      </div>
      <div class="line-2" v-if="order.status > 1">
        <div class="line-2-title">特价总额</div>
        <div class="line-2-right" style="color:#88C929;">{{shop.specialAmount|currency "￥" 2}}</div>
      </div>
      <div class="line-2" style="border-top:5px solid #eee!important;" v-if="status > 1 ">
        <div class="line-2-title">总额</div>
        <div class="line-2-right">{{shop.normalAmount+shop.specialAmount|currency "￥" 2}}</div>
      </div>
      <div class="line-3" v-if="order.status ==1||order.status == 2||order.status ==5">
        <div class="appoint-at" v-if="order.status == 1"><img src="./time.png">{{getTime(order.orderTime)}}</div>
      </div>
    </group>
    <group v-if="order.status == 2">
      <div class="line-2" style="border-bottom:1px solid #eee;height:30px;line-height:30px;">
        <div class="line-2-title" style="line-height:30px">请选择您的购买方式</div>
        <!-- <div class="line-2-right"><img class="down" src="./down.png"></div> -->
      </div>
      <j-radio :options="payments" @on-change="selectPay"></j-radio>
    </group>
    <group v-if="order.status == 2">
      <div class="sumbit-order" :class="{'active':payWay!==''}" v-tap="submitOrder">确认订单</div>
    </group>
    <group v-if="order.status > 2">
      <div class="line-2" v-if="order.stageCount !== ''">
        <div class="line-2-title">分期支付</div>
        <div class="line-2-right" style="color:#393939;">{{order.stageCount}}期</div>
      </div>
      <div class="line-2" v-else>
        <div class="line-2-title">全款支付</div>
      </div>
    </group>
  </div>
</div>
<popup-picker title="分期数" :data="insNumberList" :show.sync="showInsNumberPicker" :value.sync="insNumberSelect" @on-hide="onHideInsSelect" v-ref:insNumber :show-cell="false"></popup-picker>
</template>

<script>
import Lib from 'assets/Lib.js'
import Group from 'vux-components/group'
import Cell from 'vux-components/cell'
import JRadio from 'components/JRadio.vue'
import PopupPicker from 'vux-components/popup-picker'
import axios from 'axios'
try {
  axios.defaults.headers.common['x-user-token'] = JSON.parse(localStorage.getItem("user")).token
} catch (e) {
  localStorage.clear()
  window.location.href = `./wxAuth.html?url=index.html`
}
export default {
  data() {
    return {
      order: {},
      zcStatusList: [{
        status: 0,
        name: "订单已删除"
      }, {
        status: 1,
        name: "已预约"
      }, {
        status: 2,
        name: "待确认"
      }, {
        status: 3,
        name: "待付款"
      }, {
        status: 4,
        name: "待收货"
      }, {
        status: 5,
        name: "已收货"
      }, {
        status: 6,
        name: "退款中"
      }, {
        status: 7,
        name: "已退款"
      }, {
        status: 8,
        name: "已取消"
      }],
      payments: [{
        key: '0',
        value: '全款购买'
      }, {
        key: '1',
        value: '分期购买'
      }],
      payWay: "",
      showInsNumberPicker: false,
      insNumberList: [
        [3, 6, 9, 12, 24]
      ],
      insNumberSelect: [],
      insNumber: 3
    }
  },
  ready() {
    axios.get(`${Lib.C.mOrderApi}materialOrders/${Lib.M.GetRequest().orderNo}`).then((res) => {
      this.order = res.data.data
    }).catch((res) => {
      alert("获取订单失败，请稍候再试QAQ")
    })
  },
  components: {
    Group,
    Cell,
    JRadio,
    PopupPicker
  },
  methods: {
    selectPay(e) {
      this.payWay = Number(e)
    },
    submitOrder() {
      if (this.payWay == "") return false
      if (this.payWay == 1) {
        this.showInsNumberPicker = true
      } else {
        axios.post(`${Lib.C.mOrderApi}materialOrders/${Lib.M.GetRequest().orderNo}/customerConfirmMaterial?payMethod=1&stageCount=1`).then((res) => {
          alert("订单已更新！")
          location.reload()
        }).catch((res) => {
          alert("更新订单失败，请稍后重试")
        })
      }
    },
    cancelOrder(){
      axios.post(`${Lib.C.mOrderApi}materialOrders/${Lib.M.GetRequest().orderNo}/confirmCancel`).then((res) => {
        history.go(-1)
      }).catch((res) => {
        alert("取消订单失败，请稍后重试")
      })
    },
    onHideInsSelect(type) {
      if (type) {
        axios.post(`${Lib.C.mOrderApi}materialOrders/${Lib.M.GetRequest().orderNo}/customerConfirmMaterial?payMethod=2&stageCount=${this.insNumberSelect[0]}`).then((res) => {
          alert("订单已更新！")
          location.reload()
        }).catch((res) => {
          alert("更新订单失败，请稍后重试")
          location.reload()
        })
      }
    },
    getTime(timeStamp) {
      var d = new Date(timeStamp * 1000);
      var Y = d.getFullYear() + '-';
      var M = (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) + '-';
      var D = (d.getDate() < 10 ? '0' + (d.getDate()) : d.getDate());
      return Y + M + D
    },
  }
}
</script>

<style>
body {
  background-color: #eee;
}
</style>
<style scoped lang="less">
.cell-item {
    position: relative;
    height: 80px;
    .shop-logo {
        position: absolute;
        top: 10px;
        left: 15px;
        width: 120px;
        height: 80px;
    }
    .shop-name {
        position: absolute;
        top: 10px;
        left: 145px;
        font-size: 12px;
        color: #393939;
    }
    .shop-address {
        position: absolute;
        top: 44px;
        left: 145px;
        font-size: 12px;
        color: #999;
    }
    .shop-rank {
        position: absolute;
        bottom: 10px;
        left: 145px;
        font-size: 12px;
        color: #5965B2;
    }
    .shop-is-favorite {
        position: absolute;
        top: 40px;
        right: 15px;
        width: 20px;
        height: 20px;
    }
}
.content {
    padding-top: 80px;
}
header {
    position: fixed;
    top: 0;
    left: 0;
    height: 30px;
    width: 100%;
    background-color: #fff;
    z-index: 20;
    img {
        width: 13px;
        height: 20px;
        position: absolute;
        top: 5px;
        left: 15px;
    }
    .status {
        position: absolute;
        left: 38px;
        top: 9px;
        width: 60px;
        height: 12px;
        font-size: 12px;
        color: #393939;
    }
    .btn {
        position: absolute;
        right: 15px;
        top: 5px;
        width: 60px;
        height: 20px;
        border: 1px solid #393939;
        font-size: 12px;
        color: #393939;
        line-height: 20px;
        text-align: center;
    }
}
.butler {
    height: 50px;
    width: 100%;
    z-index: 20;
    border-bottom: 1px solid #eee;
    background-color: #fff;
    position: fixed;
    top: 30px;
    left: 0;
    .zc-butler-img {
        position: absolute;
        top: 5px;
        left: 15px;
        height: 40px;
        width: 40px;
        border-radius: 20px;
        img {
            height: 100%;
            width: 100%;
            border-radius: 50%;
        }
    }
    .zc-butler-name {
        position: absolute;
        bottom: 15px;
        left: 65px;
        font-size: 16px;
        color: #393939;
    }
    .zc-butler-tel {
        position: absolute;
        top: 15px;
        right: 15px;
        height: 20px;
        width: 20px;
        img {
            height: 100%;
            width: 100%;
        }
    }
}
.zc-list {
    width: 100%;
    .zc-shop-img {
        height: 120px;
        width: 100%;
        img {
            height: 100%;
            width: 100%;
        }
    }
    .line-1 {
        width: 100%;
        height: 50px;
        position: relative;
        .shop-name {
            position: absolute;
            left: 15px;
            top: 17px;
            font-size: 16px;
            color: #393939;
        }
        .btn {
            position: absolute;
            top: 15px;
            right: 15px;
            font-size: 12px;
            color: #fff;
            width: 50px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            background-color: #88C929;
            border-radius: 2px;
        }
    }
    .zc-cell {
        height: 10px;
        position: relative;
        .zc-name {
            position: absolute;
            top: 9px;
            left: 15px;
            font-size: 12px;
            color: #393939;
        }
        .zc-price {
            position: absolute;
            top: 9px;
            right: 15px;
            font-size: 12px;
            color: #EC5835;
            span {
                margin-left: 10px;
                color: #999;
            }
        }
    }
    .line-2 {
        height: 44px;
        width: 100%;
        position: relative;
        border-top: 1px solid #eee;
        .line-2-title {
            position: absolute;
            top: 0;
            height: 44px;
            line-height: 44px;
            left: 15px;
            font-size: 12px;
            color: #999;
        }
        .line-2-right {
            position: absolute;
            top: 0;
            height: 44px;
            line-height: 44px;
            right: 15px;
            font-size: 12px;
            color: #EC5835;
            .down {
                position: absolute;
                height: 10px;
                width: 17px;
                right: 0;
                top: 17px;
            }
        }
    }
    .line-3 {
        height: 30px;
        width: 100%;
        position: relative;
        border-top: 1px solid #eee;
        .cancel {
            position: absolute;
            right: 15px;
            top: 0;
            height: 30px;
            font-size: 12px;
            line-height: 30px;
            color: #999;
        }
        .appoint-at {
            position: absolute;
            left: 15px;
            top: 0;
            height: 30px;
            line-height: 30px;
            color: #999;
            font-size: 12px;
            img {
                vertical-align: middle;
                height: 12px;
                width: 12px;
                margin-right: 5px;
            }
        }
    }
}
.sumbit-order {
    height: 44px;
    width: 100%;
    line-height: 44px;
    background-color: #e2e2e2;
    text-align: center;
    font-size: 16px;
    color: #fff;
}
.active {
    background-color: #9EBC2B!important;
}
</style>
