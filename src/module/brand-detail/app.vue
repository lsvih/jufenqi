<template>
<header>
  <div class="brand-logo"><img :src="img + brand.logoImg"></div>
  <div class="brand-name">{{brand.name}}</div>
</header>
<div class="content">


</div>
<footer>
  <div class="icon-item"><img src="share.png">
    <div>分享</div>
  </div>
  <div class="icon-item" v-if="isFavorite()"><img src="favorite.png">
    <div>收藏</div>
  </div>
  <div class="icon-item" v-else><img src="favorite.png">
    <div>收藏</div>
  </div>
  <div class="footer-line"></div>
  <div class="cart-list" v-tap="goto('./cart.html')"><img :src="cartState?cartAImg:cartImg">备选订单</div>
</footer>
</template>

<script>
import Lib from 'assets/Lib.js'
import Scroller from 'vux-components/scroller'
import axios from 'axios'
import cartImg from './cart.png'
import cartAImg from './cart-active.png'
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
      cartState: !this.isCartEmpty(),
      cartImg,cartAImg
    }
  },
  components: {
    Scroller,
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
    isCartEmpty(){
      if(localStorage.cart === undefined){
        return true
      }else{
        return JSON.parse(localStorage.cart).shop.length === 0
      }
    }
  },
  ready() {
    axios.get(`${Lib.C.merApi}brands/${this.id}`).then((res) => {
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
}

footer {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 44px;
  width: 100%;
  background-color: #fff;
}

.content {
  padding-bottom: 44px;
}
</style>
<style scoped lang="less">
header {
    position: relative;
    height: 180px;
    width: 100%;
    background-image: url('./bg.png');
    background-size: 100% 100%;
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
        img{
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
</style>
