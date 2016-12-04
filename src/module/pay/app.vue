<template>
<div class="content">
  <div class="orders">
    <div class="order" v-for="order in orders">
      <div class="store">{{order.name}}</div>
      <div class="amount">{{order.amount|currency "￥" 0}}</div>
    </div>
  </div>
  <group>
    <j-radio :options="payments" @on-change="selectPay"></j-radio>
  </group>
  <div class="tip">注：您选择信用卡支付后，将由专人与您联系，进行刷卡操作</div>
  <div class="submit-btn" v-bind:class="{'active':payMethod!=0}" v-tap="payMethod!=0?pay():return">确认</div>
</div>
<loading :show="showLoading" text="请稍后.."></loading>
</template>
<script>
import pingpp from 'pingpp-js'
import Lib from 'assets/Lib.js'
import Group from 'vux-components/group'
import JRadio from 'common/components/j-radio'
import Loading from 'vux-components/loading'
import wxImg from './wx.png'
import qkImg from './qk.png'
import fqImg from './fq.png'
import ylImg from './yl.png'
import axios from 'axios'
try {
  axios.defaults.headers.common['Authorization'] = JSON.parse(localStorage.getItem("user")).tokenType + ' ' + JSON.parse(localStorage.getItem("user")).token
} catch (e) {
  localStorage.clear()
  window.location.href = `./wxAuth.html?url=index.html`
}
export default {
  components: {
    JRadio,
    Group,
    Loading
  },
  ready() {
    this.showLoading = true
    axios.get(`${Lib.C.mOrderApi}materialAppts/${this.apptNo}`).then((res) => {
      res.data.data.orders.map((order) => {
        if (findStoreIdIndex(order.storeId, this.orders) == -1) {
          this.orders.push({
            storeId: order.storeId,
            name: order.storeName,
            amount: order.totalAmount
          })
        } else {
          this.orders[findStoreIdIndex(order.storeId, this.orders)].amount += Number(order.totalAmount)
        }
      })
      this.showLoading = false
    }).catch((err) => {
      this.showLoading = false
      alert("获取订单失败，请稍后再试")
      throw err //error
    })
  },
  methods: {
    pay() {
      this.showLoading = true
      axios.post(`${Lib.C.mOrderApi}materialAppts/${this.apptNo}/pay`, {
        payMethod: this.payMethod
      }).then((res) => {
        let paymentId = res.data.data.paymentId
        axios.get(`${Lib.C.userApi}wechatOpenIds/${JSON.parse(localStorage.user).userId}`).then((res) => {
          let openId = res.data.data.openId
          let payData = new FormData()
          payData.append('notifyUrl',Lib.C.notifyUrl)
          payData.append('openid',openId)
          axios.post(`${Lib.C.payApi}pay/${paymentId}`,payData).then((res) => {
            pingpp.createPayment(res.data.data, (result, err) => {
              if (result === 'success') {
                alert('支付成功')
                location.href = './zc-order-list.html?type=5'
              } else if (result === 'fail') {
                alert('支付失败')
                location.href = './zc-order-list.html?type=5'
              } else if (result === 'cancel') {
                  alert('支付失败')
                  location.href = './zc-order-list.html?type=5'
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
      }).catch((err) => {
        this.showLoading = false
        alert("网络连接中断，请稍候再试")
        throw err
      })
    },
    selectPay(e) {
      this.payMethod = Number(e)
    }
  },
  data() {
    return {
      showLoading: false,
      wxImg,
      qkImg,
      fqImg,
      ylImg,
      apptNo: Lib.M.GetRequest().apptNo,
      payments: [{
        key: '1',
        value: '全款购买',
        icon: qkImg,
        description: '24期内分期免息'
      }, {
        key: '2',
        value: '分期购买',
        icon: fqImg,
        description: '支付方式:现金或刷卡'
      }, {
        key: '3',
        value: '微信支付',
        icon: wxImg
      }, {
        key: '4',
        value: '银联支付',
        icon: ylImg
      }],
      payMethod: 0,
      orders: []
    }
  }
}

function findStoreIdIndex(id, array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].storeId == id) return i
  }
  return -1
}
</script>
<style lang="less">
body {
    margin: 0;
    background-color: #eee;
}
.content {
    padding-bottom: 44px;
}
.submit-btn {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 44px;
    line-height: 44px;
    text-align: center;
    color: #fff;
    background-color: rgb(226,226,226);
}
.active {
    background-color: rgb(136,201,40)!important;
}
.tip {
    color: #ec5835;
    font-size: 12px;
    font-size: 10px;
    padding-left: 15px;
    margin-top: 10px;
}
.orders {
    .order {
        background-color: #fff;
        font-size: 16px;
        color: #393939;
        position: relative;
        height: auto;
        width: 100%;
        margin-bottom: 10px;
        .store {
            width: calc(~"100% - 15px");
            height: 44px;
            line-height: 44px;
            margin-left: 15px;
            border-bottom: 1px solid #eee;
        }
        .amount {
            width: calc(~"100% - 15px");
            height: 44px;
            line-height: 44px;
            margin-left: 15px;
            color: #ec5835;
        }
    }
}
</style>
