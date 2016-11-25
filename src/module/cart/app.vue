<template>
<div>
  <header>
    <tab active-color='#88C929' :index.sync="index">
      <tab-item active-class="tab-active" :selected="tab === '门店'" v-tap="tab = '门店'">门店</tab-item>
      <tab-item active-class="tab-active" :selected="tab === '工长'" v-tap="tab = '工长'">工长</tab-item>
      <!-- <tab-item active-class="tab-active" :selected="tab === '软装'" v-tap="tab = '软装'">软装</tab-item> -->
    </tab>
  </header>

  <swiper :index.sync="index" :height="getScreenHeight()+'px'" :show-dots="false">
    <swiper-item height="100%">
      <div class="tab-swiper vux-center content">
        <scroller :height="getScreenHeight()-88+'px'" lock-x scroller-y v-if="shopList.length > 0">
          <group style="margin-top:-1.17647059em;" v-for="shop in shopList">
            <cell class="shop-item">
              <div class="shop-name">{{shop.name}}</div>
              <div class="shop-address">{{shop.address}}</div>
              <div class="shop-del" v-tap="deleteShop(shop.id)">删除门店</div>
            </cell>
            <cell class="shop-brand" v-for="brand in shop.brand">
              <div class="brand-name">品牌: {{brand.name}}</div>
            </cell>
          </group>
        </scroller>
        <div v-if="shopList.length == 0" class="no-data-container">
          <div class="no-data"><img src="no-data.png"><span>暂无备选</span></div>
        </div>
        <div class="submit-btn" :class="{'select-active':shopList.length>0}" v-tap="shopList.length>0?goto('./select-shop.html'):return">预约</div>
        <!-- <div class="submit-btn" :class="{'select-active':isSelectShop()}" v-tap="isSelectShop()?selectShop():return">预约</div> -->
      </div>
    </swiper-item>
    <swiper-item height="100%">
      <div class="tab-swiper vux-center content">
        <scroller :height="getScreenHeight()-88+'px'" lock-x scroller-y v-if="workerList.length > 0">
          <group style="margin-top:-1.17647059em;">
            <cell v-for="worker in workerList" class="cell-item">
              <div class="click-area-select" v-tap="selectItem('Worker',worker.userId)"></div>
              <div class="click-area-detail" v-tap="goto('worker-detail.html?id='+worker.userId)"></div>
              <div class="click-area-del" v-tap="del('Worker',worker.userId)"></div>
              <img :src="worker.profileImage" class="worker-logo" width="120px" height="80px">
              <div class="worker-name">{{worker.nickname}}</div>
              <div class="worker-address">{{worker.nativePlace}}</div>
              <!-- <div class="worker-rank">评分:5.0</div> -->
              <div class="worker-del">删除</div>
              <img v-if="isSelect('Worker',worker.userId)" class="worker-is-favorite" src="selected.png">
              <img v-else class="worker-is-favorite" src="toselect.png">
            </cell>
          </group>
        </scroller>
        <div v-if="workerList.length == 0" class="no-data-container">
          <div class="no-data"><img src="no-data.png"><span>暂无备选</span></div>
        </div>
        <div class="submit-btn" :class="{'select-active':isSelectWorkers()}" v-tap="isSelectWorkers()?selectWorkers():return">预约</div>
      </div>
    </swiper-item>
    <!-- <swiper-item>
      <div class="tab-swiper vux-center">3</div>
    </swiper-item> -->
  </swiper>
  <toast :show.sync="showToast" :text="toastText"></toast>
  <loading :show.sync="showLoading" text="正在预约，请稍候"></loading>
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
import Toast from 'vux-components/toast'
import Loading from 'vux-components/loading'
import axios from 'axios'
try {
  axios.defaults.headers.common['x-user-token'] = JSON.parse(localStorage.getItem("user")).token
} catch (e) {
  localStorage.clear()
  window.location.href = `./wxAuth.html?url=index.html`
}
export default {
  data() {
    return {
      index: 0,
      tab: '门店',
      showToast: false,
      toastText: "",
      showLoading: false,
      workerList: window.localStorage.getItem("cart") ? JSON.parse(window.localStorage.getItem("cart")).worker : [],
      shopList: window.localStorage.getItem("cart") ? JSON.parse(window.localStorage.getItem("cart")).shop : [],
      selectWorker: [],
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
    Toast,
    Loading
  },
  methods: {
    isSelect(type, id) {
      let listName = 'select' + type
      let list = eval("this." + listName)
      return !!~list.indexOf(id)
    },
    getScreenHeight() {
      return document.body.clientHeight
    },
    selectItem(type, id) {
      let listName = 'select' + type
      let list = eval("this." + listName)
      if (this.isSelect(type, id)) {
        list.$remove(id)
      } else {
        if (type == "Worker" && this.selectWorker.length == 2) return this.toastWorkerLimit()
        list.push(id)
      }
    },
    toastWorkerLimit() {
      this.toastText = "最多选择2位工长"
      this.showToast = true
      return false
    },
    del(type, id) {
      if (type === "Worker") {
        this.workerList.map((e) => {
          if (e.userId === id) {
            this.workerList.$remove(e)
          }
        })
      }
      window.localStorage.setItem('cart', JSON.stringify({
        worker: this.workerList,
        shop: this.shopList
      }))
    },
    isSelectWorkers() {
      return !!this.selectWorker.length
    },
    isSelectShop() {
      return !!this.selectShop.length
    },
    deleteShop(id) {
      let tempData = JSON.parse(localStorage.getItem("cart"))
      for (let i in tempData.shop) {
        if (tempData.shop[i].id == id) {
          tempData.shop.$remove(tempData.shop[i])
        }
      }
      localStorage.setItem("cart",JSON.stringify(tempData))
      for (let j in this.shopList) {
        if (this.shopList[j].id == id) {
          this.shopList.$remove(this.shopList[j])
        }
      }
    },
    selectShop() {
      this.showLoading = true
      let subList = []
      let list = JSON.parse(localStorage.cart).shop
      list.map((shop) => {
        let brands = []
        shop.brand.map((brand) => {
          brands.push(brand.name)
        })
        subList.push({
          guideId: 1,
          storeId: shop.id,
          brands: brands,
          serviceManagers: [1]
        })
      })
      axios.post(`${Lib.C.mOrderApi}materialOrders`, {}, {
        params: {
          customerName: JSON.parse(localStorage.getItem('user')).profile.nickname,
          customerMobile: JSON.parse(localStorage.getItem('user')).profile.mobile,
          subApptList: subList
        }
      }).then((res) => {
        this.showLoading = false
        this.toastText = "预约成功！"
        this.showToast = true
        let list = JSON.parse(localStorage.cart)
        list.shop = []
        localStorage.setItem("cart", JSON.stringify(list))
        this.shopList = []
      }).catch((res) => {
        this.showLoading = false
        this.toastText = "网络中断，请重试"
        this.showToast = true
      })
    },
    selectWorkers() {
      this.goto(`select-worker.html?select=${this.selectWorker.join('|')}`)
    },
    goto(url) {
      window.location.href = url
    }
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
        top: 70px;
        right: 15px;
        width: 80px;
        height: 20px;
        img {
            height: 100%;
            width: 100%;
        }
    }
    .worker-del {
        position: absolute;
        top: 73px;
        right: 103px;
        width: 24px;
        font-size: 12px;
        color: #ddd;
    }
}
.content {
    padding-top: 44px;
    margin-bottom: 44px;
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
.click-area-select {
    position: absolute;
    right: 0;
    bottom: 0;
    height: 60px;
    width: 95px;
    z-index: 2;
}
.click-area-detail {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
}
.click-area-del {
    position: absolute;
    right: 95px;
    bottom: 0;
    height: 50px;
    width: 40px;
    z-index: 2;
}
.submit-btn {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 44px;
    line-height: 44px;
    text-align: center;
    color: #fff;
    background-color: #e2e2e2;
}
.select-active {
    background-color: #88C928!important;
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
