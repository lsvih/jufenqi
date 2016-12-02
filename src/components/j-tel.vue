<template>
<div class="tel-line">
  <div class="tel"><img src="../assets/img/tel.png"><span>客服中心</span></div>
</div>
</template>
<style scoped lang="less">
.tel-line{
  width: 100%;
  color:#3BA794;
  text-align: center;
  .tel{
    position: absolute;
    left: 50%;
    margin-left: -45px;
    font-size: 14px;
    width: 80px;
    height: 20px;
    line-height: 24px;
    text-align: center;
    border: 1px solid #3BA794;
    border-radius: 11px;
    img{
      width: 10px;
      height: 10px;
      position: absolute;
      top:5px;
      left:9px;
    }
    span{
      font-size: 12px;
      height: 12px;
      line-height: 12px;
      display: block;
      position: absolute;
      top:4px;
      right: 9px;
    }
  }
}
</style>
