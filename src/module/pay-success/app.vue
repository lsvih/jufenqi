<template>
<div class="apply-success">
  <div>
    <img src="/static/images/success-orange.png">
    <div class="ins-status"><p v-for="i in info(type)">{{i}}</p></div>
  </div>

</div>

<x-button slot="right" style="background-color:#ff9736;color:#fff;margin:50px 20px;width:calc( 100% - 40px )" v-tap="back(type)">返回</x-button>

<j-tel style="margin-top:30px"></j-tel>
</template>

<script>
import Lib from 'assets/Lib.js'
import XButton from 'vux-components/x-button'
import JTel from 'components/j-tel'
export default {
  data() {
    return {
      type: Lib.M.GetRequest().type
      // 1为全款支付
      // 2为分期支付
      // 3为微信支付
      // 4为信用卡支付
    }
  },
  components: {
    XButton,
    JTel
  },
  methods: {
    back(type){
      if(type<=2){
        location.href = './zc-order-list.html?type=2'
      }else{
        location.href = './zc-order-list.html?type=3'
      }
    },
    info(type){
      if(type>2){
        return ['您的订单支付已完成','商家将在3个工作日内发货']
      }else{
        return ['您的订单已提交','收款人将最迟1个工作日内与您联系，并线下刷卡']
      }
    }
  }
}
</script>



<style lang="less">
.apply-success {
    position: relative;
    width: 100%;
    height: 200px;
    background-color: #fff;
    img {
        width: 70px;
        height: 70px;
        position: absolute;
        top: 80px;
        left: 50%;
        margin-left: -35px;
    }
    .process {
        padding-top: 200px;
    }
    .ins-status {
        position: absolute;
        width: 100%;
        top: 160px;
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
