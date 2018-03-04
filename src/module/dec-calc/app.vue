<style scoped lang="less">
.ins-calc {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  position: relative;
  &>img {
    display: block;
    width: 100%;
  }
  .con-wp {
    position: absolute;
    top: 30px;
    left: 20px;
    width: calc(~"100% - 40px");
    &>img {
      width: 100%;
      display: block;
    }
  }
  .calc-wp {
    padding: 40px 20px 20px 20px;
    margin-top: -27px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 0 0 10px 10px;
    box-shadow: 1px 4px 15px 2px rgba(0, 0, 0, 0.1);
    &>img {
      width: 100%;
      display: block;
    }
    &>input {
      display: block;
      width: 100%;
      border: 1px solid #ddd;
      outline: none;
      font-size: 14px;
      height: 36px;
      line-height: 36px;
      padding-left: 16px;
      box-sizing: border-box;
      font-weight: 300;
      color: #333;
      margin-bottom: 10px;
      &::placeholder {
        color: #ddd;
      }
    }
    .input-fake {
      width: 100%;
      border: 1px solid #ddd;
      font-size: 14px;
      height: 36px;
      line-height: 36px;
      padding-left: 16px;
      box-sizing: border-box;
      font-weight: 300;
      color: #ddd;
      margin-bottom: 10px;
    }
    .btn {
      width: 100%;
      border: 1px solid #ff9736;
      font-size: 14px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      box-sizing: border-box;
      font-weight: 300;
      color: #ff9736;
      margin-top: 20px;
    }
    .active {
      color: #fff;
      background-color: #ff9736;
    }
    .line-wp {
      width: 100%;
      height: 36px;
      line-height: 36px;
      display: flex;
      font-size: 16px;
      justify-content: center;
      margin-bottom: 20px;
      .line-left {
        width: 30%;
        color: #666;
        text-align: right;
        margin-right: 20px;
      }
      .line-right {
        width: 60%;
        color: #333;
        text-align: left;
      }
    }
    .quez {
      color: #333;
      font-size: 14px;
      font-weight: 300;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      &>p {
        font-weight: 400;
        font-size: 15px;
        text-align: center;
        margin-top: 5px;
        color: #999;
      }
      .box {
        display: flex;
        justify-content: center;
        .box-item {
          width: 30px;
          font-size: 20px;
          text-align: center;
          height: 30px;
          line-height: 26px;
          color: #666;
        }
        .left {
          border-radius: 5px 0 0 5px;
          border: 1px solid #ddd;
        }
        .right {
          border-radius: 0 5px 5px 0;
          border: 1px solid #ddd;
        }
        .mid {
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
          color: #ff9736;
          line-height: 30px;
        }
        .bd-none {
          border: none;
          font-size: 18px;
          line-height: 30px;
          color: #999;
          margin-left: 6px;
        }
      }
    }
  }
}
</style>

