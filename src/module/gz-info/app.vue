<style lang="less">

.event {
  position: relative;
  box-sizing: border-box;
  .brand-wrap {
    box-sizing: border-box;
    width: 100%;
    padding: 0 6px 0 16px;
    margin-top: 40px;
    display: flex;
    flex-wrap: wrap;
    .brand {
      box-sizing: border-box;
      margin-bottom: 50px;
      width: 33.33%;
      height: calc(~"(100vw - 52px) / 3");
      border-right: 10px solid transparent;

      .cate {
        width: 100%;
        height: 100%;
        margin-bottom: 10px;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          border-radius: 5px;
        }
        .checked {
          width: 20px;
          height: 20px;
          position: absolute;
          right: 3px;
          top: 3px;
        }
      }
      .cate-act {
        border: 1px solid #ff9736;
        border-radius: 5px;
        width: calc(~"100% - 1px");
        height: calc(~"100% - 1px")
      }
      .con {
        width: calc(~"100% - 20px");
        display: flex;
        justify-content: center;
        margin: 0 auto;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 12px;
        font-weight: 300;
        border: 1px solid #ebebeb;
        border-radius: 5px;
        color: #999;
        img {
          display: block;
          width: 10px;
          height: 6px;
          margin: 12px 0 0 2px;
        }
      }
      .selected {
        border: 1px solid #ff9736;
        color: #393939;
      }
    }
  }
  .bot {
    display: flex;
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    .left {
      height: 44px;
      padding-left: 16px;
      line-height: 44px;
      width: 75%;
      border-top: 1px solid #ebebeb;
    }
    .right {
      height: 45px;
      width: 25%;
      text-align: center;
      background-color: #ebebeb;
      color: #999;
      line-height: 45px;
      font-weight: 300;
    }
    .active {
      background-color: #ff9736;
      color: #fff;
      border-color: #ff9736;
    }
  }
  .btn{
    position: absolute;
    width: 60px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    color: #ff9736;
    font-size: 14px;
    border-radius: 5px;
    right: 25vw;
    top: 0;
  }
}
.vux-flexbox-item {
  color: #ff9736 !important;
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
</style>

<template>
  <div class="event">
    <div class="brand-wrap">
        <div class="brand" v-for="cate in list" track-by="$index" >
          <div class="cate" v-tap="cate.show = !cate.show" :class="{'cate-act': cate.show}">
            <img :src="cate.cateurl">
            <img src="/static/images/success-orange.png" class="checked" v-if="cate.show">
          </div>
          <div class="con" v-tap="cate.show?getBrand(cate.cateId):return" :class="{'selected': cate.show}">
            <span>{{cate.brand}}</span>
            <img src="/static/arrow.png">
          </div>
        </div>
        
        <div class="bot">
          <div class="left">总价：<span style="color: #ff9736;">{{getTrue() * 500}}</span> 元</div>
          <div class="right" :class="{'active': getTrue() > 0}" v-tap="getTrue()>0?payShow=true:return">
            立即支付
          </div>
          <div class="btn" v-tap="allTrue(0)" v-if="!showBtn()">全选</div>
          <div class="btn" v-tap="allTrue(2)" v-if="showBtn()">反选</div>
        </div>
    </div>
  </div>
  <loading :show="showLoading" text="正在加载品牌"></loading>

  <popup-picker title="选择品牌" :data="tmpBrands" :columns="1" :show-cell="false" :show.sync="showSelect" :value.sync="selectedBrand" @on-hide="onHide" show-name v-ref:cate></popup-picker>

  <Dialog :show.sync="payShow" >
  <p id="dialog-p" style="border-bottom: 1px solid #f5f5f5;" v-tap="pay(3)">
    微信支付
    <img src="./select.png">
  </p>
  <p id="dialog-p" style="border-bottom: 1px solid #f5f5f5;" v-tap="pay(1)">
    线下刷卡
    <img src="./select.png">
  </p>
  <p id="dialog-p" v-tap="payShow = false">取消</p>
</Dialog>
</template>

<script>
import Lib from 'assets/Lib.js'
import axios from 'axios'
import PopupPicker from 'vux-components/popup-picker'
import Loading from 'vux-components/loading'
import Dialog from 'vux-components/dialog'
import pingpp from 'pingpp-js'

Lib.M.auth(axios)

export default {
  data() {
    return {
      list: [{
        cateurl: '/static/cizhuan.jpg',
        cateId: 10,
        brand: '马可波罗',
        brandId: 99,
        show: false,
      },{
        cateurl: '/static/weiyu.jpg',
        cateId: 31,
        brand: '箭牌',
        show: false,
        brandId: 228
      },{
        cateurl: '/static/diban.jpg',
        cateId: 11,
        brand: '德尔',
        brandId: 16,
        show: false,
      },{
        cateurl: '/static/chugui.jpg',
        cateId: 6,
        brand: '澳比德',
        brandId: 238,
        show: false,
      },{
        cateurl: '/static/mumen.jpg',
        cateId: 25,
        brand: '圣象木门',
        brandId: 212,
        show: false,
      },{
        cateurl: '/static/diaoding.jpg',
        cateId: 16,
        brand: '友邦',
        show: false,
        brandId: 151
      },{
        cateurl: '/static/dingzhi.jpg',
        cateId: 17,
        brand: '顶固',
        brandId: 27,
        show: false,
      },],
      tmpBrands: [],
      showLoading: false,
      showSelect: false,
      selectedBrand: [],
      payShow: false,
      predepositNotifyUrl: 'http://materialorder/api/predeposits/noticePaymentResult',
      result: {}
    }
  },
  methods: {
    show(heihei) {
      return !heihei
    },
    getTrue() {
      let count = 0
      this.list.map((e) => {
        if (e.show) {
          count ++
        }
      })
      return count
    },
    allTrue(type) {
      this.payShow = false
      if (type == 0) {
        this.list.map((e) => {
          e.show = true
        })
      } else if (type == 1){
        this.list.map((e) => {
          e.show = !e.show
        })
      } else {
        this.list.map((e) => {
          e.show = false
        })
      }
    },
    getBrand(id) {
      this.tmpBrands = []
      this.showLoading = true
      axios.get(`${Lib.C.merApi}categories/${id}?expand=categoryBrands`).then((res) => {
        res.data.data.categoryBrands.map((e) => {
          if (e.brand) {
            this.tmpBrands.push({
              name: e.brand.name.indexOf('-') == -1?e.brand.name:e.brand.name.split('-')[0],
              value: [e.brand.id, e.id].join(',')
            })
          }
        })
        this.showSelect = true
        this.showLoading = false
      }).catch((err) => {
        this.showLoading = false
        throw err
      })
    },
    onHide() {
      if (this.selectedBrand.length > 0) {
        let tmpId = Number(this.selectedBrand[0].split(',')[0])
        let tmpExpand = Number(this.selectedBrand[0].split(',')[1])
        console.log(tmpId, tmpExpand)
        axios.get(`${Lib.C.merApi}brands/${tmpId}?expand=categoryBrands`).then((res) => {
          res.data.data.categoryBrands.map((cate) => {
            this.list.map((e) => {
              if (tmpExpand == cate.id && e.cateId == cate.category.id) {
                e.brandId = res.data.data.id
                e.brand = res.data.data.name.indexOf('-') == -1?res.data.data.name:res.data.data.name.split('-')[0]
              }
            })
          })

        }).catch((err) => {
          throw err
        })
      }
      this.showSelect = false
      this.selectedBrand = []
    },
    showBtn() {
      let a = true
      this.list.map((e) => {
        a = a && e.show
      })
      return a
    },
    pay(type) {
      let that = this
      this.showLoading = true
      this.getPostBody(type)
      axios.post(`${Lib.C.mOrderApi}predeposits`, this.result).then((res) => {  
        let paymentId = res.data.data.paymentId
        let payData = new FormData()
        payData.append('notifyUrl', this.predepositNotifyUrl)
        if (type == 3) {
          axios.get(`${Lib.C.userApi}wechatOpenIds/${JSON.parse(localStorage.user).userId}`).then((res) => {
              let openId = res.data.data.openId
              payData.append('openid', openId)
              axios.post(`${Lib.C.payApi}pay/${paymentId}`, payData).then((res) => {
                pingpp.createPayment(res.data.data, (result, err) => {
                  if (result === 'success') {
                    alert('支付成功')
                    location.href = './my-event.html'
                  } else if (result === 'fail') {
                    alert('支付失败')
                    that.showLoading = false
                    // location.href = './gz-info.html'
                  } else if (result === 'cancel') {
                    alert('支付失败')
                    // location.href = './gz-info.html'
                    that.showLoading = false
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
          alert('支付成功')
          location.href = './my-event.html'
        }
      }).catch((err) => {
        throw err
      })
    },
    getPostBody(payM) {
      this.result.brands = []
      this.result.payMethod = payM
      this.result.userId = JSON.parse(localStorage.user).userId
      this.list.map((e) => {
        if (e.show) {
          this.result.brands.push({
            amount: 0.01,
            brandId: e.brandId,
            categoryId: e.cateId
          })
        }
      })
    }
  },
  components: {
    PopupPicker,
    Loading,
    Dialog
  },
  ready() {

  }
}
</script>
