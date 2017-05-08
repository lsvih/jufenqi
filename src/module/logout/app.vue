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
        top: 180px;
        left: 50%;
        margin-left: -35px;
    }
    .process {
        padding-top: 200px;
    }
    .ins-status {
        position: absolute;
        width: 100%;
        top: 260px;
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

<template>
<div class="apply-success">
  <div>
    <img src="/static/images/success-orange.png">
    <div class="ins-status"><p v-for="i in info()">{{i}}</p></div>
  </div>

</div>


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
        return ['您已退出登录','请关闭公众号重新登录']
    }
  }
}
</script>
