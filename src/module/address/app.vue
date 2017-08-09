·<style>
html {
  padding: 0;
  margin: 0;
}
body {
  background-color: #efefef;
  padding: 0;
  margin: 0;
}
</style>
<style lang="less">
@weuiDialogBackgroundColor: #FAFAFC;
@weuiDialogLineColor: #D5D5D6;
@weuiDialogLinkColor: #3CC51F;
@weuiDialogLinkActiveBc: #EEEEEE;
.content {
  width: 100%;
  height: 100%;
  position: relative;
  .amount-wrapper {
    text-align: center;
    background-image: url('http://ohej1hvbm.bkt.clouddn.com/wallet-back.png');
    background-size: cover;
    padding: 32px 0 0 0;
    height: 150px;
    margin: 0 0 1px 0;
    position: relative;
    p {
      color: #fff;
      margin: 0;
    }
    .amount-title {
      margin-bottom: 10px;
      font-size: 14px;
    }
    .amount {
      font-size: 21px;
      font-weight: 400;
    }
    .get-money {
      width: 80px;
      height: 30px;
      line-height: 30px;
      color: #fff;
      border: 1px solid #fff;
      border-radius: 5px;
      margin: 0 auto 10px auto;
    }
    .tel {
      position: absolute;
      font-size: 12px;
      color: #fff;
      right: 16px;
      bottom: 10px;
      width: 60px;
      height: 25px;
      line-height: 25px;
      border: 1px solid #fff;
      border-radius: 5px;
    }
    .hint {
      font-size: 12px;
      margin-bottom: 8px;
      text-align: center;
      color: #fff;
      font-weight: 300;
      width: 100%;
    }
  }
  .coupon-detail {

    .cell {
      height: 41px;
      font-size: 12px;
      color: #393939;
      padding-left: 16px;
      margin-bottom: 1px;
      .cell-title {
        line-height: 50px;
        font-size: 14px;
        position: relative;
        padding-left: 10px;
        .cell-heihei {
          width: 2px;
          height: 12px;
          background-color: #ff9736;
          top: 19px;
          left: 0px;
          position: absolute;
        }
      }
    }

    .label {
      height: 50px;
      background-color: #fff;
      z-index: 10;
      position: relative;
      padding: 0 16px;
      font-size: 12px;
      display: flex;
      justify-content: space-between;
      transition: all 0.3s ease;
      border-bottom: 1px solid #ebebeb;
      .more {
        position: absolute;
        bottom: -44px;
        box-sizing: border-box;
        padding: 0 16px;
        left: 0;
        width: 100%;
        display: flex;
        height: 44px;
        background-color: #ebebeb;
        line-height: 44px;
        justify-content: space-between;
        border-top: 1px solid #ebebeb;
        visibility: hidden;
      }
      .amount-label {
        line-height: 32px;
        width: 80%;
      }
      .amount-time {
        color: #393939;
        line-height: 10px;
      }
      .amout-change {
        line-height: 50px;
        position: relative;
        .orange {
          color: #ff9736;
          display: inline-block;
          margin-right: 3px;
        }
        span {
          z-index: 100;
        }
        img {
          transform: rotate(-90deg);
          width: 16px;
          transition: all 0.3s ease;
        }
        .origin {
          transform: none;
        }
      }
    }
  }
}
/*
 * dialog css
 */
.setTapColor(@c:rgba(0,0,0,0)) {
    -webkit-tap-highlight-color: @c;
}
.setTopLine(@c: #C7C7C7) {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    border-top: 1px solid @c;
    color: @c;
    transform-origin: 0 0;
    transform: scaleY(0.5);
}
.setLeftLine(@c: #C7C7C7) {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 1px;
    height: 100%;
    border-left: 1px solid @c;
    color: @c;
    transform-origin: 0 0;
    transform: scaleX(0.5);
}

.weui_dialog_ft {
    position: relative;
    line-height: 42px;
    margin-top: 20px;
    font-size: 17px;
    display: flex;
    span {
        display: block;
        flex: 1;
        color: #888;
        text-decoration: none;
        &:active {
            background-color: @weuiDialogLinkActiveBc;
        }
    }
    &:after {
        content: " ";
        .setTopLine(@weuiDialogLineColor);
    }
    .primary {
        color: #f99736 !important;
    }
}
#dialog-p {
  font-size: 18px;
  margin: 0;
  padding: 13px 0;
  position: relative;
  background-color: #fff;
  img {
    width: 20px;
    transform: rotate(-90deg);
    position: absolute;
    top: 19px;
    right: 12px;
  }
}
/**
 * 活动页卡片
 */
