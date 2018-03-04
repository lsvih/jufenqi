<style scoped lang="less">
p {
  margin: 0;
}
  .good-info{
    background: #f3f3f3;
    min-height: 100vh;
  }
  .title{
    height: 44px;
    padding: 0 15px;
    line-height: 44px;
    background: #ff9736;
    color: #fff;
    font-weight: 300;
  }
  .info-bac{
    background: #fff;
    padding: 25px 15px;
    display: flex;
    justify-content: space-between;
    &>img{
      width: 175px;
      height: 94px;
      display: block;
      margin-right: 10px;
    }
    &>div{
      display: inline-block;
      height: 95px;
      width: calc(~"100% - 130px");
      position: relative;
      &>p{
        font-size: 14px;
        color: #333;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        span{
          color: #999;
          display: block;
          text-align: left;
          font-size: 12px;
          font-weight: 300;
        }
      }
      &>span{
        position: absolute;
        bottom: 0;
        left: 0;
        color: #fc0200;
        font-size: 16px;
      }
      &>div{
        position: absolute;
        right: 0;
        bottom: 0;
        width: 60px;
        display: flex;
        height: 22px;
        border: 1px solid #ddd;
        p{
          width: 20px;
          height: 20px;
          cursor: pointer;
          border-left: 1px solid #ddd;
          line-height: 19px;
          text-align: center;
          background: #fff;
          &:nth-child(1){
            border: 0;
          }
          &:nth-child(2){
            cursor: none;
            line-height: 20px;
            background: #fff;
          }
        }
      }
    }
  }
  .user-info{
    margin-top: 10px;
    background: #fff;
    padding-left: 15px;
    &>div{
      height: 44px;
      border-top: 1px solid #e8e8e8;
      display: flex;
      position: relative;
      &:nth-child(1){
        border: 0;
      }
      p{
        height: 44px;
        line-height: 44px;
        width: 75px;
        color: #999;
        font-size: 14px;
      }
      nobr {
        display: block;
        height: 44px;
        line-height: 44px;
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 12px;
        color: #999;
        text-indent: 2px;
      }
      input {
        height: 38px;
        line-height: 44px;
        width: calc(~"100% - 75px");
        color: #999;
        font-size: 12px;
        outline: none;
        &::placeholder {
          font-size: 12px;
          color: #999;
        }
      }
      span{
        display: block;
        height: 44px;
        line-height: 44px;
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 16px;
        color: #666;
      }
      strong{
        position: absolute;
        font-size: 12px;
        font-weight: normal;
        color: #999;
        right: 15px;
        height: 44px;
        line-height: 44px;
        top: 0;
      }
    }
  }
  .pay-btn {
    width: 100%;
    height: 44px;
    text-align: center;
    line-height: 44px;
    background-color: #ddd;
    color: #ccc;
    position: fixed;
    left: 0;
    bottom: 0;
  }
  .payed {
    background-color: #ff9736;
    color: #fff;
  }
  .vux-popup-picker-header {
    color: #ff9736 !important;
  }
</style>

<template>
  <div class="good-info">
    <div class="title">

    </div>
    <div class="info-bac">
      <img :src="bannerImgs" alt="">
      <div>
        <p>
          {{itemName}}
        </p>
        <p>
          
          <span>
            {{itemText}}
          </span>
        </p>
        <p>
          
        </p>
        <span>
          ¥{{price}}
        </span>
        <span style="bottom: 28px;" v-if="pointNeed == 'true'">
            所需积分{{bonusPointCost}}
        </span>
        <div>
          <p v-tap="getShopCountNum(false)" style="color: #999;">
            -
          </p>
          <p>
            {{shopCountNum}}
          </p>
          <p v-tap="getShopCountNum(true)" style="color: #999;">
            +
          </p>
        </div>
      </div>
    </div>
    <div class="user-info">
      <div>
        <p>
          姓名
        </p>
       <!--  <span>
          硕狗
        </span> -->
        <input type="text" v-model="userName" placeholder="请输入您的姓名">
      </div>
      <div>
        <p>
          联系电话
        </p>
        <input type="number" v-model="userMobile" placeholder="请输入您的手机号">
      </div>
      <div>
        <p>
          收货地址
        </p>
        <nobr v-tap="addresses.length > 1?_show():return">
          {{addressDefault}}
        </nobr>
        <strong v-tap="goto()">
          编辑
        </strong>
      </div>
    </div>
  </div>
  <div class="pay-btn" :class="{'payed': isFinished()}" v-tap="isFinished()?pay():false">
    立即支付
  </div>
  <popup-picker title="地区" :data="addresses" :columns="1" :show-cell="false" :show.sync="showSelect" :value.sync="areaSelect"show-name @on-hide="onSelectedAddress" v-ref:addresses></popup-picker>
  <loading :show="showLoading" text="请稍后.."></loading>
</template>