<template>
  <div class="ins-calc">
    <img src="/static/new/bg.png">
    <div class="con-wp">
      <img src="/static/new/dec-head.png">
      <div class="calc-wp" v-if="haha">
      <!-- <div class="input-fake" v-tap="showLiv = true" :style="changeColor(livingRoom)">{{livingRoom?livingRoom:'请选择您客餐厅的数量'}}</div>
      <div class="input-fake" v-tap="showBed = true" :style="changeColor(bedRoom)">{{bedRoom?bedRoom:'请选择您卧室的数量'}}</div>
      <div class="input-fake" v-tap="showBath = true" :style="changeColor(bathroom)">{{bathroom?bathroom:'请选择您卫生间的数量'}}</div>
      <div class="input-fake" v-tap="showKit = true" :style="changeColor(kicthen)">{{kicthen?kicthen:'请选择您厨房的数量'}}</div>
      <div class="input-fake" v-tap="showBal = true" :style="changeColor(balcony)">{{balcony?balcony:'请选择您阳台的数量'}}</div> -->
      <div class="quez">
        <p>客餐厅数量</p>
        <div class="box">
          <div class="left box-item" v-tap="roomCount(0, 1)">-</div>
          <div class="mid box-item">{{livCount}}</div>
          <div class="right box-item" v-tap="roomCount(0, 0)">+</div>
          <div class="bd-none box-item">间</div>
        </div>
      </div>
      <div class="quez">
        <p>卧室数量</p>
        <div class="box">
          <div class="left box-item" v-tap="roomCount(1, 1)">-</div>
          <div class="mid box-item">{{bedCount}}</div>
          <div class="right box-item" v-tap="roomCount(1, 0)">+</div>
          <div class="bd-none box-item">间</div>
        </div>
      </div>
      <div class="quez">
        <p>厨房数量</p>
        <div class="box">
          <div class="left box-item" v-tap="roomCount(2, 1)">-</div>
          <div class="mid box-item">{{kitCount}}</div>
          <div class="right box-item" v-tap="roomCount(2, 0)">+</div>
          <div class="bd-none box-item">间</div>
        </div>
      </div>
      <div class="quez">
        <p>卫生间数量</p>
        <div class="box">
          <div class="left box-item" v-tap="roomCount(3, 1)">-</div>
          <div class="mid box-item">{{bathCount}}</div>
          <div class="right box-item" v-tap="roomCount(3, 0)">+</div>
          <div class="bd-none box-item">间</div>
        </div>
      </div>
      <div class="quez">
        <p>阳台数量</p>
        <div class="box">
          <div class="left box-item" v-tap="roomCount(4, 1)">-</div>
          <div class="mid box-item">{{balCount}}</div>
          <div class="right box-item" v-tap="roomCount(4, 0)">+</div>
          <div class="bd-none box-item">间</div>
        </div>
      </div>
      <input type="number" placeholder="请输入您的房屋面积" v-model="houseArea">
      <div class="quez" v-if="houseArea > 140">
        <p>您的房屋是否为别墅</p>
        <input type="radio" value="true" v-model="isHouse"><span>是</span>
        <input type="radio" value="false" v-model="isHouse"><span>否</span>
      </div>
      <input type="number" placeholder="输入手机号便于我们的工作人员与您联系" v-model="mobile">
      <div class="btn" :class="{'active': isFinished()}" v-tap="isFinished()?postInfo():return">查看我的装修预算</div>
    </div>
    <div class="calc-wp" v-if="!haha">
      <div class="line-wp">
        <div class="line-left">客厅数量</div>
        <div class="line-right">{{livCount}}间</div>
      </div>
      <div class="line-wp">
        <div class="line-left">卧室数量</div>
        <div class="line-right">{{bedCount}}间</div>
      </div>
      <div class="line-wp">
        <div class="line-left">卫生间数量</div>
        <div class="line-right">{{bathCount}}间</div>
      </div>
      <div class="line-wp">
        <div class="line-left">厨房数量</div>
        <div class="line-right">{{kitCount}}间</div>
      </div>
      <div class="line-wp">
        <div class="line-left">阳台数量</div>
        <div class="line-right">{{balCount}}间</div>
      </div>
      <div class="line-wp">
        <div class="line-left">房屋面积</div>
        <div class="line-right">{{houseArea}}平方米</div>
      </div>
      <div class="line-wp">
        <div class="line-left">施工费用</div>
        <div class="line-right">{{result(0)}}元</div>
      </div>
      <div class="line-wp">
        <div class="line-left">建材费用</div>
        <div class="line-right">{{result(1)}}元</div>
      </div>
      <div class="line-wp">
        <div class="line-left">软装配饰费</div>
        <div class="line-right">{{result(2)}}元</div>
      </div>
      <div class="line-wp">
        <div class="line-left">总费用</div>
        <div class="line-right">{{result(3)}}元</div>
      </div>
      <div class="btn active" v-tap="haha = true">重新计算</div>
    </div>
  </div>
  </div>
  <!-- <popup-picker title="地址" :data="livingrooms" :columns="1" :show.sync="showLiv" :value.sync="livSelect" v-ref:bpicker :show-cell="false" show-name @on-hide="onSelectedLiv"></popup-picker>
  <popup-picker title="地址" :data="bedrooms" :columns="1" :show.sync="showBed" :value.sync="bedSelect" v-ref:ppicker :show-cell="false" show-name @on-hide="onSelectedBed"></popup-picker>
   <popup-picker title="地址" :data="bathrooms" :columns="1" :show.sync="showBath" :value.sync="bathSelect" v-ref:bpicker :show-cell="false" show-name @on-hide="onSelectedBath"></popup-picker>
  <popup-picker title="地址" :data="kicthens" :columns="1" :show.sync="showKit" :value.sync="kitSelect" v-ref:ppicker :show-cell="false" show-name @on-hide="onSelectedKit"></popup-picker>
  <popup-picker title="地址" :data="balconies" :columns="1" :show.sync="showBal" :value.sync="balSelect" v-ref:ppicker :show-cell="false" show-name @on-hide="onSelectedBal"></popup-picker> -->
</template>

