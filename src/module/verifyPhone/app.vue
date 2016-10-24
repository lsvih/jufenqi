<template>
<div class="verify-phone">
  <div class="user-icon"><img :src="user.profile.profileImage"></div>
  <div class="phone-number"><img src="./login.png"><input type="tel" placeholder="请输入手机号码"></div>

</div>
</template>

<script>
import Lib from 'assets/Lib.js'

export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user"))
    }
  },
  components: {

  },
  ready() {


  },
  methods: {





  }
}
</script>

<style scoped lang="less">
body {
    background-color: #eee;
    position: relative;
}
.user-icon{
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 40px;
  top:40px;
  left:50%;
  margin-left: -40px;
  overflow: hidden;
  img{
    height: 100%;
    width: 100%;
  }
}
.user-name{
  position: absolute;
  width: 100%;
  height: 16px;
  line-height: 16px;
  color:#393939;
  left:0;
  top:130px;
}
.phone-number{
  position: absolute;
  border-radius: 5px;
  border:1px solid #d8d8d8;
  background-color: #fff;
  height: 44px;
  width: calc( ~"100% - 30px" );
  top:206px;
  left:15px;
  img{
    position: absolute;
    width: 20px;
    height: 24px;
    top:11px;
    left:15px;
  }
  input{
    position: absolute;
    border:0;
    background-color: #fff;
    top: 14px;
    left:59px;
    padding:0;
    height: 16px;
    line-height: 16px;
    font-size: 16px;
    color: #999;
  }
}
</style>
