<template>
  <div class="verify-block">
    <div class="msg" v-bind:class="{'alarm':alarm}">{{msg}}</div>
    <div class="verify-number">
        <div class="number-block"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg:"测试测试测试",
      alarm: false
    }
  },
  components: {
    Group,Cell
  },
  methods: {

  }
}
</script>
<style scoped lang="less">
.verify-block{
  z-index: 22;
  position: absolute;
  height: 145px;
  width: calc( ~"100% - 52px" );
  top: calc( ~"50% - 74px" );
  left:26px;
  font-size: 14px;
  border-radius: 5px;
  background-color: #fff;
  color:#999;
  .msg{
    position: absolute;
    top:20px;
    left:0;
    width: 100%;
    text-align: center;
  }
  .verify-number{
    position: absolute;
    height: 24px;
    width: 219px;
    left: 50%;
    margin-left: -109.5px;
    top:44px;
  }
}
.alarm{
  color:#D0021B;
}
</style>
