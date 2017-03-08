<style lang="less">
body {
  margin: 0;
  background-color: #eee;
  color: #393939;
  padding: 0;
}
input,button,select,textarea {
  outline:none;
}
.add-order {
  position: relative;
}
.order-con {
  margin-bottom: 3px;
}
.shop-name {
  width: 100%;
  background-color: #fff;
  padding: 11px 0;
  margin-bottom: 1px;
  p {
    margin: 0;
    padding: 0 16px;
  }
  .name {
    color: #254ab0;
    font-size: 15px;
    font-weight: 500;
  }
  .address {
    font-size: 12px;
    margin-top: 6px;
    color: #999;
  }
}
.cell {
  height: 44px;
  line-height: 44px;
  background-color: #fff;  
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  color: #393939;
  margin-bottom: 1px;
  img {
    transform: rotate(-90deg);
    width: 18px;
  }
  .label {
    font-size: 12px;
    img {
      width: 10px;
      margin-right: 5px;
    }
  }
  .brand-name {
    font-size: 14px;
    font-weight: 500;
    line-height: 44px;
  }
  .money-wrapper {
    position: relative;
    display: flex;
    justify-content: space-around;
    .brand-amount {
      font-size: 18px;
      color: #fc9736;
      line-height: 47px;
    }
  }
}
.price-calc{
  padding: 10px 16px;
  background-color: #fff;
  margin-bottom: 1px;
  .price {
    font-size: 12px;
    .label {
      display: inline-block;
      margin-right: 10px;
    }
    input {
      display: inline-block;
      width: 189px;
      height: 30px;
      border: 1px solid #393939;
      border-radius: 5px;
      padding-left: 11px;
    }
    input::placeholder {
      color: #999;
    }
    p {
      margin: 5px 0;
      padding: 0 0 0 36px;
      span {
        color: #fc9736;
      }
    }
  }
}
.btn-wrapper {
  width: 100%;
  height: 44px;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  .money-wrapper {
    position: relative;
    display: flex;
    justify-content: space-around;
    .brand-amount {
      font-size: 18px;
      color: #fc9736;
      line-height: 47px;
    }
  }
  .btn {
    width: 100px;
    line-height: 44px;
    text-align: center;
    background: #ccc;
    color: #fff;
    margin-left: 10px;
  }
}
.active {
  background: -webkit-radial-gradient(ellipse at center, rgb(151, 197, 93),rgb(153, 197, 102)) !important; 
  background: radial-gradient(ellipse at center, rgb(151, 197, 93),rgb(153, 197, 102)) !important; 
}
.little-cell {
  height: 12px;
  line-height: 0px;
  color: #f97c36;
}
</style>

