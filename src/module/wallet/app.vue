<template>

<div class="wallet-title">我的钱包(元)</div>
<div class="wallet-money">{{money|currency '' 2}}</div>

<x-button class="postal" slot="right"  style="color:#fff;background-color:#88C928;margin:20px 20px;width:calc( 100% - 40px )" >提现</x-button>
</template>

<script>
import Lib from 'assets/Lib.js'
import XButton from 'vux-components/x-button'
export default {
  data() {
    return {
      money:999
    }
  },
  components: {
    XButton,
  },
  methods: {

  }
}
</script>


<style lang="less" scoped>
.wallet-title{
margin-top: 90px;
width: 100%;
height: 16px;
font-size: 16px;
text-align: center;
color: #393939;
}
.wallet-money{
margin-top: 20px;
width: 100%;
height: 36px;
font-size: 36px;
text-align: center;
color: #393939;
}
.postal{
  margin-top: 100px!important;
}
</style>
