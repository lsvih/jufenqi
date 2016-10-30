<template>
<header>
  <div class="brand-logo"><img :src="brand.logo"></div>
  <div class="brand-name">{{brand.name}}</div>
  <div class="brand-description">{{brand.slogon}}</div>
</header>
<div class="content">
  <group title="品牌介绍">
    <article>{{brand.description}}</article>
  </group>
  <group title="产品图片" v-if="productList.length">
    <div class="module-item">
      <scroller lock-y scrollbar-x :height=".8*getScreenWidth()*.63+20+'px'" v-ref:goods>
        <div class="brand-product-list" :style="{width:productList.length*(.8*getScreenWidth()+10)+'px',height:.8*getScreenWidth()*.63+'px'}">
          <div class="brand-product-item" v-for="good in productList" :style="{width: getScreenWidth()*.8 + 'px',height:.8*getScreenWidth()*.63+'px'}">
            <x-img class="product-img" :scroller="$refs.goods" :src="good.src" v-tap="$refs.previewer.show($index)"></x-img>
          </div>
        </div>
      </scroller>
    </div>
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
  <div class="shop-list" v-tap="gotoStores(id)">查看门店</div>
</footer>
<previewer :list="productList" v-ref:previewer :options="options"></previewer>
</template>

<script>
import Lib from 'assets/Lib.js'
import Group from 'vux-components/group'
import Scroller from 'vux-components/scroller'
import XImg from 'vux-components/x-img'
import Cell from 'vux-components/cell'
import Previewer from 'vux-components/previewer'
export default {
  data() {
    return {
      id: Lib.M.GetRequest().id,
      brand: {
        logo: null,
        name: null,
        description: null,
        slogon: null,
      },
      productList: [],
      //productList:[img_src,img_src]
      options: {
        getThumbBoundsFn(index) {
          let thumbnail = document.querySelectorAll('.product-img')[index]
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          let rect = thumbnail.getBoundingClientRect()
          return {
            x: rect.left,
            y: rect.top + pageYScroll,
            w: rect.width
          }
        }
      }
    }
  },
  components: {
    Group,
    Cell,
    Scroller,
    XImg,
    Previewer
  },
  methods: {
    isFavorite(brandId) {
      return true
    },
    getScreenWidth() {
      return document.body.clientWidth
    },
    gotoStores(id) {
      location.href = `shop-list.html?id=${id}`
    }
  },
  ready() {
    this.$http.get(`${Lib.C.merApi}brands/${this.id}`).then((res) => {
      let brand = res.data.data
      this.brand.name = brand.name
      this.brand.logo = brand.logoImg
      this.brand.description = brand.intro
      this.slogon = brand.slogon
    }, (res) => {
      console.log(res) //error
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
.brand-product-list {
    height: auto;
    padding: 10px 15px 20px;
    position: relative;
    .brand-product-item {
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
    position: relative;
    height: 140px;
    width: 100%;
    background-color: #fff;
    .brand-logo {
        position: absolute;
        top: 16px;
        left: 50%;
        height: 60px;
        width: 60px;
        margin-left: -30px;
        border-radius: 30px;
        border: 1px solid #ddd;
        overflow: hidden;
        img {
            height: 100%;
            width: 100%;
        }
    }
    .brand-name {
        position: absolute;
        top: 86px;
        left: 0;
        width: 100%;
        height: 16px;
        font-size: 16px;
        color: #393939;
        text-align: center;
    }
    .brand-description {
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
</style>
