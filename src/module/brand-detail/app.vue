<template>
<header :style="{backgroundImage:'url('+ bgImg +')'}">
  <div class="brand-logo"><img :src="img + brand.logoImg"></div>
  <div class="brand-name">{{brand.name}}</div>
</header>
<div class="content">
  <div class="store" v-for="store in brand.stores">
    <div class="store-logo"><img src="./placeholder.png"></div>
    <div class="store-name">{{store.name}}</div>
    <div class="store-address">{{store.address}}</div>
    <div class="add" v-if="~cart.indexOf(store.id)" v-tap="delCart(id,store.id)"><img src="./added.png"></div>
    <div class="add" v-else v-tap="addCart(id,store.id,store)"><img src="./add.png"></div>
  </div>

</div>
<footer>
  <div class="icon-item"><img src="share.png">
    <div>分享</div>
  </div>
  <div class="icon-item" v-if="cart.length == 0"><img src="favorite.png">
    <div>收藏</div>
  </div>
  <div class="icon-item" v-else><img src="favorite.png">
    <div>收藏</div>
  </div>
  <div class="footer-line"></div>
  <div class="cart-list" v-tap="goto('./cart.html')"><img :src="cart.length?cartAImg:cartImg">备选订单</div>
</footer>
<toast :show.sync="showToast" text="添加成功"></toast>
</template>

<script>
import Lib from 'assets/Lib.js'
import Toast from 'vux-components/toast'
import axios from 'axios'
import cartImg from './cart.png'
import cartAImg from './cart-active.png'
import bgImg from './bg.png'
try {
  axios.defaults.headers.common['Authorization'] = JSON.parse(localStorage.getItem("user")).tokenType + ' ' + JSON.parse(localStorage.getItem("user")).token
} catch (e) {
  localStorage.clear()
  window.location.href = `./wxAuth.html?url=index.html`
}
export default {
  data() {
    return {
      img: Lib.C.imgUrl,
      id: Lib.M.GetRequest().id,
      brand: {},
      cartImg,
      cartAImg,
      favorateList: [],
      cart: this.brandCart(Lib.M.GetRequest().id),
      showToast: false,
      bgImg
    }
  },
  components: {
    Toast
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
      if (!isIdIn(storeId, info.storeInfo)) {
        info.storeInfo.push(storeData)
      }
      if (!isIdIn(brandId, info.brandInfo)) {
        let t = JSON.parse(JSON.stringify(this.brand))
        delete t.stores
        info.brandInfo.push(t)
      }
      localStorage.info = JSON.stringify(info)
      this.showToast = true

      function isIdIn(id, array) {
        for (let i = 0; i < array.length; i++) {
          if (array[i].id == id) return true
        }
        return false
      }
    },
    delCart(brandId, storeId) {
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
    }
  },
  ready() {

    axios.get(`${Lib.C.merApi}brands/${this.id}`, {
      params: {
        expand: 'stores'
      }
    }).then((res) => {
      this.brand = res.data.data
    }).catch((err) => {
      throw err
    })
  }
}
</script>

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
        border-radius: 5px;
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
        background-color: #88C929;
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
            width: 74px;
            height: 30px;
            right: 15px;
            bottom: 5px;
            img {
                height: 100%;
                width: 100%;
            }
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
