<template>
<div class="content">
  <div class="store" v-for="shop in shopList">
    <div class="store-name">
      <div class="cell-left">{{shop.name}}</div>
      <div class="cell-right" v-tap="del(shop)">删除</div>
    </div>
    <div class="store-address">
      <div class="cell-left">地址 <span>{{shop.address}}</span></div>
      <div class="cell-right" v-tap="goto('tel:'+shop.phone)"><img :src='telImg'></div>
    </div>
    <!-- 品牌 -->
    <div v-for="brand in shop.brands" track-by="$index">
      <div class="brand-name">
        <div class="cell-left" v-tap="addBrand(shop.id,$index)">{{brand.name}}<img src='./select.png'></div>
        <div class="cell-right" v-tap="delBrand(shop.id,brand.id)">删除</div>
      </div>
      <div class="clerk">
        <div class="cell-left" v-tap="selectClerk(shop.id,$index)">店员选择<img src='./select.png'></div>
        <div class="cell-right">{{brand.clerk?brand.clerk.name:'请选择'}}</div>
      </div>
      <!-- 输入品牌价格 -->
      <div class="input-cell">
        <div class="special-amount">特价金额</div>
        <input type="number" class="special-input" v-model="brand.specialAmount" placeholder="请输入特价金额" />
        <div class="normal-amount">正价金额</div>
        <input type="number" class="normal-input" v-model="brand.normalAmount" placeholder="请输入正价金额" />
      </div>
    </div>
    <div class="brand-sum">
      <div class="cell-left">总金额</div>
      <div class="cell-right">{{countShopAmount(shop)|currency '￥' 2}}</div>
    </div>
    <div class="brand-add" v-tap="addBrand(shop.id)">添加品牌</div>
  </div>
  <div class="amount">
    <div class="title">
      <div class="cell-left">订单总价</div>
    </div>
    <div class="sum">
      <div class="cell-left">总特价金额</div>
      <div class="cell-right">{{countAllAmount('specialAmount')|currency '￥' 2}}</div>
    </div>
    <div class="sum">
      <div class="cell-left">总正价金额</div>
      <div class="cell-right">{{countAllAmount('normalAmount')|currency '￥' 2}}</div>
    </div>
    <div class="sum">
      <div class="cell-left">订单总金额</div>
      <div class="cell-right">{{countAllAmount()|currency '￥' 2}}</div>
    </div>
  </div>
