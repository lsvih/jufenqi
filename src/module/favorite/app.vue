<template>
<div>
  <header>
    <tab active-color='#88C929' :index.sync="index">
      <tab-item active-class="tab-active" :selected="tab === '品牌'" v-tap="tab = '品牌'">品牌</tab-item>
      <tab-item active-class="tab-active" :selected="tab === '工长'" v-tap="tab = '工长'">工长</tab-item>
      <!-- <tab-item active-class="tab-active" :selected="tab === '软装'" v-tap="tab = '软装'">软装</tab-item> -->
    </tab>
  </header>

  <swiper :index.sync="index" :height="getScreenHeight()+'px'" :show-dots="false">
    <swiper-item height="100%">
      <div class="tab-swiper vux-center content">
        <scroller :height="getScreenHeight()-88+'px'" lock-x scrollbar-y v-if="shopList.length > 0" v-ref:zc>
          <group style="margin-top:-1.17647059em;">
            <cell v-for="brand in shopList" class="cell-item">
              <img :src="img + brand.logoImg" class="worker-logo" width="80px" height="80px">
              <div class="worker-name">{{brand.name}}</div>
              <div class="worker-address">{{brand.intro}}</div>
              <div class="detail-click-area" v-tap="goto('./brand-detail.html?id='+brand.id)"></div>
              <div class="favorite-click-area" v-tap="cancelBrandFavorite(brand)"></div>
              <img class="worker-is-favorite" src="favorite-fill.png">
            </cell>
          </group>
        </scroller>
        <div v-if="shopList.length == 0" class="no-data-container">
          <div class="no-data"><img src="no-data.png"><span>暂无收藏</span></div>
        </div>
      </div>
    </swiper-item>
    <swiper-item height="100%">
      <div class="tab-swiper vux-center content">
        <scroller :height="getScreenHeight()-88+'px'" lock-x scrollbar-y v-if="workerList.length > 0" v-ref:zx>
          <group style="margin-top:-1.17647059em;">
            <cell v-for="worker in workerList" class="cell-item">
              <img :src="worker.profileImage" class="worker-logo" width="120px" height="80px">
              <div class="worker-name">{{worker.nickname}}</div>
              <div class="worker-address">{{worker.nativePlace}}</div>
              <div class="detail-click-area" v-tap="goto('./worker-detail.html?id='+worker.userId)"></div>
              <div class="favorite-click-area" v-tap="cancelWorkerFavorite(worker)"></div>
              <img class="worker-is-favorite" src="favorite-fill.png">
            </cell>
          </group>
        </scroller>
        <div v-if="workerList.length == 0" class="no-data-container">
          <div class="no-data"><img src="no-data.png"><span>暂无收藏</span></div>
        </div>
      </div>
    </swiper-item>
    <!-- <swiper-item>
      <div class="tab-swiper vux-center">3</div>
    </swiper-item> -->
  </swiper>
</div>
</template>

<script>
import Lib from 'assets/Lib.js'
import Group from 'vux-components/group'
import Cell from 'vux-components/cell'
import {
  Tab,
  TabItem
} from 'vux-components/tab'
import Swiper from 'vux-components/swiper'
import SwiperItem from 'vux-components/swiper-item'
import Scroller from 'vux-components/scroller'
import axios from 'axios'
Lib.M.auth(axios)
export default {
  data() {
    return {
      index: 0,
      tab: '门店',
      showToast: false,
      toastText: "",
      showLoading: false,
      workerList: window.localStorage.getItem("favorite") ? JSON.parse(window.localStorage.getItem("favorite")).worker : [],
      shopList: window.localStorage.getItem("favorite") ? JSON.parse(window.localStorage.getItem("favorite")).shop : [],
      selectWorker: [],
      selectShop: [],
      img: Lib.C.imgUrl
    }
  },
  components: {
    Group,
    Cell,
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    Scroller,
  },
  methods: {
    getScreenHeight() {
      return document.body.clientHeight
    },
    goto(url) {
      window.location.href = url
    },
    cancelBrandFavorite(brand) {
      let list = JSON.parse(window.localStorage.getItem('favorite'))
      for (let i in list.shop) {
        if (list.shop[i].id == brand.id) {
          list.shop.$remove(list.shop[i])
        }
      }
      this.shopList.$remove(brand)
      window.localStorage.setItem('favorite', JSON.stringify(list))
    },
    cancelWorkerFavorite(worker) {
      let list = JSON.parse(window.localStorage.getItem('favorite'))
      for (let i in list.worker) {
        if (list.worker[i].userId == worker.userId) {
          list.worker.$remove(list.worker[i])
        }
      }
      this.workerList.$remove(worker)
      window.localStorage.setItem('favorite', JSON.stringify(list))
    },
  }
}

