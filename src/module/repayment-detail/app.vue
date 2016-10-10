<template>
<div class="block-1">
  <div class="has-repay-title">已结清本金（元）</div>
  <div class="has-repay">{{repay.hasRepayCapital|currency "" 2}}</div>
  <img src="repay-bg.png">
</div>
<group title="借款明细">
  <cell class="repay-cell">
    <div class="repay-cell-name">借款金额</div>
    <div class="repay-cell-right">{{repay.count|currency "" 2}}</div>
  </cell>
  <cell class="repay-cell">
    <div class="repay-cell-name">合同期限</div>
    <div class="repay-cell-right">{{repay.date}}</div>
  </cell>
  <cell class="repay-cell">
    <div class="repay-cell-name">还款方式</div>
    <div class="repay-cell-right">{{repay.repayType}}</div>
  </cell>
</group>
<group title="还款明细">
  <cell class="repay-cell">
    <div class="repay-cell-name">已还本金</div>
    <div class="repay-cell-right">{{repay.hasRepayCapital|currency "" 2}}</div>
  </cell>
  <cell class="repay-cell">
    <div class="repay-cell-name">已还利息</div>
    <div class="repay-cell-right">{{repay.hasRepayInterest|currency "" 2}}</div>
  </cell>
  <cell class="repay-cell">
    <div class="repay-cell-name">手续费</div>
    <div class="repay-cell-right">{{repay.commission|currency "" 2}}</div>
  </cell>
</group>
</template>

<script>
import Lib from 'assets/Lib.js'
import Cell from 'vux-components/cell'
import Group from 'vux-components/group'
export default {
  data() {
    return {
      repay: {
        "id": 1,
        "date": "2016年10月1日至2016年12月3日",
        "status": "已结清",
        "repayType": "等额本金",
        "count": 5000,
        "hasRepayCapital": 5000,
        "hasRepayInterest": 340.16,
        "commission": 0
      }
    }
  },
  components: {
    Cell,
    Group,
  },
  ready() {


  },
  methods: {



  }
}
</script>

<style>
body {
  background-color: #eee;
}
</style>
<style lang="less" scoped>
.block-1 {
    height: 150px;
    width: 100%;
    position: relative;
    background-color: #fff;
    color: #3BA794;
    .has-repay-title {
        position: absolute;
        top: 39px;
        left: 0;
        height: auto;
        width: 100%;
        text-align: center;
        font-size: 16px;
    }
    .has-repay {
        position: absolute;
        bottom: 39px;
        left: 0;
        height: auto;
        width: 100%;
        text-align: center;
        font-size: 32px;
    }
    img {
        position: absolute;
        top: 0;
        right: 0;
        width: 70px;
        height: 64px;
    }
}
.repay-cell {
    height: 24px;
    position: relative;
    .repay-cell-name {
        position: absolute;
        left: 15px;
        top: 12px;
        font-size: 16px;
    }
    .repay-cell-right {
        position: absolute;
        right: 15px;
        top: 15px;
        font-size: 12px;
    }

}
</style>
