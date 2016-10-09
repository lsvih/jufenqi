<template>
<div class="apply-success">
  <div>
    <img src="success.png">
    <div class="ins-status">预约成功</div>
  </div>

</div>

<x-button slot="right" style="background-color:rgba(89,101,178,1);color:#fff;margin:20px 20px;width:calc( 100% - 40px )" onclick="location.href='./index.html'">返回</x-button>

<j-tel style="margin-top:30px"></j-tel>
</template>

<script>
import Lib from 'assets/Lib.js'

import XButton from 'vux-components/x-button'
import JTel from 'components/JTel.vue'
export default {
  data() {
    return {

    }
  },
  components: {

    XButton,
    JTel
  },
  methods: {
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
