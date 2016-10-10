<template>
<header>
  <div>{{name}}</div>
  <img src="cart.png" onclick="location.href='cart.html'">
</header>
<div class="content">
  <map class="map" id="map-container" height="240px" :width="getScreenWidth()+'px'">
  </map>
  <group style="margin-top:-1.17647059em">
    <cell  class="shop-detail">
      <div class="shop-detail-left">地址:{{address}}</div>
      <div class="shop-detail-right"><img src="location.png"></div>
    </cell>
    <cell  class="shop-detail">
      <div class="shop-detail-left">电话:{{tel}}</div>
      <div class="shop-detail-right"><img src="tel.png"></div>
    </cell>
  </group>

  <group title="门店详情">
    <article>123sdfsdfsdfqw</article>
  </group>
  <group title="产品图片">
    <div class="module-item">
      <scroller lock-y scrollbar-x :height=".8*getScreenWidth()*.63+20+'px'" v-ref:goods>
        <div class="shop-product-list" :style="{width:productList.length*(.8*getScreenWidth()+10)+'px',height:.8*getScreenWidth()*.63+'px'}">
          <div class="shop-product-item" v-for="good in productList" :style="{width: getScreenWidth()*.8 + 'px',height:.8*getScreenWidth()*.63+'px'}">
            <x-img class="product-img" :scroller="$refs.goods" :src="good.src" @click="$refs.previewer.show($index)"></x-img>
          </div>
        </div>
      </scroller>
    </div>
  </group>
  <group title="门店详情">
    <article>123sdfsdfsdfqw</article>
  </group>
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
  <div class="shop-list">添加到备选</div>
</footer>
<previewer :list="productList" v-ref:previewer :options="options"></previewer>
</template>
<script>
import Map from 'components/Map.vue'
import Lib from 'assets/Lib.js'
import Group from 'vux-components/group'
import Scroller from 'vux-components/scroller'
import XImg from 'vux-components/x-img'
import Cell from 'vux-components/cell'
import Previewer from 'vux-components/previewer'
export default {
  data() {
    return {
      name: "居然之家北四环店",
      address: "北京市朝阳区北四环东路",
      tel: "010-12345",
      shop: {
        logo: 'http://placekitten.com/g/60/60',
        name: "hahaha",
        description: "123123"
      },
      productList: [{
        src: 'http://placekitten.com/g/200/126',
        w: 200,
        h: 126
      }, {
        src: 'http://placekitten.com/g/200/126',
        w: 200,
        h: 126
      }, {
        src: 'http://placekitten.com/g/200/126',
        w: 200,
        h: 126
      }, {
        src: 'http://placekitten.com/g/200/126',
        w: 200,
        h: 126
      }, ],
      options: {
        getThumbBoundsFn(index) {
          // find thumbnail element
          let thumbnail = document.querySelectorAll('.product-img')[index]
            // get window scroll Y
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            // optionally get horizontal scroll
            // get position of element relative to viewport
          let rect = thumbnail.getBoundingClientRect()
            // w = width
          return {
            x: rect.left,
            y: rect.top + pageYScroll,
            w: rect.width
          }
          // Good guide on how to get element coordinates:
          // http://javascript.info/tutorial/coordinates
        }
      },
      ready(){

      }
    }
  },
  components: {
    Group,
    Cell,
    Scroller,
    XImg,
    Previewer,Map
  },
  methods: {
    isFavorite(shopId) {
      return true
    },
    getScreenWidth() {
      return document.body.clientWidth
    }
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
.shop-product-list {
    height: auto;
    padding: 10px 15px 20px;
    position: relative;
    .shop-product-item {
        height: auto;
        margin-right: 10px;
        display: inline-block;
        float: left;
        img {
            height: 100%;
            width: 100%;
        }
    }
}
header {
    position: fixed;
    height: 44px;
    width: 100%;
    top:0;
    left: 0;
    text-align: center;
    font-size: 16px;
    color: #393939;
    line-height: 44px;
    background-color: #fff;
    z-index: 20;
    img {
        position: absolute;
        right: 0;
        top: 0;
        height: 44px;
        width: 44px;
    }

    .shop-name {
        position: absolute;
        top: 86px;
        left: 0;
        width: 100%;
        height: 16px;
        font-size: 16px;
        color: #393939;
        text-align: center;
    }
    .shop-description {
        position: absolute;
        bottom: 16px;
        left: 0;
        width: 100%;
        height: 12px;
        font-size: 12px;
        color: #727272;
        text-align: center;
    }
}
footer {
    .shop-list {
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
.shop-detail{
  position: relative;
  height: 24px;
  .shop-detail-left{
    position: absolute;
    left:15px;
    top:14px;
    font-size: 12px;
    color: #393939;
  }
  .shop-detail-right{
    position: absolute;
    right: 15px;
    top:14px;
    height: 20px;
    width: 20px;
    img{
      height: 100%;
      width: 100%;
    }
  }
}
.map{
  height: 240px;
  width: 100%;

}
</style>
