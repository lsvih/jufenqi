<template>
<div>
  <popup-picker title="地区" :data="area" :columns="3" :show-cell="false" :show.sync="showSelect" :value.sync="areaSelect" show-name v-ref:area></popup-picker>
  <group style="margin-top:-1.17647059em;">
    <x-input title="姓名" :value.sync="name" name="username" placeholder="请输入您的真实姓名" :show-clear="false"> </x-input>
    <x-input title="电话" :value.sync="phone" name="mobile" placeholder="请输入正确的电话号码" keyboard="number" is-type="china-mobile"></x-input>
    <datetime style="height:24px;" :value.sync="appoint_at" placeholder="请选择预约时间" :min-year=2016 :max-year=2017 format="YYYY-MM-DD HH:mm" title="时间" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}点" minute-row="{value}分" confirm-text="完成"
        cancel-text="取消"></datetime>
    <cell title="地区" style="height:24px;" :value="$refs.area.getNameValues()||'请选择所在城市及地区'" v-tap="_show()" is-link></cell>
    <x-textarea :value.sync="address" :height="50" :max="100" name="address" placeholder="请填写房产证上的详细地址"></x-textarea>
  </group>
  <div class="to-calculate" v-bind:class="{'btn-active':isFillData()}" v-tap="isFillData()?submit():return;">确定</div>
  <loading :show="showLoading" text="正在预约，请稍后..."></loading>
  <alert :show.sync="showAlert" title="居分期">网络连接失败，请稍后再试</alert>
  <alert :show.sync="showSuccess" title="居分期" @on-hide="appoint_ok">预约成功，请等待管家联系</alert>
</div>
<group title="预约列表" style="margin-bottom:44px;">
  <cell v-for="worker in workerList" class="cell-item">
    <div class="click-area-detail" v-tap="goto('worker-detail.html?id='+worker.userId)"></div>
    <img :src="worker.profileImage" class="worker-logo" width="120px" height="80px">
    <div class="worker-name">{{worker.nickname}}</div>
    <div class="worker-address">{{worker.nativePlace}}</div>
    <div class="worker-rank">评分:5.0</div>
  </cell>
</group>
</template>
<script>
import Lib from 'assets/Lib.js'
import PopupPicker from 'vux-components/popup-picker'
import Group from 'vux-components/group'
import Cell from 'vux-components/cell'
import Picker from 'vux-components/picker'
import XTextarea from 'vux-components/x-textarea'
import XInput from 'vux-components/x-input'
import Datetime from 'vux-components/datetime'
import Loading from 'vux-components/loading'
import Alert from 'vux-components/alert'
import axios from 'axios'
try {
  axios.defaults.headers.common['Authorization'] = JSON.parse(localStorage.getItem("user")).tokenType + ' ' + JSON.parse(localStorage.getItem("user")).token
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
    XTextarea,
    XInput,
    Datetime,
    Loading,
    Alert
  },
  ready() {
    this.selectWorkers = Lib.M.GetRequest().select.split("|")
    JSON.parse(window.localStorage.getItem("cart")).worker.map((e) => {
      if (~this.selectWorkers.indexOf(String(e.userId))) {
        this.workerList.push(e)
      }
    })
  },
  methods: {
    goto(url) {
      window.location.href = url
    },
    _show: function() {
      document.activeElement.blur();
      this.showSelect = true;
    },
    isFillData: function() {
      return this.name != "" && this.appoint_at != "" && this.areaSelect.length && this.address != ""
    },
    submit: function() {
      this.showLoading = true
      let city = this.$refs.area.getNameValues()
      let that = this
      let appointstamp = new Date(this.appoint_at)
      appointstamp = appointstamp.getTime()/1000
      axios.post(`${Lib.C.orderApi}decorationOrders`, {
        customerName: this.name,
        customerMobile: this.phone,
        orderTime: appointstamp,
        orderLocation: city,
        orderAddress: this.address,
        foreman1Id: this.selectWorkers[0],
        foreman2Id: this.selectWorkers[1]
      }, {
        withCredentials: true,
      }).then((res) => {
        window.location.href = "./appointment-success.html?type=1"
      }).catch((res) => {
        alert("预约失败，请稍候再试QAQ")
        this.showLoading = false
      })
    },
  },
  data() {
    return {
      showSelect: false,
      showLoading: false,
      showAlert: false,
      showSuccess: false,
      area: [{
        name: '北京',
        value: 'beijing',
        parent: 0
      }, {
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
        name: '海淀',
        value: 'hd',
        parent: 'bj'
      }, {
        name: '朝阳',
        value: 'cy',
        parent: 'bj'
      }, {
        name: '丰台',
        value: 'ft',
        parent: 'bj'
      }, {
        name: '门头沟',
        value: 'mtg',
        parent: 'bj'
      }, {
        name: '石景山',
        value: 'sjs',
        parent: 'bj'
      }, {
        name: '房山',
        value: 'fs',
        parent: 'bj'
      }, {
        name: '通州',
        value: 'tz',
        parent: 'bj'
      }, {
        name: '顺义',
        value: 'sy',
        parent: 'bj'
      }, {
        name: '昌平',
        value: 'cp',
        parent: 'bj'
      }, {
        name: '大兴',
        value: 'dx',
        parent: 'bj'
      }, {
        name: '怀柔',
        value: 'hr',
        parent: 'bj'
      }, {
        name: '平谷',
        value: 'pg',
        parent: 'bj'
      }, {
        name: '延庆',
        value: 'yq',
        parent: 'bj'
      }, {
        name: '密云',
        value: 'my',
        parent: 'bj'
      }],
      name: "",
      areaSelect: [],
      phone: JSON.parse(window.localStorage.getItem("user")).profile.mobile,
      address: "",
      appoint_at: "",
      workerList: [],
      selectWorkers: []
    }
  }
}
</script>
<style lang="less">
a {
    text-decoration: none;
}
::-webkit-input-placeholder {
    text-align: left;
}
body {
    background-color: #eee;
    margin: 0;
}
.to-calculate {
    position: fixed;
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
</style>
