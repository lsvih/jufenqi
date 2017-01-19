<template>
  <div class="content">
    <div class="coupon-wrapper" v-for="coupon in coupons">
      <div class="coupon">
        <img src="bg.png" alt="">
        <div class="coupon-text" v-tap="coupon.status = 1">
          <p style="font-size: 35px;top: 25%;">{{coupon.amount}}<span>&nbsp;元</span></p>
          <p style="font-size: 12px;bottom: 15%;">全品类通用代金券</p>
        </div>
        <div class="coverImg" v-if="coupon.status === 1">
          <img src="nonactived.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from 'assets/Lib.js'
import axios from 'axios'
Lib.M.auth(axios)
export default {
  data() {
    return {
      coupons: []
    }
  },
  components: {
  },
  ready() {
    axios.get(`${Lib.C.mOrderApi}coupons`,{
      params: {
        filter: `userId:${JSON.parse(window.localStorage.getItem('user')).userId}|status:1,2,3`,
        size: 10000
      }
    }).then((res) => {
      if (res.data.data.length === 0) {
        alert("您还没有优惠券..")
        location.href="./usercenter.html"
      }
      this.coupons = res.data.data
    }).catch((res) => {
      alert('获取优惠券信息失败，请稍后重试..')
    })
  }
}
</script>
<style>
body {
  background-color: #eee;
}
</style>
<style lang="less">
.content {
  width: 100%;
  height: 100%;
  position: relative;
  .coupon-wrapper {
    width: calc(~"100% - 16px");
    height: auto;
    position: absolute;
    top: 20px;
    left: 8px;
    .coupon {
      width: calc(~"50% - 5px");
      margin-bottom: 9px;
      float: left;
      position: relative;
      >img {
        width: 100%;
      }
      .coverImg {
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.3);
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        img {
          position: absolute;
          top: 27px;
          width: calc(~"100% - 16px");
          left: 8px;
        }
      }
      .coupon-text {
        width: 100%;
        height: 100%;
        line-height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        text-align: center;
        color: #fff;
        span {
          font-size: 18px;
        }
        p {
          margin: 0;
          position: absolute;
          width: 100%;
          left: 0;
        }
      }
    }
    .coupon:nth-child(odd){
      margin-right: 9px;
    }
  }
}
</style>
