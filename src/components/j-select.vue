<template>
<div class="drop-select" :style="{'height':isShow?45*itemNum+'px':'0'}"><slot></slot></div>
<div class="mask" v-show="isShow" @click="$parent.isShow = false"></div>
</template>

<script>
import Lib from 'assets/Lib.js'
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    num:{
      type: Number,
      default: 5
    }
  },
  computed: {
    isShow() {
      return this.show
    },
    itemNum(){
      return this.num>5?5.5:this.num
    }
  }
}
</script>
<style scoped lang="less">
.drop-select{
  width: 100%;
  height: 0;
  position: fixed;;
  top:45px;
  left:0;
  transition: height .5s;
  overflow-y: scroll;
  z-index: 999;
  background-color: #eee;
}
::-webkit-scrollbar {
  width: 0px;
}
.mask{
  position: fixed;
  top:50px;
  left:0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.5);
  z-index: 998;
}
</style>
