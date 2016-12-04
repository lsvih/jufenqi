<template>
<to-upload-photo title="身份证正面" value="点击拍摄身份证|正面" v-tap="getInfo(1)" v-if="cardF.local == null"></to-upload-photo>
<img style="height:225px;width:calc(100% - 30px);margin-left:15px;" :src="cardF.local" v-if="cardF.local != null">
<to-upload-photo style="margin-top:10px;" title="身份证背面" value="点击拍摄身份证|背面" v-tap="getInfo(2)" v-if="cardB.local == null"></to-upload-photo>
<img style="height:225px;width:calc(100% - 30px);margin-left:15px;" :src="cardB.local" v-if="cardB.local != null">
<to-upload-photo style="margin-top:10px;" title="上传手持身份证正面照" value="点击拍摄|手持|身份证正面照" v-tap="getInfo(3)" v-if="cardP.local == null"></to-upload-photo>
<img style="height:225px;width:calc(100% - 30px);margin-left:15px;" :src="cardP.local" v-if="cardP.local != null">

<x-button slot="right" :class="{'btn-active':isFilled()}" style="background-color:#e2e2e2;color:#fff;margin:20px 20px;width:calc( 100% - 40px )" v-tap="isFilled()?nextStep():return">提交</x-button>
<j-tel style="padding-bottom:40px;"></j-tel>
</template>

<script>
import Lib from 'assets/Lib.js'
import ToUploadPhoto from 'components/j-to-upload-photo'
import XButton from 'vux-components/x-button'
import JTel from 'components/j-tel'
import axios from 'axios'
try {
  let now = Number(new Date().getTime())
  if (Number(JSON.parse(localStorage.user).expiredAt) < now) {
    localStorage.removeItem('user')
    location.href = './wxAuth.html?url=' + encodeURIComponent(location.href)
  }
  axios.defaults.headers.common['Authorization'] = JSON.parse(localStorage.getItem("user")).tokenType + ' ' + JSON.parse(localStorage.getItem("user")).token
} catch (e) {
  localStorage.clear()
  window.location.href = `./wxAuth.html?url=index.html`
}
export default {
  data() {
    return {
      cardF:{local:null,server:null},
      cardB:{local:null,server:null},
      cardP:{local:null,server:null}
    }
  },
  components: {
    ToUploadPhoto,
    XButton,
    JTel
  },
  ready() {
    axios.post(`${Lib.C.wxApi}mp/jsapiTicket`, {url:location.href}).then((res) => {
      wxReady(res.data.data)
    }).catch((res) => {
      alert("网络连接失败，请刷新重试")
      console.log(res.data.data)
    })
  },
  methods: {
      getInfo(type) {
        let that = this
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'],
          sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function(res) {
            let thisId = res.localIds[0]
            if(type == 1){
              that.cardF.local = thisId
            }
            if(type == 2){
              that.cardB.local = thisId
            }
            if(type == 3){
              that.cardP.local = thisId
            }
            wx.uploadImage({
              localId: thisId, // 需要上传的图片的本地ID，由chooseImage接口获得
              isShowProgressTips: 1, // 默认为1，显示进度提示
              success: function(res) {
                var serverId = res.serverId; // 返回图片的服务器端ID
                if(type == 1){
                  that.cardF.server = serverId
                }
                if(type == 2){
                  that.cardB.server = serverId
                }
                if(type == 3){
                  that.cardP.server = serverId
                }
              }
            })
          }
        })
      },
      isFilled(){
        return this.cardF.server!==null&&this.cardB.server!==null&&this.cardP.server!==null
      },
      nextStep(){
        let data = JSON.parse(localStorage.getItem("apply-info"))
        data.idCardFrontImgInsert = ["http://"+this.cardF.server]
        data.idCardBackImgInsert = ["http://"+this.cardB.server]
        data.idCardHandImgInsert = ["http://"+this.cardP.server]
        axios.put(`${Lib.C.loanApi}user-activate`,data).then((res)=>{
          alert("激活信息填写成功，请等待工作人员联系!")
          console.log(res)
          location.href = './instalment.html'
        }).catch((res)=>{
          alert("网络连接失败，请重试")
        })
      }
  }
}


function wxReady(obj) {
  obj.debug = false
  obj.jsApiList = ["chooseImage", "previewImage", "uploadImage", "downloadImage"]
  wx.config(obj)
}
</script>

<style>
body{
  background-color: #eee;
}
.btn-active{
  background-color: rgb(136,201,40)!important;
}
</style>
