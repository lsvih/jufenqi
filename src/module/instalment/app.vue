<template>
<flexbox class="vux-1px-d">
  <flexbox-item class="block-1">
    <!-- <img class="help" src="help.png"><img class="alert" src="alert.png"> -->
    <div class="ins-title">已贷款额度（元）</div>
    <div class="ins-limit" v-if="thisStatus == '已激活'">{{limit|currency "" 2}}</div>
    <!-- <div class="ins-limit" v-else>敬请期待</div> -->
    <div class="ins-limit-apply" v-if="thisStatus == '未申请'||thisStatus == '激活失败'||thisStatus == '申请失败'" v-tap="goto('./ins-apply.html')">去申请</div>
    <div class="ins-limit-apply" v-if="thisStatus == '未激活'" v-tap="goto('./activation-step1.html')">去激活</div>
    <div class="ins-limit-apply" v-if="thisStatus == '激活中'">激活中</div>
    <img class="bg" src="fq_bg.png" width="100%" height="auto">
  </flexbox-item>
</flexbox>
<flexbox class="vux-1px-t block-2">
  <flexbox-item class="balance">
    <div>可贷款总额度</div>
    <div class="balance-money">{{ins|currency "" 2}}</div>
  </flexbox-item>
</flexbox>
<scroller class="block-3" height="calc( 100% - 190px - 44px )" :lock-x="true" :scrollbar-y="true">
  <div>
    <div style="width:100%" :style="{'height':getScreenWidth() * 1.872 + 'px'}"><img src="/static/temp/分期.jpg" width="100%">
    </div>
  </div>
</scroller>

<j-footer></j-footer>
<loading :show="showLoading" text="正在更新您的额度信息，请稍候..."></loading>
</template>

<script>
import Lib from 'assets/Lib.js'
import JFooter from 'components/JFooter.vue'
import {
  Flexbox,
  FlexboxItem
} from 'vux-components/flexbox'
import Loading from 'vux-components/loading'
import Scroller from "vux-components/scroller"
import axios from 'axios'
try{
  axios.defaults.headers.common['x-user-token'] = JSON.parse(localStorage.getItem("user")).token
}catch(e){
  localStorage.clear()
  window.location.href = `./wxAuth.html?url=index.html`
}
export default {
  data() {
    return {
      showLoading: false,
      limit: 0,
      balance: 0,
      ins: 0,
      status: {
        'UNSUCCESSFULLY': {
          "name": "申请失败"
        },
        'UNACTIVATED': {
          "name": "未激活"
        },
        'ACTIVATING': {
          "name": "激活中"
        },
        'ACTIVATED': {
          "name": "已激活"
        },
        'DISABLED': {
          "name": "激活失败"
        },
      },
      thisStatus: "正在查询",
    }
  },
  components: {
    JFooter,
    Flexbox,
    FlexboxItem,
    Scroller,
    Loading
  },
  ready() {
    axios.get(`${Lib.C.loanApi}loan-applications`, {
      params: {
        filter: `userId:${JSON.parse(window.localStorage.getItem('user')).userId}`,
        sort: "createdAt,desc"
      }
    }).then((res) => {
      try{
        this.thisStatus = this.getStatus(res.data.data[0].status)
      }catch(e){
        this.thisStatus = "未申请"
      }
    }).catch((res) => {
      alert("查询贷款信息失败，请重试")
    })
  },
  methods: {
    getStatus(status) {
      try {
        let statusName = eval(`this.status.${status}.name`)
        return statusName
      } catch (e) {
        return "未申请"
      }
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
        top: 66px;
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
</style>
