<style scoped lang="less">
@import '~vux/dist/styles/1px.css';
.block-1 {
    position: relative;
    height: 130px;
    overflow: hidden;
    .bg {
        position: absolute;
        bottom: 1px;
        left: 0;
        z-index: 1;
    }
    div {
        position: absolute;
        z-index: 2;
        color: #5965B2;
    }
    .ins-title {
        left: 50%;
        top: 30px;
        font-size: 16px;
        margin-left: -64px;
        color: #3BA794;
    }
    .ins-limit {
        width: 100%;
        text-align: center;
        top: 66px;
        font-size: 36px;
        color: #393939;
    }
    .ins-limit-apply {
        top: 44px;
        text-align: center;
        width: 150px;
        height: 44px;
        line-height: 44px;
        left: calc(~"50% - 75px");
        background-color: transparent;
        border: 1px solid #88C928;
        color: #88C928;
        border-radius: 22px;
    }
    .help {
        position: absolute;
        z-index: 2;
        top: 30px;
        left: 24px;
        height: 26px;
        width: 26px;
    }
    .alert {
        position: absolute;
        z-index: 2;
        top: 30px;
        right: 24px;
        height: 26px;
        width: 26px;
    }
}
.block-2 {
    padding: 10px 0;
}
.block-3 {
    position: absolute;
    background-color: #eee;
    width: 100%;
}
.balance {
    color: #999;
    height: 40px;
    line-height: 20px;
    text-align: center;
    .balance-money {
        margin-top: 6px;
    }
}
.apply {
    height: 44px;
    line-height: 44px;
    width: 200px;
    border-radius: 22px;
    border: 1px solid #5965B2;
    color: #5965B2;
    font-size: 28px;
    text-align: center;
}
.ins-insinfo-count {
    margin-top: 9px;
    font-size: 12px;
    span {
        color: #5965B2;
    }
}
.ins-insinfo-line {
    margin: 15px 0 18px;
    height: 1px;
    width: 100%;
    background-color: #eee;
}
.ins-process {
  padding: 20px 0;
}
.ins-header-bac{
  background-image: url('http://ohej1hvbm.bkt.clouddn.com/ins-bg.png');
  height: 230px;
  background-size: cover;
  width: 100%;
}
.ins-header-goapply{
  width: 100%;
  padding-top: 44px;
  p{
    width: 103px;
    height: 103px;
    border-radius: 50%;
    background: #fff;
    margin: 0 auto 18px;
    padding: 0;
    text-align: center;
    line-height: 103px;
    font-size: 15px;
    color: #ff9736;
    font-weight: bold;
    box-shadow: 0px 5px 13px 0px rgba(0, 0, 0, 0.3);
  }
  span{
    font-size: 14px;
    color: #fff;
    display: block;
    text-align: center;
  }
}
.ins-header-success{
  padding-top: 35px;
  color: #fff;
  text-align: center;
  p{
    font-size: 14px;
    padding: 0;
    margin: 0;
  }
  div{
    font-size: 35px;
    font-weight: bold;
    margin: 29px 0 30px;
    span{
      font-size: 15px;
    }
  }
  span{
    font-size: 14px;
  }
  strong{
    font-size: 14px;
    display: block;
    margin-top: 42px;
  }
}
.ins-list{
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  height: 48px;
  div{
    width: 50%;
    padding-top: 10px;
    height: 100%;
    text-align: center;
    border-bottom: 1px solid #ddd;
    p{
      font-size: 12px;
      color: #494949;
      padding: 0;
      margin: 0;
    }
    span{
      color: #999;
      font-size: 12px;
      display: block;
      margin-top: 6px;
    }
  }
}
.ins-list div:nth-child(1){
  border-right: 1px solid #ddd;
}
.ins-header-applyfalse{
  width: 100%;
  padding-top: 44px;
  p{
    width: 103px;
    height: 103px;
    border-radius: 50%;
    background: #fff;
    margin: 0 auto 18px;
    padding: 0;
    text-align: center;
    line-height: 103px;
    font-size: 15px;
    color: #ff9736;
    font-weight: bold;
    box-shadow: 0px 5px 13px 0px rgba(0, 0, 0, 0.3);
  }
  span{
    font-size: 14px;
    color: #fff;
    display: block;
    text-align: center;
  }
  strong{
    text-align: center;
    color: #fff;
    font-size: 12px;
    display: block;
    margin-top: 15px;
    font-weight: normal;
  }
}
.ins-header-wait{
  padding-top: 18px;
  text-align: center;
  color: #fff;
  p{
    padding: 0;
    font-size: 14px;
  }
  div{
    margin: 12px auto 18px;
    height: 103px;
    width: 103px;
    border-radius: 50%;
    border: 1px solid #fff;
    line-height: 103px;
    font-size: 15px;
    font-weight: bold;
  }
  span{
    font-size: 14px;
  }
}
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
        top: 31px;
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

