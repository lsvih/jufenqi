<template>
<group style="margin-top:-1.17647059em;">
  <cell class="cell" v-for="bank in bankList">
    <div class="select" @click="select($index)" style="width:calc( 100% - 40px )"></div>
    <img class="bank-logo" :src="bank.icon">
    <div class="bank-name">{{bank.name}}</div>
    <div class="text">持卡类型:<span class="card-type">{{bank.cardType}}</span>&nbsp;&nbsp;可申请金额:<span class="credit-count">{{bank.credit|currency "" 2}}</span></div>
    <div class="info" @click="(showInfoNum = $index,showInfo = true,preventDefault())"><img src="info.png"></div>
  </cell>
</group>
<alert :show.sync="showInfo" :title="bankList[showInfoNum].name" button-text="确认">
  <p style="text-align:center;">{{bankList[showInfoNum].text}}</p>
</alert>
</template>

<script>
import Lib from 'assets/Lib.js'
import Group from 'vux-components/group'
import Cell from 'vux-components/cell'
import Alert from 'vux-components/alert'
export default {
  data() {
    return {
      bankList: [{
        "name": "中国银行",
        "cardType": "信用卡",
        "credit": 15000,
        "icon": "http://img1.imgtn.bdimg.com/it/u=1358184335,3457136256&fm=21&gp=0.jpg",
        "text": "123jdafjkl;qf2jef80qsdgjasvjiopasvjioapsdfh1eu809d-vhjzcvjkospdcvjioqpwfji0qwefjioapsvjklzxcvbnjkizvjioapsdfjiopqwefji09/n/n/n/qwerqwefaispdfjkoapsdfjiozpxcvjiop"
      }, {
        "name": "中国银行",
        "cardType": "信用卡",
        "credit": 15000,
        "icon": "http://img1.imgtn.bdimg.com/it/u=1358184335,3457136256&fm=21&gp=0.jpg",
        "text": "123jdafjkl;qf2jef80qsdgjasvjiopasvjioapsdfh1eu809d-vhjzcvjkospdcvjioqpwfji0qwefjioapsvjklzxcvbnjkizvjioapsdfjiopqwefji09/n/n/n/qwerqwefaispdfjkoapsdfjiozpxcvjiop"
      }, {
        "name": "中国银行",
        "cardType": "信用卡",
        "credit": 15000,
        "icon": "http://img1.imgtn.bdimg.com/it/u=1358184335,3457136256&fm=21&gp=0.jpg",
        "text": "123jdafjkl;qf2jef80qsdgjasvjiopasvji\n\n\noapsdfh1eu809d-vhjzcvjkospdcvjioqpwfji0qwefjioapsvjklzxcvbnjkizvjioapsdfjiopqwefji09/n/n/n/qwerqwefaispdfjkoapsdfjiozpxcvjiop"
      }],
      showInfo: false,
      showInfoNum: 0
    }
  },
  components: {
    Group,
    Cell,
    Alert
  },
  methods: {
    select: (bankSub) => {
        location.href=`activation-step2.html?bank=${bankSub}`
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
.cell {
    height: 77px;
    .select{
      position: absolute;
      z-index: 2;
      left: 0;
      top:0;
      height: 100%;
    }
    .bank-logo {
        width: 40px;
        height: 40px;
        position: absolute;
        top: 15px;
        left: 20px;
    }
    .bank-name {
        color: #393939;
        font-size: 16px;
        position: absolute;
        top: 25px;
        left: 70px;
    }
    .text {
        position: absolute;
        left: 70px;
        bottom: 20px;
        font-size: 12px;
        color: #999;
        .cart-type {
            color: #3BA794;
        }
        .credit-count{
          color: #ec5835;
        }
    }
    .info {
        position: absolute;
        height: 100%;
        width: 40px;
        top: 0;
        right: 0;
        img {
            position: absolute;
            top: 35px;
            left: 0;
            width: 20px;
            height: 20px;
        }
    }
}
</style>