<script>
  import Lib from 'assets/Lib.js'
  import PopupPicker from 'vux-components/popup-picker'
  import Loading from 'vux-components/loading'
  import axios from 'axios'

  export default {
    data () {
      return {
        income: '',
        outcome: '',
        livingRoom: '',
        bedRoom: '',
        bathroom: '',
        kicthen: '',
        balcony: '',
        houseArea: '',
        mobile: '',
        showLiv: false,
        showBed: false,
        showBath: false,
        showKit: false,
        showBal: false,
        isHouse: '',
        livingrooms: [{name: 1,value: '1'}, {name: 2,value: '2'}, {name: 3,value: '3'},],
        bedrooms: [{name: 1, value: '1'},{name: 2, value: '2'},{name: 3, value: '3'},{name: 4, value: '4'}],
        bathrooms: [{name: 1, value: '1'},{name: 2, value: '2'},{name: 3, value: '3'}],
        kicthens: [{name: 1, value: '1'},{name: 2, value: '2'}],
        balconies: [{name: 1, value: '1'},{name: 2, value: '2'},{name: 3, value: '3'},{name: 4, value: '4'}],
        livSelect: [],
        bedSelect: [],
        bathSelect: [],
        kitSelect: [],
        balSelect: [],
        haha: true,
        // 计算器二
        livCount: 0,
        bedCount: 0,
        kitCount: 0,
        bathCount: 0,
        balCount: 0,
      }
    },
    components: {
      PopupPicker,
    },
    methods: {
      changeColor(val) {
        let ret = {}
        if (val) {
          ret.color = '#333'
        }
        return ret
      },
      onSelectedLiv() {
        let a = this.livSelect[0]
        this.livingrooms.map((e) => {
          if (e.value == a) {
            this.livingRoom = '客厅：'+ e.name + '间'
          }
        })
        this.livSelect = []
      },
      onSelectedBed() {
        let a = this.bedSelect[0]
        this.bedrooms.map((e) => {
          if (e.value == a) {
            this.bedRoom = '卧室：' + e.name + '间'
          }
        })
        this.bedSelect = []
      },
      onSelectedBath() {
        let a = this.bathSelect[0]
        this.bathrooms.map((e) => {
          if (e.value == a) {
            this.bathroom = '卫生间：' + e.name + '间'
          }
        })
        this.bathSelect = []
      },
      onSelectedKit() {
        let a = this.kitSelect[0]
        this.kicthens.map((e) => {
          if (e.value == a) {
            this.kicthen = '厨房：' + e.name + '间'
          }
        })
        this.kitSelect = []
      },
      onSelectedBal() {
        let a = this.balSelect[0]
        this.balconies.map((e) => {
          if (e.value == a) {
            this.balcony = '阳台：' + e.name + '间'
          }
        })
        this.balSelect = []
      },
    //   heihei(area) {
    //   let a = 1 // 施工
    //   let b = 1.7 // 主材
    //   let c = 1.8 // 配饰
    //   let arr = [{
    //     area: '50',
    //     price: 2000
    //   },{
    //     area: '50 - 80',
    //     price: 2500
    //   },{
    //     area: '80-120',
    //     price: 3000
    //   },{
    //     area: '120-140',
    //     price: 3500
    //   },{
    //     area: '140',
    //     price: 4000||5000 // 平层4000， 别墅5000
    //   },]
    //  // 转盘背景
    //  // 两个计算器
    //  // 积分商城流程
    //  // 银行二维码
    // },
      result(type) {
        let a = Number(this.houseArea)
        let c = 0
        if (a > 140 && this.isHouse == 'true') {
          c = 5000
        } else if (a > 140 && this.isHouse == 'false') {
          c = 4000
        } else if (a > 140) {
          c = 4000 
        } else if (a > 120) {
          c = 3500 
        } else if (a > 80) {
          c = 3000
        } else if (a > 50) {
          c = 2500
        } else {
          c = 2000
        } 

        if (type == 0) {
          return (c * a * 10/45).toFixed(2)
        } else if (type == 1) {
          return (c * a * 17/45).toFixed(2)
        } else if (type == 2) {
          return c * a * 18/45
        } else {
          return c * a 
        }
      },
      postInfo() {
        let result = {
          name: `${this.bedCount}室${this.livCount}厅${this.bathCount}卫`,
          mobile: String(this.mobile),
          source: `后台1898-装修预算计算器`,
          houseArea: this.houseArea,
        }
        axios.post('http://wx.jufenqi.com:8080/info/api/user-infos', result).then((res) => {
          alert('计算成功，我们的工作人员会在一个工作日内与您取得联系')
          this.haha = false
        }).catch((err) => {
          alert('网络错误，请稍后再试。。')
        })
      },
      isTruePhoneNum() {
        let reg = /^1[3|4|5|6|7|8]\d{9}$/
        return reg.test(this.mobile)
      },
      isFinished() {
        return this.livCount > 0 && this.bedCount > 0 && this.bathCount > 0 && this.kitCount > 0 && this.houseArea && this.isTruePhoneNum()
      },
      roomCount(room, type) {
        if (type == 0) {
          switch(room) {
            case 0:
              this.livCount < 4?this.livCount++:this.livCount = 4
              break
            case 1:
              this.bedCount < 6?this.bedCount++:this.bedCount = 6
              break
            case 2: 
              this.kitCount < 2?this.kitCount++:this.kitCount = 2
              break
            case 3:
              this.bathCount < 3?this.bathCount++:this.bathCount = 3
              break
            case 4: 
              this.balCount < 4?this.balCount++:this.balCount = 4
              break
          }
        } else {
          switch(room) {
            case 0:
              this.livCount > 0?this.livCount--:this.livCount = 0
              break
            case 1:
              this.bedCount > 0?this.bedCount--:this.bedCount = 0
              break
            case 2: 
              this.kitCount > 0?this.kitCount--:this.kitCount = 0
              break
            case 3:
              this.bathCount > 0?this.bathCount--:this.bathCount = 0
              break
            case 4: 
              this.balCount > 0?this.balCount--:this.balCount = 0
              break
          }
        }
      }
    },
    ready() {

    }
  }
</script>