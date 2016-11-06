<template>
<header>
  <img src="status.png">
  <div class="status">{{zxStatusList[order.status].name}}</div>
  <div class="btn" v-if="order.status==1" v-tap="cancelOrder()">取消预约</div>

</header>
<div class="butler">
  <div class="zx-butler-img"><img :src="order.manager.profileImage"></div>
  <div class="zx-butler-name">{{order.manager.nickname}}</div>
  <div class="zx-butler-tel" onclick="location.href='tel:{{order.manager.mobile}}'"><img src="tel.png"></div>
</div>
<div class="butler" style="top:80px;">
  <div class="zx-butler-img"><img :src="order.projectManager.profileImage"></div>
  <div class="zx-butler-name">{{order.projectManager.nickname}}</div>
  <div class="zx-butler-tel" onclick="location.href='tel:{{order.projectManager.mobile}}'"><img src="tel.png"></div>
</div>
<div class="content">
  <group class="contact" style="margin-top:-1.17647059em;" v-if="order.status==1||order.status==2">
    <div class="zc-line-3">
      <div class="zc-butler-img"><img :src="order.planList[0].foreman.profileImage"></div>
      <div class="zc-butler-name">{{order.planList[0].foreman.nickname}}</div>
      <div class="zc-butler-tel" onclick="location.href='tel:{{order.planList[0].foreman.mobile}}'"><img src="tel.png"></div>
    </div>
    <div class="zc-line-3" v-if="order.planList.length==2">
      <div class="zc-butler-img"><img :src="order.planList[1].foreman.profileImage"></div>
      <div class="zc-butler-name">{{order.planList[1].foreman.nickname}}</div>
      <div class="zc-butler-tel" onclick="location.href='tel:{{order.planList[1].foreman.mobile}}'"><img src="tel.png"></div>
    </div>
</div>
</group>
<div class="select-plan" v-if="order.status==3">
  <div class="select-item-1" :class="{'active':selectPlan==0}" v-tap="selectPlan = 0">方案一</div>
  <div class="select-item-2" v-if="order.planList[1]" :class="{'active':selectPlan==1}" v-tap="selectPlan = 1">方案二</div>
</div>

<group title="设计方案" v-if="order.status>=3">
  <div class="module-item">
    <scroller lock-y scrollbar-x :height=".8*getScreenWidth()*.63+20+'px'" v-ref:plan>
      <div class="worker-product-list" :style="{width:order.planList[selectPlan].images.length*(.8*getScreenWidth()+10)+  'px',height:.8*getScreenWidth()*.63+'px'}">
        <div class="worker-product-item" v-for="preview in order.planList[selectPlan].images" :style="{width: getScreenWidth()*.8 + 'px',height:.8*getScreenWidth()*.63+'px'}">
          <x-img class="product-img" :scroller="$refs.plan" :src="preview" v-tap="$refs.previewer.show($index)"></x-img>
        </div>
      </div>
    </scroller>
  </div>
</group>
<div class="contact" v-if="order.status>=3">

  <div class="zc-line-3">
    <div class="zc-butler-img"><img :src="order.planList[selectPlan].foreman.profileImage"></div>
    <div class="zc-butler-name">{{order.planList[selectPlan].foreman.nickname}}</div>
    <div class="zc-butler-tel" onclick="location.href='tel:{{order.planList[selectPlan].foreman.mobile}}'"><img src="tel.png"></div>
  </div>

</div>

<div v-if="order.status>=3&&order.status<=6">
  <group title="方案说明">
    <article>{{order.planList[selectPlan].description}}</article>
  </group>
  <group>
    <div class="zx-line-4">
      <div class="zx-line-4-name">施工报价</div>
      <div class="zx-line-4-right">{{order.planList[selectPlan].price|currency "" 2}}</div>
    </div>
  </group>

</div>
</div>
<div class="status-3-btn" v-if="order.status === 3">
  <div class="btn-left" v-tap="cancelOrder(true)"><img src="./change.png">更换工长</div>
  <div class="btn-right" v-tap="selectPlan()">选择当前方案</div>
</div>
<!-- <x-button slot="right" style="border-radius:0;background-color:rgb(158, 188, 43);color:#fff;margin:20px 0;width:100%" v-if="order.status==7" onclick="location.href='order-judge.html'">去评价</x-button> -->
<previewer :list="order.planList[0].images" v-ref:previewer :options="options"></previewer>
<previewer v-if="order.planList[1]" :list="order.planList[1].images" v-ref:previewer :options="options"></previewer>
</template>

