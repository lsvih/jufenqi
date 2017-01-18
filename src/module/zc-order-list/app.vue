<template>
<div>
  <header>
    <tab active-color='#88C929' :index.sync="index">
      <tab-item style="font-size:12px" active-class="tab-active" :selected="index == 0" v-tap="index = 0">已预约</tab-item>
      <tab-item style="font-size:12px" active-class="tab-active" :selected="index == 1" v-tap="index = 1">待支付</tab-item>
      <tab-item style="font-size:12px" active-class="tab-active" :selected="index == 2" v-tap="index = 2">待确认</tab-item>
      <tab-item style="font-size:12px" active-class="tab-active" :selected="index == 3" v-tap="index = 3">待收货</tab-item>
      <tab-item style="font-size:12px" active-class="tab-active" :selected="index == 4" v-tap="index = 4">已完成</tab-item>
      <tab-item style="font-size:12px" active-class="tab-active" :selected="index == 5" v-tap="index = 5">继续支付</tab-item>
    </tab>
  </header>
  <swiper :index.sync="index" :height="getScreenHeight()+'px'" :show-dots="false">
    <swiper-item height="100%">
      <div class="tab-swiper vux-center content">
        <scroller :height="getScreenHeight()-44+'px'" :lock-x="true" scrollbar-y v-ref:lista>
          <div>
            <no-data v-if="list0.length==0"></no-data>
            <div v-else>
              <j-zc-order-list-item v-for="order in list0" :data="order"></j-zc-order-list-item>
            </div>
          </div>
        </scroller>
      </div>
    </swiper-item>
    <swiper-item height="100%">
      <div class="tab-swiper vux-center content">
        <scroller :height="getScreenHeight()-44+'px'" :lock-x="true" scrollbar-y v-ref:listb>
          <div>
            <no-data v-if="list1.length==0"></no-data>
            <div v-else>
              <j-zc-order-list-item v-for="order in list1" :data="order"></j-zc-order-list-item>
            </div>
          </div>
        </scroller>
      </div>
    </swiper-item>
    <swiper-item>
      <div class="tab-swiper vux-center content">
        <scroller :height="getScreenHeight()-44+'px'" :lock-x="true" scrollbar-y v-ref:listc>
          <div>
            <no-data v-if="list2.length==0"></no-data>
            <div v-else>
              <j-zc-order-list-item v-for="order in list2" :data="order"></j-zc-order-list-item>
            </div>
          </div>
        </scroller>
      </div>
    </swiper-item>
    <swiper-item>
      <div class="tab-swiper vux-center content">
        <scroller :height="getScreenHeight()-44+'px'" :lock-x="true" scrollbar-y v-ref:listd>
          <div>
            <no-data v-if="list3.length==0"></no-data>
            <div v-else>
              <j-zc-order-list-item v-for="order in list3" :data="order"></j-zc-order-list-item>
            </div>
          </div>
        </scroller>
      </div>
    </swiper-item>
    <swiper-item>
      <div class="tab-swiper vux-center content">
        <scroller :height="getScreenHeight()-44+'px'" :lock-x="true" scrollbar-y v-ref:liste>
          <div>
            <no-data v-if="list4.length==0"></no-data>
            <div v-else>
              <j-zc-order-list-item v-for="order in list4" :data="order"></j-zc-order-list-item>
            </div>
          </div>
        </scroller>
      </div>
    </swiper-item>
    <swiper-item>
      <div class="tab-swiper vux-center content">
        <scroller :height="getScreenHeight()-44+'px'" :lock-x="true" scrollbar-y v-ref:listf>
          <div>
            <no-data v-if="list5.length==0"></no-data>
            <div v-else>
              <j-zc-order-list-item v-for="order in list5" :data="order"></j-zc-order-list-item>
            </div>
          </div>
        </scroller>
      </div>
    </swiper-item>
  </swiper>
</div>
<confirm :show.sync="showConfirm.cancel" title="" confirm-text="是" cancel-text="否" @on-confirm="cancel(tempApptNo)">
  <p style="text-align:center;">您确认要取消该订单吗?</p>
</confirm>
<confirm :show.sync="showConfirm.delete" title="" confirm-text="是" cancel-text="否" @on-confirm="deleteOrder(tempOrderNo)">
  <p style="text-align:center;">您确认要删除该订单吗?</p>
</confirm>
<confirm :show.sync="showConfirm.receive" title="" confirm-text="是" cancel-text="否" @on-confirm="receive(tempOrderNo)">
  <p style="text-align:center;">您是否确认收到货物?</p>
</confirm>
<confirm :show.sync="showConfirm.refund" title=""  confirm-text="是" cancel-text="否" @on-confirm="refund()">
  <p style="text-align:center;" >您确定要退款吗？</p>
</confirm>
<Dialog :show.sync="confirmRefund" >
  <p style="font-size: 18px;">退款申请</p>
  <group>
    <x-input title="正价退款" :value.sync="refundApply.normalAmount" type="number" placeholder="请输入正价退款金额"></x-input>
    <x-input title="特价退款" :value.sync="refundApply.specialAmount" type="number" placeholder="请输入特价退款金额"></x-input>

    <x-textarea :max="50" :value.sync="refundApply.reason" placeholder="请输入您的退款理由" :rows="4" :height="110"></x-textarea>
  
  <div class="weui_dialog_ft">
    <span @click="confirmRefund = false" style="border-right: 1px solid #D5D5D6;">取消</span>
    <span :class="{'primary': isFilled()}" @click="isFilled()?refundPost(tempOrderNo):return">确认申请</span>
  </div>
  </group>
