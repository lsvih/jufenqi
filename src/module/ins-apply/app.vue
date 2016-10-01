<template>
<j-apply-process :step="1">
</j-apply-process>

<group title="身份信息">
  <x-input title="姓名" name="username" placeholder="请输入姓名" is-type="china-name"></x-input>
  <x-input title="身份证" type="text" placeholder="" :value.sync="password" :min="6" :max="6" @on-change="change"></x-input>
  <x-input title="手机号码" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"></x-input>
  <x-input title="发送验证码" class="weui_vcode">
    <x-button slot="right" type="primary">获取验证码</x-button>
  </x-input>
  <x-input title="验证码"></x-input>
</group>
</template>

<script>
import Lib from 'assets/Lib.js'
import JApplyProcess from 'components/JApplyProcess.vue'
import XInput from 'vux-components/x-input/'
import Group from 'vux-components/group/'
import Cell from 'vux-components/cell/'
import XButton from 'vux-components/x-button'

export default {
  data() {
    return {

    }
  },
  components: {
    JApplyProcess,
    XInput,
    Group,
    Cell,
    XButton
  },
  ready() {


  },
  methods: {



  }
}
</script>

<style>
body{
  background-color: #eee;
}
</style>
