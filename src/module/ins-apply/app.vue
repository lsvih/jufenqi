<template>
<j-apply-process :step="1">
</j-apply-process>

<group title="身份信息">
  <x-input title="姓名" name="username" placeholder="请输入您的真实姓名" is-type="china-name"></x-input>
  <x-input title="身份证" type="number" placeholder="请输入正确的身份证号码"></x-input>
  <x-input title="手机号码" class="weui_vcode" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile">
    <x-button slot="right" mini plain style="color:rgb(89,101,178);border:none;">获取验证码</x-button>
  </x-input>

  <x-input title="验证码" placeholder="请输入您收到的验证码"></x-input>
</group>
<x-button slot="right" style="background-color:rgba(89,101,178,.5);color:#fff;margin:20px 20px;width:calc( 100% - 40px )" onclick="location.href='./ins-apply-step2.html'">下一步</x-button>
<j-tel></j-tel>
</template>

<script>
import Lib from 'assets/Lib.js'
import JApplyProcess from 'components/JApplyProcess.vue'
import XInput from 'vux-components/x-input/'
import Group from 'vux-components/group/'
import Cell from 'vux-components/cell/'
import XButton from 'vux-components/x-button'
import JTel from 'components/JTel.vue'
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
    XButton,
    JTel
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
