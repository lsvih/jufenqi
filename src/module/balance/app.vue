<template>
<div class="block-1">
<div class="balance-title">账户余额(元)</div>
<div class="balance-money">{{balance|currency '' 2}}</div>
</div>
<group title="账单">
  <cell class="cell-item">
    <div class="cell-icon"><img src="./bill.png"></div>
    <div class="cell-title">装修订单</div>
    <div class="cell-right-top">-{{"45"|currency '￥' 2}}</div>
    <div class="cell-right-bottom">2016-03-03</div>
  </cell>
  <cell class="cell-item">
    <div class="cell-icon"><img src="./material.png"></div>
    <div class="cell-title">主材订单</div>
    <div class="cell-right-top">-{{"45"|currency '￥' 2}}</div>
    <div class="cell-right-bottom">2016-03-03</div>
  </cell>
</group>
<group title="账单余额">
  <cell class="cell-item">
    <div class="cell-center">{{"90"|currency '￥' 2}}</div>
  </cell>
</group>

</template>

<script>
import Lib from 'assets/Lib.js'
import Group from 'vux-components/group'
import Cell from 'vux-components/cell'
export default {
  data() {
    return {
      balance:2000
    }
  },
  components: {
    Group,Cell
  },
}
</script>

<style>
body{
  background-color: #eee
}
</style>
<style lang="less" scoped>
.block-1{
  width: 100%;
  height: 130px;
  background-color: #62676c;
  position: relative;
  .balance-title{
    height: 16px;
    width: 100%;
    text-align: center;
    position: absolute;
    top:29px;
    left:0;
    font-size: 16px;
    color: #fff;
  }
  .balance-money{
    height: 36px;
    width: 100%;
    text-align: center;
    position: absolute;
    bottom:29px;
    font-size: 36px;
    color: #fff;
  }
}
.cell-item{
  height: 24px;
  position: relative;
  .cell-icon{
    height: 20px;
    width: 20px;
    position: absolute;
    top:12px;
    left:15px;
    img{
      height: 100%;
      width: 100%;
    }
  }
  .cell-title{
    position: absolute;
    top:12px;
    left:45px;
    font-size: 16px;
    color: #393939;
  }
  .cell-right-top{
    position: absolute;
    right: 15px;
    top:6px;
    font-size: 16px;
    color: #393939;
  }
  .cell-right-bottom{
    position: absolute;
    right: 15px;
    top:27px;
    font-size: 12px;
    color:#999;
  }
  .cell-center{
    position: absolute;
    top:12px;
    left:0;
    width: 100%;
    text-align: center;
    font-size: 16px;
    color: #EC5835;
  }
}
</style>
