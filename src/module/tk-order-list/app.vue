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
    color: #ff9736 !important;
    border-color: #ff9736 !important;
    font-size: 12px!important;
}
</style>

<template>
<div>
  <header>
    <tab active-color='#ff9736' :index.sync="index">
      <tab-item style="font-size:12px" active-class="tab-active" :selected="index == 0" v-tap="index = 0">退款申请</tab-item>
      <tab-item style="font-size:12px" active-class="tab-active" :selected="index == 1" v-tap="index = 1">已确认</tab-item>
      <tab-item style="font-size:12px" active-class="tab-active" :selected="index == 2" v-tap="index = 2">退款中</tab-item>
      <tab-item style="font-size:12px" active-class="tab-active" :selected="index == 3" v-tap="index = 3">退款成功</tab-item>
      <tab-item style="font-size:12px" active-class="tab-active" :selected="index == 4" v-tap="index = 4">退款失败</tab-item>
    </tab>
  </header>
  <swiper :index.sync="index" :height="getScreenHeight()+'px'" :show-dots="false">
    <swiper-item height="100%">
      <div class="tab-swiper vux-center content">
        <scroller :height="getScreenHeight()-44+'px'" lock-x scrollbar-y v-ref:lista>
          <div>
          <no-data v-if="list0.length==0"></no-data>
          <div v-else>
            <j-tk-order-list-item v-for="order in list0" :data="order"></j-tk-order-list-item>
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
              <j-tk-order-list-item v-for="order in list1" :data="order"></j-tk-order-list-item>
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
              <j-tk-order-list-item v-for="order in list2" :data="order"></j-tk-order-list-item>
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
              <j-tk-order-list-item v-for="order in list3" :data="order"></j-tk-order-list-item>
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
              <j-tk-order-list-item v-for="order in list4" :data="order"></j-tk-order-list-item>
            </div>
          </div>
        </scroller>
      </div>
    </swiper-item>
  </swiper>
</div>


<confirm :show="reasonShow" cancel-text="确定" confirm-text="拨打客服电话" @on-cancel="reasonShow = false" @on-confirm="refundFailed()" title="退款失败原因">
  <p style="text-align: center;">{{refusalReason}}</p>
</confirm>
<!-- <confirm :show.sync="showConfirm.cancel" title="" confirm-text="是" cancel-text="否" @on-confirm="cancel(tempOrderNo)">
  <p style="text-align:center;">您确认要撤销退款吗?</p>
</confirm>

<confirm :show.sync="showConfirm.delete" title="" confirm-text="是" cancel-text="否" @on-confirm="deleteOrder(tempOrderNo)">
  <p style="text-align:center;">您确认要删除该订单吗?</p>
</confirm> -->
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
import JTkOrderListItem from 'components/j-tk-order-list-item'
import Scroller from 'vux-components/scroller'
import NoData from 'common/components/no-data'
import axios from 'axios'
Lib.M.auth(axios)
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
      tempOrderNo: null,
      reasonShow: false,
      refusalReason: ''
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
    JTkOrderListItem
  },
  ready() {
    axios.get(`${Lib.C.mOrderApi}materialRefundOrders`, {
      params: {
        filter: `order.customerId:${JSON.parse(window.localStorage.getItem('user')).userId}|status:[1,5]`,
        sort: 'createdAt,desc'
      }
    }).then((res) => {
      res.data.data.map((order) => {
        switch (order.status) {
          case 1:
            this.list0.push(order)
            break;
          case 2:
            this.list1.push(order)
            break;
          case 3:
            this.list2.push(order)
            break;
          case 4:
            this.list3.push(order)
            break;
          case 5:
            this.list4.push(order)
            break;
          default:
            break;
        }
      })
      this.$nextTick(() => {
        this.$refs.lista.reset()
        this.$refs.listb.reset()
        this.$refs.listc.reset()
        this.$refs.listd.reset()
        this.$refs.liste.reset()
      })
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
    },
    refundFailed() {
      this.reasonShow = false
      location.href = "tel:40000390808"
    }
  }
}
</script>