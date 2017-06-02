<style>
body {
  background-color: #eee;
}

article {
  padding: 15px;
  font-size: 12px;
  color: #393939;
  z-index: 5;
}

footer {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 44px;
  width: 100%;
  background-color: #fff;
  z-index: 5;
}

.content {
  padding-top: 180px;
  padding-bottom: 44px;
  z-index: 1;
}
</style>
<style scoped lang="less">
header {
    position: fixed;
    top: 0;
    left: 0;
    height: 180px;
    width: 100%;
    background-image: url('./bg.png');
    background-size: 100% 100%;
    z-index: 5;
    .brand-logo {
        position: absolute;
        top: 24px;
        left: calc(~"50% - 50px");
        height: 100px;
        width: 100px;
        border-radius: 50%;
        overflow: hidden;
        box-shadow: rgba(0, 0, 0, .4) 0 2px 4px 2px;
        img {
            height: 100%;
            width: 100%;
        }
    }
    .brand-name {
        position: absolute;
        top: 134px;
        left: 0;
        width: 100%;
        height: 16px;
        font-size: 16px;
        color: #fff;
        text-align: center;
    }
}
footer {
    z-index: 2;
    .cart-list {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 68%;
        height: 44px;
        background-color: #ff9736;
        line-height: 44px;
        color: #fff;
        text-align: center;
        font-size: 16px;
        img {
            height: 20px;
            width: 20px;
            vertical-align: middle;
            margin-right: 10px;
        }
    }
    .footer-line {
        position: absolute;
        height: 24px;
        width: 1px;
        left: 16%;
        top: 10px;
        background-color: #eee;
    }
    .icon-item {
        position: absolute;
        bottom: 0;
        font-size: 12px;
        color: #eee;
        width: 16%;
        height: 44px;
        img {
            width: 20px;
            height: 20px;
            position: absolute;
            top: 4px;
            left: 50%;
            margin-left: -10px;
        }
        div {
            position: absolute;
            width: 100%;
            height: 12px;
            line-height: 12px;
            bottom: 4px;
            text-align: center;
            color: #999;
        }
    }
    .icon-item:first-child {
        left: 0;
    }
    .icon-item:nth-child(2) {
        left: 16%;
    }
}
.content {
    .store {
        position: relative;
        height: 120px;
        width: 100%;
        border-bottom: 1px solid #eee;
        background-color: #fff;
        line-height: 15px;
        z-index: 1;
        .add {
          position: absolute;
          width: 72px;
          height: 28px;
          right: 15px;
          bottom: 5px;
          border: 1px solid #EBA844;
          border-radius: 5px;
          line-height: 28px;
          font-size: 12px;
          color: #EBA844;
          text-align: center;
        }
        .added {
          position: absolute;
          width: 72px;
          height: 28px;
          right: 15px;
          bottom: 5px;
          border: 1px solid #EBA844;
          border-radius: 5px;
          line-height: 28px;
          font-size: 12px;
          background-color: #EBA844;
          color: #fff;
          text-align: center;
        }
        .buy {
          position: absolute;
          width: 72px;
          height: 28px;
          right: 97px;
          bottom: 5px;
          border: 1px solid #EBA844;
          border-radius: 5px;
          line-height: 28px;
          font-size: 12px;
          color: #EBA844;
          text-align: center;
        }
        .store-logo {
            position: absolute;
            width: 120px;
            height: 96px;
            top: 12px;
            left: 15px;
            img {
                height: 100%;
                width: 100%;
            }
        }
        .store-name {
            position: absolute;
            top: 14px;
            left: 145px;
            width: calc(~"100% - 165px");
            color: #393939;
            font-size: 14px;
            font-weight: bold;
        }
        .store-address {
            position: absolute;
            top: 45px;
            left: 145px;
            width: calc(~"100% - 165px");
            font-size: 12px;
            color: #999;
        }
    }
}
</style>

<template>
<header :style="{backgroundImage:'url('+ bgImg +')'}">
  <div class="brand-logo"><img :src="img + brand.logoImg"></div>
  <div class="brand-name">{{brand.name}}</div>
</header>
<div class="content">
  <div class="store" v-for="store in brand.stores" track-by="$index">
    <div class="store-logo"><img src="./placeholder.png"></div>
    <div class="store-name">{{store.name}}</div>
    <div class="store-address">{{store.address}}</div>
    <div class="buy" v-tap="addOrder(id,store.id,store)">立即购买</div>
    <div class="added" v-if="~cart.indexOf(store.id)" v-tap="delCart(id,store.id)">已加入</div>
    <div class="add" v-else v-tap="addCart(id,store.id,store)">加入备选</div>
  </div>

</div>
<footer>
  <div class="icon-item"><img src="share.png">
    <div>分享</div>
  </div>
  <div class="icon-item" v-if="thisIsFavorite" v-tap="cancelFavorite()"><img src="favorite-fill.png">
    <div>收藏</div>
  </div>
  <div class="icon-item" v-else v-tap="addFavorite()"><img src="favorite.png">
    <div>收藏</div>
  </div>
  <div class="footer-line"></div>
  <div class="cart-list" v-tap="goto('./cart.html')"><img :src="cart.length?cartAImg:cartImg">备选订单</div>
