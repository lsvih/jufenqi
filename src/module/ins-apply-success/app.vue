<template>
<div class="apply-success">

  <div v-if="wating">
    <img src="waiting.png">
    <div class="ins-status">贷款申请中…</div>
    <div class="ins-tips">我们将在15秒内为您反馈申请结果，请耐心等待</div>
  </div>
  <div v-else>
    <img src="success.png">
    <div class="ins-status">贷款申请成功</div>
    <div class="ins-tips">请在30天内激活您的申请额度，过期后需要重新申请</div>
  </div>
  <j-credit-process :step="1" class="process">
  </j-credit-process>
  <group>
    <cell title="期望贷款" v-bind:value="wantIns|currency '￥' 2" v-tap="showInsNumberPicker = true" style="height:30px"></cell>
  </group>
</div>

<x-button slot="right" style="background-color:rgb(136,201,40);color:#fff;margin:20px 20px;width:calc( 100% - 40px )" v-tap="nextStep(wating)">{{wating?"刷新结果":"激活额度"}}</x-button>
<x-button slot="right" plain style="border-color:#88c928;color:#88c928;margin:20px 20px;width:calc( 100% - 40px )" v-tap="goto('./index.html')">返回首页</x-button>

<j-tel style="margin-top:30px"></j-tel>
</template>

<script>
import Lib from 'assets/Lib.js'
import JCreditProcess from 'components/j-credit-process'
import Group from 'vux-components/group'
import Cell from 'vux-components/cell'
import XButton from 'vux-components/x-button'
import JTel from 'components/j-tel'
export default {
  data() {
    return {
      wating: Lib.M.GetRequest().wait,
      wantIns: JSON.parse(localStorage.getItem('apply-info')).expectQuota
    }
  },
  components: {
    JCreditProcess,
    Cell,
    Group,
    XButton,
    JTel
  },
  compiled: () => {
    if (Lib.M.GetRequest().wait) {
      setTimeout(() => {
        location.href = "ins-apply-success.html"
      }, 6000)
    }
  },
  methods: {
    nextStep: (isWaiting) => {
      location.href = isWaiting ? "ins-apply-success.html" : "activation-step1.html"
    },
    goto(url){
      location.href = url
    }
  }
}
</script>

<style>
body {
  background-color: #eee;
}
</style>

<style lang="less" scoped>
.apply-success {
    position: relative;
    width: 100%;
    height: 300px;
    background-color: #fff;
    img {
        width: 70px;
        height: 70px;
        position: absolute;
        top: 40px;
        left: 50%;
        margin-left: -35px;
    }
    .process {
        padding-top: 200px;
    }
    .ins-status {
        position: absolute;
        width: 100%;
        top: 120px;
        text-align: center;
        font-size: 16px;
        color: #393939;
    }
    .ins-tips {
        position: absolute;
        font-size: 12px;
        width: 100%;
        top: 146px;
        text-align: center;
        color: #727272;
    }
}
</style>
