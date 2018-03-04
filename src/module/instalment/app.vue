<style scoped lang="less">
@import '~vux/dist/styles/1px.css';

.block-1 {
    position: relative;
    height: 130px;
    overflow: hidden;
    .bg {
        position: absolute;
        bottom: 1px;
        left: 0;
        z-index: 1;
    }
    div {
        position: absolute;
        z-index: 2;
        color: #5965B2;
    }
    .ins-title {
        left: 50%;
        top: 30px;
        font-size: 16px;
        margin-left: -64px;
        color: #3BA794;
    }
    .ins-limit {
        width: 100%;
        text-align: center;
        top: 66px;
        font-size: 36px;
        color: #393939;
    }
    .ins-limit-apply {
        top: 44px;
        text-align: center;
        width: 150px;
        height: 44px;
        line-height: 44px;
        left: calc(~"50% - 75px");
        background-color: transparent;
        border: 1px solid #88C928;
        color: #88C928;
        border-radius: 22px;
    }
    .help {
        position: absolute;
        z-index: 2;
        top: 30px;
        left: 24px;
        height: 26px;
        width: 26px;
    }
    .alert {
        position: absolute;
        z-index: 2;
        top: 30px;
        right: 24px;
        height: 26px;
        width: 26px;
    }
}
.block-2 {
    padding: 10px 0;
}
.block-3 {
    position: absolute;
    background-color: #eee;
    width: 100%;
}
.balance {
    color: #999;
    height: 40px;
    line-height: 20px;
    text-align: center;
    .balance-money {
        margin-top: 6px;
    }
}
.apply {
    height: 44px;
    line-height: 44px;
    width: 200px;
    border-radius: 22px;
    border: 1px solid #5965B2;
    color: #5965B2;
    font-size: 28px;
    text-align: center;
}
.ins-insinfo-count {
    margin-top: 9px;
    font-size: 12px;
    span {
        color: #5965B2;
    }
}
.ins-insinfo-line {
    margin: 15px 0 18px;
    height: 1px;
    width: 100%;
    background-color: #eee;
}
.ins-process {
  padding: 20px 0;
}
.ins-header-bac{
  background-image: url('/static/new/usercenter/01.png');
  height: 230px;
  background-size: 100% auto;
  width: 100%;
}
.ins-header-goapply{
  width: 100%;
  padding-top: 44px;
  p{
    width: 103px;
    height: 103px;
    border-radius: 50%;
    background: #fff;
    margin: 0 auto 18px;
    padding: 0;
    text-align: center;
    line-height: 107px;
    font-size: 15px;
    color: #ff9736;
    font-weight: bold;
    box-shadow: 0px 5px 13px 0px rgba(0, 0, 0, 0.1);
  }
  span{
    font-size: 14px;
    color: #fff;
    display: block;
    text-align: center;
  }
}
.ins-header-success{
  padding-top: 35px;
  color: #fff;
  text-align: center;
  p{
    font-size: 14px;
    padding: 0;
    margin: 0;
  }
  div{
    font-size: 35px;
    font-weight: bold;
    margin: 29px 0 30px;
    span{
      font-size: 15px;
    }
  }
  span{
    font-size: 14px;
  }
  strong{
    font-size: 14px;
    display: block;
    margin-top: 42px;
  }
}
.ins-list{
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  height: 48px;
  div{
    width: 50%;
    padding-top: 10px;
    height: 100%;
    text-align: center;
    border-bottom: 1px solid #ddd;
    p{
      font-size: 12px;
      color: #494949;
      padding: 0;
      margin: 0;
    }
    span{
      color: #999;
      font-size: 12px;
      display: block;
      margin-top: 6px;
    }
  }
}
.ins-list div:nth-child(1){
  border-right: 1px solid #ddd;
}
.ins-header-applyfalse{
  width: 100%;
  padding-top: 44px;
  p{
    width: 103px;
    height: 103px;
    border-radius: 50%;
    background: #fff;
    margin: 0 auto 18px;
    padding: 0;
    text-align: center;
    line-height: 107px;
    font-size: 15px;
    color: #ff9736;
    font-weight: bold;
    box-shadow: 0px 5px 13px 0px rgba(0, 0, 0, 0.1);
  }
  span{
    font-size: 14px;
    color: #fff;
    display: block;
    text-align: center;
  }
  strong{
    text-align: center;
    color: #fff;
    font-size: 12px;
    display: block;
    margin-top: 15px;
    font-weight: normal;
  }
}
.ins-header-wait{
  padding-top: 18px;
  text-align: center;
  color: #fff;
  p{
    padding: 0;
    font-size: 14px;
  }
  div{
    margin: 12px auto 18px;
    height: 103px;
    width: 103px;
    border-radius: 50%;
    border: 1px solid #fff;
    line-height: 107px;
    font-size: 15px;
    font-weight: bold;
  }
  span{
    font-size: 14px;
  }
}
.cell {
    height: 77px;
    .select {
        position: absolute;
        z-index: 2;
        left: 0;
        top: 0;
        height: 100%;
    }
    .bank-logo {
        width: 40px;
        height: 40px;
        position: absolute;
        top: 31px;
        left: 20px;
    }
    .bank-name {
        color: #393939;
        font-size: 16px;
        position: absolute;
        top: 25px;
        left: 70px;
    }
    .text {
        position: absolute;
        left: 70px;
        bottom: 20px;
        font-size: 12px;
        color: #999;
        .cart-type {
            color: #3BA794;
        }
        .credit-count {
            color: #ec5835;
        }
    }
    .info {
        position: absolute;
        height: 100%;
        width: 40px;
        top: 0;
        right: 0;
        img {
            position: absolute;
            top: 35px;
            left: 0;
            width: 20px;
            height: 20px;
        }
    }
}
.content-wp {
  position: relative;
  background-color: #ff9736;
  height: auto;
  padding-bottom: 74px;
  .form-wp {
    background-color: #fff;
    width: calc(~"100% - 30px");
    border-radius: 8px;
    box-shadow: 1px 5px 15px 2px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    padding: 40px 20px 30px 20px;
    margin: -20px auto 0 auto;
    .form-one {
      .item-wp {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        .img-wp {
          width: 25%;
          margin-right: 20px;
          img {
            display: block;
            width: 100%;
          }
        }
        .right {
          width: 73%;
          text-align: left;
          padding-top: 5px;
          h3 {
            color: #333;
            font-size: 14px;
            font-weight: 400;
            margin: 0 0 10px 0;
          }
          p {
            color: #666;
            font-size: 12px;
            font-weight: 300;
            margin: 0;
          }
        }
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
      .input_inside {
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
        margin-top: 5px;
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
      .quez {
        color: #333;
        font-size: 14px;
        font-weight: 300;
        &>p {
          font-weight: 400;
          font-size: 15px;
        }
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
    }
  }
}
</style>

<template>
<!-- <flexbox class="vux-1px-d">
  <flexbox-item class="block-1"> -->
    <!-- <img class="help" src="help.png"><img class="alert" src="alert.png"> -->
    <!-- <div class="ins-title" v-if="thisStatus == '已激活'">已贷款额度（元）</div>
    <div class="ins-limit" v-if="thisStatus == '已激活'">{{limit|currency "" 2}}</div> -->
    <!-- <div class="ins-limit" v-else>敬请期待</div> -->
    <!-- <div class="ins-limit-apply" v-if="thisStatus == '未申请'||thisStatus == '激活失败'||thisStatus == '申请失败'" v-tap="goto('./ins-apply.html')">去申请</div>
    <div class="ins-limit-apply" v-if="thisStatus == '未激活'" v-tap="goto('./activation-step1.html')">去激活</div>
    <div class="ins-limit-apply" v-if="thisStatus == '激活中'">激活中</div>
    <img class="bg" src="fq_bg.png" width="100%" height="auto"> -->
<!--  -->
  <!-- </flexbox-item>
</flexbox> -->
<div class="content-wp">


  <div class="ins-header-bac">
    <div class="ins-header-goapply" v-if="thisStatus == '未申请'">
      <p v-tap="changeStatus('申请中')">去申请</p>
      <span>最高可贷款40万元，享受12期贴息服务</span>
    </div>
    <div class="ins-header-applyfalse" v-if="thisStatus == '激活失败' || thisStatus == '申请失败'">
      <p v-tap="changeStatus('申请中')">重新申请</p>
      <span>最高可贷款40万元，享受12期贴息服务</span>
      <!-- <strong>—— 申请失败 ——</strong> -->
    </div>


    <div class="ins-header-wait" v-if="thisStatus == '已激活'">
      <p>您的分期已办理</p>
      <!-- <div style="margin: 17px 0 5px; ">{{limit|currency "" 2}}<span>元</span>
      </div> -->
      <div>
        已激活
      </div>
      <!-- <span>{{expectInstalment}}期  每期{{(limit/expectInstalment)|currency "" 2}}  利息 0 (元)</span> -->
     </div> 
          <!-- <strong style="margin-top: 20px">—— 审核成功 ——</strong> -->
    <!-- </div> -->
    <div class="ins-header-wait" v-if="thisStatus == '申请中'">
      <p></p>
      <div>申请中</div>
      <span>请按照要求填写个人信息</span>
    </div>

    <div class="ins-header-wait" v-if="thisStatus == '未激活'">
      <p>初审通过</p>
      <div>待激活</div>
    </div>

    </div>
   <!--  <div class="ins-header-success" v-if="thisStatus == '激活中'">
      <p>期望贷款额度</p>
      <div style="margin-bottom: 5px;">{{expectQuota|currency "" 2}}<span>元</span></div>
      <span>期望{{expectInstalment}}期</span>
      <strong style="margin-top: 20px;">—— 审核中。。 ——</strong>
    </div> -->

    <div class="form-wp" :style="{top: getScreenWidth()*0.56 + 'px'}">
      <div class="form-one" v-if="thisStatus == '未申请'||thisStatus == '激活失败' || thisStatus == '申请失败'">
        <div class="item-wp" v-for="step in stepList">
          <div class="img-wp"><img :src="step.img"></div>
          <div class="right">
            <h3>{{step.name}}</h3>
            <p>{{step.des}}</p>
          </div>
        </div>
      </div>
      <div class="form-one" v-if="thisStatus == '申请中'">
        <input type="text" placeholder="请输入您的姓名" v-model="loanName">
        <input type="number" placeholder="请输入您的手机号" v-model="loanMobile" keyboard="number">
        <input type="text" placeholder="请输入您的身份证号" v-model="loanIdCard" keyboard="number">
        <input type="text" placeholder="请输入您的期望额度" v-model="loanExpectQuota">
        <div class="input-fake" v-tap="showAreaPicker = true" :style="changeColor($refs.areapicker.getNameValues())">{{$refs.areapicker.getNameValues()?$refs.areapicker.getNameValues():loanDis}}</div>
        <input type="text" placeholder="请输入您房屋的详细地址" v-model="loanAdd">
        <input type="text" placeholder="请输入您的月收入" v-model="loanMonth">
        <div class="quez">
          <p>请选择您的房屋情况</p>
          <input type="radio" value="我有房产证" v-model="loanHouseSit" @click="changeShow(false)"><span>我有房产证</span>
          <input type="radio" value="我有购房合同及发票" v-model="loanHouseSit" @click="changeShow(false)"><span>我有购房合同及发票</span>
          <input type="radio" value="其他" v-model="loanHouseSit" @click="changeShow(true)"><span>其他</span>
          <input type="text" class="input_inside" placeholder="请输入您房屋的情况" v-model="loanHouseChange" v-if="extraShow">
        </div>
        <div class="quez">
          <p>您是否有社保</p>
          <input type="radio" value="true" v-model="loanSocialSecurity"><span>是</span>
          <input type="radio" value="false" v-model="loanSocialSecurity"><span>否</span>
        </div>
        <div class="btn" :class="{'active': isFinished()}" v-tap="isFinished()?submit():return">
          立即申请
        </div>
      </div>
      <div class="form-one" v-if="thisStatus == '未激活' || thisStatus == '激活中'">
        <div v-for="l in loanApp">
          <div class="line-wp">
            <div class="line-left">姓名</div>
            <div class="line-right">{{l.name}}</div>
          </div>
          <div class="line-wp">
            <div class="line-left">手机号</div>
            <div class="line-right">{{l.mobile}}</div>
          </div>
          <div class="line-wp">
            <div class="line-left">身份证号</div>
            <div class="line-right">{{l.idCardNo}}</div>
          </div>
          <div class="line-wp">
            <div class="line-left">房屋所在地</div>
            <div class="line-right">{{l.dis}}</div>
          </div>
          <div class="line-wp">
            <div class="line-left">详细地址</div>
            <div class="line-right">{{l.add}}</div>
          </div>
          <div class="line-wp">
            <div class="line-left">期望额度</div>
            <div class="line-right">{{l.expect}}</div>
          </div>
          <div class="line-wp">
            <div class="line-left">月收入</div>
            <div class="line-right">{{l.month}}</div>
          </div>
        </div>
      </div>
      <div class="form-one" v-if="thisStatus == '已激活'">
        <div v-for="l in loanApp">
          <div class="line-wp">
            <div class="line-left">姓名</div>
            <div class="line-right">{{l.name}}</div>
          </div>
          <div class="line-wp">
            <div class="line-left">手机号</div>
            <div class="line-right">{{l.mobile}}</div>
          </div>
          <div class="line-wp">
            <div class="line-left">房屋所在地</div>
            <div class="line-right">{{l.dis}}</div>
          </div>
          <div class="line-wp">
            <div class="line-left">详细地址</div>
            <div class="line-right">{{l.add}}</div>
          </div>
          <div class="line-wp">
            <div class="line-left">申办银行</div>
            <div class="line-right">{{l.bank}}</div>
          </div>
          <div class="line-wp">
            <div class="line-left">银行网点</div>
            <div class="line-right">{{l.branch}}</div>
          </div>
          <div class="line-wp">
            <div class="line-left">办理期数</div>
            <div class="line-right">{{l.period}}</div>
          </div>
          <div class="line-wp">
            <div class="line-left">申办额度</div>
            <div class="line-right">{{l.loanQuota}}</div>
          </div>
        </div>
      </div>
    </div> 

  
</div>
<!-- <div class="ins-list" v-if="thisStatus == '已激活' || thisStatus == '激活中'">
  <div>
    <p>已消费金额(元)</p>
    <span>{{balance|currency "" 2}}元</span>   
  </div>
  <div>
    <p>可贷款总额(元)</p>
    <span>{{ins?ins:0|currency "" 2}}元</span>
  </div>
</div> -->
<!-- <flexbox class="vux-1px-t block-2" v-if="thisStatus == '已激活'">
  <flexbox-item class="balance" >
    <div >可贷款总额度</div>
    <div class="balance-money" >{{ins|currency "" 2}}</div>
  </flexbox-item>
</flexbox>
<flexbox class="vux-1px-t block-2" v-if="thisStatus == '未申请'||thisStatus == '激活失败'||thisStatus == '申请失败'">
  <flexbox-item class="balance">
    <div>购买主材最高24期免息</div>
  </flexbox-item>
</flexbox> -->
<!-- <div class="process-wrapper" style="width:100%; overflow: hidden;">
    <j-installment-process :step="3" v-if="thisStatus == '未激活'"></j-installment-process>
    <j-installment-process :step="5" v-if="thisStatus == '激活中'"></j-installment-process>
  </div> -->
  <!-- <div class="down-part">
  <scroller class="block-3" height="calc( 100% - 190px - 44px )" :lock-x="true" :scrollbar-y="false" v-if="thisStatus == '未申请'||thisStatus == '激活失败'||thisStatus == '申请失败'">
      <div>
        <div style="width:100%" :style="{'height':getScreenWidth() * 1.872 + 'px'}"><img src="/static/temp/ins-ad.jpg" width="100%">
        </div>
      </div>
    </scroller>
    <group style="margin-top:-1.17647059em; margin-bottom: 50px;" v-if="thisStatus == '未激活' ">
      <cell class="cell" v-for="bank in bankList">
        <div class="select" v-tap="bankSelect($index)" style="width:calc( 100% - 40px )"></div>
        <img class="bank-logo" :src="imgUrl + bank.bank.logoImg">
        <div class="bank-name">{{bank.bankName}}</div>
        <div class="text">
          可申请金额:<span class="credit-count">{{bank.bankQuota|currency "" 2}}</span>
        </div>
      </cell>
    </group>
  </div> -->

<!-- <popup-picker title="地区" :data="addresses" :columns="1" :show-cell="false" :show.sync="showSelect" :value.sync="areaSelect" show-name @on-hide="onSelectedAddress" v-ref:addresses></popup-picker> -->
<popup-picker title="地址" :data="areaList" :columns="3" :show.sync="showAreaPicker" :value.sync="areaSelect" v-ref:areapicker :show-cell="false"></popup-picker>
<j-footer></j-footer>
<loading :show="showLoading" text="正在更新您的额度信息，请稍候..."></loading>
</template>

<script>
import Lib from 'assets/Lib.js'
import JFooter from 'components/j-footer'
import {
  Flexbox,
  FlexboxItem
} from 'vux-components/flexbox'
import Loading from 'vux-components/loading'
import Scroller from "vux-components/scroller"
import Group from 'vux-components/group'
import Cell from 'vux-components/cell'
import axios from 'axios'
import JInstallmentProcess from 'components/j-installment-process'
import PopupPicker from 'vux-components/popup-picker'

Lib.M.auth(axios, true)
export default {
  data() {
    return {
      showLoading: false,
      showAreaPicker: false,
      extraShow: false,
      limit: 0,   //已贷款额度
      balance: 0,
      expectInstalment: 0, //期望分期数
      ins: 0,  //可贷款额度
      balance: 0, //已消费金额
      bankList: [],
      imgUrl: Lib.C.imgUrl,
      status: [
        // 'UNSUCCESSFULLY':
        {
          statusEnum: 0,
          name: "申请失败"
        },
        // 'UNACTIVATED':
        {
          statusEnum: 1,
          name: "未激活"
        },
        // 'ACTIVATING':
        {
          statusEnum: 2,
          name: "激活中"
        },
        // 'ACTIVATED':
        {
          statusEnum: 3,
          name: "已激活"
        },
        // 'DISABLED':
        {
          statusEnum: 4,
          name: "激活失败"
        }
      ],
      thisStatus: "未激活",
      // thisStatus: "申请中",
      stepNum: 0,
      stepList: [{
        name: '线上看品牌',
        des: '关注居分期公众微信号，查看合作商户，找到您感兴趣的品牌及商铺信息。',
        img: '/static/new/index/ins01.png',
      },{
        name: '线下挑商品',
        des: '您可自行逛选，或由家居顾问配您逛选商品，随时提供专业建议。',
        img: '/static/new/index/ins02.png',
      },{
        name: '支付',
        des: '选好商品别着急，先与商家沟通价格再付款，请记得联系家居顾问刷卡才可享受分期优惠。',
        img: '/static/new/index/ins03.png',
      },{
        name: '生成订单',
        des: '支付后生成订单，您只需静待商品送货上门即可。',
        img: '/static/new/index/ins04.png',
      },],
      loanName: '',      
      loanMobile: JSON.parse(localStorage.user).profile.mobile,
      loanIdCard: '',
      loanMonth: '',
      loanSituation: '',
      loanDis: '请选择您房屋所在地',
      loanAdd: '',
      loanIsSS: '',
      loanExpectQuota: '',
      loanHouseSit: '',
      loanSocialSecurity: null,
      // loanHouseChange: '',
      radioOne: [{
        name: '我有房产证',
        id: 0,
        picked: false,
      },{
        name: '我有购房合同及发票',
        id: 1,
        picked: false,
      },{
        name: '其他',
        id: 2,
        picked: false,
      },],
      radioTwo: [{
        name: '是',
        id: 0,
        picked: false,
      },{
        name: '否',
        id: 1,
        picked: false,
      },],
      wpHeight: 0,
      areaList: [{
                name: '北京',
                value: 'beijing',
                parent: 0
            },{
                name: '北京市',
                value: 'bj',
                parent: 'beijing'
            }, {
                name: '东城',
                value: 'dc',
                parent: 'bj'
            }, {
                name: '西城',
                value: 'xc',
                parent: 'bj'
            }, {
                name: '海淀',
                value: 'hd',
                parent: 'bj'
            }, {
                name: '朝阳',
                value: 'cy',
                parent: 'bj'
            },{
                name: '丰台',
                value: 'ft',
                parent: 'bj'
            },{
                name: '门头沟',
                value: 'mtg',
                parent: 'bj'
            },{
                name: '石景山',
                value: 'sjs',
                parent: 'bj'
            },{
                name: '房山',
                value: 'fs',
                parent: 'bj'
            },{
                name: '通州',
                value: 'tz',
                parent: 'bj'
            },{
                name: '顺义',
                value: 'sy',
                parent: 'bj'
            },{
                name: '昌平',
                value: 'cp',
                parent: 'bj'
            },{
                name: '大兴',
                value: 'dx',
                parent: 'bj'
            },{
                name: '怀柔',
                value: 'hr',
                parent: 'bj'
            },{
                name: '平谷',
                value: 'pg',
                parent: 'bj'
            },{
                name: '延庆',
                value: 'yq',
                parent: 'bj'
            },{
                name: '密云',
                value: 'my',
                parent: 'bj'
            }],
      areaSelect: [],
      loanApp: [],
    }
  },
  components: {
    JFooter,
    Flexbox,
    FlexboxItem,
    Scroller,
    Loading,
    JInstallmentProcess,
    Group,
    Cell,
    PopupPicker
  },
  ready() {
    axios.get(`${Lib.C.loanApi}loan-applications`, {
      params: {
        filter: `userId:${JSON.parse(window.localStorage.getItem('user')).userId}`,
        sort: "createdAt,desc"
      }
    }).then((res) => {
      if (res.data.data.length > 0) {
        this.thisStatus = this.getStatus(res.data.data[0].statusEnum)
        let e = res.data.data[0]
        console.log(e)
        if (e.statusEnum == 3) {
          this.loanApp.push({
            name: e.fullname,
            mobile: e.mobile,
            dis: e.province + e.city + e.country,
            add: e.address,
            loanQuota: e.loanQuota,
            totalQuota: e.totalQuota,
            period: e.bankBranchPeriod.name,
            branch: e.bankBranchPeriod.bankBranch.name,
            bank: e.bankBranchPeriod.bankBranch.bank.name
          })
        } else if (e.statusEnum == 1||e.statusEnum == 2) {
          this.loanApp.push({
            name: e.fullname,
            idCardNo: e.idCardNo,
            mobile: e.mobile,
            dis: e.province + e.city + e.country,
            add: e.address,
            expect: e.expectQuota,
            month: e.monthlyIncome
          })
        }
      } else {
        this.thisStatus = '未申请'
      }
    }).catch((res) => {
      alert("查询贷款信息失败，请重试")
    })
  },
  methods: {
    getStatus(status) {
      try {
        let statusName = this.status[status].name
        return statusName
      } catch (e) {
        return "未申请"
      }
    },
    getBank() {
      axios.get(`${Lib.C.loanApi}loan-application-schemes`,{
        params: {
          filter: `userId:${JSON.parse(localStorage.getItem('user')).userId}`,
          sort: "createdAt,desc"
        }
      }).then((res) => {
        this.bankList = res.data.data
        if(!localStorage.getItem("apply-info")){
          let a = JSON.parse(JSON.stringify(res.data.data[0].loanApplication))
          localStorage.setItem("apply-info",JSON.stringify(a))
        }
        console.log(this.bankList)
      }).catch((res) => {
        alert("获取银行列表失败，请稍候再试...")
      })
    },
    getBalance() {
      axios.get(`${Lib.C.walletApi}wallets/${JSON.parse(localStorage.getItem('user')).userId}`).then((res) => {
        this.balance = res.data.data.consumptionAmount
      }).catch((err) => {
        alert('获取已消费金额失败，请稍后再试。。')
      })
    },
    bankSelect(index) {
      let data = JSON.parse(localStorage.getItem("apply-info"))
      data.bank = this.bankList[index].bank
      localStorage.setItem("apply-info", JSON.stringify(data))
      location.href = `activation-step2.html`
    },
    goto(url) {
      window.location.href = url
    },
    stopLoading() {
      this.showLoading = false
    },
    startLoading() {
      this.showLoading = true
    },
    getScreenWidth() {
      return document.body.clientWidth
    },
    changeStatus(status) {
      this.thisStatus = status
    },
    changeColor(val) {
      let ret = {}
      if (val) {
        ret.color = '#333'
      }
      return ret
    },
    isIdCard() {
      let creditReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/
      return creditReg.test(this.loanIdCard)
    },
    isTruePhoneNum() {
      let reg = /^1[3|4|5|6|7|8]\d{9}$/
      return reg.test(this.loanMobile)
    },
    isFinished() {
      return this.loanName&&this.isIdCard()&&this.isTruePhoneNum()&&this.loanExpectQuota&&this.$refs.areapicker.getNameValues()&&this.loanAdd&&this.loanMonth&&this.loanHouseSit&&this.loanSocialSecurity != null
    },
    changeRadio(id, type) {
      console.log(id, type)
      if (type == 0) {
        this.radioOne.map((e) => {
          if (e.id == id) {
            console.log('heihei')
            // e.bool = true
            this.radioOne[id].picked = true
            this.loanHouseSit = e.name
          } else {
            console.log('没选的')
            e.picked = false
            // this.radioOne[id].bool = true
            this.loanHouseSit = null
          }
          
        })
        console.log(this.radioOne)
      } else {
        this.radioTwo.map((e) => {
          if (e.id == id) {
            this.radioOne[id].bool = true
            console.log('haha')
            this.loanSocialSecurity = id==0?true:false
          } else {
            e.bool = false
            this.loanSocialSecurity = null
          }
        })
        console.log(this.radioTwo)
      }
    },
    changeShow(bool) {
      this.extraShow = bool
    },
    submit() {
      let dis = this.$refs.areapicker.getNameValues().split(' ')
      let data = {
        userId: JSON.parse(window.localStorage.getItem("user")).userId,
        fullname: this.loanName,
        idCardNo: this.loanIdCard,
        mobile: this.loanMobile,
        province: dis[0],
        city: dis[1],
        country: dis[2],
        address: this.loanAdd,
        expectQuota: this.loanExpectQuota,
        monthlyIncome: this.loanMonth,
        socialSecurity: this.loanSocialSecurity == 'true'? true: false,
        houseSituation: this.loanHouseSit=='其他'?this.loanHouseChange: this.loanHouseSit,
        statusEnum: 0,
      }
      console.log(data)
      axios.post(`${Lib.C.loanApi}user-application`, data).then((res) => {
        data.id = res.data.data.id
        // localStorage.setItem("apply-info", JSON.stringify(data))
        if (res.data.data.statusEnum == 0) {
          window.location.href = './ins-apply-failed.html'
        } else {
          window.location.href = './ins-apply-success.html?wait=true'
        }
      }).catch((res) => {
        alert("提交申请失败，请稍候重试...")
      })
    }
  }
}
</script>

