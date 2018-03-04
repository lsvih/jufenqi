<style>
body {
  background-color: #f4f4f4;
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
    width: 100%;
    z-index: 5;
    background-color: #f4f4f4;
    .img-wp {
        width: 96%;
        margin-top: 20px;
        position: relative;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
    }
    .brand-logo {
        position: absolute;
        top: 50%;
        left: 20px;
        height: 60px;
        width: 60px;
        transform: translateY(-50%);
        border-radius: 50%;
        img {
            height: 100%;
            width: 100%;
        }
    }
    .brand-name {
        position: absolute;
        top: 18%;
        left: 100px;
        height: 16px;
        font-size: 16px;
        color: #fff;
        font-weight: 300;
    }
    .brand-intro {
        position: absolute;
        top: 51px;
        left: 100px;
        width: calc(~"100% - 120px");
        font-size: 12px;
        color: #fff;
        font-weight: 300;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
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
        height: 100px;
        width: calc(~"100% - 40px");
        background-color: #fff;
        z-index: 1;
        margin: 0px auto 20px auto;
        border-radius: 10px;
        .add {
          position: absolute;
          right: 16px;
          bottom: 20px;
          border: 1px solid #ff9736;
          border-radius: 5px;
          padding: 2px 3px;
          font-size: 12px;
          color: #ff9736;
        }
        .added {
          position: absolute;
          right: 16px;
          bottom: 20px;
          border: 1px solid #ff9736;
          border-radius: 5px;
          padding: 2px 3px;
          font-size: 12px;
          background-color: #ff9736;
          color: #fff;
        }
        .buy {
          position: absolute;
          right: 16px;
          top: 20px;
          border-radius: 5px;
          border: 1px solid rgb(235,103,96);
          padding: 2px 3px;
          font-size: 12px;
          color: #fff;
          background-color: rgb(235,103,96);
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
            top: 21px;
            left: 16px;
            color: #333;
            font-size: 16px;
            font-weight: 300;
        }
        .store-address {
            position: absolute;
            top: 60px;
            left: 16px;
            font-size: 12px;
            color: #999;
            display: flex;
            font-weight: 300;
            width: calc(~"100% - 56px - 32px");
            .img-wp {
              width: 10px;
              height: 12px;
              margin: 2px 4px 0 0;
              img {
                display: block;
                width: 100%;
              }
            }
        }
    }
}
</style>

<template>
<header :style="{height: getScreenWidth()*231/720 +'px'}">
  <div class="img-wp" :style="{height: getScreenWidth()*0.96*231/720 + 'px'}">
    <img src="/static/new/brande/bg.png">
    <div class="brand-logo"><img :src="img + brand.logoImg"></div>
    <div class="brand-name" :style="{top: getScreenWidth()*0.21*0.96*231/720 + 'px'}">{{brand.name}}</div>
    <div class="brand-intro" :style="{top: getScreenWidth()*0.43*0.96*231/720 + 'px'}">{{transfer(brand.intro)}}</div>
  </div>
</header>
<div class="content" :style="{paddingTop: getScreenWidth()*231/720 + 40 +'px'}">
  <div class="store" v-for="store in brand.stores" track-by="$index">
    <div class="store-name">{{store.name}}</div>
    <div class="store-address">
      <div class="img-wp"><img src="/static/new/brande/add.png"></div>{{store.address}}</div>
    <div class="buy" v-tap="addOrder(id,store.id,store)">立即购买</div>
    <div class="added" v-if="~cart.indexOf(store.id)" v-tap="delCart(id,store.id)">已加入</div>
    <div class="add" v-else v-tap="addCart(id,store.id,store)">加入备选</div>
  </div>

</div>
<footer>
  <!-- <div class="icon-item"><img src="share.png">
    <div>分享</div>
  </div>
  <div class="icon-item" v-if="thisIsFavorite" v-tap="cancelFavorite()"><img src="favorite-fill.png">
    <div>收藏</div>
  </div>
  <div class="icon-item" v-else v-tap="addFavorite()"><img src="favorite.png">
    <div>收藏</div>
  </div> -->
  <!-- <div class="footer-line"></div> -->
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
      location.href = `./add-order.html?storeId=${shopId}&brandId=${brandId}&cateId=${this.cateId}&brandName=${this.brand.name}&storeName=${storeData.name}&address=${storeData.address}`
    },
    transfer(str) {
      let arr = []
      str.split('').map((e) => {
        if (e != ' ' || e != "  ") {
          arr.push(e)
        }
      })
      return arr.join('')
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
    console.log(this.cateId)
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
