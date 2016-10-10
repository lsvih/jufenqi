<template>
<header>
  <img src="status.png">
  <div class="status">{{zxStatusList[status].name}}</div>
  <div class="btn" v-if="status==0">取消订单</div>

</header>
<div class="butler">
  <div class="zx-butler-img"><img :src="butlerImg"></div>
  <div class="zx-butler-name">{{butlerName}}</div>
  <div class="zx-butler-tel" onclick="location.href='tel:{{butlerTel}}'"><img src="tel.png"></div>
</div>
<div class="content">
  <group style="margin-top:-1.17647059em;" v-if="status==0">
    <cell class="cell-item" is-link onclick="location.href='worker-detail.html'">
      <img :src="plans[0].workerImg" class="worker-logo" width="120px" height="80px">
      <div class="worker-name">{{plans[0].workerName}}</div>
      <div class="worker-address">{{plans[0].workerDescription}}</div>
      <div class="worker-rank">评分:{{plans[0].workerRate}}</div>
    </cell>
    <cell class="cell-item" is-link onclick="location.href='worker-detail.html'" v-if="plans[1]">
      <img :src="plans[1].workerImg" class="worker-logo" width="120px" height="80px">
      <div class="worker-name">{{plans[1].workerName}}</div>
      <div class="worker-address">{{plans[1].workerDescription}}</div>
      <div class="worker-rank">评分:{{plans[1].workerRate}}</div>
    </cell>
  </group>



<div class="select-plan" v-if="status==1">
<div class="select-item-1" :class="{'active':selectPlan==0}" @click="selectPlan = 0">方案一</div>
<div class="select-item-2" v-if="plans[1]" :class="{'active':selectPlan==1}" @click="selectPlan = 1">方案二</div>
</div>

  <group title="设计方案" v-if="status>=1">
    <div class="module-item">
      <scroller lock-y scrollbar-x :height=".8*getScreenWidth()*.63+20+'px'" v-ref:plan>
        <div class="worker-product-list" :style="{width:plans[selectPlan].plan.length*(.8*getScreenWidth()+10)+  'px',height:.8*getScreenWidth()*.63+'px'}">
          <div class="worker-product-item" v-for="preview in plans[selectPlan].plan" :style="{width: getScreenWidth()*.8 + 'px',height:.8*getScreenWidth()*.63+'px'}">
            <x-img class="product-img" :scroller="$refs.plan" :src="preview.src" @click="$refs.previewer.show($index)"></x-img>
          </div>
        </div>
      </scroller>
    </div>
  </group>
  <div class="contact" v-if="status>=1">
    <div class="zc-line-3">
      <div class="zc-butler-img"><img :src="butlerImg"></div>
      <div class="zc-butler-name">{{butlerName}}</div>
      <div class="zc-butler-tel" onclick="location.href='tel:{{butlerTel}}'"><img src="tel.png"></div>
    </div>
    <div class="zc-line-3">
      <div class="zc-butler-img"><img :src="plans[selectPlan].workerImg"></div>
      <div class="zc-butler-name">{{plans[selectPlan].workerName}}</div>
      <div class="zc-butler-tel" onclick="location.href='tel:{{plans[selectPlan].workerTel}}'"><img src="tel.png"></div>
    </div>
    <div class="zc-line-3">
      <div class="zc-butler-img"><img :src="surveyorImg"></div>
      <div class="zc-butler-name">{{surveyorName}}</div>
      <div class="zc-butler-tel" onclick="location.href='tel:{{surveyorTel}}'"><img src="tel.png"></div>
    </div>
  </div>

<div v-if="status>=1&&status<=4">
  <group title="方案说明">
    <article>{{plans[selectPlan].planExplain}}</article>
  </group>
  <group title="施工周期">
    <article>{{plans[selectPlan].planCycle}}</article>
  </group>
  <group title="估价">
    <article>{{plans[selectPlan].planPrice}}</article>
  </group>
</div>
</div>
<x-button slot="right" style="border-radius:0;background-color:rgb(158, 188, 43);color:#fff;margin:20px 0;width:100%" v-if="status==1">选择当前方案</x-button>
<x-button slot="right" style="border-radius:0;background-color:rgb(158, 188, 43);color:#fff;margin:20px 0;width:100%" v-if="status==4" onclick="location.href='order-judge.html'">去评价</x-button>

<previewer :list="plans[0].plan" v-ref:previewer :options="options"></previewer>
<previewer v-if="plans[1]" :list="plans[1].plan" v-ref:previewer :options="options"></previewer>
</template>

