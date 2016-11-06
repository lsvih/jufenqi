<template>
<div>
  <popup-picker title="地区" :data="area" :columns="3" :show-cell="false" :show.sync="showSelect" :value.sync="areaSelect" show-name v-ref:area></popup-picker>
  <group style="margin-top:-1.17647059em;margin-bottom:44px;">
    <x-input title="姓名" :value.sync="name" name="username" placeholder="请输入您的真实姓名" :show-clear="false"> </x-input>
    <x-input title="电话" :value.sync="phone" name="mobile" placeholder="请输入正确的电话号码" keyboard="number" is-type="china-mobile"></x-input>
    <datetime style="height:24px;" :value.sync="appoint_at" placeholder="请选择预约时间" :min-year=2016 :max-year=2017 format="YYYY-MM-DD HH:mm" title="时间" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}点" minute-row="{value}分" confirm-text="完成"
        cancel-text="取消"></datetime>
  </group>
  <div class="to-calculate" v-bind:class="{'btn-active':isFillData()}" v-tap="isFillData()?submit():return;">确定</div>
  <loading :show="showLoading" text="正在预约，请稍后..."></loading>
</div>
<group title="预约列表">
  <group style="margin-top:-1.17647059em;" v-for="shop in shopList">
    <cell class="shop-item">
      <div class="shop-name">{{shop.name}}</div>
      <div class="shop-address">{{shop.address}}</div>
    </cell>
    <cell class="shop-brand" v-for="brand in shop.brand">
      <div class="brand-name">{{brand.name}}</div>
    </cell>
  </group>
</group>
</template>
<script>
import Lib from 'assets/Lib.js'
import PopupPicker from 'vux-components/popup-picker'
import Group from 'vux-components/group'
import Cell from 'vux-components/cell'
import Picker from 'vux-components/picker'
import XInput from 'vux-components/x-input'
import Datetime from 'vux-components/datetime'
import Loading from 'vux-components/loading'
import axios from 'axios'
try {
  axios.defaults.headers.common['x-user-token'] = JSON.parse(localStorage.getItem("user")).token
} catch (e) {
  localStorage.clear()
  window.location.href = `./wxAuth.html?url=index.html`
}
export default {
  components: {
    PopupPicker,
    Group,
    Picker,
    Cell,
    XInput,
    Loading,
    Datetime
  },
  ready() {},
  methods: {
    goto(url) {
      window.location.href = url
    },
    isFillData: function() {
      return this.name != "" && this.appoint_at != "" && this.phone !== null
    },
    submit() {
      this.showLoading = true
      let subList = []
      let list = JSON.parse(localStorage.cart).shop
      list.map((shop) => {
        let brands = []
        shop.brand.map((brand) => {
          brands.push(brand.name)
        })
        subList.push({
          guideId: 1,
          storeId: shop.userId,
          brands: brands,
          serviceManagers: [1]
        })
      })
      let appointTime = new Date(this.appoint_at)
      appointTime = appointTime.getTime()/1000
      axios.post(`${Lib.C.mOrderApi}materialOrders`,{
          customerName: this.name,
          customerMobile: this.phone,
          orderTime: appointTime,
          subApptList: subList
        }).then((res) => {
        this.showLoading = false
        alert("预约成功!")
        let list = JSON.parse(localStorage.cart)
        list.shop = []
        localStorage.setItem("cart", JSON.stringify(list))
        this.shopList = []
        location.href = "./cart.html"
      }).catch((res) => {
        this.showLoading = false
        alert("网络连接中断，请稍候再试")
      })
    },
  },
  data() {
    return {
      showLoading: false,
      name: "",
      phone: JSON.parse(window.localStorage.getItem("user")).profile.mobile,
      appoint_at: "",
      shopList: JSON.parse(localStorage.cart).shop,
    }
  }
}
</script>
<style lang="less">
a {
    text-decoration: none;
}
::-webkit-input-placeholder {
    text-align: right;
}
body {
    background-color: #eee;
    margin: 0;
}
.to-calculate {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 44px;
    text-align: center;
    line-height: 44px;
    background-color: #e2e2e2;
    color: #fff;
    z-index: 5;
}
.btn-active {
    background-color: #88C928!important;
}
.cell-item {
    position: relative;
    height: 80px;
    .shop-logo {
        position: absolute;
        top: 10px;
        left: 15px;
        width: 120px;
        height: 80px;
    }
    .shop-name {
        position: absolute;
        top: 10px;
        left: 145px;
        font-size: 12px;
        color: #393939;
    }
    .shop-address {
        position: absolute;
        top: 44px;
        left: 145px;
        font-size: 12px;
        color: #999;
    }
    .shop-rank {
        position: absolute;
        bottom: 10px;
        left: 145px;
        font-size: 12px;
        color: #3ba794;
    }
    .shop-is-favorite {
        position: absolute;
        top: 70px;
        right: 15px;
        width: 80px;
        height: 20px;
        img {
            height: 100%;
            width: 100%;
        }
    }
    .worker-logo {
        position: absolute;
        top: 10px;
        left: 15px;
        width: 80px;
        height: 80px;
    }
    .worker-name {
        position: absolute;
        top: 10px;
        left: 100px;
        font-size: 12px;
        color: #393939;
    }
    .worker-address {
        position: absolute;
        top: 44px;
        left: 100px;
        font-size: 12px;
        color: #999;
    }
    .worker-rank {
        position: absolute;
        bottom: 10px;
        left: 100px;
        font-size: 12px;
        color: #3ba794;
    }
    .worker-is-favorite {
        position: absolute;
        top: 70px;
        right: 15px;
        width: 80px;
        height: 20px;
        img {
            height: 100%;
            width: 100%;
        }
    }
}
.shop-item {
    position: relative;
    height: 40px;
    .shop-name {
        position: absolute;
        left: 15px;
        top: 0;
        height: 60px;
        line-height: 40px;
    }
    .shop-address {
        position: absolute;
        font-size: 12px;
        left: 15px;
        bottom: 15px;
    }
}
.shop-brand {
    .brand-name {
        position: absolute;
        top: 0;
        left: 15px;
        font-size: 14px;
        height: 40px;
        line-height: 40px;
    }
}
</style>
