<template>
<header>
  <div class="select-address">{{address}}<img src="select.png" class="select-icon"></div>
  <div class="sort">综合排序<img src="select.png" class="select-icon"></div>
  <span class="cart"  onclick="location.href='cart.html'"><img src="cart.png"></span>
</header>
<div class="content">
  <group style="margin-top:-1.17647059em;">
    <cell v-for="worker in workerList" class="cell-item" onclick="location.href='worker-detail.html'">
      <img :src="worker.img" class="worker-logo" width="120px" height="80px">
      <div class="worker-name">{{worker.name}}</div>
      <div class="worker-address">{{worker.address}}</div>
      <div class="worker-rank">评分:{{worker.rank}}</div>
      <img v-if="isFavorite(worker.id)" class="worker-is-favorite" src="star-fill.png">
      <img v-else class="worker-is-favorite" src="star.png">
    </cell>
  </group>
</div>
</template>

<script>
import Lib from 'assets/Lib.js'
import Group from 'vux-components/group'
import Cell from 'vux-components/cell'
export default {
  data() {
    return {
      address:"朝阳区",
      workerList: [{
        id: 1,
        name: 'hahah',
        img: 'http://placekitten.com/g/80/80',
        address: '123sdafsd',
        rank: 4.7
      }, {
        id: 2,
        name: 'hahah',
        img: 'http://placekitten.com/g/80/80',
        address: '123sdafsd',
        rank: 4.7
      }, {
        id: 3,
        name: 'hahah',
        img: 'http://placekitten.com/g/80/80',
        address: '123sdafsd',
        rank: 4.7
      }, {
        id: 4,
        name: 'hahah',
        img: 'http://placekitten.com/g/80/80',
        address: '123sdafsd',
        rank: 4.7
      }]
    }
  },
  components: {
    Group,
    Cell,
  },
  methods: {
    isFavorite(workerId) {
      return true
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
        color: #5965B2;
    }
    .worker-is-favorite {
        position: absolute;
        top: 40px;
        right: 15px;
        width: 20px;
        height: 20px;
    }
}
.content {
    padding-top: 44px;
}
header {
    position: fixed;
    height: 12px;
    width: 100%;
    left: 0;
    top: 0;
    padding: 16px 0;
    background-color: #fff;
    border-bottom: 1px solid #eee;
    .cart {
        position:absolute;
        right: 0;
        top:0;
        height: 44px;
        width: 44px;
        img{
          height: 100%;
          width: 100%;
        }
    }
    div{
      position: absolute;
      height: 12px;
      line-height: 12px;
      width: calc( ~"(100% - 44px - 3px )/2");
      text-align: center;
      font-size: 12px;
      .select-icon{
        vertical-align: middle;
        width: 6px;
        height: 4px;
        margin-left: 10px;
      }
    }
    .select-address{
      top:16px;
      left:0;
      border-right:1px solid #eee;
    }
    .sort{
      top:16px;
      left:calc( ~"(100% - 47px )/2 " );
    }
}
</style>
