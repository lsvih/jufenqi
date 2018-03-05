<style scoped lang="less">
.ins-calc {
  width: 100%;
  height: 100vh;
  position: relative;
  &>img {
    width: 100%;
    display: block;
    margin-top: -135px;
  }
  .con-wp {
    width: calc(~"100% - 40px");
    position: absolute;
    top: 165px;
    left: 20px;
    &>img {
      width: 100%;
      display: block;
    }
  }
  .calc-wp {
    margin-top: -27px;
    padding: 30px 20px 20px 20px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 0 0 10px 10px;
    box-shadow: 1px 5px 15px 2px rgba(0, 0, 0, 0.1);
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
      margin-bottom: 10px;
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
    h3 {
      text-align: center;
      color: #333;
      font-weight: 300;
      margin: 10px 0;
    }
  }
}
</style>

<template>
  <div class="ins-calc">
    <img src="/static/new/bg.png">
    <div class="con-wp">
      <img src="/static/new/ins-head.png">
      <div class="calc-wp" v-if="haha">
        <div class="input-fake" v-tap="showBank = true" :style="changeColor(myBank)">{{myBank?myBank:'请选择您的期望银行'}}</div>
        <div class="input-fake" v-if="myBank != ''" v-tap="showPeriod = true" :style="changeColor(myPeriod)">{{myPeriod?myPeriod:'请选择您的期望分期数'}}</div>
        <input type="number" placeholder="请输入您的月收入" v-model="income" v-if="heihei(0)">
        <input type="number" placeholder="请输入您的月负债" v-model="outcome" v-if="heihei(0)">
        <input type="number" placeholder="请输入您的房屋面积" v-model="houseArea" v-if="heihei(1)">
        <input type="number" placeholder="输入手机号便于我们的工作人员与您联系" v-model="mobile">
        <div class="btn" :class="{'active': isFinished()}" v-tap="isFinished()?postInfo():return">查看额度及还款计划</div>
      </div>
      <div class="calc-wp" v-if="!haha">
        <div class="line-wp">
          <div class="line-left">可申请额度</div>
          <div class="line-right">{{QuotaCalc(myBank)}}</div>
        </div>
        <div class="line-wp">
          <div class="line-left">意向银行</div>
          <div class="line-right">{{myBank}}</div>
        </div>
        <div class="line-wp">
          <div class="line-left">期望分期</div>
          <div class="line-right">{{myPeriod}}</div>
        </div>
        <h3>一次性付息</h3>
        <div class="line-wp">
          <div class="line-left">首月还款</div>
          <div class="line-right">{{plan(0)}}</div>
        </div>
        <div class="line-wp">
          <div class="line-left">其余月还款</div>
          <div class="line-right">{{plan(1)}}</div>
        </div>
        <h3 v-if="myBank != '工商银行'">分期付息</h3>
        <div class="line-wp" v-if="myBank != '工商银行'">
          <div class="line-left">每月还款</div>
          <div class="line-right">{{plan(2)}}</div>
        </div>
        <div class="btn active" v-tap="haha = true">重新计算</div>
      </div>
    </div>
  </div>
  <popup-picker title="地址" :data="banks" :columns="1" :show.sync="showBank" :value.sync="bankSelect" v-ref:bpicker :show-cell="false" show-name @on-hide="onSelectedbank"></popup-picker>
  <popup-picker title="地址" :data="change(periods, myBank)" :columns="1" :show.sync="showPeriod" :value.sync="periodSelect" v-ref:ppicker :show-cell="false" show-name @on-hide="onSelectedPeriod"></popup-picker>
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
        myBank: '',
        myPeriod: '',
        houseArea: '',
        mobile: '',
        Quota: this.QuotaCalc(this.myBank),
        persent: '',
        showBank: false,
        showPeriod: false,
        banks: [{
          name:'中国银行',
          value: '1'}, {
            name:'建设银行',
            value: '2'}, 
            {
              name:'北京银行',
              value: '3'}, 
              {
                name:'工商银行',
                value: '4'}],
        periods: [{name: 12, value: '1'},{name: 24, value: '2'},{name: 36, value: '3'},{name: 48, value: '4'},{name: 60, value: '5'},],
        bankSelect: [],
        periodSelect: [],
        haha: true,
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
      change(arr, bank) {
        let result = []
        if (bank == '工商银行') {
          result.push(arr[0])
          result.push(arr[1])
        } else if (bank == '北京银行') {
          result.push(arr[0])
          result.push(arr[1])
          result.push(arr[2])
        } else {
          result = arr
        }
        return result
      },
      onSelectedbank() {
        let a = this.bankSelect[0]
        this.banks.map((e) => {
          if (e.value == a) {
            this.myBank = e.name
          }
        })
        this.bankSelect = []
      },
      onSelectedPeriod() {
        let a = this.periodSelect[0]
        this.periods.map((e) => {
          if (e.value == a) {
            this.myPeriod = e.name
          }
        })
        this.periodSelect = []
      },
      heihei(type) {
        if (type == 0) {
          return this.myBank == '工商银行' ||  this.myBank == '中国银行' ||  this.myBank == '北京银行'
        } else if (type == 1) {
          return this.myBank == '建设银行'
        }
      },
      bankPercent(str) {
        let heihei = 0
        let p = Number(this.myPeriod)
        switch(str) {
          case '建设银行':
            heihei = 0.04*p/12
            break
          case '工商银行':
            if (p == 24) {
              heihei = 0.078
            } else {
              heihei = 0.038
            }
            break
          case '中国银行':
            // 4%，8%，11.5%，19%，22%
            if (p == 60) {
              heihei = 0.22
            } else if (p == 48) {
              heihei = 0.19
            } else if (p == 36) {
              heihei = 0.115
            } else if (p == 24) {
              heihei = 0.08
            } else {
              heihei = 0.04
            }
            break
          case '北京银行':
            heihei = 0.04*p/12
            break
        }
        return heihei
      },
      bankIns(str) {
        let heihei = 0
        let p = Number(this.myPeriod)
        switch(str) {
          case '建设银行':
            heihei = 0.0038*p
            break
            case '工商银行':
              heihei = 0
              break
              case '中国银行':
                // 4%，8%，11.5%，19%，22%
                if (p == 60) {
                  heihei = 0.225
                } else if (p == 48) {
                  heihei = 0.12
                } else if (p == 36) {
                  heihei = 0.115
                } else if (p == 24) {
                  heihei = 0.085
                } else {
                  heihei = 0.045
                }
                break
                case '北京银行':
                  heihei = 0.0035*p
                  break
                }
                return heihei
              },
      QuotaCalc(bank) {
        let result = 0
        if (bank) {
          if (bank == '建设银行') {
            result =  Number(this.houseArea) * 3000
          } else if (bank == '工商银行') {
            result =  (Number(this.income) - Number(this.outcome)) * Number(this.myPeriod)
          } else if (bank == '中国银行') {
            result =  (Number(this.income) - Number(this.outcome)) * Number(this.myPeriod) * 0.8
          } else if (bank == '北京银行') {
            result =  (Number(this.income) - Number(this.outcome)) * Number(this.myPeriod) * 0.75
          }
        } else {
          result = null
        }
        return result
      },
      plan(type) {
        let a = this.QuotaCalc(this.myBank)
        let b = this.bankPercent(this.myBank)
        let c = Number(this.myPeriod)
        let d = this.bankIns(this.myBank)
        console.log(a, b, d, c)
        if (type == 0) {
          console.log('首月还款')
          return (a*b + a/c).toFixed(2)
        } else if (type == 1) {
          console.log('剩余')
          return (a/c).toFixed(2)
        } else {
          console.log('每月')
          return ((a*d+a)/c).toFixed(2)
        }
      },
      postInfo() {
        let result = {
          name: this.myBank,
          mobile: String(this.mobile),
          source: `后台1899-分期计算器`,
          neighborhood: this.QuotaCalc(this.myBank),
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
        if (this.myBank == '建设银行') {
          return this.houseArea && this.isTruePhoneNum() && this.myPeriod
        } else if (this.myBank == '') {
          return false
        } else {
          return this.income && this.outcome &&(this.income - this.outcome) > 0 && this.isTruePhoneNum() && this.myPeriod
        }
      }
    },
    ready() {

    }
  }
</script>