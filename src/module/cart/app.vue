<template>
<div>
  <header>
    <tab active-color='#9EBC2B' :index.sync="index">
      <tab-item active-class="tab-active" :selected="tab === '门店'" @click="tab = '门店'">门店</tab-item>
      <tab-item active-class="tab-active" :selected="tab === '工长'" @click="tab = '工长'">工长</tab-item>
      <tab-item active-class="tab-active" :selected="tab === '软装'" @click="tab = '软装'">软装</tab-item>
    </tab>
  </header>

  <swiper :index.sync="index" :height="getScreenHeight()+'px'" :show-dots="false">
    <swiper-item height="100%">
      <div class="tab-swiper vux-center content">
        <scroller :height="getScreenHeight()-44+'px'" lock-x scroller-y>
          <group style="margin-top:-1.17647059em;">
            <cell v-for="shop in shopList" class="cell-item">
              <div class="click-area-select" @click="selectItem('Shop',shop.id)"></div>
              <div class="click-area-detail" onclick="location.href='shop-detail.html'"></div>
              <img :src="shop.img" class="shop-logo" width="120px" height="80px">
              <div class="shop-name">{{shop.name}}</div>
              <div class="shop-address">{{shop.address}}</div>
              <div class="shop-rank">评分:{{shop.rank}}</div>
              <img v-if="isSelect('Shop',shop.id)" class="shop-is-favorite" src="check-active.png">
              <img v-else class="shop-is-favorite" src="check.png">
            </cell>
          </group>
        </scroller>
      </div>
    </swiper-item>
    <swiper-item height="100%">
      <div class="tab-swiper vux-center content">
        <scroller :height="getScreenHeight()-44+'px'" lock-x scroller-y>
          <group style="margin-top:-1.17647059em;">
            <cell v-for="worker in workerList" class="cell-item">
              <div class="click-area-select" @click="selectItem('Worker',worker.id)"></div>
              <div class="click-area-detail" onclick="location.href='worker-detail.html'"></div>
              <img :src="worker.img" class="worker-logo" width="120px" height="80px">
              <div class="worker-name">{{worker.name}}</div>
              <div class="worker-address">{{worker.address}}</div>
              <div class="worker-rank">评分:{{worker.rank}}</div>
              <img v-if="isSelect('Worker',worker.id)" class="worker-is-favorite" src="check-active.png">
              <img v-else class="worker-is-favorite" src="check.png">
            </cell>
          </group>
        </scroller>
      </div>
    </swiper-item>
    <swiper-item>
      <div class="tab-swiper vux-center">3</div>
    </swiper-item>
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
export default {
  data() {
    return {
      index: 0,
      tab: '门店',
      workerList: [{
        id: 1,
        name: 'hahah',
        img: 'http://placekitten.com/g/80/80',
        address: '123sdafsd',
        rank: 4.7
      }, {
        id: 2,
        name: 'hahah',
        img: 'http://placekitten.com/g/80/80',
        address: '123sdafsd',
        rank: 4.7
      }, {
        id: 3,
        name: 'hahah',
        img: 'http://placekitten.com/g/80/80',
        address: '123sdafsd',
        rank: 4.7
      }, {
        id: 4,
        name: 'hahah',
        img: 'http://placekitten.com/g/80/80',
        address: '123sdafsd',
        rank: 4.7
      }],
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
    Scroller
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
      //TODO
      console.log(1)
      return false
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
        color: #5965B2;
    }
    .shop-is-favorite {
        position: absolute;
        top: 40px;
        right: 15px;
        width: 20px;
        height: 20px;
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
        color: #5965B2;
    }
    .worker-is-favorite {
        position: absolute;
        top: 40px;
        right: 15px;
        width: 20px;
        height: 20px;
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
}
.tab-active {
    color: #9EBC2B !important;
    border-color: #9EBC2B !important;
}
.click-area-select {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 50px;
}
.click-area-detail {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: calc( ~"100% - 50px" );
}
</style>