</div>
<div class="submit-btn" v-bind:class="{'active':isFinished()}" v-tap="isFinished()?submit():return">确认订单</div>
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
Lib.M.auth(axios)
export default {
  components: {
    PopupPicker,
    Loading,
  },
  ready() {},
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
          if (brand.specialAmount == null || brand.normalAmount == null) return false
        }
      }
      return true
    },
    submit() {
      let orders = []
      this.showLoading = true
      this.shopList.map((shop) => {
          shop.brands.map((brand) => {
            orders.push({
              storeId: shop.id,
              brandId: brand.id,
              // clerkId: brand.clerk.id?brand.clerk.id:,
              normalAmount: brand.normalAmount,
              specialAmount: brand.specialAmount
            })
          })
        })
        // 如果订单来自备选清单
      axios.post(`${Lib.C.mOrderApi}materialAppts/submitOrders${!this.from?'':'?apptNo='+this.from}`, {
        customerId: JSON.parse(localStorage.user).userId,
        orders: orders
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
      axios.get(`${Lib.C.merApi}stores/${shopId}?expand=brands`).then((res) => {
        this.tempBrandList = []
        res.data.data.brands.map((e) => {
          this.tempBrandList.push({
            name: e.name,
            value: String(e.id),
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
      this.shopList[findIdIndex(shopId, this.shopList)].brands.$remove(this.shopList[findIdIndex(shopId, this.shopList)].brands[findIdIndex(brandId, this.shopList[findIdIndex(shopId, this.shopList)].brands)])
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
        axios.get(`${Lib.C.userApi}storeuserProfiles?filter=userId:${clerks.join(',')}`).then((res) => {
          if (res.data.data.length === 0) {
            alert("此门店中暂无店员")
          } else {
            res.data.data.map((e) => {
              this.tempClerkList.push({
                name: String(e.nickname),
                value: String(e.userId)
              })
            })
            this.showSelectClerk = true
          }
          this.showLoading = false
        }).catch((err) => {
          this.showLoading = false
          alert("获取店员信息失败，请稍后再试")
          throw err //error
        })
      }).catch((err) => {
        this.showLoading = false
        alert("获取店员信息失败，请稍后再试")
        throw err //error
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
    countShopAmount(shop) {
      let result = 0
      shop.brands.map((brand) => {
        result += (Number(brand.specialAmount) + Number(brand.normalAmount))
      })
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
          return all_result
          break;
      }
    }
  },
  data() {
    return {
      showLoading: false,
      showSelectBrand: false,
      showSelectClerk: false,
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
      telImg,
      from: Lib.M.GetRequest().from || false
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
<style lang="less">
body {
    margin: 0;
    background-color: #eee;
    color: #393939;
}
.content {
    padding-bottom: 44px;
}
.store {
    position: relative;
    width: 100%;
    height: auto;
    background-color: #fff;
    margin-bottom: 10px;
    .store-name {
        position: relative;
        width: 100%;
        height: 44px;
        border-bottom: 1px solid #eee;
        .cell-left {
            position: absolute;
            top: 0;
            left: 15px;
            height: 44px;
            width: auto;
            line-height: 44px;
            font-size: 16px;
        }
        .cell-right {
            position: absolute;
            top: 0;
            height: 44px;
            line-height: 44px;
            width: auto;
            right: 15px;
            font-size: 12px;
        }
    }
    .store-address {
        position: relative;
        width: calc(~"100% - 15px");
        height: 44px;
        margin-left: 15px;
        border-bottom: 1px solid #eee;
        .cell-left {
            position: absolute;
            top: 0;
            left: 0;
            height: 44px;
            line-height: 44px;
            font-size: 16px;
            span {
                font-size: 12px;
            }
        }
        .cell-right {
            position: absolute;
            top: 12px;
            right: 15px;
            height: 20px;
            width: 20px;
            img {
                height: 100%;
                width: 100%;
            }
        }
    }
    .brand-name {
        position: relative;
        width: calc(~"100% - 15px");
        height: 44px;
        margin-left: 15px;
        border-bottom: 1px solid #eee;
        .cell-left {
            position: absolute;
            top: 0;
            left: 0;
            height: 44px;
            line-height: 44px;
            font-size: 12px;
            img {
                margin-left: 10px;
                vertical-align: middle;
                height: 10px;
                width: 17px;
            }
        }
        .cell-right {
            position: absolute;
            top: 0;
            right: 15px;
            height: 44px;
            line-height: 44px;
            font-size: 12px;

        }
    }
    .clerk {
        position: relative;
        width: calc(~"100% - 15px");
        height: 44px;
        margin-left: 15px;
        border-bottom: 1px solid #eee;
        .cell-left {
            position: absolute;
            top: 0;
            left: 0;
            height: 44px;
            line-height: 44px;
            font-size: 12px;
            img {
                margin-left: 10px;
                vertical-align: middle;
                height: 10px;
                width: 17px;
            }
        }
        .cell-right {
            position: absolute;
            top: 0;
            right: 15px;
            height: 44px;
            line-height: 44px;
            font-size: 12px;
        }
    }
    .brand-sum {
        position: relative;
        width: 100%;
        height: 44px;
        border-bottom: 1px solid #eee;
        .cell-left {
            position: absolute;
            top: 0;
            left: 15px;
            height: 44px;
            line-height: 44px;
            font-size: 12px;
            img {
                margin-left: 10px;
                vertical-align: middle;
                height: 10px;
                width: 17px;
            }
        }
        .cell-right {
            position: absolute;
            top: 0;
            right: 15px;
            height: 44px;
            line-height: 44px;
            font-size: 12px;
            color: #ec5835;
        }
    }

    .brand-add {
        width: 100%;
        height: 44px;
        line-height: 44px;
        text-align: center;
        font-size: 12px;
    }
}
.amount {
    position: relative;
    width: 100%;
    height: auto;
    background-color: #fff;
    .title {
        position: relative;
        width: 100%;
        height: 44px;
        border-bottom: 1px solid #eee;
        .cell-left {
            position: absolute;
            top: 0;
            left: 15px;
            height: 44px;
            line-height: 44px;
            font-size: 12px;
        }
    }
    .sum {
        position: relative;
        margin-left: 15px;
        width: calc(~"100% - 15px");
        height: 44px;
        border-bottom: 1px solid #eee;
        .cell-left {
            position: absolute;
            top: 0;
            left: 0;
            height: 44px;
            line-height: 44px;
            font-size: 12px;
            img {
                margin-left: 10px;
                vertical-align: middle;
                height: 10px;
                width: 17px;
            }
        }
        .cell-right {
            position: absolute;
            top: 0;
            right: 15px;
            height: 44px;
            line-height: 44px;
            font-size: 12px;
            color: #ec5835;
        }
    }
}

.input-cell {
    position: relative;
    height: 88px;
    width: 100%;
    border-bottom: 1px solid #eee;
    .special-amount {
        position: absolute;
        height: 44px;
        font-size: 12px;
        line-height: 44px;
        top: 0;
        left: 15px;
    }
    .normal-amount {
        position: absolute;
        height: 44px;
        font-size: 12px;
        line-height: 44px;
        bottom: 0;
        left: 15px;
    }
    input {
        -webkit-appearance: none;
        position: absolute;
        right: 15px;
        height: 30px;
        width: calc(~"100% - 100px");
        font-size: 12px;
        border: 1px solid #eee;
        border-radius: 2px;
        color: #393939;
    }
    input::placeholder {
        font-size: 12px;
        color: #eee;
    }
    .special-input {
        top: 7px;
    }
    .normal-input {
        bottom: 7px;
    }
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
</style>
