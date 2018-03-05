<style scoped lang="less">
body{
  background-color: #eee;
}
.wp {
  display: flex;
  width: calc(~"100% - 30px");
  margin: 0 auto;
  font-weight: 14px;
  padding-top: 15px;
  input {
    display: block;
    outline: none;
    width: 80%;
    height: 39px;
    line-height: 44px;
    padding-left: 15px;
    color: #333;
    border: 1px solid #ddd;
    &::placeholder {
      color: #999;
    }
  }
  .btn {
    width: 20%;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background-color: #eee;
    color: #666;
    font-size: 12px;
  }
  .act {
    background-color: #ff9736;
    color: #fff;
  }
}
.gift {
  width: calc(~"100% - 30px");
  height: 150px;
  background-color: #ff9736;
  position: relative;
  margin: 20px auto;
  box-shadow: 2px 2px 11px 1px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  .gift-title {
    font-size: 14px;
    position: absolute;
    top: 15px;
    left: 15px;
    color: #fff;
    font-weight: 600;
  }
  .gift-code {
    position: absolute;
    color: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 26px;
  }
  .gift-time {
    font-size: 12px;
    position: absolute;
    bottom: 15px;
    right: 15px;
    font-weight: 300;
    color: #fff;
  }
  .gift-tag {
    position: absolute;
    padding: 3px 5px;
    font-size: 12px;
    top: 15px;
    right: 15px;
    color: #fff;
  }
}
// .gift-wp {
//   width: calc(~"100% - 30px");
//   display: flex;
//   margin: 0 auto;
//   justify-content: space-between;
//   flex-wrap: wrap;
//   .gift-item {
//     width: calc(~"50% - 10px");
//     height: 170px;
//     background-color: #ccc;
//     margin-bottom: 15px;
//     .cover-img {
//       width: 100%;
//       height: 100px;
//       background-color: #333;
//       img {
//         display: block;
//         width: 100%;
//       }
//     }
//     .btn {
//       width: 80px;
//       height: 44px;
//       line-height: 44px;
//       border: 1px solid #ff9736;
//       color: #ff9736;
//       margin: 11px auto;
//       text-align: center;
//       font-size: 14px;
//     }
//   }
// }
.gift-wp {
  width: calc(~"100% - 30px");
  // height: 200px;
  padding: 15px 0;
  margin: 15px auto;
  display: block;
  background-color: #ff9736;
  position: relative;
  .img-wp {
    width: calc(~"100% - 30px");
    margin: 0 auto 20px auto;
    img {
      display: block;
      width: 100%;
      height: auto;
    }
  }
  .text-wp {
    display: flex;
    padding-left: 15px;
    color: #fff;
    .name {
      position: relative;
    }
  }
  .tag {
    position: absolute;
    top: 0px;
    right: -52px;
    font-size: 12px;
    color: #fff;
    padding: 2px 2px;
    border: 1px solid #fff;
    border-radius: 2px;
    font-weight: 300;
  }
  .btn {
    border: 1px solid #fff;
    height: 30px;
    line-height: 30px;
    padding: 0 12px;
    font-size: 12px;
    color: #fff;
    position: absolute;
    bottom: 15px;
    right: 15px;
  }
}
.select-wp {
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  .area {
    position: absolute;
    top: 50%;
    left: 50%;
    width: calc(~"100% - 80px");
    height: auto;
    background: #fff;
    transform: translate(-50%, -50%);
    opacity: 1;
    text-align: center;
    border-radius: 5px;
    color: #333;
    .address {
      background-color: #fafafa;
      width: calc(~"100% - 30px");
      padding: 20px 0;
      margin: 20px auto;
      border-radius: 5px;
    }
    .ss {
      border-top: 1px solid #f7f7f7;
      height: 44px;
      line-height: 44px;
      color: #ff9736;
    }
  }
}
</style>

<template>
<!-- <group>
     <x-textarea :sync.value="content" :max="200" placeholder="请输入您的反馈" :height="200" :rows="8" :cols="30" style="font-size:12px;"></x-textarea>
