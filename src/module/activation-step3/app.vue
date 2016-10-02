<template>
<to-upload-photo title="身份证正面" value="点击拍摄身份证|正面"></to-upload-photo>
<to-upload-photo style="margin-top:10px;" title="身份证背面" value="点击拍摄身份证|背面"></to-upload-photo>
<to-upload-photo style="margin-top:10px;" title="上传手持身份证正面照" value="点击拍摄|手持|身份证正面照"></to-upload-photo>
<x-button slot="right" style="background-color:rgba(89,101,178,.5);color:#fff;margin:20px 20px;width:calc( 100% - 40px )" onclick="location.href='./instalment.html?refresh=true'">提交</x-button>
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
