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
        <scroller :height="getScreenHeight()-44+'px'" lock-x scroller-y>
          <div>
            <div class="order" v-for="order in zxList">
              <div class="zc-line-1">
                <div class="zc-user-name">{{order.userName}}</div>
                <div class="zc-user-address">{{order.userAddress}}</div>
                <div class="zc-user-more" onclick="location.href='zx-order.html?status={{order.orderStatus}}'">查看详情</div>
              </div>
              <div class="zc-line-2">
                <div class="zc-order-date"><img src="./time.png">{{order.orderDate}}</div>
                <div class="zc-order-status">{{zxStatusList[order.orderStatus].name}}</div>
              </div>
              <div class="zc-line-3">
                <div class="zc-butler-img"><img :src="order.butlerImg"></div>
                <div class="zc-butler-name">{{order.butlerName}}</div>
                <div class="zc-butler-tel" onclick="location.href='tel:{{order.butlerTel}}'"><img src="tel.png"></div>
              </div>
              <div class="zc-line-3">
                <div class="zc-butler-img"><img :src="order.worker1Img"></div>
                <div class="zc-butler-name">{{order.worker1Name}}</div>
                <div class="zc-butler-tel" onclick="location.href='tel:{{order.worker1Tel}}'"><img src="tel.png"></div>
              </div>
              <div class="zc-line-3" v-if="order.worker2Name">
                <div class="zc-butler-img"><img :src="order.worker2Img"></div>
                <div class="zc-butler-name">{{order.worker2Name}}</div>
                <div class="zc-butler-tel" onclick="location.href='tel:{{order.worker2Tel}}'"><img src="tel.png"></div>
              </div>
              <div class="zc-line-3">
                <div class="zc-butler-img"><img :src="order.surveyorImg"></div>
                <div class="zc-butler-name">{{order.surveyorName}}</div>
                <div class="zc-butler-tel" onclick="location.href='tel:{{order.surveyorTel}}'"><img src="tel.png"></div>
              </div>
            </div>
          </div>
          <div v-if="zxList.length==0">暂无订单</div>
        </scroller>
      </div>
    </swiper-item>
    <swiper-item height="100%">
      <div class="tab-swiper vux-center content">
        <scroller :height="getScreenHeight()-44+'px'" lock-x scroller-y>
          <div>
            <div class="order" v-for="order in zcList">
              <div class="zc-line-1">
                <div class="zc-user-name">{{order.userName}}</div>
                <div class="zc-user-address">{{order.userAddress}}</div>
                <div class="zc-user-more" onclick="location.href='zc-order.html?status={{order.orderStatus}}'">查看详情</div>
              </div>
              <div class="zc-line-2">
                <div class="zc-order-date"><img src="./time.png">{{order.orderDate}}</div>
                <div class="zc-order-status">{{zcStatusList[order.orderStatus].name}}</div>
              </div>
              <div class="zc-line-3">
                <div class="zc-butler-img"><img :src="order.butlerImg"></div>
                <div class="zc-butler-name">{{order.butlerName}}</div>
                <div class="zc-butler-tel" onclick="location.href='tel:{{order.butlerTel}}'"><img src="tel.png"></div>
              </div>
              <div class="zc-line-4" v-if="order.orderStatus > 0">
                <div class="zc-count">总额<span>{{order.orderCount|currency "￥" 2}}</span></div>
              </div>
            </div>
          </div>
          <div v-if="zcList.length==0">暂无订单</div>
        </scroller>
      </div>
    </swiper-item>
    <swiper-item>
      <div class="tab-swiper vux-center content">
        <scroller :height="getScreenHeight()-44+'px'" lock-x scroller-y>
          <div>
            <div class="order" v-for="order in tkList">
              <div class="zc-line-1">
                <div class="zc-user-name">{{order.userName}}</div>
                <div class="zc-user-address">{{order.userAddress}}</div>
              </div>
              <div class="zc-line-2">
                <div class="zc-order-shop">{{order.shop}}</div>
                <div class="zc-order-status">{{tkStatusList[order.orderStatus].name}}</div>
              </div>
              <div class="zc-line-3">
                <div class="zc-butler-img"><img :src="order.butlerImg"></div>
                <div class="zc-butler-name">{{order.butlerName}}</div>
                <div class="zc-butler-tel" onclick="location.href='tel:{{order.butlerTel}}'"><img src="tel.png"></div>
              </div>
              <div class="zc-line-4" v-if="order.orderStatus > 0">
                <div class="zc-count">退款金额<span>{{order.orderCount|currency "￥" 2}}</span></div>
              </div>
            </div>
          </div>
          <div v-if="tkList.length==0">暂无订单</div>
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
        name: "已预约"
      }, {
        status: 1,
        name: "待确认"
      }, {
        status: 2,
        name: "待支付"
      }, {
        status: 3,
        name: "待收货"
      }, {
        status: 4,
        name: "已收货"
      }],
      zxStatusList: [{
        status: 0,
        name: "已预约"
      }, {
        status: 1,
        name: "待选方案"
      }, {
        status: 2,
        name: "待支付"
      }, {
        status: 3,
        name: "待施工"
      }, {
        status: 4,
        name: "已完工"
      }],
      tkStatusList: [{
        status:0,
        name:"退款中"
      },{
        status:1,
        name:"已退款"
      }],
      zxList: [{
        userName: JSON.parse(localStorage.getItem('user')).profile.nickname,
        userAddress: "北京市 朝阳区 光华路",
        orderDate: "2015-12-12",
        orderStatus: 0,
        butlerName: "郑家园",
        butlerTel: "18601230123",
        butlerImg: "http://placekitten.com/g/60/60",
        worker1Name: "郑家园",
        worker1Tel: "18601230123",
        worker1Img: "http://placekitten.com/g/60/60",
        worker2Name: "郑家园",
        worker2Tel: "18601230123",
        worker2Img: "http://placekitten.com/g/60/60",
        surveyorName: "郑家园",
        surveyorTel: "18601230123",
        surveyorImg: "http://placekitten.com/g/60/60",
      }, {
        userName: JSON.parse(localStorage.getItem('user')).profile.nickname,
        userAddress: "北京市 朝阳区 光华路",
        orderDate: "2015-12-12",
        orderStatus: 1,
        butlerName: "郑家园",
        butlerTel: "18601230123",
        butlerImg: "http://placekitten.com/g/60/60",
        worker1Name: "郑家园",
        worker1Tel: "18601230123",
        worker1Img: "http://placekitten.com/g/60/60",
        worker2Name: "郑家园",
        worker2Tel: "18601230123",
        worker2Img: "http://placekitten.com/g/60/60",
        surveyorName: "郑家园",
        surveyorTel: "18601230123",
        surveyorImg: "http://placekitten.com/g/60/60",
      }, {
        userName: JSON.parse(localStorage.getItem('user')).profile.nickname,
        userAddress: "北京市 朝阳区 光华路",
        orderDate: "2015-12-12",
        orderStatus: 2,
        butlerName: "郑家园",
        butlerTel: "18601230123",
        butlerImg: "http://placekitten.com/g/60/60",
        worker1Name: "郑家园",
        worker1Tel: "18601230123",
        worker1Img: "http://placekitten.com/g/60/60",
        surveyorName: "郑家园",
        surveyorTel: "18601230123",
        surveyorImg: "http://placekitten.com/g/60/60",
      }, {
        userName: JSON.parse(localStorage.getItem('user')).profile.nickname,
        userAddress: "北京市 朝阳区 光华路",
        orderDate: "2015-12-12",
        orderStatus: 3,
        butlerName: "郑家园",
        butlerTel: "18601230123",
        butlerImg: "http://placekitten.com/g/60/60",
        worker1Name: "郑家园",
        worker1Tel: "18601230123",
        worker1Img: "http://placekitten.com/g/60/60",
        surveyorName: "郑家园",
        surveyorTel: "18601230123",
        surveyorImg: "http://placekitten.com/g/60/60",
      }],
      zcList: [{
        userName: JSON.parse(localStorage.getItem('user')).profile.nickname,
        userAddress: "北京市 朝阳区 光华路",
        orderDate: "2015-12-12",
        orderStatus: 0,
        butlerName: "郑家园",
        butlerTel: "18601230123",
        butlerImg: "http://placekitten.com/g/60/60"
      }, {
        userName: JSON.parse(localStorage.getItem('user')).profile.nickname,
        userAddress: "北京市 朝阳区 光华路",
        orderDate: "2015-12-12",
        orderStatus: 2,
        orderCount: 400,
        butlerName: "郑家园",
        butlerTel: "18601230123",
        butlerImg: "http://placekitten.com/g/60/60"
      }, {
        userName: JSON.parse(localStorage.getItem('user')).profile.nickname,
        userAddress: "北京市 朝阳区 光华路",
        orderDate: "2015-12-12",
        orderStatus: 1,
        orderCount: 400,
        butlerName: "郑家园",
        butlerTel: "18601230123",
        butlerImg: "http://placekitten.com/g/60/60"
      }, {
        userName: JSON.parse(localStorage.getItem('user')).profile.nickname,
        userAddress: "北京市 朝阳区 光华路",
        orderDate: "2015-12-12",
        orderStatus: 3,
        orderCount: 400,
        butlerName: "郑家园",
        butlerTel: "18601230123",
        butlerImg: "http://placekitten.com/g/60/60"
      }],
      tkList: [{
        userName: JSON.parse(localStorage.getItem('user')).profile.nickname,
        userAddress: "北京市 朝阳区 光华路",
        orderDate: "2015-12-12",
        orderStatus: 0,
        shop:"门店1",
        butlerName: "郑家园",
        butlerTel: "18601230123",
        butlerImg: "http://placekitten.com/g/60/60"
      }, {
        userName: JSON.parse(localStorage.getItem('user')).profile.nickname,
        userAddress: "北京市 朝阳区 光华路",
        orderDate: "2015-12-12",
        orderStatus: 1,
        shop:"门店1",
        orderCount: 400,
        butlerName: "郑家园",
        butlerTel: "18601230123",
        butlerImg: "http://placekitten.com/g/60/60"
      }, {
        userName: JSON.parse(localStorage.getItem('user')).profile.nickname,
        userAddress: "北京市 朝阳区 光华路",
        orderDate: "2015-12-12",
        orderStatus: 1,
        orderCount: 400,
        shop:"门店1",
        butlerName: "郑家园",
        butlerTel: "18601230123",
        butlerImg: "http://placekitten.com/g/60/60"
      }, {
        userName: JSON.parse(localStorage.getItem('user')).profile.nickname,
        userAddress: "北京市 朝阳区 光华路",
        orderDate: "2015-12-12",
        orderStatus: 0,
        orderCount: 400,
        shop:"门店1",
        butlerName: "郑家园",
        butlerTel: "18601230123",
        butlerImg: "http://placekitten.com/g/60/60"
      }]
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
    this.index = (Lib.M.GetRequest().type - 1) || 0
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
        .zc-order-shop{
          position: absolute;
          top: 0px;
          left:15px;
          height: 40px;
          line-height: 40px;
          font-size: 14px;
          color:#393939;
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
</style>