.p-card {
  width: calc(~"100% - 32px");
  margin: 10px auto;
  background-color: #efefef;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  .cate-wrapper {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    height: 40px;
    background-color: #fff;
    line-height: 40px;
    color: #393939;
    border-radius: 5px 5px 0 0;
    .cate-label {
      display: flex;
      line-height: 40px;
      .img-wrapper {
        width: 30px;
        height: 30px;
        border-radius: 5px;
        margin-top: 5px;
        margin-right: 10px;
        img {
          width: 100%;
          height: 100%;
          display: block;
          border-radius: 5px;
        }
      }
      .name {
        font-size: 12px;

      }
    }
    .end {
      font-size: 12px;
      line-height: 40px;
      color: #999;
      font-weight: 300;
    }
    .end-active {
        color: #ff9736 !important;
      }
  }
  .brand-wrapper {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    height: 60px;
    background-color: #f8f8f8;
    line-height: 40px;
    color: #393939;
    .brand-label {
      display: flex;
      line-height: 60px;
      .img-wrapper {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
        margin-top: 15px;
        img {
          width: 100%;
          height: 100%;
          display: block;
          border-radius: 50%;
        }
      }
      .name {
        font-size: 15px;
      }
    }
    .end {
      font-size: 12px;
      line-height: 60px;
    }

  }
  .tip {
    display: flex;
    justify-content: space-between;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    font-size: 12px;
    color: #999;
    padding: 0 10px;
    font-weight: 300;
    border-radius: 0 0 5px 5px;
    .rufund-btn {
      height: 100%;
    }
  }
}
.add-loan {
  width: 100px;
  height: 44px;
  margin: 50px auto;
  text-align: center;
  line-height: 44px;
  color: #ff9736;
  border: 1px solid #ff9736;
  border-radius: 22px;
}
.address-wp {
  width: calc(~"100% - 32px");
  margin: 10px auto;
  overflow: hidden;
  border-radius: 3px;
  .address-btn {
    width: 100%;
    background-color: #ff9736;
    text-align: center;
    height: 44px;
    line-height: 44px;
    font-size: 16px;
    color: #fff;
  }
}
.vux-popup-picker-header {
    color: #ff9736 !important;
}
.text-act {
  color: #ff9736;
}
</style>
<template>
  <div class="content">
    <div class="amount-wrapper">
      <!-- <p class="amount-title">贷款总金额</p> -->
      <p class="amount"><span>地址管理</span></p>
      <!-- <div class="hint">注意：本次活动不包括装修公司及家电品牌</div> -->

      <!-- <span class="tel" v-tap="goto('tel:40000390808')">客服电话</span> -->
    </div>
    <div class="coupon-detail">
      <div class="cell">
        <div class="cell-title">
          <div class="cell-heihei"></div>
          收货地址
        </div>
      </div>
      <div class="p-card" v-for="loan in addresses">
        <div class="cate-wrapper">
          <div class="cate-label">
            <!-- <div class="img-wrapper"><img :src="cate.cateImg"></div> -->
            <div class="name">{{loan.province}}</div>
          </div>
          <div class="end"><span>{{loan.city}}</span></div>
        </div>
        <div class="brand-wrapper">
          <div class="brand-label">
            <!-- <div class="img-wrapper"><img :src="loan.logo"></div> -->
            <div class="name">{{loan.address}}</div>
          </div>
          <div class="end">{{loan.district}}</div>
        </div>
        <div class="tip">
          <span v-tap="deleteAddress(loan.id)">删除地址</span>
          <div class="refund-btn" v-tap="changeDefaultAddress(loan.id)" v-if="!loan.userDefault">设为默认地址</div>
          <div class="refund-btn" style="color: #ff9736;" v-if="loan.userDefault">默认地址</div>
        </div>
      </div>
    </div>
    <div class="address-wp" v-if="inputShow">
      <group>
        <cell title="地区" style="height:24px;" :value="$refs.area.getNameValues()||'请选择所在城市及地区'" v-tap="_show()" is-link></cell>
        <x-textarea :value.sync="addressDetail" :height="50" :max="100" name="address" placeholder="请填写房产证上的详细地址"></x-textarea>
      </group>
      <div class="address-btn" v-tap="addArea()">增加</div>
    </div>
    <div class="add-loan" v-tap="inputShow = true">
        新增地址
    </div>
  </div>
  <popup-picker title="地区" :data="area" :columns="3" :show-cell="false" :show.sync="showSelect" :value.sync="areaSelect" show-name v-ref:area></popup-picker>
</template>

