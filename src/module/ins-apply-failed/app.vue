<template>
<div class="apply-success">
  <div>
    <img src="success.png">
    <div class="ins-status">贷款申请失败</div>
    <div class="ins-tips">请重新申请</div>
  </div>

</div>

<x-button slot="right" style="background-color:rgb(255, 59, 59);color:#fff;margin:20px 20px;width:calc( 100% - 40px )" v-tap="goto('./ins-apply.html')">重新申请</x-button>
<x-button slot="right" plain style="border-color:#88c928;color:#88c928;margin:20px 20px;width:calc( 100% - 40px )" v-tap="goto('./index.html')">返回首页</x-button>

<j-tel style="margin-top:30px"></j-tel>
</template>

<script>
import Lib from 'assets/Lib.js'
import JCreditProcess from 'components/JCreditProcess.vue'
import Group from 'vux-components/group'
import Cell from 'vux-components/cell'
import XButton from 'vux-components/x-button'
import JTel from 'components/JTel.vue'
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
