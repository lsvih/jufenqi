<style scoped lang="less">
.apply-header {
  background-color: #eee;
    height: 92px;
    width: 100%;
    font-size: 12px;
    .apply-step {
        position: absolute;
        top: 37px;
        left: 50%;
        margin-left: -145px;
    }
    .step {
        text-align: center;
        display: inline-block;
        width: 90px;
        height: 30px;
        color: #CFCFCF;
        .bottom-line {
            height: 5px;
            width: 100%;
            background-color: #CFCFCF;
            border-radius: 5px;
        }

    }
}
.active {
    color: #000!important;
}
.active .bottom-line {
    background-color: #ff9736 !important;
}
</style>

<template>
<div class="apply-header">
  <div class="apply-step">
    <div class="step" v-bind:class="{'active':thisStep>=1}">验证身份
      <div class="bottom-line"></div>
    </div>
    <div class="step" style="margin:0 10px;" v-bind:class="{'active':thisStep>=2}">装修信息
      <div class="bottom-line"></div>
    </div>
    <div class="step" v-bind:class="{'active':thisStep>=3}">个人信息
      <div class="bottom-line"></div>
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
    thisStep (v) {
      return this.step
    }
  }
}
</script>