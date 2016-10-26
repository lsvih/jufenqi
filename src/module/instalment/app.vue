<template>
<flexbox class="vux-1px-d">
  <flexbox-item class="block-1">
    <!-- <img class="help" src="help.png"><img class="alert" src="alert.png"> -->
    <div class="ins-title">可贷款额度（元）</div>
    <div class="ins-limit" v-if="limit">{{limit|currency "" 2}}</div>
    <div class="ins-limit" v-else>敬请期待</div>
    <!-- <div class="ins-limit" v-else>未申请</div>
       <img class="bg" src="fq_bg.png" width="100%" height="auto"> -->
  </flexbox-item>
</flexbox>
<flexbox class="vux-1px-t block-2">
  <flexbox-item class="balance vux-1px-r">
    <div>已贷款</div>
    <div class="balance-money">{{ins|currency "" 2}}</div>
  </flexbox-item>
  <flexbox-item class="balance">
    <div>我的钱包</div>
    <div class="balance-money">{{balance|currency "" 2}}</div>
  </flexbox-item>
</flexbox>
<scroller class="block-3" height="calc( 100% - 190px - 44px )" :lock-x="true" :scrollbar-y="true" >
  <div v-if="!insList.length">
    <div style="width:100%" :style="{'height':getScreenWidth() * 1.872 + 'px'}"><img src="/static/temp/分期.jpg" width="100%">
      <!-- <div style="width:100%;height:44px;margin-left:calc( (100% - 200px)/2 )">
        <div class="apply" onclick="location.href='ins-apply.html'">去申请</div>
      </div> -->
    </div>
  </div>
  <div v-else style="width:100%;padding-bottom:44px;">
    <j-card v-for="insInfo in insList">
      <div>{{insInfo.name}}</div>
      <div class="ins-insinfo-count">申请总额:<span>{{insInfo.insCount|currency "￥" 2}}</span></div>
      <div class="ins-insinfo-line"></div>
      <j-credit-process :step="insInfo.step"></j-credit-process>
    </j-card>
    <div style="width:100%;height:44px;margin-left:calc( (100% - 200px)/2 )">
      <div class="apply" onclick="location.href='ins-apply.html'">去申请</div>
    </div>
  </div>
</scroller>

<j-footer></j-footer>
<loading :show="showLoading" text="正在更新您的额度信息，请稍候..."></loading>
</template>

<script>
import Lib from 'assets/Lib.js'
import JFooter from 'components/JFooter.vue'
import JCard from 'components/JCard.vue'
import JCreditProcess from 'components/JCreditProcess.vue'
import {
  Flexbox,
  FlexboxItem
} from 'vux-components/flexbox'
import Loading from 'vux-components/loading'
import Scroller from "vux-components/scroller"
export default {
  data() {
    return {
      showLoading: false,
      limit: this.isDataExist("limit"),
      balance: this.isDataExist("balance"),
      ins: this.isDataExist("ins"),
      insList: !localStorage.user || !JSON.parse(localStorage.user).insList ? [] : JSON.parse(localStorage.user).insList
    }
  },
  components: {
    JFooter,
    Flexbox,
    FlexboxItem,
    Scroller,
    Loading,
    JCard,
    JCreditProcess
  },
  ready() {
    // let that = this;
    // if (Lib.M.GetRequest().refresh) {
    //   this.startLoading()
    //   //TODO ajax过程
    //   setTimeout(() => {
    //     Lib.M.SetLocalData("user", "limit", "10000", function() {
    //       that.limit = 10000
    //       that.stopLoading()
    //     })
    //   }, 1000)
    // }
    // //Fake data
    // let insList = [{
    //   "id": 1232,
    //   "name": "1213家装分期",
    //   "step": 2,
    //   "insCount": 11023,
    // }, {
    //   "id": 1232,
    //   "name": "111家装分期",
    //   "step": 1,
    //   "insCount": 11223,
    // }, {
    //   "id": 1232,
    //   "name": "12313家装分期",
    //   "step": 1,
    //   "insCount": 223,
    // }]
    // Lib.M.SetLocalData("user", "insList", insList, function() {})
  },
  methods: {
    stopLoading() {
      this.showLoading = false
    },
    startLoading() {
      this.showLoading = true
    },
    isDataExist(what){
      return !localStorage.getItem(what) || !JSON.parse(localStorage.user)[what] ? 0 : JSON.parse(localStorage.user)[what]
    },
    getScreenWidth() {
      return document.body.clientWidth
    }
  }
}
</script>

<style scoped lang="less">@import '~vux/dist/styles/1px.css';
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
        color:#3BA794;
    }
    .ins-limit {
        width: 100%;
        text-align: center;
        top: 66px;
        font-size: 36px;
        color:#393939;
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
    color:#393939;
    height: 40px;
    line-height: 20px;
    text-align: center;
    .balance-money {}
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
</style>
