<template>
<group>
     <x-textarea :max="200" placeholder="请输入您的反馈" :height="200" :rows="8" :cols="30" style="font-size:12px;"></x-textarea>
</group>
<x-button slot="right" style="background-color:rgb(136,201,40);color:#fff;margin:20px 20px;width:calc( 100% - 40px )" v-tap="submit">提交</x-button>
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
    submit(){
      alert("您的反馈已提交，感谢您的支持！")
      //收不收得到不关我的事
      window.history.go(-1)
    }
  }
}
</script>

<style>
body{
  background-color: #eee;
}
</style>
