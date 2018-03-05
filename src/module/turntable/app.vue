<style lang="less">
@orange: #ff9736;
.heihei {
  width: 100%;
  // background-color: rgb(67, 43, 128);
  padding: 144px 0 40px 0;
  background-image: url('/static/new/my-turn.jpg');
  background-size: 100% auto;
  box-sizing: border-box;
}
.img-wp {
  width: calc(~"100% - 60px");
  margin: 0px auto;
  position: relative;
  &>img {
    display: block;
    width: 100%;
    border-radius: 50%;
    transition: all 5s ease;
    position: relative;
  }
  .arrow {
    position: absolute;
    top: -11px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-top: 50px solid #fff;
  }
  .new-btn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 98px;
    height: 98px;
    img {
      display: block;
      width: 100%;
    }
  }
}

.btn {
  width: calc(~"100% - 60px");
  height: 36px;
  background-color: @orange;
  color: #fff;
  text-align: center;
  line-height: 36px;
  margin: 20px auto;
}
.content-wp {
  width: calc(~"100% - 60px");
  height: auto;
  background-color: #fff;
  border-radius: 10px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 30px 16px;
  .prize {
    margin-bottom: 10px;
    .name {
      font-size: 14px;
      color: #333;
      margin-bottom: 5px;
    }
    .intro {
      font-size: 12px;
      font-weight: 300;
    }
  }
}
</style>

<template>
  <div class="heihei" :style="{height: getScreenWidth() * 1848/750 + 'px'}">

    <div class="img-wp">
      <img src="/static/new/new-turn.png" :style="rotate(rotateOpen, myAngle)">
      <div class="arrow"></div>
      <div class="new-btn" v-tap="getPrize()"><img src="/static/new/turn-btn.png"></div>
    </div>
    <!-- <div class="btn" v-tap="getPrize()">
      立即抽奖
    </div> -->
    <!-- <div class="content-wp">
      <div class="prize" v-for="prize in prizeList">
        <div class="name">{{prize.name}}</div>
        <div class="intro">{{prize.intro}}</div>
      </div>
    </div> -->
  </div>
</template>

<script>
import Lib from 'assets/Lib.js'
import axios from 'axios'
Lib.M.auth(axios)
export default {
  data() {
    return {
      rotateOpen: false,
      // 51.428 102.857 154.286 205.714 257.143 308.571 360
      anglePrize: [{
        id: 0,
        name: '100积分',
        start: 1,
        end: 50
      },{
        id: 1,
        name: '300积分',
        start: 53,
        end: 101
      },{
        id: 2,
        name: '甲醛盒',
        start: 104,
        end: 152
      },{
        id: 3,
        name: '贴息券(1个月)',
        start: 156,
        end: 203
      },{
        id: 4,
        name: '荣小盒存储',
        start: 208,
        end: 256
      },{
        id: 5,
        name: '水质检测卡',
        start: 259,
        end: 307
      }],
      myAngle: 0,
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
      },]
    }
  },
  methods: {
    goto(url) {
        location.href = url
    },
    getPrize() {
      axios.post(`${Lib.C.walletApi}lottery-results/draw-lottery?lotteryId=1`).then((res) => {
        console.log(res.data.data)
        this.anglePrize.map((e) => {
          if (e.name == res.data.data.lotteryName) {
            this.myAngle = this.rnd(e.start, e.end)
          }
        })
        this.rotateOpen = true
        window.setTimeout(function(){
          alert(`恭喜您抽到${res.data.data.lotteryName}, 稍后为您自动跳转至个人中心，可在注册礼品处查看`)
          location.href = './usercenter.html'
        }, 5100)
      }).catch((err) => {
        if (err.response.data.code == 40300) {
          alert('您已经抽过奖了哦，可以在个人中心-注册礼品处查看')
        } else {
          alert('网络连接失败，请稍后再试。。')
        }
        
        throw err
      })
      
    },
    rotate(bool, angle) {
      let ret = {}
      if (bool) {
        ret.transform = `rotate(${4320 + angle}deg)`
      }
      return ret
    },
    getScreenWidth() {
      return document.body.clientWidth
    },
    rnd(min, max){
      return min + Math.floor(Math.random() * (max - min + 1));
    },
  },
  ready() {
  }
}
</script>
