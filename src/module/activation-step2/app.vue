<template>
<to-upload-photo title="房产证" value="点击拍摄|房产证"></to-upload-photo>
<to-upload-photo style="margin-top:10px;" title="工资流水证明" value="点击拍摄|工资流水证明"></to-upload-photo>
<x-button slot="right" style="background-color:rgb(136,201,40);color:#fff;margin:20px 20px;width:calc( 100% - 40px )" onclick="location.href='./activation-step3.html'">提交</x-button>
<j-tel></j-tel>
</template>

<script>
import Lib from 'assets/Lib.js'
import ToUploadPhoto from 'components/JToUploadPhoto.vue'
import XButton from 'vux-components/x-button'
import JTel from 'components/JTel.vue'
export default {
  data() {
    return {

    }
  },
  components: {
    ToUploadPhoto,
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
