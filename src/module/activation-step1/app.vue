<template>
<group style="margin-top:-1.17647059em;">
  <cell class="cell" v-for="bank in bankList">
    <div class="select" v-tap="select($index)" style="width:calc( 100% - 40px )"></div>
    <img class="bank-logo" :src="bank.bank.logoImg">
    <div class="bank-name">{{bank.bankName}}</div>
    <div class="text">
      <!-- 持卡类型:<span class="card-type">{{bank.cardType}}</span>&nbsp;&nbsp; -->
      可申请金额:<span class="credit-count">{{bank.bankQuota|currency "" 2}}</span></div>
    <!-- <div class="info" v-tap="(showInfoNum = $index,showInfo = true,preventDefault())"><img src="info.png"></div> -->
  </cell>
</group>
<!-- <alert :show.sync="showInfo" :title="bankList[showInfoNum].name" button-text="确认">
  <p style="text-align:center;">{{bankList[showInfoNum].text}}</p>
</alert> -->
</template>

<script>
import Lib from 'assets/Lib.js'
import Group from 'vux-components/group'
import Cell from 'vux-components/cell'
import axios from 'axios'
try{
  axios.defaults.headers.common['x-user-token'] = JSON.parse(localStorage.getItem("user")).token
}catch(e){
  localStorage.clear()
  window.location.href = `./wxAuth.html?url=index.html`
}
// import Alert from 'vux-components/alert'
export default {
  data() {
    return {
      bankList: [],
      showInfo: false,
      showInfoNum: 0
    }
  },
  components: {
    Group,
    Cell,
    // Alert
  },
  methods: {
    select(index) {
      let data = JSON.parse(localStorage.getItem("apply-info"))
      data.bank = this.bankList[index].bank
      localStorage.setItem("apply-info", JSON.stringify(data))
      location.href = `activation-step2.html`
    }
  },
  ready() {
    axios.get(`${Lib.C.loanApi}loan-application-schemes`,{},{
      params: {
        filter: `userId:${JSON.parse(localStorage.getItem('user')).userId}`,
        sort: "createdAt,desc"
      }
    }).then((res) => {
      this.bankList = res.data.data
      if(!localStorage.getItem("apply-info")){
        let a = JSON.parse(JSON.stringify(res.data.data[0].loanApplication))
        localStorage.setItem("apply-info",JSON.stringify(a))
      }
    }).catch((res) => {
      alert("获取银行列表失败，请稍候再试...")
    })
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
    .select {
        position: absolute;
        z-index: 2;
        left: 0;
        top: 0;
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
        .credit-count {
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
