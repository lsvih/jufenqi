<template>
<div>
  <header>
    <tab active-color='#88C929' :index.sync="index">
      <tab-item active-class="tab-active" :selected="tab === '门店'" v-tap="tab = '门店'">门店</tab-item>
      <tab-item active-class="tab-active" :selected="tab === '工长'" v-tap="tab = '工长'">工长</tab-item>
      <tab-item active-class="tab-active" :selected="tab === '软装'" v-tap="tab = '软装'">软装</tab-item>
    </tab>
  </header>

  <swiper :index.sync="index" :height="getScreenHeight()+'px'" :show-dots="false">
    <swiper-item height="100%">
      <div class="tab-swiper vux-center content">
        <scroller :height="getScreenHeight()-88+'px'" lock-x scroller-y>
          <group style="margin-top:-1.17647059em;">
            <cell v-for="shop in shopList" class="cell-item">
              <div class="click-area-select" v-tap="selectItem('Shop',shop.id)"></div>
              <div class="click-area-detail" onclick="location.href='shop-detail.html'"></div>
              <img :src="shop.img" class="shop-logo" width="120px" height="80px">
              <div class="shop-name">{{shop.name}}</div>
              <div class="shop-address">{{shop.address}}</div>
              <div class="shop-rank">评分:{{shop.rank}}</div>
              <img v-if="isSelect('Shop',shop.id)" class="shop-is-favorite" src="selected.png">
              <img v-else class="shop-is-favorite" src="toselect.png">
            </cell>
          </group>
        </scroller>
        <div class="submit-btn" :class="{'select-active':isSelectShop()}" v-tap="isSelectShop()?selectShop():return">预约</div>
      </div>
    </swiper-item>
    <swiper-item height="100%">
      <div class="tab-swiper vux-center content">
        <scroller :height="getScreenHeight()-88+'px'" lock-x scroller-y>
          <group style="margin-top:-1.17647059em;">
            <cell v-for="worker in workerList" class="cell-item">
              <div class="click-area-select" v-tap="selectItem('Worker',worker.userId)"></div>
              <div class="click-area-detail" v-tap="goto('worker-detail.html?id='+worker.userId)"></div>
              <div class="click-area-del" v-tap="del('Worker',worker.userId)"></div>
              <img :src="worker.profileImage" class="worker-logo" width="120px" height="80px">
              <div class="worker-name">{{worker.nickname}}</div>
              <div class="worker-address">{{worker.nativePlace}}</div>
              <div class="worker-rank">评分:{{worker.rating}}</div>
              <div class="worker-del">删除</div>
              <img v-if="isSelect('Worker',worker.userId)" class="worker-is-favorite" src="selected.png">
              <img v-else class="worker-is-favorite" src="toselect.png">
            </cell>
          </group>
        </scroller>
        <div class="submit-btn" :class="{'select-active':isSelectWorkers()}" v-tap="isSelectWorkers()?selectWorkers():return">预约</div>
      </div>
    </swiper-item>
    <swiper-item>
      <div class="tab-swiper vux-center">3</div>
    </swiper-item>
  </swiper>
  <toast :show.sync="showToast" :text="toastText"></toast>
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
export default {
  data() {
    return {
      index: 0,
      tab: '门店',
      showToast: false,
      toastText: "",
      workerList: window.localStorage.getItem("cart") ? JSON.parse(window.localStorage.getItem("cart")).worker : [],
      shopList: [{
        id: 1,
        name: 'hahah',
        img: 'http://placekitten.com/g/120/80',
        address: '123sdafsd',
        rank: 4.7
      }, {
        id: 2,
        name: 'hahah',
        img: 'http://placekitten.com/g/120/80',
        address: '123sdafsd',
        rank: 4.7
      }, {
        id: 3,
        name: 'hahah',
        img: 'http://placekitten.com/g/120/80',
        address: '123sdafsd',
        rank: 4.7
      }, {
        id: 4,
        name: 'hahah',
        img: 'http://placekitten.com/g/120/80',
        address: '123sdafsd',
        rank: 4.7
      }],
      selectWorker: [],
      selectShop: []
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
    Toast
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
      } else {

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
    selectShop() {
      this.goto(`select-shop.html?select=${this.selectShop.join('|')}`)
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
.cell-item {
    position: relative;
    height: 80px;
    .shop-logo {
        position: absolute;
        top: 10px;
        left: 15px;
        width: 120px;
        height: 80px;
    }
    .shop-name {
        position: absolute;
        top: 10px;
        left: 145px;
        font-size: 12px;
        color: #393939;
    }
    .shop-address {
        position: absolute;
        top: 44px;
        left: 145px;
        font-size: 12px;
        color: #999;
    }
    .shop-rank {
        position: absolute;
        bottom: 10px;
        left: 145px;
        font-size: 12px;
        color: #3ba794;
    }
    .shop-is-favorite {
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
</style>
