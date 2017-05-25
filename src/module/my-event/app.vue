·<style>
html {
  padding: 0;
  margin: 0;
}
body {
  background-color: #ebebeb;
  padding: 0;
  margin: 0;
}
</style>
<style lang="less">
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
      background-color: #fff;
      font-size: 12px;
      color: #393939;
      padding-left: 16px;
      margin-bottom: 1px;
      .cell-title {
        line-height: 41px;
        font-size: 14px;
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
        padding-left: 16px;
        left: 0;
        width: 100%;
        display: flex;
        height: 44px;
        background-color: #ebebeb;
        line-height: 44px;
        justify-content: space-between;
        border-top: 1px solid #ebebeb;
        visibility: hidden;
        .refund-btn {
          height: 100%;
          background-color: #ff9736;
          width: 17%;
          line-height: 44px;
          text-align: center;
          color: #fff;
        }

      }
      .amount-label {
        line-height: 32px;
      }
      .amount-time {
        color: #393939;
        line-height: 10px;
      }
      .amout-change {
        line-height: 50px;
        .orange {
          color: #ff9736;
          display: inline-block;
          margin-right: 3px;
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
</style>

<template>
  <div class="content">
    <div class="amount-wrapper">
      <p class="amount-title">一日特价团</p>
      <p class="amount">{{totalAmount}}<span>元</span></p>
      <div class="hint">注意：本次活动不包括装修公司及家电品牌</div>
      
      <span class="tel" v-tap="goto('tel:40000390808')">客服电话</span>
    </div>
    <div class="coupon-detail">
      <div class="cell">
        <div class="cell-title">购买详情</div>
      </div>
      <div class="label" v-for="cate in categoryBrands" :style="marginBot(cate.show)">
        <div class="amount-label" v-tap="cate.show = !cate.show">
          <div class="amount-type"><span style="color: #ff9736">品类：</span>{{cate.cate}}</div>
          <div class="amount-time"><span style="color: #ff9736">品牌：</span>{{cate.brand}}</div>
        </div>
        <div class="amout-change" v-tap="cate.show = !cate.show">
          <span>支付方式：<span style="color: #ff9736">{{cate.payMethod == 3?'微信支付':'线下刷卡'}}</span></span>
          <!-- <span v-if="!showType(cate.type)">{{cate.amount}}元</span> -->
          <img src="./select.png" :class="{'origin': cate.show}">
        </div>
        <div class="more" :style="setHeight(cate.show)">
          <span>{{getTime(cate.createdAt)}}</span>
          <div class="refund-btn" v-tap="refund(cate.payMethod, cate.cateId, cate.brandId)">退款</div>
        </div>
      </div>
      <div class="label" style="background-color: #ebebeb"></div>
    </div>
  </div>
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
      typeList: [{
        id: 1, value: '贴息'
      },{
        id: 2, value: '返现'
      },{
        id: 3, value: '银行卡提现'
      },{
        id: 4, value: '微信提现'
      },{
        id: 5, value: '退款'
      },{
        id: 6, value: '退款扣返现'
      },{
        id: 7, value: '提现返还'
      }]
    }
  },
  components: {
    Dialog,
    Group,
    XInput,
    Confirm
  },
  ready() {
    axios.get(`${Lib.C.mOrderApi}predeposits?filter=userId:${this.user}`).then((res) => {
      res.data.data.map((e) => {
        this.totalAmount += e.amount
        e.brands.map((brand) => {
          this.categoryBrands.push({
            preId: e.id,
            cateId: brand.categoryId,
            brandId: brand.brandId,
            payMethod: e.payMethod,
            used: brand.used,
            createdAt: brand.createdAt,
            show: false,
            cate: null,
            brand: null
          })
        })
        this.categoryBrands.forEach((e) => {
          axios.get(`${Lib.C.merApi}brands/${e.brandId}`).then((res) => {
            e.brand = res.data.data.name
          }).catch((err) => {throw err})
        
          axios.get(`${Lib.C.merApi}categories/${e.cateId}`).then((res) => {
            e.cate = res.data.data.name
          }).catch((err) => {throw err})
        })
      })
    }).catch((res) => {
      throw arr
    })
  },
  methods: {
    goto(url) {
      location.href = url
    },
    replace(url) {
      location.replace(url)
    },
    /**
     * 通过点券的type获取typeList中的点券类型
     */
    returnType(type, array) {
      for (let i = 0; i < array.length; i++ ) {
        if (array[i].id == type ) return array[i].value
      }
    },
    /**
     * 将时间戳格式化
     */
    getTime(timeStamp) {
      var d = new Date(timeStamp * 1000)
      var Y = d.getFullYear() + '-'
      var M = (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) + '-'
      var D = (d.getDate() < 10 ? '0' + (d.getDate()) : d.getDate())
      return Y + M + D
    },
    marginBot(e) {
      let ret = {}
      if (e) {
        ret.marginBottom = '44px'
      }
      return ret
    },
    setHeight(e) {
      let ret = {}
      if (e) {
        ret.borderTop = 'none'
        ret.visibility = 'visible'

      } else{
        ret.transitionDelay = '0.3s';
      }
      return ret
    },
    refund(payM, cateId, brandId) {
      console.log(`支付方式：${payM == 3?'3+微信支付':'1+线下刷卡'} & 品类: ${cateId} & 品牌：${brandId}`)
    }
    
  }
}

</script>