</group>
<x-button slot="right" style="background-color:#ff9736;color:#fff;margin:20px 20px;width:calc( 100% - 40px )" v-tap="submit">提交</x-button> -->
  <div class="wp" v-if="exchangeShow">
    <input type="text" v-model="giftCode">
    <div class="btn" v-tap="isCode()?getGiftTicket():textAlert('请输入正确的兑换码')" :class="{'act': isCode()}">立即兑换</div>
  </div>
  <div class="gift" v-if="!exchangeShow">
    <div class="gift-title">{{ticket.name}}</div>
    <div class="gift-code">{{ticket.code}}</div>
    <div class="gift-time">{{ticket.mobile}}</div>
    <div class="gift-tag">{{ticketStatus[ticket.status]}}</div>
  </div>
  <!-- <div class="gift-wp">
    <div class="gift-item">
      <div class="cover-img"></div>
      <div class="btn">兑换</div>
    </div>
    <div class="gift-item">
      <div class="cover-img"></div>
      <div class="btn">兑换</div>
    </div>
    <div class="gift-item">
      <div class="cover-img"></div>
      <div class="btn">兑换</div>
    </div>
    <div class="gift-item">
      <div class="cover-img"></div>
      <div class="btn">兑换</div>
    </div>
    <div class="gift-item">
      <div class="cover-img"></div>
      <div class="btn">兑换</div>
    </div>
    <div class="gift-item">
      <div class="cover-img"></div>
      <div class="btn">兑换</div>
    </div> -->
    <div class="gift-wp">
      <div class="img-wp">
        <img :src="gift.coverImg">
      </div>
      <div class="text-wp" style="margin-bottom: 10px;">
        <div class="name">
          {{gift.name}}
          <div class="tag" v-tap="myGiftStatus == 2?receive():return">{{giftStatus[myGiftStatus]}}</div>
        </div>
      </div>
      <div class="text-wp">
        <div class="detail" style="font-size: 14px;">{{gift.detail}}</div>
      </div>
      
      <div class="btn" v-tap="showGift()">立即领取</div>
    </div>
  </div>
  <popup-picker title="地区" :data="addresses" :columns="1" :show-cell="false" :show.sync="showSelect" :value.sync="areaSelect" show-name @on-hide="onSelectedAddress" v-ref:addresses></popup-picker>
  <confirm :show.sync="showReceive" title="" confirm-text="是" cancel-text="否" @on-confirm="receive(tempOrderNo)">
    <p style="text-align:center;">您是否确认收到货物?</p>
  </confirm>
  <div class="select-wp" v-if="showAddress">
    <div class="area">
      <h2>确认地址</h2>
      <div class="address" v-tap="select()">
        {{addressDefault}}
      </div>
      <div class="ss" v-tap="goto('./address.html')">编辑地址</div>
      <div class="ss" v-tap="changeGift()">确认兑换</div>
      <div class="ss" style="color: #ccc;" v-tap="showAddress = false">取消</div>
    </div>
  </div>
</template>

<script>
import Lib from 'assets/Lib.js'
import axios from 'axios'
import PopupPicker from 'vux-components/popup-picker'
import Confirm from 'vux-components/confirm'

