<template>
<div>
  <header>
    <tab active-color='#88C929' :index.sync="index">
      <tab-item style="font-size:12px" active-class="tab-active" :selected="index === 0" v-tap="index = 0">已预约</tab-item>
      <tab-item style="font-size:12px" active-class="tab-active" :selected="index === 1" v-tap="index = 1">待支付</tab-item>
      <tab-item style="font-size:12px" active-class="tab-active" :selected="index === 2" v-tap="index = 2">待确认</tab-item>
      <tab-item style="font-size:12px" active-class="tab-active" :selected="index === 3" v-tap="index = 3">待收货</tab-item>
      <tab-item style="font-size:12px" active-class="tab-active" :selected="index === 4" v-tap="index = 4">已完成</tab-item>
      <tab-item style="font-size:12px" active-class="tab-active" :selected="index === 5" v-tap="index = 5">继续支付</tab-item>
    </tab>
  </header>
  <swiper :index.sync="index" :height="getScreenHeight()+'px'" :show-dots="false">
    <swiper-item height="100%">
      <div class="tab-swiper vux-center content">
        <scroller :height="getScreenHeight()-44+'px'" lock-x scroller-y v-ref:listOne>
          <no-data v-if="list0.length==0"></no-data>
          <div v-else>
            <j-zc-order-list-item v-for="order in list0" :data="order"></j-zc-order-list-item>
          </div>
        </scroller>
      </div>
    </swiper-item>
    <swiper-item height="100%">
      <div class="tab-swiper vux-center content">
        <scroller :height="getScreenHeight()-44+'px'" lock-x scroller-y v-ref:listTwo>
          <no-data v-if="list1.length==0"></no-data>
          <div v-else>
            <j-zc-order-list-item v-for="order in list1" :data="order"></j-zc-order-list-item>
          </div>
        </scroller>
      </div>
    </swiper-item>
    <swiper-item>
      <div class="tab-swiper vux-center content">
        <scroller :height="getScreenHeight()-44+'px'" lock-x scroller-y v-ref:listThree>
          <no-data v-if="list2.length==0"></no-data>
          <div v-else>
            <j-zc-order-list-item v-for="order in list2" :data="order"></j-zc-order-list-item>
          </div>
        </scroller>
      </div>
    </swiper-item>
    <swiper-item>
      <div class="tab-swiper vux-center content">
        <scroller :height="getScreenHeight()-44+'px'" lock-x scroller-y v-ref:listFour>
          <no-data v-if="list3.length==0"></no-data>
          <div v-else>
            <j-zc-order-list-item v-for="order in list3" :data="order"></j-zc-order-list-item>
          </div>
        </scroller>
      </div>
    </swiper-item>
    <swiper-item>
      <div class="tab-swiper vux-center content">
        <scroller :height="getScreenHeight()-44+'px'" lock-x scroller-y v-ref:listFive>
          <no-data v-if="list4.length==0"></no-data>
          <div v-else>
            <j-zc-order-list-item v-for="order in list4" :data="order"></j-zc-order-list-item>
          </div>
        </scroller>
      </div>
    </swiper-item>
    <swiper-item>
      <div class="tab-swiper vux-center content">
        <scroller :height="getScreenHeight()-44+'px'" lock-x scroller-y v-ref:listSix>
          <no-data v-if="list5.length==0"></no-data>
          <div v-else>
            <j-zc-order-list-item v-for="order in list5" :data="order"></j-zc-order-list-item>
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
import JZcOrderListItem from 'components/j-zc-order-list-item'
import Scroller from 'vux-components/scroller'
import NoData from 'common/components/no-data'
import axios from 'axios'
try {
  axios.defaults.headers.common['Authorization'] = JSON.parse(localStorage.getItem("user")).tokenType + ' ' + JSON.parse(localStorage.getItem("user")).token
} catch (e) {
  localStorage.clear()
  window.location.href = `./wxAuth.html?url=index.html`
}
export default {
  data() {
    return {
      index: Lib.M.GetRequest().type || 0,
      list0: [],
      list1: [],
      list2: [],
      list3: [],
      list4: [],
      list5: [],
    }
  },
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    Scroller,
    NoData,
    JZcOrderListItem
  },
  ready() {
    let that = this
    axios.get(`${Lib.C.mOrderApi}materialAppts`, {
      params: {
        status: '1,2,3',
        filter: 'customerId:' + JSON.parse(localStorage.getItem("user")).userId,
        sort: 'createdAt,DESC',
        size: 1000
      }
    }).then((res) => {
      res.data.data.map((order) => {
        this.orderPipe(order)
      })
    }).catch((res) => {
      throw res
    })
    axios.get(`${Lib.C.mOrderApi}materialOrders`, {
      params: {
        status: '4,5,6',
        filter: 'customerId:' + JSON.parse(localStorage.getItem("user")).userId,
        sort: 'createdAt,DESC',
        size: 1000
      }
    }).then((res) => {
      res.data.data.map((order) => {
        this.orderPipe(order)
      })
    }).catch((res) => {
      throw res
    })
  },
  methods: {
    getScreenHeight() {
      return document.body.clientHeight
    },
    orderPipe(order) {
      switch (order.status) {
        case 1:
          this.list0.push(order)
          break;
        case 2:
          this.list5.push(order)
          break;
        case 3:
          this.list3.push(order)
          break;
        case 4:
          this.list2.push(order)
          break;
        case 5:
          this.list3.push(order)
          break;
        case 6:
          this.list4.push(order)
          break;
        default:
          break;
      }
      this.$refs.listOne.reset()
      this.$refs.listTwo.reset()
      this.$refs.listThree.reset()
      this.$refs.listFour.reset()
      this.$refs.listFive.reset()
      this.$refs.listSix.reset()

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
    font-size: 12px!important;
}
</style>
