<style lang="less">
@orange: #ff9736;
.wrapper {
  background-color: rgb(67, 43, 128);
  height: 100vh;
  width: 100%;
  padding-top: 20px;
}
.mygift {
  width: calc(~"100% - 30px");
  height: 150px;
  background-color: #ff9736;
  position: relative;
  margin: 0px auto 40px auto;
  box-shadow: 2px 2px 11px 1px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  .mygift-title {
    font-size: 14px;
    position: absolute;
    top: 15px;
    left: 15px;
    color: #fff;
    font-weight: 600;
  }
  .mygift-code {
    position: absolute;
    color: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 26px;
  }
  .mygift-time {
    font-size: 12px;
    position: absolute;
    bottom: 15px;
    right: 15px;
    font-weight: 300;
    color: #fff;
  }
  .mygift-tag {
    position: absolute;
    padding: 3px 5px;
    font-size: 12px;
    top: 15px;
    right: 15px;
    color: #fff;
  }
}
.content-wp {
  width: calc(~"100% - 30px");
  height: auto;
  background-color: #fff;
  border-radius: 10px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 30px 16px;
  font-size: 14px;
  color: #666;
}
</style>

<template>
  <div class="wrapper">
    <div class="mygift">
      <div class="mygift-title">{{userName}}  您好！</div>
      <div class="mygift-code">{{gift.name}}</div>
      <div class="mygift-time">{{gift.createdAt}}</div>
      <!-- <div class="mygift-tag">{{getTime(gift.createdAt)}}</div> -->
    </div> 
    <div class="content-wp">
      {{findName(gift.name)}}
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
      gift: {
        name: '',
        createdAt: '',
      },
      prizeList: [{
        name: "水质检测卡",
        intro: "采用康尼蒂克英国原装进口专业水质检测仪为广大消费者提供全方位的水质检测服务",
        des: "'水乃生命之源'，然而近几年家庭用水安全问题层出不穷，轻则带来生活上的不便，重则影响居民身体健康，京畿地区水质硬度较高，居民生活深受水垢水碱困扰，部分南水北调小区水源由于管道的长距离输送，二次污染更加严重，并且为了抑制细菌的滋生，漂白粉的添加也将远超正常标准。随着健康饮用水概念的普及深入，加之水污染事件的频频发生，让更多人们热切关注自身的用水环境是否安全，同时家用净水的设备也越来越受到消费者的欢迎。然而，净水产品琳琅满目，产品品质缺良莠不齐，行业标准的不完善让消费者对于自身所选的家用净水设备是否有效存在疑问，针对以上问题，康尼蒂克采用英国原装进口专业水质检测仪为广大消费者提供全方位的水质检测服务"
      },{
        name: "甲醛盒",
        intro: "可定制的甲醛分解盒，为您降低甲醛的威胁",
        des: "可定制的甲醛分解盒，主要成分为纳米催化材料、石墨烯、活性炭、氨基酸；主要用途：去除室内、办公场所、微环境内甲醛、装修异味、苯系物、臭氧、挥发性有机物、二手烟等污染物；适用场景：可放置在车内、墙角、柜子角、板材家具、床、沙发等污染源附近"
      },{
        name: "荣小盒存储",
        intro: "让仓库更智能！您专属的个人仓库",
        des: "荣小盒是增本藏北京科技有限公司旗下主打的智能仓储品牌，致力于打造'安全第一的智能私家仓库'，提供移动智能管理、私人管家+自助存取的线上服务体系，以及7x24小时银行级别的安防系统、恒温恒湿、防尘防虫的线下仓库环境，为广大个人、家庭及企业用户提供安全便捷优质的智能仓储服务"
      },{
        name: "积分",
        intro: "可在居装宝积分商城使用",
        des: "居分期为了向新老用户提供福利回馈，在居装宝公众号中上线积分商城，为用户提供加价购和直接换两种服务，其中产品均经过居分期精挑细选，用户可通过转盘抽奖获取积分并在积分商城中得到自己心仪的产品"
      },{
        name: "贴息券(1个月)",
        intro: "为用户增加一个月贴息服务",
        des: "贴息服务是居分期家装分期服务的重要分支，为答谢新老用户，抽中此贴息券可永久增加一个月的贴息"
      },],
      userName: JSON.parse(localStorage.user).profile.nickname
    }
  },
  methods: {
    goto(url) {
        location.href = url
    },
    getTime(timeStamp) {
      const d = new Date(timeStamp * 1000)
      const Y = `${d.getFullYear()}-`
      const M = `${d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1}-`
      const D = (d.getDate() < 10 ? `0${d.getDate()}` : d.getDate())
      return Y + M + D
    },
    getResult() {
      axios.get(`${Lib.C.walletApi}lottery-results?filter=lotteryId:0|userId:${JSON.parse(localStorage.user).userId}`).then((res) => {
        let result = res.data.data[0]
        this.gift.name = result.lotteryName
        this.gift.createdAt = this.getTime(result.createdAt)
      }).catch((err) => {
        alert('您还没有任何礼品！')
        location.href="./usercenter.html"
        throw err
      })
    },
    findName(name) {
      console.log(name)
      let result = ''
      this.prizeList.map((e) => {
        if (e.name == name) {
          result = e.des
        }
      })
      console.log(result)
      return result
    }
  },
  ready() {
    this.getResult()
  }
}
</script>