</script>

<style>
html {
  height: 100%;
}

body {
  background-color: #eee;
  height: 100%;
}
</style>
<style scoped lang="less">
.shop-item {
    position: relative;
    height: 40px;
    .shop-name {
        position: absolute;
        left: 15px;
        top: 0;
        height: 60px;
        line-height: 40px;
    }
    .shop-address {
        position: absolute;
        font-size: 12px;
        left: 15px;
        bottom: 9px;
    }
    .shop-del {
        position: absolute;
        font-size: 12px;
        right: 15px;
        top: 0;
        height: 60px;
        width: 50px;
        color: #d8d8d8;
        line-height: 40px;
    }
}
.shop-brand {
    .brand-name {
        position: absolute;
        top: 0;
        left: 15px;
        font-size: 14px;
        height: 40px;
        line-height: 40px;
    }
}
.cell-item {
    position: relative;
    height: 80px;
    .worker-logo {
        position: absolute;
        top: 10px;
        left: 15px;
        width: 80px;
        height: 80px;
    }
    .worker-name {
        position: absolute;
        top: 10px;
        left: 100px;
        font-size: 12px;
        color: #393939;
    }
    .worker-address {
        position: absolute;
        top: 44px;
        left: 100px;
        font-size: 12px;
        color: #999;
    }
    .worker-rank {
        position: absolute;
        bottom: 10px;
        left: 100px;
        font-size: 12px;
        color: #3ba794;
    }
    .worker-is-favorite {
        position: absolute;
        top: 40px;
        right: 15px;
        width: 20px;
        height: 20px;
    }
    .worker-del {
        position: absolute;
        top: 73px;
        right: 103px;
        width: 24px;
        font-size: 12px;
        color: #ddd;
    }
    .shop-name {
        position: absolute;
        top: 10px;
        left: 15px;
        font-size: 12px;
        color: #393939;
    }
    .shop-address {
        position: absolute;
        top: 44px;
        left: 15px;
        font-size: 12px;
        color: #999;
    }
    .shop-del {
        position: absolute;
        top: 73px;
        right: 103px;
        width: 54px;
        font-size: 12px;
        color: #ddd;
    }
}
.content {
    padding-top: 44px;
    margin-bottom: 44px;
}
.favorite-click-area {
    position: absolute;
    right: 0;
    top: 0;
    width: 50px;
    height: 100%;
    z-index: 1;
}
.detail-click-area {
    position: absolute;
    left: 0;
    top: 0;
    width: calc(~"100% - 50px");
    height: 100%;
    z-index: 1;
}
header {
    position: fixed;
    height: 44px;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 30;
}
.tab-active {
    color: #88C929 !important;
    border-color: #88C929 !important;
}

.no-data-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
}
.no-data {
    position: relative;
    width: 100%;
    img {
        position: absolute;
        top: 160px;
        left: calc( ~"50% - 35.5px" );
        height: 65px;
        width: 71px;
    }
    span {
        display: block;
        position: absolute;
        width: 100%;
        height: 16px;
        font-size: 16px;
        line-height: 16px;
        left: 0;
        top: 241px;
        color: #DADADA;
        text-align: center;
    }
}
</style>
