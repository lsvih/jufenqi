<template>
<div class="apply-success">
  <div>
    <img src="/static/images/success-orange.png">
    <div class="ins-status">预约成功</div>
  </div>

</div>

<x-button slot="right" style="background-color:#ff9736;color:#fff;margin:20px 20px;width:calc( 100% - 40px )" v-tap="gotoOrderList()">返回订单列表</x-button>
<x-button slot="right" style="background-color:#fff;color:#ff9736;border:1px solid #ff9736;margin:20px 20px;width:calc( 100% - 40px )" v-tap="goto('./index.html')">返回首页</x-button>

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
    }
  },
  components: {
    XButton,
    JTel
  },
  methods: {
    gotoOrderList(){
      window.location.href = this.type == 1?'./zx-order-list.html':'./zc-order-list.html'
    },
    goto(url){
      location.href = url
    }
  }
}
</script>



<style lang="less" scoped>
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
