<style>
html {
  padding: 0;
  margin: 0;
}
body {
  background-color: #eee;
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
    padding: 49px 0 0 0;
    height: 101px;
    margin: 0 0 1px 0;
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
      }
    }

    .label {
      height: 41px;
      background-color: #fff;
      padding: 0 16px;
      font-size: 12px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 1px;
      .amount-label {
        line-height: 25px;
      }
      .amount-time {
        color: #393939;
        line-height: 10px;
      }
      .amout-change {
        line-height: 41px;
        .orange {
          color: #ff9736;
          display: inline-block;
          margin-right: 3px;
        }
        img {
          transform: rotate(-90deg);
          width: 16px;
        }
      }
    }
  }
}
</style>

<template>
  <div class="content">
    <div class="amount-wrapper">
      <p class="amount-title">我的积分</p>
      <p class="amount">{{bonusPoints}}<span>分</span></p>
    </div>
    <div class="coupon-detail">
      <div class="cell">
        <div class="cell-title">积分变动明细</div>
      </div>
      <div class="label" v-for="coupon in bonusPointChanges">
        <div class="amount-label">
          <div class="amount-type">{{returnType(coupon.type, typeList)}}</div>
          <div class="amount-time">{{getTime(coupon.createdAt)}}</div>
        </div>
        <div class="amout-change">
          <span v-if="showType(coupon.type)" class="orange">+{{coupon.amount}}点</span>
          <span v-if="!showType(coupon.type)">{{coupon.amount}}点</span>
          <img src="./select.png">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from 'assets/Lib.js'
import axios from 'axios'
Lib.M.auth(axios)

export default {
  data() {
    return {
      bonusPoints: '',
      bonusPointChanges: [],
      typeList: [{
        id: 0, value: '未知'
      },{
        id: 1, value: '使用积分购买商品'
      },{
        id: 2, value: '主材订单返积分'
      },{
        id: 3, value: '退款扣积分'
      },{
        id: 4, value: '注册抽奖获得积分'
      },]
    }
  },
  components: {
  },
  ready() {
    axios.get(`${Lib.C.walletApi}wallets/${JSON.parse(localStorage.getItem('user')).userId}`).then((res) => {
      this.bonusPoints = res.data.data.bonusPoints
      this.bonusPointChanges = res.data.data.bonusPointChanges
      console.log(this.bonusPointChanges)
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {
    /**
     * 通过点券的type获取typeList中的点券类型
     */
    returnType(type, array) {
      for (let i = 0; i < array.length; i++ ) {
        if (array[i].id == type ) return array[i].value
      }
    },
    getTime:Lib.M.getTime,
    /**
     * v-if判断点券的amount
     */
    showType(type) {
      let result
      switch (type) {
        case 2:
        case 4:
          result = true
          break
        case 1:
        case 3:
        case 5:
          result = false
          break
        default:
          result = true
      }
      return result
    }
  }
}
</script>
