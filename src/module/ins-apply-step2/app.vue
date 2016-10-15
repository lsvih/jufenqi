<template>
<div style="padding-bottom:60px;">
<j-apply-process :step="2">
</j-apply-process>
<group title="装修地址">
  <cell title="地址" :value="$refs.areapicker.getNameValues()" v-tap="showAreaPicker = true" style="height:30px" is-link></cell>
  <x-textarea :max="200" placeholder="请填写详细地址" :show-counter="false" :height="60" :rows="8" :cols="30"></x-textarea>
</group>
<group title="装修面积">
  <x-input title="装修面积(㎡)" type="number" placeholder="请输入装修面积"></x-input>
</group>
<group title="期望贷款信息">
  <x-input title="期望额度(元)" type="number" placeholder="请输入您期望的贷款额度"></x-input>
  <cell title="期望分期数" :value="insNumberSelect" v-tap="showInsNumberPicker = true" style="height:30px" is-link></cell>
</group>
<popup-picker title="分期数" :data="insNumberList" :show.sync="showInsNumberPicker" :value.sync="insNumberSelect" v-ref:insNumber :show-cell="false"></popup-picker>
<popup-picker title="地址" :data="areaList" :columns="3" :show.sync="showAreaPicker" :value.sync="areaSelect" v-ref:areapicker :show-cell="false"></popup-picker>
<x-button slot="right" style="background-color:rgb(136,201,40);color:#fff;margin:20px 20px;width:calc( 100% - 40px )" onclick="location.href='./ins-apply-step3.html'">下一步</x-button>
<j-tel></j-tel>
</div>
</template>

<script>
import Lib from 'assets/Lib.js'
import JApplyProcess from 'components/JApplyProcess.vue'
import XInput from 'vux-components/x-input/'
import Group from 'vux-components/group/'
import Cell from 'vux-components/cell/'
import XButton from 'vux-components/x-button'
import PopupPicker from 'vux-components/popup-picker'
import XTextarea from 'vux-components/x-textarea'
import JTel from 'components/JTel.vue'
export default {
  data() {
    return {
      areaList: [{
        name: '中国',
        value: 'china',
        parent: 0
      }, {
        name: '美国',
        value: 'USA',
        parent: 0
      }, {
        name: '广东',
        value: 'china001',
        parent: 'china'
      }, {
        name: '广西',
        value: 'china002',
        parent: 'china'
      }, {
        name: '美国001',
        value: 'usa001',
        parent: 'USA'
      }, {
        name: '美国002',
        value: 'usa002',
        parent: 'USA'
      }, {
        name: '广州',
        value: 'gz',
        parent: 'china001'
      }, {
        name: '深圳',
        value: 'sz',
        parent: 'china001'
      }, {
        name: '广西001',
        value: 'gx001',
        parent: 'china002'
      }, {
        name: '广西002',
        value: 'gx002',
        parent: 'china002'
      }, {
        name: '美国001_001',
        value: '0003',
        parent: 'usa001'
      }, {
        name: '美国001_002',
        value: '0004',
        parent: 'usa001'
      }, {
        name: '美国002_001',
        value: '0005',
        parent: 'usa002'
      }, {
        name: '美国002_002',
        value: '0006',
        parent: 'usa002'
      }],
      areaSelect: [],
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
  ready() {


  },
  methods: {



  }
}
</script>

<style>
body {
  background-color: #eee;
}
</style>
