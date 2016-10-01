<template>

  <flexbox class="vux-1px-d">
  <flexbox-item class="block-1">
    <img class="help" src="help.png"><img class="alert" src="alert.png">
    <div class="ins-title">可贷款额度（元）</div>
    <div class="ins-limit">{{limit()}}</div>
    <img class="bg" src="fq_bg.png" width="100%" height="auto">
  </flexbox-item>
</flexbox>
<flexbox class="vux-1px-t block-2">
  <flexbox-item class="balance vux-1px-r"><div>已贷款</div><div class="balance-money">{{getHasIns()|currency "" 2}}</div></flexbox-item>
  <flexbox-item class="balance"><div>我的钱包</div><div class="balance-money">{{getBalance()|currency "" 2}}</div></flexbox-item>
</flexbox>
<scroller class="block-3" height="calc( 100% - 190px - 44px )" lock-x :prevent-default="false" scrollbarY>
      <div style="height:900px;width:100%"><img src="banner.png" width="100%">
        <div style="width:100%;height:44px;margin-left:calc( (100% - 200px)/2 )"><div class="apply" onclick="location.href='ins-apply.html'">去申请</div></div>
    </div>
</scroller>

<j-footer></j-footer>
</template>

<script>

import Lib from 'assets/Lib.js'
import JFooter from 'components/JFooter.vue'
import  { Flexbox, FlexboxItem } from 'vux-components/flexbox/'
import Scroller from "vux-components/scroller/"
export default {
  data() {
    return {

    }
  },
  components: {
    JFooter,
    Flexbox,
    FlexboxItem,
    Scroller
  },
  ready(){


  },
  methods: {
    limit:()=>{
        return !localStorage.user||!JSON.parse(localStorage.user).limit?"未申请":`${JSON.parse(localStorage.user).limit}元`
    },
    getHasIns:()=>{
      return localStorage.user!==undefined?JSON.parse(localStorage.user).hasIns:0
    },
    getBalance:()=>{
      return localStorage.user!==undefined?JSON.parse(localStorage.user).balance:0
    }
  }
}
</script>

<style scoped lang="less">
@import '~vux/dist/styles/1px.css';
.block-1{
  position: relative;
  height: 130px;
  overflow: hidden;
  .bg{
    position: absolute;
    bottom: 1px;
    left:0;
    z-index: 1;
  }
  div{
    position: absolute;
    z-index: 2;
    color:#5965B2;
  }
  .ins-title{
    left:50%;
    top:30px;
    font-size: 16px;
    margin-left: -64px;
  }
  .ins-limit{
    left:50%;
    top:66px;
    font-size: 36px;
    margin-left: -54px;
  }
  .help{
    position: absolute;
    z-index: 2;
    top:30px;
    left:24px;
    height: 26px;
    width: 26px;
  }
  .alert{
    position: absolute;
    z-index: 2;
    top:30px;
    right: 24px;
    height: 26px;
    width: 26px;
  }
}
.block-2{
  padding:10px 0;
}
.block-3{
  position: absolute;
}
.balance{
  height:40px;
  line-height: 20px;
  text-align: center;
  .balance-money{
  }
}
.apply{
  height: 44px;
  line-height: 44px;
  width: 200px;
  border-radius: 22px;
  border: 1px solid #5965B2;
  color:#5965B2;
  font-size: 28px;
  text-align: center;
}
</style>
