<template>
<header>
  <img src="status.png">
  <div class="status">{{zcStatusList[status].name}}</div>
  <div class="btn" v-if="status==0">取消订单</div>

</header>
<div class="butler">
  <div class="zc-butler-img"><img :src="butlerImg"></div>
  <div class="zc-butler-name">{{butlerName}}</div>
  <div class="zc-butler-tel" onclick="location.href='tel:{{butlerTel}}'"><img src="tel.png"></div>
</div>
<div class="content">

  <div class="zc-list" v-if="status!==0">
    <div class="zc-shop-img"><img :src="preview"></div>
    <group v-for="shop in shopList">
      <div class="line-1">
        <div class="shop-img"><img :src='shop.img'></div>
        <div class="shop-name">{{shop.name}}</div>
        <div class="btn" v-if="status==4" onclick="location.href='order-judge.html'">去评价</div>
      </div>
      <cell v-for="zc in shop.zcList" class="zc-cell">
        <div class="zc-name">{{zc.name}}</div>
        <div class="zc-price">{{zc.price|currency "￥" 2}}<span>x{{zc.num}}</span></div>
      </cell>
      <div class="line-2">
          <div class="line-2-title">总额</div>
          <div class="line-2-right">{{getShopCount(shop.zcList)|currency "￥" 2}}</div>
      </div>
    </group>
    <group>
      <div class="line-2">
          <div class="line-2-title">订单总额</div>
          <div class="line-2-right">{{getCount(shopList)|currency "￥" 2}}</div>
      </div>
    </group>
  </div>


</div>
</template>

<script>
import Lib from 'assets/Lib.js'
import Group from 'vux-components/group'
import Cell from 'vux-components/cell'
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
        img: 'http://placekitten.com/g/120/80',
        address: '123sdafsd',
        rank: 4.7,
        zcList: [{
          name: "材料",
          num: 2,
          price: 45
        }, {
          name: "材料",
          num: 2,
          price: 45
        }, {
          name: "材料",
          num: 2,
          price: 45
        }],
      }, {
        id: 2,
        name: 'hahah',
        img: 'http://placekitten.com/g/120/80',
        address: '123sdafsd',
        rank: 4.7,
        zcList: [{
          name: "材料",
          num: 2,
          price: 45
        }, {
          name: "材料",
          num: 2,
          price: 45
        }, {
          name: "材料",
          num: 2,
          price: 45
        }],
      }],
      preview: 'http://placekitten.com/g/200/80',

      zcStatusList: [{
        status: 0,
        name: "已预约"
      }, {
        status: 1,
        name: "待确认"
      }, {
        status: 2,
        name: "待付款"
      }, {
        status: 3,
        name: "待收货"
      }, {
        status: 4,
        name: "已收货"
      },{
        status: 5,
        name: "已退货"
      }],
    }
  },
  ready() {
    this.status = Lib.M.GetRequest().status
  },
  components: {
    Group,
    Cell,
  },
  methods: {
    getShopCount(Array){
      let count = 0;
      Array.map((e)=>{
        count+=(e.price*e.num)
      })
      return count
    },
    getCount(list){
      let count = 0;
      list.map((e)=>{
        count += this.getShopCount(e.zcList)
      })
      return count
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
    .line-1{
      width: 100%;
      height: 50px;
      position: relative;
      .shop-img{
        width: 40px;
        height: 40px;
        border-radius: 20px;
        position: absolute;
        left:15px;
        top:5px;
        img{
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .shop-name{
        position: absolute;
        left:65px;
        top:19px;
        font-size: 12px;
        color:#393939;
      }
      .btn{
        position: absolute;
        top:15px;
        right:15px;
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
    .zc-cell{
      height: 10px;
      position: relative;
      .zc-name{
        position: absolute;
        top:9px;
        left:15px;
        font-size: 12px;
        color:#393939;
      }
      .zc-price{
        position: absolute;
        top:9px;
        right:15px;
        font-size: 12px;
        color:#EC5835;
        span{
          margin-left:10px;
          color:#999;
        }
      }
    }
    .line-2{
      height: 44px;
      width: 100%;
      position: relative;
      .line-2-title{
        position: absolute;
        top: 16px;
        left:15px;
        font-size: 12px;
        color:#999;
      }
      .line-2-right{
        position: absolute;
        top:16px;
        right:15px;
        font-size: 12px;
        color:#EC5835;
      }
    }
}
</style>
