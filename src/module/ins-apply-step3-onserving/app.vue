<template>
<j-apply-process :step="3">
</j-apply-process>

<group title="请输入详细信息">
<x-input title="公司名称" type="text" placeholder="请输入真实的公司名称"></x-input>
<x-input title="职&nbsp;&nbsp;位" type="text" placeholder="请填写真实职位"></x-input>
<x-input title="月薪收入" type="Number" placeholder="请填写实际收入"></x-input>
</group>
<x-button slot="right" style="background-color:rgb(136,201,40);color:#fff;margin:20px 20px;width:calc( 100% - 40px )" onclick="location.href='./ins-apply-success.html?wait=true'">提交</x-button>
<j-tel style="margin-top:30px"></j-tel>
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
      selected:1
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