</Dialog>
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
import Confirm from 'vux-components/confirm'
import axios from 'axios'
import Dialog from 'vux-components/dialog'
import XInput from 'vux-components/x-input'
import XTextarea from 'vux-components/x-textarea'
import XButton from 'vux-components/x-button'
import {Flexbox, FlexboxItem} from 'vux-components/flexbox'
import Group from 'vux-components/group'
Lib.M.auth(axios)
export default {
  data() {
    return {
      index: 0,
      list0: [],
      list1: [],
      list2: [],
      list3: [],
      list4: [],
      list5: [],
      tempOrderNo: null,
      tempApptNo: null,
      showConfirm: {
        cancel: false,
        delete: false,
        receive: false,
        refund: false
      },
      confirmRefund: false,
      refundApply: {
        reason: '',
        normalAmount: null,
        specialAmount: null
      }
    }
  },
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    Scroller,
    NoData,
    Confirm,
    JZcOrderListItem,
    Dialog,
    XInput,
    XTextarea,
    XButton,
    FlexboxItem,
    Flexbox,
    Group
  },
  ready() {
    this.index = Lib.M.GetRequest().type - 1 || 0
    axios.get(`${Lib.C.mOrderApi}materialAppts`, {
      params: {
        filter: 'customerId:' + JSON.parse(localStorage.getItem("user")).userId + '|status:[1,3]',
        sort: 'createdAt,DESC',
        size: 1000
      }
    }).then((res) => {
      res.data.data.map((order) => {
        switch (order.status) {
          case 1:
            this.list0.push(order)
            break;
          case 2:
            this.list5.push(order)
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
          default:
            break;
        }
      })
      this.$nextTick(()=> {
        this.$refs.lista.reset()
        this.$refs.listb.reset()
        this.$refs.listc.reset()
        this.$refs.listd.reset()
        this.$refs.liste.reset()
        this.$refs.listf.reset()
      })
    }).catch((err) => {
      throw err
    })
    axios.get(`${Lib.C.mOrderApi}materialOrders`, {
      params: {
        filter: 'customerId:' + JSON.parse(localStorage.getItem("user")).userId + '|status:[4,6]',
        sort: 'createdAt,DESC',
        size: 1000
      }
    }).then((res) => {
      res.data.data.map((order) => {
        switch (order.status) {
          case 1:
            this.list0.push(order)
            break;
          case 2:
            this.list5.push(order)
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
        this.$refs.listf.reset()
      })
    }).catch((err) => {
      throw err
    })
  },
  methods: {
    getScreenHeight() {
      return document.body.clientHeight
    },
    receive(orderNo) {
      axios.post(`${Lib.C.mOrderApi}materialOrders/${orderNo}/receive`).then((res) => {
        alert('确认收货成功！')
        location.reload()
      }).catch((res) => {
        alert('确认收货失败，请重试')
      })
    },
    cancel(apptNo) {
      axios.post(`${Lib.C.mOrderApi}materialAppts/${apptNo}/cancel`).then((res) => {
        alert('取消订单成功！')
        location.reload()
      }).catch((res) => {
        alert('取消订单失败，请重试')
      })
    },
    deleteOrder(orderNo) {
      axios.post(`${Lib.C.mOrderApi}materialOrders/${orderNo}/delete`).then((res) => {
        alert('删除订单成功！')
        location.reload()
      }).catch((res) => {
        alert('删除订单失败，请重试')
      })
    },
    refund() {
      this.confirmRefund = true
    },
    isFilled() {
      return (this.refundApply.normalAmount !== null || this.refundApply.specialAmount !== null) && this.refundApply.reason !== ''
    },
    refundPost(orderNo) {
      axios.post(`${Lib.C.mOrderApi}materialOrders/${orderNo}/refund`,
        {
          reason: this.refundApply.reason,
          normalAmount: this.refundApply.normalAmount?this.refundApply.normalAmount:null,
          specialAmount: this.refundApply.specialAmount?this.refundApply.specialAmount:null
        }
      ).then((res) => {
        alert('您的退款已申请！')
        location.href = './tk-order-list.html'
      }).catch((res) => {
        alert('连接服务器失败，退款未能申请，请稍后再试！')
      })
    },
    goto(url) {
      location.href = url
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
<style lang="less">
@weuiDialogBackgroundColor: #FAFAFC;
@weuiDialogLineColor: #D5D5D6;
@weuiDialogLinkColor: #3CC51F;
@weuiDialogLinkActiveBc: #EEEEEE;

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

/*引用自WEUI*/
.setTapColor(@c:rgba(0,0,0,0)) {
    -webkit-tap-highlight-color: @c;
}
.setTopLine(@c: #C7C7C7) {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    border-top: 1px solid @c;
    color: @c;
    transform-origin: 0 0;
    transform: scaleY(0.5);
}
.setLeftLine(@c: #C7C7C7) {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 1px;
    height: 100%;
    border-left: 1px solid @c;
    color: @c;
    transform-origin: 0 0;
    transform: scaleX(0.5);
}

.weui_dialog_ft {
    position: relative;
    line-height: 42px;
    margin-top: 20px;
    font-size: 17px;
    display: flex;
    span {
        display: block;
        flex: 1;
        color: #888;
        text-decoration: none;
        &:active {
            background-color: @weuiDialogLinkActiveBc;
        }
    }
    &:after {
        content: " ";
        .setTopLine(@weuiDialogLineColor);
    }
    .primary {
        color: #0BB20C;
    }
}
</style>
