<template>
<div>
  <header>
    <tab active-color='#88C929' :index.sync="index">
      <tab-item active-class="tab-active" :selected="index === 0" v-tap="index = 0">装修订单</tab-item>
      <tab-item active-class="tab-active" :selected="index === 1" v-tap="index = 1">主材订单</tab-item>
      <tab-item active-class="tab-active" :selected="index === 2" v-tap="index = 2">退款订单</tab-item>
    </tab>
  </header>
  <swiper :index.sync="index" :height="getScreenHeight()+'px'" :show-dots="false">
    <swiper-item height="100%">
      <div class="tab-swiper vux-center content">
        <scroller :height="getScreenHeight()-44+'px'" lock-x scroller-y v-ref:zx>
          <no-data v-if="zxList.length==0"></no-data>
          <div v-else>
            <j-zx-order-item :data="order" role="user" v-for="order in zxList"></j-zx-order-item>
          </div>
        </scroller>
      </div>
    </swiper-item>
    <swiper-item height="100%">
      <div class="tab-swiper vux-center content">
        <scroller :height="getScreenHeight()-44+'px'" lock-x scroller-y v-ref:zc>
          <no-data v-if="zcList.length==0"></no-data>
          <div v-else>
            <j-zc-order-item :data="order" v-for="order in zcList" role="user"></j-zc-order-item>
          </div>
        </scroller>
      </div>
    </swiper-item>
    <swiper-item>
      <div class="tab-swiper vux-center content">
        <scroller :height="getScreenHeight()-44+'px'" lock-x scroller-y v-ref:tk>
          <no-data v-if="tkList.length==0"></no-data>
          <div v-else>
            <j-tk-order-item :data="order" role="user" v-for="order in tkList"></j-tk-order-item>
          </div>
        </scroller>
      </div>
    </swiper-item>
  </swiper>
</div>
</template>

<script>
import Lib from 'assets/Lib.js'
import {
  Tab,
  TabItem
} from 'vux-components/tab'
import Swiper from 'vux-components/swiper'
import SwiperItem from 'vux-components/swiper-item'
import Scroller from 'vux-components/scroller'
import JZcOrderItem from 'common/components/j-zc-order-item'
import JZxOrderItem from 'common/components/j-zx-order-item'
import JTkOrderItem from 'common/components/j-tk-order-item'
import NoData from 'common/no-data'
import axios from 'axios'
try{
  axios.defaults.headers.common['x-user-token'] = JSON.parse(localStorage.getItem("user")).token
}catch(e){
  localStorage.clear()
  window.location.href = `./wxAuth.html?url=index.html`
}
export default {
  data() {
    return {
      index: 0,
      zxList: [],
      zcList: [],
      tkList: []
    }
  },
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    Scroller,
    JZcOrderItem,
    JZxOrderItem,
    JTkOrderItem,
    NoData
  },
  ready() {
    let suc_count = 0
    this.index = (Lib.M.GetRequest().type - 1) || 0
    axios.get(`${Lib.C.orderApi}decorationOrders`, {
      params: {
        filter: `customerId:${JSON.parse(window.localStorage.getItem('user')).userId}|status:[1,7]`,
        sort: 'createdAt,desc'
      }
    }).then((res) => {
      res.data.data.map((e) => {
        this.zxList.push(e)
      })
      this.$refs.zx.reset()
    }).catch((res) => {
      alert("获取订单失败，请稍候再试QAQ")
    })
    axios.get(`${Lib.C.mOrderApi}materialSubOrders`,{
      params: {
        filter: `customerId:${JSON.parse(window.localStorage.getItem('user')).userId}|status:[6,7]`,
        sort: 'createdAt,desc'
      }
    }).then((res) => {
      res.data.data.map((e) => {
        this.tkList.push(e)
      })
      this.$refs.tk.reset()
    }).catch((res) => {
      alert("获取订单失败，请稍候再试QAQ")
    })
    axios.get(`${Lib.C.mOrderApi}materialOrders`,{
      params: {
        filter: `customerId:${JSON.parse(window.localStorage.getItem('user')).userId}|status:[1,5]`,
        sort: 'createdAt,desc'
      }
    }).then((res) => {
      res.data.data.map((e) => {
        this.zcList.push(e)
      })
      this.$refs.zc.reset()
    }).catch((res) => {
      alert("获取订单失败，请稍候再试QAQ")
    })
  },
  methods: {
    getScreenHeight() {
      return document.body.clientHeight
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
</style>