<template>
<!-- <flexbox class="vux-1px-d">
  <flexbox-item class="block-1"> -->
    <!-- <img class="help" src="help.png"><img class="alert" src="alert.png"> -->
    <!-- <div class="ins-title" v-if="thisStatus == '已激活'">已贷款额度（元）</div>
    <div class="ins-limit" v-if="thisStatus == '已激活'">{{limit|currency "" 2}}</div> -->
    <!-- <div class="ins-limit" v-else>敬请期待</div> -->
    <!-- <div class="ins-limit-apply" v-if="thisStatus == '未申请'||thisStatus == '激活失败'||thisStatus == '申请失败'" v-tap="goto('./ins-apply.html')">去申请</div>
    <div class="ins-limit-apply" v-if="thisStatus == '未激活'" v-tap="goto('./activation-step1.html')">去激活</div>
    <div class="ins-limit-apply" v-if="thisStatus == '激活中'">激活中</div>
    <img class="bg" src="fq_bg.png" width="100%" height="auto"> -->

  <!-- </flexbox-item>
</flexbox> -->
<div class="ins-header-bac">


  <div class="ins-header-goapply" v-if="thisStatus == '未申请'">
    <p v-tap="goto('./ins-apply.html')">去申请</p>
    <span>最高可贷款60万元，24期免息</span>
  </div>
  <div class="ins-header-applyfalse" v-if="thisStatus == '激活失败' || thisStatus == '申请失败'">
    <p v-tap="goto('./ins-apply.html')">重新申请</p>
    <span>最高可贷款60万元，24期免息</span>
    <strong>—— 申请失败 ——</strong>
  </div>


  <div class="ins-header-success" v-if="thisStatus == '已激活'">
    <p>已贷款额度</p>
    <div style="margin: 17px 0 5px; ">{{limit|currency "" 2}}<span>元</span>
    </div>
    <span>{{expectInstalment}}期  每期{{(limit/expectInstalment)|currency "" 2}}  利息 0 (元)</span>
    <strong style="margin-top: 20px">—— 审核成功 ——</strong>
  </div>


  <div class="ins-header-wait" v-if="thisStatus == '未激活'">
    <p>初审通过</p>
    <div>待激活</div>
    <span>请选择一家银行激活贷款</span>
  </div>


  <div class="ins-header-success" v-if="thisStatus == '激活中'">
    <p>期望贷款额度</p>
    <div style="margin-bottom: 5px;">{{expectQuota|currency "" 2}}<span>元</span></div>
    <span>期望{{expectInstalment}}期</span>
    <strong style="margin-top: 20px;">—— 审核中。。 ——</strong>
  </div>
</div>

<div class="ins-list" v-if="thisStatus == '已激活' || thisStatus == '激活中'">
  <div>
    <p>已消费金额(元)</p>
    <span>{{balance|currency "" 2}}元</span>   
  </div>
  <div>
    <p>可贷款总额(元)</p>
    <span>{{ins?ins:0|currency "" 2}}元</span>
  </div>
</div>
<!-- <flexbox class="vux-1px-t block-2" v-if="thisStatus == '已激活'">
  <flexbox-item class="balance" >
    <div >可贷款总额度</div>
    <div class="balance-money" >{{ins|currency "" 2}}</div>
  </flexbox-item>
</flexbox>
<flexbox class="vux-1px-t block-2" v-if="thisStatus == '未申请'||thisStatus == '激活失败'||thisStatus == '申请失败'">
  <flexbox-item class="balance">
    <div>购买主材最高24期免息</div>
  </flexbox-item>
