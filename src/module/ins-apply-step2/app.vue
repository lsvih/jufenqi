<template>
<div style="padding-bottom:60px;">
<j-apply-process :step="2">
</j-apply-process>
<group title="装修地址">
  <cell title="地址" :value="$refs.areapicker.getNameValues()" v-tap="showAreaPicker = true" style="height:30px" is-link></cell>
  <x-textarea :max="200" :value.sync="address" placeholder="请填写详细地址" :show-counter="false" :height="60" :rows="8" :cols="30"></x-textarea>
</group>
<group title="装修面积">
  <x-input title="装修面积(㎡)" :value.sync="areaSize" keyboard="number"  type="number" placeholder="请输入装修面积"></x-input>
</group>
<group title="期望贷款信息">
  <x-input title="期望额度(元)" :value.sync="wantIns" keyboard="number"  type="number" placeholder="请输入您期望的贷款额度"></x-input>
  <cell title="期望分期数" :value="insNumberSelect" v-tap="openIns()" style="height:30px" is-link></cell>
</group>
<popup-picker title="分期数" :data="insNumberList" :show.sync="showInsNumberPicker" :value.sync="insNumberSelect" v-ref:insNumber :show-cell="false"></popup-picker>
<popup-picker title="地址" :data="areaList" :columns="3" :show.sync="showAreaPicker" :value.sync="areaSelect" v-ref:areapicker :show-cell="false"></popup-picker>
<x-button slot="right" :class="{'btn-active':isFilled()}" style="background-color:#e2e2e2;color:#fff;margin:20px 20px;width:calc( 100% - 40px )" v-tap="isFilled()?nextStep():return">下一步</x-button>
<j-tel></j-tel>
</div>
</template>

<script>
import Lib from 'assets/Lib.js'
import JApplyProcess from 'components/j-apply-process'
import XInput from 'vux-components/x-input/'
import Group from 'vux-components/group/'
import Cell from 'vux-components/cell/'
import XButton from 'vux-components/x-button'
import PopupPicker from 'vux-components/popup-picker'
import XTextarea from 'vux-components/x-textarea'
import JTel from 'components/j-tel'
export default {
  data() {
    return {
      areaSize:null,
      wantIns:null,
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
                name: '海淀',
                value: 'hd',
                parent: 'bj'
            },{
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
      address:"",
      insNumberSelect: [],
      showAreaPicker: false,
      showInsNumberPicker: false,
      insNumberList: [
        [3, 6, 9, 12, 24]
      ]
    }
  },
  components: {
    JApplyProcess,
    XInput,
    Group,
    Cell,
    XButton,
    JTel,
    PopupPicker,
    XTextarea
  },
  methods: {
    isFilled(){
      return (this.wantIns!==null&&this.areaSize!==null&&this.insNumberSelect.length!==0&&this.areaSelect.length!==0&&this.address!=="")
    },
    nextStep(){
      let city = this.$refs.areapicker.getNameValues().split(" ")
      let data = JSON.parse(window.localStorage.getItem("apply-info"))
      data.province = city[0]
      data.city = city[1]
      data.county = city[2]
      data.address = this.address
      data.houseArea = this.areaSize
      data.expectQuota = this.wantIns
      data.expectInstalment = this.insNumberSelect[0]
      window.localStorage.setItem("apply-info",JSON.stringify(data))
      window.location.href = "./ins-apply-step3.html"
    },
    openIns(){
      document.activeElement.blur()
      this.showInsNumberPicker = true
    }
  }
}
</script>

<style>
body {
  background-color: #eee;
}
.btn-active{
  background-color: rgb(136,201,40)!important;
}
</style>
