<template>
<div>
  <header>
    <tab active-color='#88C929' :index.sync="index">
      <tab-item style="font-size:12px" active-class="tab-active" :selected="index == 0" v-tap="index = 0">已预约</tab-item>
      <tab-item style="font-size:12px" active-class="tab-active" :selected="index == 1" v-tap="index = 1">待选方案</tab-item>
      <tab-item style="font-size:12px" active-class="tab-active" :selected="index == 2" v-tap="index = 2">待支付</tab-item>
      <tab-item style="font-size:12px" active-class="tab-active" :selected="index == 3" v-tap="index = 3">待施工</tab-item>
      <tab-item style="font-size:12px" active-class="tab-active" :selected="index == 4" v-tap="index = 4">施工中</tab-item>
      <tab-item style="font-size:12px" active-class="tab-active" :selected="index == 5" v-tap="index = 5">已完成</tab-item>
    </tab>
  </header>
  <swiper :index.sync="index" :height="getScreenHeight()+'px'" :show-dots="false">
    <swiper-item height="100%">
      <div class="tab-swiper vux-center content">
        <scroller :height="getScreenHeight()-44+'px'" lock-x scrollbar-y v-ref:lista>
          <div>
          <no-data v-if="list0.length==0"></no-data>
          <div v-else>
            <j-zx-order-list-item v-for="order in list0" :data="order"></j-zx-order-list-item>
          </div>
        </div>
        </scroller>
      </div>
    </swiper-item>
    <swiper-item height="100%">
      <div class="tab-swiper vux-center content">
        <scroller :height="getScreenHeight()-44+'px'" lock-x scrollbar-y v-ref:listb>
          <div>
            <no-data v-if="list1.length==0"></no-data>
            <div v-else>
              <j-zx-order-list-item v-for="order in list1" :data="order"></j-zx-order-list-item>
            </div>
          </div>
        </scroller>
      </div>
    </swiper-item>
    <swiper-item>
      <div class="tab-swiper vux-center content">
        <scroller :height="getScreenHeight()-44+'px'" lock-x scrollbar-y v-ref:listc>
          <div>
            <no-data v-if="list2.length==0"></no-data>
            <div v-else>
              <j-zx-order-list-item v-for="order in list2" :data="order"></j-zx-order-list-item>
            </div>
          </div>
        </scroller>
      </div>
    </swiper-item>
    <swiper-item>
      <div class="tab-swiper vux-center content">
        <scroller :height="getScreenHeight()-44+'px'" lock-x scrollbar-y v-ref:listd>
          <div>
            <no-data v-if="list3.length==0"></no-data>
            <div v-else>
              <j-zx-order-list-item v-for="order in list3" :data="order"></j-zx-order-list-item>
            </div>
          </div>
        </scroller>
      </div>
    </swiper-item>
    <swiper-item>
      <div class="tab-swiper vux-center content">
        <scroller :height="getScreenHeight()-44+'px'" lock-x scrollbar-y v-ref:liste>
          <div>
            <no-data v-if="list4.length==0"></no-data>
            <div v-else>
              <j-zx-order-list-item v-for="order in list4" :data="order"></j-zx-order-list-item>
            </div>
          </div>
        </scroller>
      </div>
    </swiper-item>
    <swiper-item>
      <div class="tab-swiper vux-center content">
        <scroller :height="getScreenHeight()-44+'px'" lock-x scrollbar-y v-ref:listf>
          <div>
            <no-data v-if="list5.length==0"></no-data>
            <div v-else>
              <j-zx-order-list-item v-for="order in list5" :data="order"></j-zx-order-list-item>
            </div>
          </div>
        </scroller>
      </div>
    </swiper-item>
  </swiper>
</div>



<confirm :show.sync="showConfirm.cancel" title="" confirm-text="是" cancel-text="否" @on-confirm="cancel(tempOrderNo)">
  <p style="text-align:center;">您确认要取消该预约吗?</p>
</confirm>

<confirm :show.sync="showConfirm.delete" title="" confirm-text="是" cancel-text="否" @on-confirm="deleteOrder(tempOrderNo)">
  <p style="text-align:center;">您确认要删除该订单吗?</p>
</confirm>
</template>

<script>
import Lib from 'assets/Lib.js'
import {
  Tab,
  TabItem
} from 'vux-components/tab'
import Swiper from 'vux-components/swiper'
import SwiperItem from 'vux-components/swiper-item'
import Confirm from 'vux-components/confirm'
import JZxOrderListItem from 'components/j-zx-order-list-item'
import Scroller from 'vux-components/scroller'
import NoData from 'common/components/no-data'
import axios from 'axios'
try {
  let now = Number(new Date().getTime())
  if (Number(JSON.parse(localStorage.user).expiredAt) < now) {
    localStorage.removeItem('user')
    location.href = './wxAuth.html?url=' + encodeURIComponent(location.href)
  }
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
      showConfirm: {
        cancel: false,
        delete: false
      },
      tempOrderNo: null
    }
  },
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    Scroller,
    Confirm,
    NoData,
    JZxOrderListItem
  },
  ready() {
    axios.get(`${Lib.C.orderApi}decorationOrders`, {
      params: {
        filter: `customerId:${JSON.parse(window.localStorage.getItem('user')).userId}|status:[1,7]`,
        sort: 'createdAt,desc'
      }
    }).then((res) => {
      res.data.data.map((order) => {
        switch (order.status) {
          case 1:
          case 2:
            this.list0.push(order)
            break;
          case 3:
            this.list1.push(order)
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
          case 7:
            this.list5.push(order)
            break;
          default:
            break;
        }
      })
      setTimeout(() => {
        this.$refs.lista.reset()
        this.$refs.listb.reset()
        this.$refs.listc.reset()
        this.$refs.listd.reset()
        this.$refs.liste.reset()
        this.$refs.listf.reset()
      }, 500)
    }).catch((err) => {
      throw err
    })
  },
  methods: {
    getScreenHeight() {
      return document.body.clientHeight
    },
    cancel(orderNo) {
      axios.post(`${Lib.C.orderApi}decorationOrders/${orderNo}/confirmCancel`).then((res) => {
        alert('取消预约成功！')
        location.reload()
      }).catch((err) => {
        alert('取消预约失败，请重试')
        throw err
      })
    },
    deleteOrder(orderNo) {
      axios.post(`${Lib.C.orderApi}decorationOrders/${orderNo}/confirmDelete`).then((res) => {
        alert('删除订单成功！')
        location.reload()
      }).catch((err) => {
        alert('删除订单失败，请重试')
        throw err
      })
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