</flexbox> -->
<!-- <div class="process-wrapper" style="width:100%; overflow: hidden;">
    <j-installment-process :step="3" v-if="thisStatus == '未激活'"></j-installment-process>
    <j-installment-process :step="5" v-if="thisStatus == '激活中'"></j-installment-process>
  </div> -->
  <div class="down-part">
  <scroller class="block-3" height="calc( 100% - 190px - 44px )" :lock-x="true" :scrollbar-y="false" v-if="thisStatus == '未申请'||thisStatus == '激活失败'||thisStatus == '申请失败'">
      <div>
        <div style="width:100%" :style="{'height':getScreenWidth() * 1.872 + 'px'}"><img src="/static/temp/分期.jpg" width="100%">
        </div>
      </div>
    </scroller>
    <group style="margin-top:-1.17647059em; margin-bottom: 50px;" v-if="thisStatus == '未激活' ">
      <cell class="cell" v-for="bank in bankList">
        <div class="select" v-tap="bankSelect($index)" style="width:calc( 100% - 40px )"></div>
        <img class="bank-logo" :src="imgUrl + bank.bank.logoImg">
        <div class="bank-name">{{bank.bankName}}</div>
        <div class="text">
          可申请金额:<span class="credit-count">{{bank.bankQuota|currency "" 2}}</span>
        </div>
      </cell>
    </group>
  </div> 

<j-footer></j-footer>
<loading :show="showLoading" text="正在更新您的额度信息，请稍候..."></loading>
</template>

<script>
import Lib from 'assets/Lib.js'
import JFooter from 'components/j-footer'
import {
  Flexbox,
  FlexboxItem
} from 'vux-components/flexbox'
import Loading from 'vux-components/loading'
import Scroller from "vux-components/scroller"
import Group from 'vux-components/group'
import Cell from 'vux-components/cell'
import axios from 'axios'
import JInstallmentProcess from 'components/j-installment-process'

Lib.M.auth(axios, true)
export default {
  data() {
    return {
      showLoading: false,
      limit: 0,   //已贷款额度
      balance: 0,
      expectInstalment: 0, //期望分期数
      ins: 0,  //可贷款额度
      balance: 0, //已消费金额
      bankList: [],
      imgUrl: Lib.C.imgUrl,
      status: [
        // 'UNSUCCESSFULLY':
        {
          statusEnum: 0,
          name: "申请失败"
        },
        // 'UNACTIVATED':
        {
          statusEnum: 1,
          name: "未激活"
        },
        // 'ACTIVATING':
        {
          statusEnum: 2,
          name: "激活中"
        },
        // 'ACTIVATED':
        {
          statusEnum: 3,
          name: "已激活"
        },
        // 'DISABLED':
        {
          statusEnum: 4,
          name: "激活失败"
        }
      ],
      // thisStatus: "未激活",
      thisStatus: "正在查询",
      stepNum: 0
    }
  },
  components: {
    JFooter,
    Flexbox,
    FlexboxItem,
    Scroller,
    Loading,
    JInstallmentProcess,
    Group,
    Cell
  },
  ready() {
    axios.get(`${Lib.C.loanApi}loan-applications`, {
      params: {
        filter: `userId:${JSON.parse(window.localStorage.getItem('user')).userId}`,
        sort: "createdAt,desc"
      }
    }).then((res) => {
      try {
        this.thisStatus = this.getStatus(res.data.data[0].statusEnum)
        this.ins = res.data.data[0].totalQuota
        this.limit = res.data.data[0].loanQuota
        this.expectInstalment = res.data.data[0].expectInstalment
        this.expectQuota = res.data.data[0].expectQuota
      } catch (e) {
        this.thisStatus = "未申请"
      }
      if (this.thisStatus == '未激活') {
        this.getBank()
      }
    }).catch((res) => {
      alert("查询贷款信息失败，请重试")
    }),
    this.getBalance()
  },
  methods: {
    getStatus(status) {
      try {
        let statusName = this.status[status].name
        return statusName
      } catch (e) {
        return "未申请"
      }
    },
    getBank() {
      axios.get(`${Lib.C.loanApi}loan-application-schemes`,{
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
        console.log(this.bankList)
      }).catch((res) => {
        alert("获取银行列表失败，请稍候再试...")
      })
    },
    getBalance() {
      axios.get(`${Lib.C.walletApi}wallets/${JSON.parse(localStorage.getItem('user')).userId}`).then((res) => {
        this.balance = res.data.data.consumptionAmount
      }).catch((err) => {
        alert('获取已消费金额失败，请稍后再试。。')
      })
    },
    bankSelect(index) {
      let data = JSON.parse(localStorage.getItem("apply-info"))
      data.bank = this.bankList[index].bank
      localStorage.setItem("apply-info", JSON.stringify(data))
      location.href = `activation-step2.html`
    },
    goto(url) {
      window.location.href = url
    },
    stopLoading() {
      this.showLoading = false
    },
    startLoading() {
      this.showLoading = true
    },
    getScreenWidth() {
      return document.body.clientWidth
    }
  }
}
</script>

