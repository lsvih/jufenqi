<template>
  <div style="width:100%;height:30px;position:relative;">
<div class="credit-process">
  <div class="credit-step">
    <div class="step" v-bind:class="{'active':thisStep>=1}">
      <div class="circle"></div>
      <div class="step-text">额度申请</div>
      <div class="step-line"></div>
    </div>
    <div class="step" style="margin:0 10px;" v-bind:class="{'active':thisStep>=2}">
      <div class="circle"></div>
      <div class="step-text">额度激活</div>
      <div class="step-line"></div>
    </div>
    <div class="step" v-bind:class="{'active':thisStep>=3}">
      <div class="circle"></div>
      <div class="step-text">装修启动</div>
    </div>
  </div>
</div>
</div>
</template>

<script>
export default {
  components: {},
  props: {
    step: {
      type: Number,
      default: 1
    }
  },
  computed: {
    thisStep(v) {
      return this.step
    }
  }
}
</script>

<style scoped lang="less">
.credit-process {
    width: 310px;
    height: 30px;
    position: absolute;
    left:50%;
    margin-left:-155px;
    .step {
        position: absolute;
        .circle {
            position: absolute;
            left: 16px;
            height: 11px;
            width: 11px;
            border-radius: 16px;
            border-width: 3px;
            border-style: solid;
            border-color: rgba(153,153,153,.5);
        }
        .step-text {
            position: absolute;
            top: 19px;
            width: 60px;
            font-size: 12px;
            color:rgba(153,153,153,.5);
        }
        .step-line{
            top:9px;
            left:30px;
        }
    }
}
.step-line {
    position: absolute;
    width: 119px;
    height: 1px;
    background-color: rgba(153,153,153,.5);
}
.step:first-child {
    left: 0;
}
.step:nth-child(2) {
    left: 123px;
}
.step:last-child {
    left: calc(123px+17px+123px);
}
.active .circle{
  border-color:rgba(89,101,178,.5)!important;
}
.active .step-text{
  color:#000!important;
}
</style>