<template>
  <div class="add-order">
    <div class="order-con" v-for="shop in shopList">
      <div class="shop-name">
        <p class="name">{{shop.name}}</p>
        <p class="address">{{shop.address}}</p>
      </div>
      <div class="brand-wrapper" v-for="brand in shop.brands" track-by="$index">
        <div class="cell">
          <span class="label">
            品牌名称
            <img src="./delete.png" style="margin-left: 5px;" v-tap="delBrand(shop.id,$index)" v-if="$index > 0">
          </span>
          <span class="brand-name" v-tap="addBrand(shop.id,$index)">
            {{brand.name}}
            <img src="./select.png">
          </span>
        </div>
        <div class="cell">
          <span class="label">店员名称</span>
          <span class="brand-name" v-tap="selectClerk(shop.id,$index)">
            {{brand.clerk?brand.clerk.name:'请选择（非必填）'}}
            <img src="./select.png">
          </span>
        </div>
        <div class="price-calc">
          <div class="price">
            <span class="label">正价</span>
            <input type="number" v-model="brand.normalAmount" placeholder="请输入正价金额">
            <p>将为您贴息<span>{{brand.normalAmount?(brand.normalAmount*interestRate): 0 | currency '￥'}}</span>元</p>
          </div>
          <div class="price">
            <span class="label">特价</span>
            <input type="number" v-model="brand.specialAmount" placeholder="请输入特价金额">
            <p>将为您贴息<span>{{brand.specialAmount?(brand.specialAmount*0.04):0 | currency '￥'}}</span>元，返点券<span>{{brand.specialAmount?(brand.specialAmount*4):0}}</span>点</p>
            <p style="color: #fc9736; margin-top: 11px;">注：所有贴息、返券按照实际支付金额计算</p>
          </div> 
        </div>
        <div class="cell">
          <span class="label" v-tap="addBrand(shop.id)">
            <img src="./add-brand.png">
            新增品牌
          </span>
          <div class="money-wrapper">
            <div class="brand-name">
              小计：
            </div>
            <div class="brand-amount">{{countBrandAmount(shop, $index)|currency '￥' 2}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="totalprice">
      <div class="cell" style="margin-bottom: 0">
        <div class="label" >使用{{tempCoupon()}}点券抵{{tempCoupon()/100 | currency '￥' 2}}元</div>
        <div class="brand-name">
          <input type="checkbox" v-model="isCouponUsed" v-tap="checkBox()">
        </div>
      </div>
      <div class="cell little-cell">
        <div class="label">注：点券返还金额无法超过购买总价</div>
      </div>
      <div class="cell">
        <div class="label">正价金额小计</div>
        <div class="brand-amount">
          {{countAllAmount('normalAmount')|currency '￥' 2}}
        </div>
      </div>
      <div class="cell" style="margin-bottom: 80px;">
        <div class="label">特价金额小计</div>
        <div class="brand-amount">
          {{countAllAmount('specialAmount')|currency '￥' 2}}
        </div>
      </div>
    </div>
    <div class="triangle">
      
    </div>
    
  </div>
  <div class="btn-wrapper">
    <div class="money-wrapper">
      <div style="line-height: 44px;">小计：</div>
      <div class="brand-amount">{{isCouponUsed?(countAllAmount() - tempCoupon()/100):countAllAmount() | currency '￥' 2}}</div>
    </div>
    <div class="btn" v-bind:class="{'active':isFinished()}" v-tap="isFinished()?submit():return">提交订单</div>
  </div>

<loading :show="showLoading" text="请稍后.."></loading>

<popup-picker title="品牌" :data="tempBrandList" :columns="1" :show-cell="false" :show.sync="showSelectBrand" :value.sync="tempAddBrand" @on-hide="onSelectedBrand" show-name v-ref:brand></popup-picker>

<popup-picker title="店员" :data="tempClerkList" :columns="1" :show-cell="false" :show.sync="showSelectClerk" :value.sync="tempAddClerk" @on-hide="onSelectedClerk" show-name v-ref:brand></popup-picker>


</template>

<script>
import Lib from 'assets/Lib.js'
import PopupPicker from 'vux-components/popup-picker'
import Loading from 'vux-components/loading'
import telImg from 'common/assets/images/tel.png'
import axios from 'axios'
import Group from 'vux-components/group'
import Cell from 'vux-components/cell'

Lib.M.auth(axios)
export default {
  components: {
    PopupPicker,
    Loading,
    Group,
    Cell
  },
  ready() {
    //若用户办理过分期，则取相应银行利率，否则默认为8%
    axios.get(`http://wx.jufenqi.com:8080/loanapplicant/api/loan-applications?filter=userId:${this.userId}&expand=bankBranchPeriod`)
    .then((res) => {
      this.interestRate = res.data.data.bankBranchPeriod?res.data.data.bankBranchPeriod.interestRate:0.08
    }).catch((err) => {
      console.log(err)
    })
    //获取用户点券信息
    this.getCoupon()
  },
  data() {
    return {
      userId: JSON.parse(localStorage.getItem("user")).userId,
      showLoading: false,
      showSelectBrand: false,
      showSelectClerk: false,
      showSelectCoupon: false,
      shopList: shopInfoPipe(JSON.parse(localStorage.temp)),
      tempBrandList: [],
      tempBrandOperateType: null,
      // tempBrandOperateType为品牌操作的类型，值为0时为添加品牌，值为1时为修改品牌
      tempSelectedShop: null,
      tempSelectedBrand: null,
      tempAddBrand: [],
      tempClerkList: [],
      tempAddClerk: [],
      tempSelectedClerk: [],
      // 点券
      myCoupon: [],
      couponAmount: null,
      isCouponUsed: false,

      telImg,
      from: Lib.M.GetRequest().from || false,
      //银行利率
      interestRate: 0.08,
    }
  },
  methods: {
      goto(url) {
        location.href = url
      },
      del(shop) {
        this.shopList.$remove(shop)
      },
      isFinished() {
        if (!this.shopList.length) return false
          for (let shop of this.shopList) {
            if(shop.brands.length === 0) return false
              for (let brand of shop.brands) {
                if (brand.specialAmount == null && brand.normalAmount == null) return false
                if (brand.specialAmount == '' && brand.normalAmount == '') return false
              }
          }
          return true
      },
      submit() {
        let groups = []
        this.showLoading = true
        this.shopList.map((shop) => {
          groups.push({
            storeId: shop.id,
            orders: []
          })
          groups.map((e) => {
            shop.brands.map((brand) => {
              if (brand.clerk != null && (shop.id == e.storeId)) {
                e.orders.push({
                  brandId: Number(brand.id),
                  clerkId: Number(brand.clerk.id),
                  normalAmount: brand.normalAmount?Number(brand.normalAmount):0,
                  specialAmount: brand.specialAmount?Number(brand.specialAmount):0
                })
              } else if (shop.id == e.storeId) {
                e.orders.push({
                  brandId: Number(brand.id),
                  normalAmount: brand.normalAmount?Number(brand.normalAmount):0,
                  specialAmount: brand.specialAmount?Number(brand.specialAmount):0
                })
              }
            })
          })
        })
        // 如果订单来自备选清单
        axios.post(`${Lib.C.mOrderApi}materialAppts/submitOrders${!this.from?'':'?apptNo='+this.from}`, {
          customerId: JSON.parse(localStorage.user).userId,
          groups: groups,
          useCoupon: this.isCouponUsed
        // {
        //   id: this.myCoupon.id?this.myCoupon.id:null
        // }
      }).then((res) => {
        // 如果订单来自备选清单，则删除备选清单中与付款订单中重合的门店。
        if (true) {
          let cart = JSON.parse(localStorage.cart)
          let selectedStore = []
          this.shopList.map((shop) => {
            selectedStore.push(Number(shop.id))
          })
          cart.shop.forEach((sbList) => {
            if (~selectedStore.indexOf(sbList[1])) {
              cart.shop.$remove(sbList)
            }
          })
          localStorage.cart = JSON.stringify(cart)
        }
        this.showLoading = false
        location.href = `./pay.html?apptNo=${res.data.data.apptNo}`
      }).catch((err) => {
        throw err
        this.showLoading = false
        alert("网络连接中断，请稍候再试")
      })
    },
    addBrand(shopId, brandIndex) {
      if (brandIndex == undefined) {
        this.tempBrandOperateType = 0
      } else {
        this.tempBrandOperateType = 1
        this.tempSelectedBrand = brandIndex
      }
      this.tempSelectedShop = shopId
      this.showLoading = true
      axios.get(`${Lib.C.merApi}stores/${shopId}?expand=storeBrands`).then((res) => {
        this.tempBrandList = []
        res.data.data.storeBrands.map((e) => {
          this.tempBrandList.push({
            name: e.brand.name,
            value: String(e.brand.id),
          })
        })
        this.showSelectBrand = true
        this.showLoading = false
      }).catch((err) => {
        this.showLoading = false
        alert("获取品牌失败，请稍后再试")
        throw err //error
      })
    },
    delBrand(shopId, brandId) {
      let shopIndex = findIdIndex(shopId, this.shopList)
      this.shopList[shopIndex].brands.$remove(this.shopList[shopIndex].brands[brandId])
    },
    onSelectedBrand() {
      if (this.tempAddBrand.length) {
        if (this.tempBrandOperateType == 0) {
          this.shopList[findIdIndex(this.tempSelectedShop, this.shopList)].brands.push({
            name: getValue(this.tempAddBrand[0], this.tempBrandList, 'name'),
            id: getValue(this.tempAddBrand[0], this.tempBrandList, 'value'),
            clerk: null,
            normalAmount: null,
            specialAmount: null
          })
          this.tempAddBrand = []
        } else {
          this.shopList[findIdIndex(this.tempSelectedShop, this.shopList)].brands[this.tempSelectedBrand].name = getValue(this.tempAddBrand[0], this.tempBrandList, 'name')
          this.shopList[findIdIndex(this.tempSelectedShop, this.shopList)].brands[this.tempSelectedBrand].id = getValue(this.tempAddBrand[0], this.tempBrandList, 'value')
          this.shopList[findIdIndex(this.tempSelectedShop, this.shopList)].brands[this.tempSelectedBrand].clerk = null
        }
      }
    },
    selectClerk(shopId, brandIndex) {
      this.tempSelectedShop = shopId
      this.tempSelectedBrand = brandIndex
      document.activeElement.blur()
      this.showLoading = true
      axios.get(`${Lib.C.merApi}store-users?filter=store:${shopId}`).then((res) => {
        this.tempClerkList = []
        let clerks = []
        res.data.data.map((e) => {
          clerks.push(e.userId)
        })
        if (clerks.length === 0) {
          alert("此门店中暂无店员,店员信息正在更新中")
          this.showLoading = false
        } else {
          axios.get(`${Lib.C.userApi}storeuserProfiles?filter=userId:${clerks.join(',')}`).then((res) => {
            // if (res.data.data.length === 0) {
            //   alert("此门店中暂无店员")
            // } else {
              res.data.data.map((e) => {
                this.tempClerkList.push({
                  name: String(e.nickname),
                  value: String(e.userId)
                })
              })
              this.showSelectClerk = true
            // }
            this.showLoading = false
          }).catch((err) => {
            this.showLoading = false
            alert("获取店员信息失败，请稍后再试")
            throw err //error
          })
        }
      }).catch((err) => {
        this.showLoading = false
        alert("获取店员信息失败，请稍后再试")
        throw err //error
      })
    },
    getCoupon() {
      axios.get(`${Lib.C.mOrderApi}coupons`,{
        params: {
          filter: `userId:${JSON.parse(window.localStorage.getItem('user')).userId}`,
          size: 10000
        }
      }).then((res) => {
          if (res.data.data.length === 0) {
            this.couponAmount = 0
          } else {
            this.couponAmount = res.data.data[0].amount
          }
         }).catch((err) => {
              alert('获取点券信息失败，请稍后重试..')
              console.log(err)
      })
    },
    onSelectedClerk() {
      if (this.tempAddClerk.length) {
        this.shopList[findIdIndex(this.tempSelectedShop, this.shopList)].brands[this.tempSelectedBrand].clerk = {
          name: getValue(this.tempAddClerk[0], this.tempClerkList, 'name'),
          id: getValue(this.tempAddClerk[0], this.tempClerkList, 'value')
        }
        this.tempAddClerk = []
      }
    },
    // onSelectedCoupon() {
    //   if (this.tempAddCoupon.length) {
    //     this.myCoupon = {
    //       couponAmount:  Number(getValue(this.tempAddCoupon[0],this.tempCouponList, 'name').split(' ')[0]),
    //       id: getValue(this.tempAddClerk[0], this.tempCouponList, 'value')
    //     }
    //     this.myCoupon = {
    //       couponAmount:  Number(getValue(this.tempAddCoupon[0],this.testList, 'name').split(' ')[0]),
    //       id: getValue(this.tempAddClerk[0], this.testList, 'value')
    //     }
    //   }
    //   this.tempAddCoupon = [] 
    //   this.tempCouponList = []
    // },
    countBrandAmount(shop, brandId) {
      let result = 0
      result = Number(shop.brands[brandId].normalAmount) + Number(shop.brands[brandId].specialAmount)
      return result
    },
    countAllAmount(type) {
      switch (type) {
        case 'specialAmount':
        let special_result = 0
        this.shopList.map((shop) => {
          shop.brands.map((brand) => {
            special_result += Number(brand.specialAmount) 
          })
        })
        return special_result
        break;
        case 'normalAmount':
        let normal_result = 0
        this.shopList.map((shop) => {
          shop.brands.map((brand) => {
            normal_result += Number(brand.normalAmount)
          })
        })
        return normal_result 
        break;
        default:
        let all_result = 0
        this.shopList.map((shop) => {
          shop.brands.map((brand) => {
            all_result += (Number(brand.specialAmount) + Number(brand.normalAmount))
          })
        })
        return (all_result)
        break;
      }
    },
    getScreenWidth() {
      return document.body.clientWidth
    },
    tempCoupon() {
      let result
      if (Number(this.couponAmount) > Number(this.countAllAmount()*100)) {
        result = Number(this.countAllAmount()*100)
      } else {
        result = Number(this.couponAmount)
      }
      return result
    },
    checkBox() {
      this.isCouponUsed = !this.isCouponUsed
    }
  }

}

function getValue(value, array, type) {
  for (let i of array) {
    if (i.value == value) {
      return i[type]
    }
  }
  return null
}

function findIdIndex(id, array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id == id) return i
  }
  return -1
}

function shopInfoPipe(shops) {
  shops.map((shop) => {
    shop.brands.map((brand) => {
      if (!brand.clerk) brand.clerk = null
      if (brand.specialAmount === undefined) brand.specialAmount = null
      if (brand.normalAmount === undefined) brand.normalAmount = null
    })
  })
  return shops
}
</script>