<script>
import Lib from 'assets/Lib.js'
import Dialog from 'vux-components/dialog'
import Group from 'vux-components/group'
import XInput from 'vux-components/x-input'
import Confirm from 'vux-components/confirm'
import PopupPicker from 'vux-components/popup-picker'
import Cell from 'vux-components/cell'
import Picker from 'vux-components/picker'
import XTextarea from 'vux-components/x-textarea'
import Datetime from 'vux-components/datetime'
import Loading from 'vux-components/loading'
import Alert from 'vux-components/alert'
import axios from 'axios'
Lib.M.auth(axios)

export default {
  data() {
    return {
      balance: 0,
      loanApps: [],
      totalAmount: 0,
      user: JSON.parse(localStorage.user).userId,
      imgUrl: 'http://ohej1hvbm.bkt.clouddn.com/',
      areaSelect: [],
      inputShow: false,
      addressDetail: '',
      showSelect: false,
      addresses: [],
      area: [{
        name: '北京',
        value: '北京',
        parent: 0
      }, {
        name: '北京市',
        value: '北京市',
        parent: '北京'
      }, {
        name: '东城区',
        value: '东城区',
        parent: '北京市'
      }, {
        name: '西城区',
        value: '西城区',
        parent: '北京市'
      }, {
        name: '海淀区',
        value: '海淀区',
        parent: '北京市'
      }, {
        name: '朝阳区',
        value: '朝阳区',
        parent: '北京市'
      }, {
        name: '丰台区',
        value: '丰台区',
        parent: '北京市'
      }, {
        name: '门头沟区',
        value: '门头沟区',
        parent: '北京市'
      }, {
        name: '石景山区',
        value: '石景山区',
        parent: '北京市'
      }, {
        name: '房山区',
        value: '房山区',
        parent: '北京市'
      }, {
        name: '通州区',
        value: '通州区',
        parent: '北京市'
      }, {
        name: '顺义区',
        value: '顺义区',
        parent: '北京市'
      }, {
        name: '昌平区',
        value: '昌平区',
        parent: '北京市'
      }, {
        name: '大兴区',
        value: '大兴区',
        parent: '北京市'
      }, {
        name: '怀柔区',
        value: '怀柔区',
        parent: '北京市'
      }, {
        name: '平谷区',
        value: '平谷区',
        parent: '北京市'
      }, {
        name: '延庆区',
        value: '延庆区',
        parent: '北京市'
      }, {
        name: '密云区',
        value: '密云区',
        parent: '北京市'
      }],
    }
  },
  components: {
    Dialog,
    Group,
    XInput,
    Confirm,
    PopupPicker,
    Cell,
    Picker,
    XTextarea,
    XInput,
    Datetime,
    Loading,
    Alert,
  },
  ready() {
    this.getAddress()
  },
  methods: {
    goto(url) {
      location.href = url
    },
    getTime:Lib.M.getTime,
    // ?filter=userId:${JSON.parse(localStorage.getItem('user')).userId}
    getAddress() {
      axios.get(`${Lib.C.mOrderApi}user-addresses?filter=userId:${JSON.parse(localStorage.getItem('user')).userId}`).then((res) => {
        let result = res.data.data
          result.map((e) => {
            if (e.deleted == false) {
              this.addresses.push({
                id: e.id,
                userId: e.userId,
                province: e.province,
                city: e.city,
                district: e.district,
                address: e.address,
                userDefault: e.userDefault,
                deleted: e.deleted
              })
            }
          })
          console.log(this.addresses)
      }).catch((err) => {
        throw err
      })
    },
    _show() {
      document.activeElement.blur();
      this.showSelect = true;
    },
    addArea() {
      console.log('picker',this.$refs.area.getNameValues())
      console.log('详细地址',this.addressDetail)
      let areaArr = this.$refs.area.getNameValues().split(' ')
      let result = {}
      result.province = areaArr[0]
      result.city = areaArr[1]
      result.district = areaArr[2]
      result.userId = JSON.parse(localStorage.user).userId
      result.address = this.addressDetail
      axios.post(`${Lib.C.mOrderApi}user-addresses`, result).then((res) => {
        alert('添加地址成功！')
        location.reload()
      }).catch((err) => {
        alert('添加失败，请稍后再试！')
        throw err
      })
    },
    changeDefaultAddress(id) {
      axios.post(`${Lib.C.mOrderApi}user-addresses/${id}/set-default`).then((res) => {
        alert('已经设置为默认地址！')
        location.reload()
      }).catch((err) => {
        alert('设置失败，请稍后再试！')
        throw err
      })
    },
    deleteAddress(id) {
      axios.delete(`${Lib.C.mOrderApi}user-addresses/${id}`).then((res) => {
        alert('删除地址成功！')
        this.addresses.map((e, index, arr) => {
          if (id == e.id) {
            arr.splice(index, 1)
          }
        })
      }).catch((err) => {
        alert('删除失败，请稍后再试！')
      })
    }
  }
}
</script>
