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
        <div class="cell-title">
          <div class="cell-heihei"></div>
          购买记录
        </div>
      </div>
      <div class="p-card" v-for="cate in categoryBrands">
        <div class="cate-wrapper">
          <div class="cate-label">
            <div class="img-wrapper"><img :src="cate.cateImg"></div>
            <div class="name">{{cate.cate}}</div>
          </div>
          <div class="end"></div>
        </div>
        <div class="brand-wrapper">
          <div class="brand-label">
            <div class="img-wrapper"><img :src="cate.brandImg"></div>
            <div class="name">{{cate.brand}}</div>
          </div>
          <div class="end">{{getTime(cate.createdAt)}}</div>
        </div>
        <div class="tip">
          <span>支付方式：<span :style="setColor(cate.payMethod)">{{cate.payMethod == 3? '微信支付': '线下刷卡'}}</span></span>
          <div class="rufund-btn" v-tap="showConfirm(cate.payMethod, cate.preId)">{{cate.refunded?'已申请退款':'申请退款'}}</div>
        </div>
      </div>
    </div>
  </div>
  <confirm :show.sync="confirmShow" title=""  confirm-text="是" cancel-text="否" @on-confirm="refund(refundId)" @on-cancel="confirmShow = false">
  <p style="text-align:center;" >确定退款？退款将按照原路返回</p>
  </confirm>

  <dialog :show.sync="dialogShow" >
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
</dialog>
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
      confirmShow: false,
      refundMethod: null,
      refundId: null,
      refundBody: {},
      dialogShow: false,
      imgUrl: 'http://ohej1hvbm.bkt.clouddn.com/'
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
            preId: brand.id,
            cateId: brand.categoryId,
            brandId: brand.brandId,
            payMethod: e.payMethod,
            used: brand.used,
            refunded: brand.refunded,
            createdAt: brand.createdAt,
            show: false,
            cate: null,
            cateImg: null,
            brand: null,
            brandImg: null,
            confirmShow: false
          })
        })
        this.categoryBrands.forEach((e) => {
          axios.get(`${Lib.C.merApi}brands/${e.brandId}`).then((res) => {
            e.brand = res.data.data.name
            e.brandImg = this.imgUrl + res.data.data.logoImg
          }).catch((err) => {throw err})
        
          axios.get(`${Lib.C.merApi}categories/${e.cateId}`).then((res) => {
            e.cate = res.data.data.name
            e.cateImg = this.imgUrl + res.data.data.showImg
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
    refund(preId) {
      this.showLoading = true
      axios.post(`${Lib.C.mOrderApi}predeposit-brands/${preId}/refund`, this.refundBody).then((res) => {
        alert('您的退款已经发起成功！')
        this.showLoading = false
        location.reload()
      }).catch((err) => {
        alert('网络连接失败，请稍后再试')
        this.showLoading = false
      })
    },
    showConfirm(payM, preId) {
      if (payM == 3) {
        this.confirmShow = true
      } else {
        this.dialogShow = true
      }       
      this.refundId = preId
    },
    isBankcard() {
      let reg = /^(\d{16}|\d{19})$/
      return reg.test(this.refundBody.bankcardNo)
    },
    isFilled() {
      return this.refundBody.accountName && this.isBankcard() && this.refundBody.depositBank
    },
    hideShow() {
      this.dialogShow = false
      this.confirmShow = true
    },
    setColor(payM) {
      let ret = {}
      if (payM == 3) {
        ret.color = '#46b42d'
      } else {
        ret.color = '#ff9736'
      }
      return ret
    }
  }
}

</script>

