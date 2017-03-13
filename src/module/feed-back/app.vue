<template>
<group>
     <x-textarea :sync.value="content" :max="200" placeholder="请输入您的反馈" :height="200" :rows="8" :cols="30" style="font-size:12px;"></x-textarea>
</group>
<x-button slot="right" style="background-color:#ff9736;color:#fff;margin:20px 20px;width:calc( 100% - 40px )" v-tap="submit">提交</x-button>
</template>

<script>
import Lib from 'assets/Lib.js'
import XTextarea from 'vux-components/x-textarea'
import Group from 'vux-components/group'
import XButton from 'vux-components/x-button'
import axios from 'axios'
Lib.M.auth(axios)
export default {
  data() {
    return {
      content:""
    }
  },
  components: {
    XTextarea,
    Group,
    XButton,
  },
  methods: {
    submit(){
      if(this.content.length === 0){
        alert("请输入反馈内容")
      }else{
        axios.post(`${Lib.C.userApi}feedbacks`, {
          userId: JSON.parse(localStorage.user).userId,
          feedback: this.content
        }).then((res) => {
          alert("您的反馈已提交，感谢您的支持！")
          location.href = './usercenter.html'
        }).catch((err) => {
          alert("网络连接中断，请稍候再试")
          throw err
        })
      }
    }
  }
}
</script>

<style>
body{
  background-color: #eee;
}
</style>
