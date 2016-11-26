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
          <div>
            <j-zx-order-item :data="order" role="user" v-for="order in zxList"></j-zx-order-item>
          </div>
          <div v-if="zxList.length==0">
            <div class="no-data"><img src="no-data.png"><span>暂无订单</span></div>
          </div>
        </scroller>
      </div>
    </swiper-item>
    <swiper-item height="100%">
      <div class="tab-swiper vux-center content">
        <scroller :height="getScreenHeight()-44+'px'" lock-x scroller-y v-ref:zc>
          <div>
            <j-zc-order-item :data="order" v-for="order in zcList" role="user"></j-zc-order-item>
          </div>
          <div v-if="zcList.length==0">
            <div class="no-data"><img src="no-data.png"><span>暂无订单</span></div>
          </div>
        </scroller>
      </div>
    </swiper-item>
    <swiper-item>
      <div class="tab-swiper vux-center content">
        <scroller :height="getScreenHeight()-44+'px'" lock-x scroller-y v-ref:tk>
          <div>
            <j-tk-order-item :data="order" role="user" v-for="order in tkList"></j-tk-order-item>
          </div>
          <div v-if="tkList.length==0">
            <div class="no-data"><img src="no-data.png"><span>暂无订单</span></div>
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
import JZcOrderItem from 'common/components/j-zc-order-item.vue'
import JZxOrderItem from 'common/components/j-zx-order-item.vue'
import JTkOrderItem from 'common/components/j-tk-order-item.vue'
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
    JTkOrderItem
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
.no-data {
    position: relative;
    width: 100%;
    img {
        position: absolute;
        top: 220px;
        left: calc( ~"50% - 35.5px" );
        height: 71px;
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
        top: 307px;
        color: #DADADA;
        text-align: center;
    }
}
</style>