<script>
import Lib from 'assets/Lib.js'
import Group from 'vux-components/group'
import Cell from 'vux-components/cell'
import XButton from 'vux-components/x-button'
import Scroller from 'vux-components/scroller'
import XImg from 'vux-components/x-img'
import Previewer from 'vux-components/previewer'
export default {
  data() {
    return {
      status: 0,
      butlerName:"郑家园",
      butlerTel:"18601230123",
      butlerImg:"http://placekitten.com/g/60/60",
      surveyorName:"郑家园",
      surveyorTel:"18601230123",
      surveyorImg:"http://placekitten.com/g/60/60",
      selectPlan:0,
      plans:[
        {
          workerName:"郑家园",
          workerTel:"18601230123",
          workerDescription:"123123123",
          workerRate:4.4,
          workerImg:"http://placekitten.com/g/60/60",
          planExplain:"asjkl;asejiopawefpiowefpjio",
          planCycle:"asduasdfej0f893f0",
          planPrice:"asdfasdf23weasdf",
          plan: [{
            src: 'http://placekitten.com/g/200/126',
            w: 200,
            h: 126
          }, {
            src: 'http://placekitten.com/g/200/126',
            w: 200,
            h: 126
          }, {
            src: 'http://placekitten.com/g/200/126',
            w: 200,
            h: 126
          }, {
            src: 'http://placekitten.com/g/200/126',
            w: 200,
            h: 126
          }]
        },{
          workerName:"郑家园2",
          workerTel:"18601230123",
          workerDescription:"345345345",
          workerRate:5.0,
          workerImg:"http://placekitten.com/g/60/60",
          planExplain:"asjkl;asejiopawefpiowefpjio",
          planCycle:"asduasdfej0f893f0",
          planPrice:"asdfasdf23weasdf",
          plan: [{
            src: 'http://placekitten.com/g/200/126',
            w: 200,
            h: 126
          }, {
            src: 'http://placekitten.com/g/200/126',
            w: 200,
            h: 126
          }, {
            src: 'http://placekitten.com/g/200/126',
            w: 200,
            h: 126
          }, {
            src: 'http://placekitten.com/g/200/126',
            w: 200,
            h: 126
          }]
        }
      ],
      zxStatusList: [{
        status: 0,
        name: "已预约"
      }, {
        status: 1,
        name: "选择方案"
      }, {
        status: 2,
        name: "待付款"
      }, {
        status: 3,
        name: "待施工"
      }, {
        status: 4,
        name: "施工完成"
      },{
        status: 5,
        name: "已取消"
      }],
      options: {
        getThumbBoundsFn(index) {
          // find thumbnail element
          let thumbnail = document.querySelectorAll('.product-img')[index]
            // get window scroll Y
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            // optionally get horizontal scroll
            // get position of element relative to viewport
          let rect = thumbnail.getBoundingClientRect()
            // w = width
          return {
            x: rect.left,
            y: rect.top + pageYScroll,
            w: rect.width
          }
          // Good guide on how to get element coordinates:
          // http://javascript.info/tutorial/coordinates
        }
      }
    }
  },
  ready() {
    this.status = Lib.M.GetRequest().status
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
    padding-top: 80px;
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


.contact{
  margin-top: 1px;
  background-color: #fff;
.zc-line-3{
  height: 50px;
  width: 100%;
  border-bottom: 1px solid #eee;
  position: relative;
  .zc-butler-img{
    position: absolute;
    top:5px;
    left:15px;
    height: 40px;
    width: 40px;
    border-radius: 20px;
    img{
      height: 100%;
      width: 100%;
      border-radius: 50%;
    }
  }
  .zc-butler-name{
    position: absolute;
    bottom: 15px;
    left:65px;
    font-size: 16px;
    color: #393939;
  }
  .zc-butler-tel{
    position: absolute;
    top:15px;
    right: 15px;
    height: 20px;
    width: 20px;
    img{
      height: 100%;
      width: 100%;
    }
  }
}}
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
.select-plan{
  width: 100%;
  height: 40px;
  background-color: #fff;
  color:#999;
  .select-item-1{
    width: calc( ~"50% - 1px" );
    height: 100%;
    font-size: 16px;
    line-height: 16px;
    padding-top: 14px;
    display: inline-block;
    float:left;
    text-align: center;
    border-right: 1px solid #eee;
  }
  .select-item-2{
    width: calc( ~"50% - 1px" );
    height: 100%;
    font-size: 16px;
    line-height: 16px;
      padding-top: 14px;
    display: inline-block;
    float:left;
    text-align: center;
  }
  .active
  {
    color:#393939;
  }
}
</style>
