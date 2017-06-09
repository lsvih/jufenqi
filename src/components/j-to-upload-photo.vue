<style scoped lang="less">
.upload-area {
    width: 100%;
    height: 225px;
    position: relative;
    background-color: #fff;
    .dot {
        position: absolute;
        top: 22px;
        left: 15px;
        height: 6px;
        width: 6px;
        border-radius: 3px;
        background-color: #ff9736;
    }
    .area-title {
        position: absolute;
        font-size: 16px;
        color: #393939;
        top: 14px;
        left: 24px;
    }
    .cor-block {
        position: absolute;
        height: 13px;
        width: 13px;
        border-style: solid;
        border-color: rgba(153,153,153,.5);
    }
    .l-t-block {
        border-width: 1px 0 0 1px;
        top: 54px;
        left: 15px;
    }
    .r-t-block {
        border-width: 1px 1px 0 0;
        top: 54px;
        right: 15px;
    }
    .l-b-block {
        border-width: 0 0 1px 1px;
        bottom: 10px;
        left: 15px;
    }
    .r-b-block {
        border-width: 0 1px 1px 0;
        bottom: 10px;
        right: 15px;
    }
    img {
        position: absolute;
        width: 33px;
        height: 33px;
        top: 111px;
        left: 50%;
        margin-left: -16.5px;
    }
}
.area-line {
    position: absolute;
    top: 44px;
    left: 15px;
    height: 1px;
    background-color: #E5E5E5;
}
.description {
    position: absolute;
    top: 154px;
    font-size: 12px;
    color: #999;
    width: 100%;
    text-align: center;
    span {
        color: #ff9736;
    }
}
</style>

<template>
<div class="upload-area">
  <div class="dot"></div>
  <div class="area-title">{{title}}</div>
  <div class="area-line" style="width: calc( 100% - 30px );"></div>
  <div class="l-t-block cor-block"></div>
  <div class="r-t-block cor-block"></div>
  <div class="l-b-block cor-block"></div>
  <div class="r-b-block cor-block"></div>
  <img src="/static/images/camera-orange.png">
  <div class="description">{{value.split("|")[0]}}<span>{{value.split("|")[1]}}</span>{{value.split("|")[2]}}</div>
</div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    value: {
      type: String
    }
  },

}
</script>
