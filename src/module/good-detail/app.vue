<style scoped lang="less">
p {
  margin: 0
}
  .good-detail{
    background: #eee;
  }
  .good-cover{

    background-size: cover;
    background-position: bottom;
    img {
      width: 100%;
      display: block;
    }
  }
  .price{
    height: 45px;
    line-height: 45px;
    padding: 0 15px;
    background: #ff9736;
    position: relative;
    strong{
      font-size: 28px;
      color: #fff;
      display: inline-block;
      margin-right: 10px;
      span{
        font-size: 16px;
      }
    }
    &>span{
      font-size: 14px;
      color: #f1f947;
      display: inline-block;
      height: 45px;
      line-height: 45px;
      position: absolute;
      top: 0;
      text-decoration: line-through;
    }
    p{
      position: absolute;
      height: 45px;
      line-height: 45px;
      top: 0;
      right: 15px;
      color: #fff;
      font-size: 14px;
    }
  }
  .good-title{
    padding: 8px 15px;
    background: #fff;
    p{
      font-size: 16px;
      color: #333;
    }
    span{
      display: block;
      font-size: 14px;
      color: #999;
    }
    strong{
      display: block;
      font-size: 12px;
      color: #f5212a;
      font-weight: normal;
      margin-top: 10px;
    }
    
  }
  .good-table-bac{
    margin-top: 10px;
    background: #fff;
    &>p{
      padding: 10px 0 7px;
      text-align: center;
      color: #666;
    }
    img {
      display: block;
      width: 100%;
      margin-bottom: 44px;
    }
  }
  .pay-btn{
    height: 44px;
    width: 100%;
    line-height: 44px;
    font-size: 16px;
    color: #fff;
    background: #ff9736;
    text-align: center;
    position: fixed;
    bottom: 0;
    left: 0;
  }
</style>

<template>
  <div class="good-detail">
    <div class="good-cover" >
      <img :src="bannerImgs">
    </div>
    <div class="price">
      <strong>
        <span>
          ¥
        </span>
        {{price}}
      </strong>
      <span>
        {{originalPrice}} 元
      </span>
      <p>
        已抢{{turnoverCount}}件
      </p>
    </div>
    <div class="good-title">
      <p>
        {{itemName}}
      </p>
      <span>
        {{itemText}}
      </span>
      <!-- <strong>
        该商品最高享受24期分期
      </strong> -->
      
    </div>
    <div class="good-table-bac">
      <!-- <p>
        产品参数
      </p> -->
      <img :src="detailImgs">
    </div>
    <div class="pay-btn" v-tap="gotoPay()">
      去支付
    </div>
  </div>
</template>

<script>
  import Lib from 'assets/Lib.js'
  import PopupPicker from 'vux-components/popup-picker'
  import Loading from 'vux-components/loading'
  import axios from 'axios'

  Lib.M.auth(axios)
  export default {
    data () {
      return {
        itemId: Lib.M.GetRequest().itemId,
        imgUrl: Lib.C.imgUrl,
        price: 0,
        originalPrice: 0,
        turnoverCount: 0,
        detailImgs: '',
        bannerImgs: '',
        available: null,
        itemName: '',
        itemText: ''
      }
    },
    methods: {
      gotoPay(id) {
        location.href = `./good-pay.html?itemId=${this.itemId}`
      }
    },
    ready() {
      axios.get(`${Lib.C.mOrderApi}items/${this.itemId}`).then((res) => {
        console.log(res.data.data)
        let result = res.data.data
        this.price = result.price
        this.originalPrice = result.originalPrice
        this.turnoverCount = result.turnoverCount || 0
        this.detailImgs = this.imgUrl + result.detailImgs
        this.bannerImgs = this.imgUrl + result.bannerImgs
        this.available = result.available
        this.itemName = result.itemName
        this.itemText = '不错的产品'
      }).catch((err) => {
        alert('获取信息失败，请稍后再试。。')
        throw err
      })
    }
  }
</script>