</footer>
</template>

<script>
import Lib from 'assets/Lib.js'
import axios from 'axios'
import cartImg from './cart.png'
import cartAImg from './cart-active.png'
import bgImg from './bg.png'
Lib.M.auth(axios)
export default {
  data() {
    return {
      img: Lib.C.imgUrl,
      id: Lib.M.GetRequest().id,
      cateId: Number(Lib.M.GetRequest().cateId),
      brand: {},
      cartImg,
      cartAImg,
      isFavorite: false,
      cart: this.brandCart(Lib.M.GetRequest().id),
      showToast: false,
      bgImg,
      thisIsFavorite: this.isFavorite(Lib.M.GetRequest().id),
      //立即购买
      shopList: []
    }
  },
  methods: {
    isFavorite(brandId) {
      return true
    },
    getScreenWidth() {
      return document.body.clientWidth
    },
    goto(url) {
      location.href = url
    },
    addCart(brandId, storeId, storeData) {
      let cart = JSON.parse(localStorage.cart)
      cart.shop.push([Number(brandId), storeId])
      localStorage.cart = JSON.stringify(cart)
      this.cart.push(storeId)
      if (localStorage.info === undefined) {
        localStorage.info = JSON.stringify({
          storeInfo: [],
          brandInfo: []
        })
      }
      let info = JSON.parse(localStorage.info)
      console.log(info)
      if (!isIdIn(storeId, info.storeInfo)) {
        info.storeInfo.push(storeData)
      }
      if (!isIdIn(brandId, info.brandInfo)) {
        let t = JSON.parse(JSON.stringify(this.brand))
        delete t.stores
        console.log(t)
        // info.brandInfo.push(t)
        info.brandInfo.push(this.brand)
      }
      localStorage.info = JSON.stringify(info)
      this.showToast = true
      // console.log(this.brand)
      function isIdIn(id, array) {
        for (let i = 0; i < array.length; i++) {
          if (array[i].id == id) return true
        }
        return false
      }
    },
    delCart(brandId, storeId) {
      Lib.M.authOnlyPhone()
      let cart = JSON.parse(localStorage.cart)
      cart.shop.forEach((e, v) => {
        if (e[0] == Number(brandId) && e[1] == storeId) {
          cart.shop.splice(v, 1)
        }
      })
      localStorage.cart = JSON.stringify(cart)
      this.cart.$remove(storeId)
    },
    brandCart(brandId) {
      if (localStorage.cart == undefined) {
        localStorage.cart = JSON.stringify({
          worker: [],
          shop: []
        })
      }
      let cart = JSON.parse(localStorage.cart)
      let result = []
      cart.shop.forEach((e) => {
        if (e[0] === Number(brandId)) {
          result.push(e[1])
        }
      })
      return result
    },
    isFavorite(brandId){
      if (!localStorage.getItem('favorite')) {
        localStorage.setItem('favorite', JSON.stringify({
          worker: [],
          shop: []
        }))
        return false
      }
      return findSameBrand(brandId, JSON.parse(localStorage.getItem('favorite')).shop)
    },
    addFavorite() {
      Lib.M.authOnlyPhone()
      let list = JSON.parse(window.localStorage.getItem('favorite'))
      let tBrand = JSON.parse(JSON.stringify(this.brand))
      delete tBrand.stores
      list.shop.push(tBrand)
      window.localStorage.setItem('favorite', JSON.stringify(list))
      this.thisIsFavorite = true
    },
    cancelFavorite() {
      let list = JSON.parse(window.localStorage.getItem('favorite'))
      for (let i in list.shop) {
        if (list.shop[i].id == this.id) {
          list.shop.$remove(list.shop[i])
        }
      }
      this.thisIsFavorite = false
      window.localStorage.setItem('favorite', JSON.stringify(list))
    },
    addOrder(brandId, shopId, storeData) {
      storeData.brands = []
      storeData.brands.push({
        id: brandId,
        name: this.brand.name,
        cateId: this.cateId
      })
      let result = []
      result.push(storeData)

      window.localStorage.setItem('temp', JSON.stringify(result))
      location.href = './add-order.html'
    }
  },
  ready() {
    axios.get(`${Lib.C.merApi}brands/${this.id}`, {
      params: {
        expand: 'storeBrands'
      }
    }).then((res) => {
      this.brand = res.data.data
      this.brand.stores = this.brand.storeBrands.map((e) => {
        return e.store
      })
      this.brand.cateId = this.cateId
      // console.log(this.brand)
    }).catch((err) => {
      throw err
    })
  }
}
/**
 * 在列表中找到id相同的项
 */
function findSameBrand(id, brandList) {
  for (let brand of brandList) {
    if (brand.id == id) {
      return true
    }
  }
  return false
}

</script>

