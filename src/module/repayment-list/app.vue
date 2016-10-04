<template>
<group>
     <cell class="repay-cell" v-for="repay in repayList" :link="'repayment-detail.html?id='+repay.id">
       <div class="repay-cell-count">{{repay.count|currency "" 2}}</div>
       <div class="repay-cell-date">{{repay.date}}</div>
     <div class="repay-cell-status">{{repay.status}}</div>
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
      repayList:[
        {
          "id":1,
          "date":"2016年10月1日借",
          "status":"已结清",
          "count":5000
        },
        {
          "id":2,
          "date":"2016年10月1日借",
          "status":"未结清",
          "count":5000
        }
      ]
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
body{
  background-color: #eee;
}
</style>
<style lang="less" scoped>
.repay-cell{
  height: 40px;
  .repay-cell-count{
    position: absolute;
    left:15px;
    top:14px;
    font-size: 16px;
  }
  .repay-cell-date{
    position: absolute;
    left:15px;
    bottom:8px;
    font-size: 12px;
    color:#999;
  }
  .repay-cell-status{
    position: absolute;
    right:28px;
    top:23px;
    color:#999;
    font-size: 12px;
  }
}
</style>