Lib.M.auth(axios)
export default {
  data() {
    return {
      content: "",
      gift: {
        id: '',
        coverImg: '',
        detail: '',
        name: '',
      },
      exchangeShow: true,
      ticket: {
        id: '',
        name: '',
        code: '',
        mobile: '',
        status: '',
      },
      ticketStatus: ['已过期', '未使用', '已使用'],
      giftStatus: ['未换取', '待发货', '待收货', '已收货'],
      myGiftStatus: 0,
      addressId: '',
      showSelect: false,
      areaSelect: [],
      addresses: [],
      addressDefault: '',
      hasAddress: true,
      showAddress: false,
      hasMyGift: false,
      userGift: '',
      showReceive: false,
    }
  },
  components: {
    PopupPicker,
    Confirm
  },
  ready() {
    this.hasGift()
    this.hasGiftTicket()
    this.getGift()
    this.getAddress()
  },
  methods: {
    goto(url) {
      location.href = url
    },
    isCode() {
      return this.giftCode ? this.giftCode.length == 6 : false
    },
    getGift() {
      axios.get(`${Lib.C.mOrderApi}gifts?filter=deleted:false`).then((res) => {
        console.log('礼品库中的礼品', res.data.data)
        let result = res.data.data[0]
        this.gift.name = result.name
        this.gift.coverImg = Lib.C.imgUrl + result.img
        this.gift.id = result.id
        this.gift.detail = result.detail
      }).catch((err) => {
        alert('获取礼品信息失败，请稍后再试。。')
        throw err
      })
    },
    getGiftTicket() {
      axios.post(`${Lib.C.mOrderApi}user-gift-tickets/exchange-gift-ticket?code=${this.giftCode}`).then((res) => {
        alert('成功换取礼品券')
        location.reload()
      }).catch((err) => {
        alert('获取礼品券失败，请稍后再试。。')
        throw err
      })
    },
    hasGiftTicket() {
      axios.get(`${Lib.C.mOrderApi}user-gift-tickets?filter=userId:${JSON.parse(localStorage.user).userId}
        `).then((res) => {
          console.log('礼品券：', res.data.data)
          if (res.data.data.length > 0) {
            this.exchangeShow = false
            let tic = res.data.data[0],
            source = tic.source.split(', ')
            this.ticket.code = source[0]
            this.ticket.mobile = source[1]
            this.ticket.name = tic.giftTicket.name
            this.ticket.status = tic.status
            this.ticket.id = tic.id
            if (tic.status == 1) {
              this.hasMyGift = true
            }
          } else {
            this.exchangeShow = true
          }
        }).catch((err) => {
          alert('获取信息失败，请稍后再试。。')
          throw err
        })
    },
    hasGift() {
      axios.get(`${Lib.C.mOrderApi}user-gifts?filter=userId:${JSON.parse(localStorage.user).userId}
        `).then((res) => {
          console.log("用户礼品：", res.data.data)
          if (res.data.data.length > 0) {
            this.myGiftStatus = res.data.data[0].status
            this.userGift = res.data.data[0].id
          } 
        }).catch((err) => {
          alert('获取信息失败，请稍后再试。。')
          throw err
        })
    },
    textAlert(str) {
      alert(str)
    },
    getAddress() {
      axios.get(`${Lib.C.mOrderApi}user-addresses?filter=userId:${JSON.parse(localStorage.getItem('user')).userId}`).then((res) => {
        let result = res.data.data
        result.map((e) => {
          if (e.deleted == false) {
            this.addresses.push({
              value: String(e.id),
              name: `${e.city} ${e.district} ${e.address}` 
            })
          }
          if (e.userDefault == true) {
            this.addressDefault = `${e.city} ${e.district} ${e.address}`
            this.addressId = e.id
          }
        })
        if (this.addresses.length == 0) {
          this.addressDefault = `您现在还没有收货地址`
          this.addressId = null
        }
      }).catch((err) => {
        throw err
      })
    },
    _show() {
      document.activeElement.blur();
      this.showSelect = true;
    },
    onSelectedAddress() {
      let choose = this.areaSelect[0]
      this.addresses.map((e, index, arr) => {
        if (choose == e.value) {
          this.addressDefault = e.name
          this.addressId = Number(e.value)
        }
      })
      this.areaSelect = []
      this.showAddress = true
    },
    select() {
      if (this.addresses.length > 1) {
        this.showAddress = false,
        this._show()
      }
    },
    showGift() {
      if (this.hasMyGift) {
        this.showAddress = true
      } else {
        alert('您还没有兑换礼品券！')
      }
    },
    changeGift() {
      axios.post(`${Lib.C.mOrderApi}user-gifts/exchange-gift?userGiftTicketId=${this.ticket.id}&userAddressId=${this.addressId}`).then((res) => {
        alert('您已兑换成功！')
        location.reload()
      }).catch((err) => {
        alert('兑换失败，请稍后再试。。')
        throw err
      })
    },
    receive() {
      axios.post(`${Lib.C.mOrderApi}user-gifts/${this.userGift}/receive`).then((res) => {
        alert('收货成功！')
        location.reload()
      }).catch((err) => {
        alert('收货失败，请稍后再试。。')
        throw err
      })
    }
  }
}
</script>
