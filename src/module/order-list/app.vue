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
            <div class="order" v-for="order in zxList">
              <div class="zc-line-1">
                <div class="zc-user-name">{{order.customerName}}</div>
                <div class="zc-user-address">{{order.orderLocation+order.orderAddress}}</div>
                <div class="zc-user-more" v-tap="viewDetail('zx',order.orderNo)">查看详情</div>
              </div>
              <div class="zc-line-2">
                <div class="zc-order-date"><img src="./time.png">{{getTime(order.orderTime)}}</div>
                <div class="zc-order-status">{{zxStatusList[order.status].name}}</div>
              </div>
              <div class="zc-line-3">
                <div class="zc-butler-img"><img :src="order.manager.profileImage"></div>
                <div class="zc-butler-name">{{order.manager.nickname}}</div>
                <div class="zc-butler-tel" onclick="location.href='tel:{{order.manager.mobile}}'"><img src="tel.png"></div>
              </div>
              <div class="zc-line-3">
                <div class="zc-butler-img"><img :src="order.planList[0].foreman.profileImage"></div>
                <div class="zc-butler-name">{{order.planList[0].foreman.nickname}}</div>
                <div class="zc-butler-tel" onclick="location.href='tel:{{order.planList[0].foreman.mobile}}'"><img src="tel.png"></div>
              </div>
              <div class="zc-line-3" v-if="order.planList.length===2">
                <div class="zc-butler-img"><img :src="order.planList[1].foreman.profileImage"></div>
                <div class="zc-butler-name">{{order.planList[1].foreman.nickname}}</div>
                <div class="zc-butler-tel" onclick="location.href='tel:{{order.planList[1].foreman.mobile}}'"><img src="tel.png"></div>
              </div>
              <div class="zc-line-3">
                <div class="zc-butler-img"><img :src="order.projectManager.profileImage"></div>
                <div class="zc-butler-name">{{order.projectManager.nickname}}</div>
                <div class="zc-butler-tel" onclick="location.href='tel:{{order.projectManager.mobile}}'"><img src="tel.png"></div>
              </div>
            </div>
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
            <div class="order" v-for="order in zcList">
              <div class="zc-line-1">
                <div class="zc-user-name">{{order.customerName}}</div>
                <!-- <div class="zc-user-address">{{order.userAddress}}</div> -->
                <div class="zc-user-more" v-tap="viewDetail('zc',order.orderNo)">查看详情</div>
              </div>
              <div class="zc-line-2">
                <div class="zc-order-date"><img src="./time.png">{{getTime(order.orderTime)}}</div>
                <div class="zc-order-status">{{zcStatusList[order.status].name}}</div>
              </div>
              <div class="zc-line-3">
                <div class="zc-butler-img"><img :src="order.manager.profileImage"></div>
                <div class="zc-butler-name">{{order.manager.nickname}}</div>
                <div class="zc-butler-tel" onclick="location.href='tel:{{order.manager.mobuil}}'"><img src="tel.png"></div>
              </div>
              <div class="zc-line-4" v-if="order.status > 1">
                <div class="zc-count">总额<span>{{order.normalAmountTotal + order.specialAmountTotal|currency "￥" 2}}</span></div>
              </div>
            </div>
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
            <div class="order" v-for="order in tkList">
              <div class="zc-line-1">
                <div class="zc-user-name">{{order.customerName}}</div>
                <!-- <div class="zc-user-address">{{order.userAddress}}</div> -->
              </div>
              <div class="zc-line-2">
                <div class="zc-order-shop">{{order.store.name}}</div>
                <div class="zc-order-status">{{zcStatusList[order.status].name}}</div>
              </div>
              <div class="zc-line-3">
                <div class="zc-butler-img"><img :src="order.manager.profileImage"></div>
                <div class="zc-butler-name">{{order.manager.nickname}}</div>
                <div class="zc-butler-tel" onclick="location.href='tel:{{order.manager.mobile}}'"><img src="tel.png"></div>
              </div>
              <div class="zc-line-4" v-if="order.status > 0">
                <div class="zc-count">退款金额<span>{{order.customerRefundAmount|currency "￥" 2}}</span></div>
              </div>
            </div>
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
export default {
  data() {
    return {
      index: 0,
      zcStatusList: [{
        status: 0,
        name: "订单已删除"
      }, {
        status: 1,
        name: "已预约"
      }, {
        status: 2,
        name: "待确认"
      }, {
        status: 3,
        name: "待付款"
      }, {
        status: 4,
        name: "待收货"
      }, {
        status: 5,
        name: "已收货"
      }, {
        status: 6,
        name: "退款中"
      }, {
        status: 7,
        name: "已退款"
      }, {
        status: 8,
        name: "已取消"
      }],
      zxStatusList: [{
        status: 0,
        name: "订单已删除"
      }, {
        status: 1,
        name: "已预约"
      }, {
        status: 2,
        name: "已上门"
      }, {
        status: 3,
        name: "待选方案"
      }, {
        status: 4,
        name: "待支付"
      }, {
        status: 5,
        name: "待施工"
      }, {
        status: 6,
        name: "施工中"
      }, {
        status: 7,
        name: "已完工"
      }, {
        status: 8,
        name: "订单已取消"
      }],
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
    Scroller
  },
  ready() {
    let suc_count = 0
    this.index = (Lib.M.GetRequest().type - 1) || 0
    this.$http.get(`${Lib.C.orderApi}decorationOrders`, {
      params: {
        filter: `customerId:${JSON.parse(window.localStorage.getItem('user')).userId}|status:[1,7]`
      }
    }).then((res) => {
      res.data.data.map((e) => {
        this.zxList.push(e)
      })
      this.$refs.zx.reset()
    }, (res) => {
      alert("获取订单失败，请稍候再试QAQ")
    })
    this.$http.get(`${Lib.C.mOrderApi}materialSubOrders`, {
      params: {
        filter: `customerId:${JSON.parse(window.localStorage.getItem('user')).userId}|status:[6,7]`
      }
    }).then((res) => {
      res.data.data.map((e) => {
        this.tkList.push(e)
      })
      this.$refs.tk.reset()
    }, (res) => {
      alert("获取订单失败，请稍候再试QAQ")
    })
    this.$http.get(`${Lib.C.mOrderApi}materialOrders`, {
      params: {
        filter: `customerId:${JSON.parse(window.localStorage.getItem('user')).userId}|status:[1,5]`
      }
    }).then((res) => {
      res.data.data.map((e) => {
        this.zcList.push(e)
      })
      this.$refs.zc.reset()
    }, (res) => {
      alert("获取订单失败，请稍候再试QAQ")
    })
  },
  methods: {
    getTabType(index) {
      console.log(index)
      switch (index) {
        case 0:
          return '装修订单'
          break
        case 1:
          return '主材订单'
          break
        case 2:
          return '软装订单'
          break
        default:
          return '装修订单'
          break
      }
    },
    getScreenHeight() {
      return document.body.clientHeight
    },
    getTime(timeStamp) {
      var d = new Date(timeStamp*1000);
      var Y = d.getFullYear() + '-';
      var M = (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) + '-';
      var D = (d.getDate() < 10 ? '0' + (d.getDate()) : d.getDate());
      return Y + M + D
    },
    viewDetail(type, orderNo) {
      eval(`window.location.href='${type}-order.html?orderNo=${orderNo}'`)
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
.order {
    width: 100%;
    height: auto;
    background-color: #fff;
    margin-bottom: 10px;
    .zc-line-1 {
        height: 50px;
        width: 100%;
        border-bottom: 1px solid #eee;
        position: relative;
        .zc-user-name {
            position: absolute;
            top: 6px;
            left: 15px;
            font-size: 16px;
            color: #393939;
        }
        .zc-user-address {
            position: absolute;
            bottom: 6px;
            left: 15px;
            font-size: 12px;
            color: #393939;
        }
        .zc-user-more {
            position: absolute;
            top: 19px;
            right: 15px;
            font-size: 12px;
            color: #3ba794;
        }
    }
    .zc-line-2 {
        height: 40px;
        width: 100%;
        border-bottom: 1px solid #eee;
        position: relative;
        .zc-order-date {
            position: absolute;
            top: 14px;
            left: 15px;
            font-size: 12px;
            color: #393939;
            img {
                vertical-align: middle;
                height: 12px;
                width: 12px;
                margin-right: 5px;
            }
        }
        .zc-order-shop {
            position: absolute;
            top: 0;
            left: 15px;
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            color: #393939;
        }
        .zc-order-status {
            position: absolute;
            right: 15px;
            top: 15px;
            font-size: 12px;
            color: #393939;
        }
    }
    .zc-line-3 {
        height: 50px;
        width: 100%;
        border-bottom: 1px solid #eee;
        position: relative;
        .zc-butler-img {
            position: absolute;
            top: 5px;
            left: 15px;
            height: 40px;
            width: 40px;
            border-radius: 20px;
            img {
                height: 100%;
                width: 100%;
                border-radius: 50%;
            }
        }
        .zc-butler-name {
            position: absolute;
            bottom: 15px;
            left: 65px;
            font-size: 16px;
            color: #393939;
        }
        .zc-butler-tel {
            position: absolute;
            top: 15px;
            right: 15px;
            height: 20px;
            width: 20px;
            img {
                height: 100%;
                width: 100%;
            }
        }
    }
    .zc-line-4 {
        position: relative;
        height: 20px;
        width: 100%;
        .zc-count {
            position: absolute;
            right: 15px;
            top: 4px;
            font-size: 12px;
            color: #393939;
            span {
                color: #EC5835;
            }
        }
    }
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
