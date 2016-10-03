<template>
<j-apply-process :step="3">
</j-apply-process>

<group>
     <x-textarea :max="200" placeholder="请输入您的反馈" :height="200" :rows="8" :cols="30" style="font-size:12px;"></x-textarea>
</group>
<x-button slot="right" style="background-color:rgba(89,101,178,.5);color:#fff;margin:20px 20px;width:calc( 100% - 40px )">提交</x-button>
</template>

<script>
import Lib from 'assets/Lib.js'
import XTextarea from 'vux-components/x-textarea'
import Group from 'vux-components/group'
import XButton from 'vux-components/x-button'
export default {
  data() {
    return {
      selected:1
    }
  },
  components: {
    XTextarea,
    Group,
    XButton,
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
