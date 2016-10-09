<template>
<div class="order-header">
<div class="order-icon"><img :src="icon"></div>
<div class="order-name">{{name}}</div>
<rater :value.sync="rate" slot="value" class="star"></rater>
<divider style="font-size:12px;margin:20px 0 20px 0!important;">评价</divider>
</div>
<div>
<x-textarea style="border:1px solid #eee;margin:0 38px;" :max="200" name="description" placeholder="描述"></x-textarea>
</div>
<x-button slot="right" style="background-color:rgb(158, 188, 43);color:#fff;margin:20px 20px;width:calc( 100% - 40px )">提交</x-button>
</template>

<script>
import Lib from 'assets/Lib.js'
import XButton from 'vux-components/x-button'
import Rater from 'vux-components/rater'
import Divider from 'vux-components/divider'
import XTextarea from 'vux-components/x-textarea'
export default {
  data() {
    return {
      rate:5,
      icon:"http://placekitten.com/g/80/80",
      name:"hahaha"
    }
  },
  components: {
    Rater,
    XButton,
    Divider,
    XTextarea
  },

  methods: {

  }
}
</script>

<style>
body {
  text-align: center;
}
</style>

<style lang="less" scoped>
.order-header{
  width: calc( ~"100% - 38px * 2" );
  margin-left: 38px;
  .order-icon{
    margin: 70px 0 10px calc( ~"50% - 40px" );
    border-radius: 40px;
    width: 80px;
    height: 80px;
    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .order-name{
    width: 100%;
    text-align: center;
    height: 22px;
    line-height: 22px;
    font-size: 22px;
    margin: 20px 0;
  }
}
</style>