<script>
  import Lib from 'assets/Lib.js'
  import PopupPicker from 'vux-components/popup-picker'
  import Loading from 'vux-components/loading'
  import axios from 'axios'
  import pingpp from 'pingpp-js'
  Lib.M.auth(axios)
  export default {
    data () {
      return {
        shopCountNum: 1,
        itemId: Lib.M.GetRequest().itemId,
        imgUrl: Lib.C.imgUrl,
        ItemNotifyUrl: 'http://materialorder/api/item-orders/noticePaymentResult',
        price: 0,
        originalPrice: 0,
        turnoverCount: 0,
        detailImgs: '',
        bannerImgs: '',
        available: null,
        itemName: '',
        itemText: '',
        userName: '',
        userMobile: '',
        addresses: [],
        showSelect: false,
        areaSelect: [],
        addressDefault: '',
        addressId: null,
        showLoading: false,
        bonusPointCost: '',
        bonusPoints: '',
      }
    },
    components: {
      PopupPicker,
      Loading
    },
    methods: {
      goto(url) {
        let last = location.href
        last = last.replace('=','~')
        location.href = `./address.html?last=${last}`
      },
      getShopCountNum: function(isAdd){
        if(isAdd){
          this.shopCountNum++
        }
        else{
          if(this.shopCountNum > 0){
            this.shopCountNum--
          }
          else{

          }
        }
      },
      getItemInfo(id) {
        axios.get(`${Lib.C.mOrderApi}items/${id}`).then((res) => {
          console.log(res.data.data)
          let result = res.data.data
          this.price = result.price
          this.originalPrice = result.originalPrice
          this.turnoverCount = result.turnoverCount || 0
          this.detailImgs = this.imgUrl + result.detailImgs
          this.bannerImgs = this.imgUrl + result.bannerImgs
          this.available = result.available
          this.itemName = result.itemName
          this.itemText = result.itemText
          this.bonusPointCost = result.bonusPointsCost
        }).catch((err) => {
          alert('获取信息失败，请稍后再试。。')
          throw err
        })
      },
      getAddress() {
        axios.get(`${Lib.C.mOrderApi}user-addresses?filter=userId:${JSON.parse(localStorage.getItem('user')).userId}`).then((res) => {
          let result = res.data.data
          result.map((e) => {
            if (e.deleted == false) {
              this.addresses.push({
                value: String(e.id),
                name: `${e.city} ${e.district} ${e.address}` 
              })
            }
            if (e.userDefault == true) {
              this.addressDefault = `${e.city} ${e.district} ${e.address}`
              this.addressId = e.id
            }
          })
          console.log(this.addresses)
          if (this.addresses.length == 0) {
            this.addressDefault = `您现在还没有收货地址`
            this.addressId = null
          }
          if (this.addresses.length == 1) {
            let e = this.addresses[0]
            this.addressDefault = e.name
            this.addressId = Number(e.value)
          }
          console.log(this.addressDefault)
        }).catch((err) => {
          throw err
        })
      },
      isTruePhone() {
        let reg = /^1[3|4|5|7|8]\d{9}$/
        return reg.test(Number(this.userMobile))
      },
      isFinished() {
        return this.userName&&this.addressId&&this.isTruePhone()
      },
      _show() {
        document.activeElement.blur();
        this.showSelect = true;
      },
      onSelectedAddress() {
        let choose = this.areaSelect[0]
        this.addresses.map((e, index, arr) => {
          if (choose == e.value) {
            this.addressDefault = e.name
            this.addressId = Number(e.value)
          }
        })
        this.areaSelect = []
      },
      pay() {
        let that = this
        this.showLoading = true
        let payBody = {}
        payBody.amount = this.price
        payBody.count = this.shopCountNum
        payBody.userAddress = {id: this.addressId}
        payBody.item = {id: this.itemId}
        payBody.userId = JSON.parse(localStorage.getItem('user')).userId
        payBody.payMethod = 3
        payBody.name = this.userName
        payBody.mobile = this.userMobile
        if (this.bonusPoints > this.bonusPointCost || this.bonusPointCost == 0) {
          axios.post(`${Lib.C.mOrderApi}item-orders/submit`, payBody).then((res) => {
            let orderNo = res.data.data.orderNo
            axios.post(`${Lib.C.mOrderApi}item-orders/${orderNo}/pay`,{
              payMethod: 3
            }).then((res) => {
              if (payBody.amount > 0) {
                let paymentId = res.data.data.paymentId
                let payData = new FormData()
                payData.append('notifyUrl', this.ItemNotifyUrl)
                axios.get(`${Lib.C.userApi}wechatOpenIds/${JSON.parse(localStorage.user).userId}`).then((res) => {
                  let openId = res.data.data.openId
                  payData.append('openid', openId)
                  axios.post(`${Lib.C.payApi}pay/${paymentId}`, payData).then((res) => {
                    pingpp.createPayment(res.data.data, (result, err) => {
                      if (result === 'success') {
                        alert('支付成功！')
                        that.showLoading = false
                        location.href="./dp-order-list.html"
                        // location.href = './pay-success.html?type=3'
                      } else if (result === 'fail') {
                        alert('支付失败')
                        that.showLoading = false
                        // location.href = './zc-order-list.html?type=5'
                      } else if (result === 'cancel') {
                        alert('支付取消')
                        that.showLoading = false
                        // location.href = './zc-order-list.html?type=5'
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
              } else {
                alert ('兑换成功！')
                location.href="./dp-order-list.html"
              }
            }).catch((err) => {
              this.showLoading = false
            })
          }).catch((err) => {
            this.showLoading = false
          })
        } else {
          alert('您的积分不足哦')
          this.showLoading = false
        }
      },
      getPoint() {
        axios.get(`${Lib.C.walletApi}wallets/${JSON.parse(localStorage.getItem('user')).userId}`).then((res) => {
          this.bonusPoints = res.data.data.bonusPoints
          console.log(this.bonusPointChanges)
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    ready() {
      this.getItemInfo(this.itemId)
      this.getAddress()
      this.getPoint()
    }
  }
</script>