<script>
import Lib from 'assets/Lib.js'
import Group from 'vux-components/group'
import Cell from 'vux-components/cell'
import XButton from 'vux-components/x-button'
import Scroller from 'vux-components/scroller'
import XImg from 'vux-components/x-img'
import Previewer from 'vux-components/previewer'
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
      order: {},
      selectPlan: 0,
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
      options: {
        getThumbBoundsFn(index) {
          let thumbnail = document.querySelectorAll('.product-img')[index]
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          let rect = thumbnail.getBoundingClientRect()
          return {
            x: rect.left,
            y: rect.top + pageYScroll,
            w: rect.width
          }
        }
      }
    }
  },
  ready() {
    axios.get(`${Lib.C.orderApi}decorationOrders/${Lib.M.GetRequest().orderNo}`).then((res) => {
      this.order = res.data.data
    }).catch((res) => {
      alert("获取订单失败，请稍候再试QAQ")
    })
  },
  components: {
    Group,
    Cell,
    XButton,
    Scroller,
    XImg,
    Previewer
  },
  methods: {
    getScreenWidth() {
      return document.body.clientWidth
    },
    cancelOrder(isJump) {
      axios.post(`${Lib.C.orderApi}decorationOrders/${Lib.M.GetRequest().orderNo}/confirmCancel`).then((res) => {
        if (isJump) {
          window.location.href = "./worker-list.html"
        } else {
          alert("取消订单成功")
          window.location.href = './order-list.html'
        }
      }).catch((res) => {
        alert("取消订单失败，请稍候再试QAQ")
      })
    },
    selectPlan() {
      let planId = this.order.planList[selectPlan].id
      axios.post(`${Lib.C.orderApi}decorationOrders/${Lib.M.GetRequest().orderNo}/confirmSelect?planId=${planId}`).then((res) => {
        alert("订单已更新！")
        location.reload()
      }).catch((res) => {
        alert("更新订单失败，请稍后重试")
      })
    }
  }
}
</script>

<style>
body {
  background-color: #eee;
}

article {
  padding: 15px;
  font-size: 12px;
  color: #393939;
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
}
.content {
    padding-top: 130px;
}
header {
    position: fixed;
    top: 0;
    left: 0;
    height: 30px;
    width: 100%;
    background-color: #fff;
    z-index: 20;
    img {
        width: 13px;
        height: 20px;
        position: absolute;
        top: 5px;
        left: 15px;
    }
    .status {
        position: absolute;
        left: 38px;
        top: 9px;
        width: 60px;
        height: 12px;
        font-size: 12px;
        color: #393939;
    }
    .btn {
        position: absolute;
        right: 15px;
        top: 5px;
        width: 60px;
        height: 20px;
        border: 1px solid #393939;
        font-size: 12px;
        color: #393939;
        line-height: 20px;
        text-align: center;
    }
}
.butler {
    height: 50px;
    width: 100%;
    border-bottom: 1px solid #eee;
    background-color: #fff;
    position: fixed;
    top: 30px;
    left: 0;
    z-index: 20;
    .zx-butler-img {
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
    .zx-butler-name {
        position: absolute;
        bottom: 15px;
        left: 65px;
        font-size: 16px;
        color: #393939;
    }
    .zx-butler-tel {
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
.worker-product-list {
    height: auto;
    padding: 10px 15px 20px;
    position: relative;
    .worker-product-item {
        height: auto;
        margin-right: 10px;
        display: inline-block;
        float: left;
        img {
            height: 100%;
            width: 100%;
        }
    }
}

.contact {
    margin-top: 1px;
    background-color: #fff;
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
}
.cell-item {
    position: relative;
    height: 80px;
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
        top: 40px;
        right: 15px;
        width: 20px;
        height: 20px;
    }
}
.select-plan {
    width: 100%;
    height: 40px;
    background-color: #fff;
    color: #999;
    .select-item-1 {
        width: calc( ~"50% - 1px" );
        height: 100%;
        font-size: 16px;
        line-height: 16px;
        padding-top: 14px;
        display: inline-block;
        float: left;
        text-align: center;
        border-right: 1px solid #eee;
    }
    .select-item-2 {
        width: calc( ~"50% - 1px" );
        height: 100%;
        font-size: 16px;
        line-height: 16px;
        padding-top: 14px;
        display: inline-block;
        float: left;
        text-align: center;
    }
    .active {
        color: #393939;
    }
}
.zx-line-4 {
    position: relative;
    height: 44px;
    width: 100%;
    background-color: #fff;
    .zx-line-4-name {
        position: absolute;
        height: 44px;
        line-height: 44px;
        left: 15px;
        top: 0;
        font-size: 12px;
        color: #393939;
    }
    .zx-line-4-right {
        position: absolute;
        height: 44px;
        line-height: 44px;
        right: 15px;
        top: 0;
        font-size: 12px;
        color: rgb(234,89,61);
    }
}
.status-3-btn {
    position: relative;
    width: 100%;
    height: 44px;
    background-color: rgb(158, 188, 43);
    color: #fff;
    .btn-left {
        position: absolute;
        height: 100%;
        width: 35%;
        background-color: #fff;
        line-height: 44px;
        text-align: center;
        color: #393939;
        left: 0;
        img {
            vertical-align: middle;
            margin-right: 6px;
            height: 15px;
            width: 16px;
        }
    }
    .btn-right {
        position: absolute;
        height: 100%;
        width: 65%;
        line-height: 44px;
        text-align: center;
        right: 0;
    }
}
</style>
