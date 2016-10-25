<template>
<header>
  <img src="status.png">
  <div class="status">{{zcStatusList[status].name}}</div>
</header>
<div class="butler">
  <div class="zc-butler-img"><img :src="butlerImg"></div>
  <div class="zc-butler-name">{{butlerName}}</div>
  <div class="zc-butler-tel" onclick="location.href='tel:{{butlerTel}}'"><img src="tel.png"></div>
</div>
<div class="content">

  <div class="zc-list" v-if="status!=0">
    <group v-for="shop in shopList">
      <div class="line-1">
        <div class="shop-name">{{shop.name}}</div>
        <div class="btn" v-if="status==4" onclick="location.href='order-judge.html'">去评价</div>
      </div>
      <cell v-for="zc in shop.zcList" class="zc-cell">
        <div class="zc-name">{{zc.name}}</div>
      </cell>
      <div class="line-2">
        <div class="line-2-title">正价总额</div>
        <div class="line-2-right" style="color:rgb(255, 204, 102);">{{shop.zjPrice|currency "￥" 2}}</div>
      </div>
      <div class="line-2">
        <div class="line-2-title">特价总额</div>
        <div class="line-2-right" style="color:#88C929;">{{shop.tjPrice|currency "￥" 2}}</div>
      </div>
      <div class="line-2" style="border-top:5px solid #eee!important;">
        <div class="line-2-title">总额</div>
        <div class="line-2-right">{{shop.zjPrice+shop.tjPrice|currency "￥" 2}}</div>
      </div>
      <div class="line-3" v-if="status != 2&&status != 3">
        <div class="cancel">{{status == 0?"取消预约":(status == 1?"取消订单":"申请退款")}}</div>
      </div>
    </group>
    <group v-if="status == 1">
      <div class="line-2">
        <div class="line-2-title">请选择您的购买方式</div>
        <div class="line-2-right"><img class="down" src="./down.png"></div>
      </div>
      <radio  :options="payments" @on-change="selectPay"></radio>
    </group>
    <group v-if="status == 1">
      <div class="sumbit-order" :class="{'active':payWay!=''}">确认订单</div>
    </group>
  </div>
</div>
</template>

<script>
import Lib from 'assets/Lib.js'
import Group from 'vux-components/group'
import Cell from 'vux-components/cell'
import Radio from 'vux-components/radio'
export default {
  data() {
    return {
      status: 0,
      butlerName: "郑家园",
      butlerTel: "18601230123",
      butlerImg: "http://placekitten.com/g/60/60",
      shopList: [{
        id: 1,
        name: 'hahah',
        address: '123sdafsd',
        rank: 4.7,
        zcList: [{
          name: "材料",
        }, {
          name: "材料",
        }, {
          name: "材料",
        }],
        zjPrice: 1023.12,
        tjPrice: 12123
      }, {
        id: 2,
        name: 'hahah',
        address: '123sdafsd',
        rank: 4.7,
        zcList: [{
          name: "材料",
        }, {
          name: "材料",
        }, {
          name: "材料",
        }],
        zjPrice: 123094,
        tjPrice: 1235
      }],
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
      payments:[
        {
          key:'0',
          value:'全款购买'
        },
        {
          key:'1',
          value:'分期购买'
        }
      ],
      payWay:""
    }
  },
  ready() {
    this.status = Lib.M.GetRequest().status
  },
  components: {
    Group,
    Cell,
    Radio
  },
  methods: {
    selectPay(e){
      this.payWay = this.payments[Number(e)]
    }
  }
}
</script>

<style>
body {
  background-color: #eee;
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
}
.butler {
    height: 50px;
    width: 100%;
    z-index: 20;
    border-bottom: 1px solid #eee;
    background-color: #fff;
    position: fixed;
    top: 30px;
    left: 0;
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
.zc-list {
    width: 100%;
    .zc-shop-img {
        height: 120px;
        width: 100%;
        img {
            height: 100%;
            width: 100%;
        }
    }
    .line-1 {
        width: 100%;
        height: 50px;
        position: relative;
        .shop-name {
            position: absolute;
            left: 15px;
            top: 17px;
            font-size: 16px;
            color: #393939;
        }
        .btn {
            position: absolute;
            top: 15px;
            right: 15px;
            font-size: 12px;
            color: #fff;
            width: 50px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            background-color: #88C929;
            border-radius: 2px;
        }
    }
    .zc-cell {
        height: 10px;
        position: relative;
        .zc-name {
            position: absolute;
            top: 9px;
            left: 15px;
            font-size: 12px;
            color: #393939;
        }
        .zc-price {
            position: absolute;
            top: 9px;
            right: 15px;
            font-size: 12px;
            color: #EC5835;
            span {
                margin-left: 10px;
                color: #999;
            }
        }
    }
    .line-2 {
        height: 44px;
        width: 100%;
        position: relative;
        border-top: 1px solid #eee;
        .line-2-title {
            position: absolute;
            top: 0;
            height:44px;
            line-height: 44px;
            left: 15px;
            font-size: 12px;
            color: #999;
        }
        .line-2-right {
            position: absolute;
            top: 0;
            height: 44px;
            line-height: 44px;
            right: 15px;
            font-size: 12px;
            color: #EC5835;
            .down{
              position: absolute;
              height: 10px;
              width: 17px;
              right: 0;
              top:17px;
            }
        }
    }
    .line-3 {
        height: 30px;
        width: 100%;
        position: relative;
        border-top: 1px solid #eee;
        .cancel {
            position: absolute;
            right: 15px;
            top: 0;
            height: 30px;
            font-size: 12px;
            line-height: 30px;
            color: #999;
        }
    }
}
.sumbit-order{
  height: 44px;
  width: 100%;
  line-height: 44px;
  background-color: #e2e2e2;
  text-align: center;
  font-size: 16px;
  color:#fff;
}
.active {
    background-color: #9EBC2B!important;
}
</style>
