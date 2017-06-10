<style>
body {
  background-color: #eee;
}
.btn-active{
  background-color: #ff9736!important;
}

.upload-bac{
  width: 100%;
  height: 225px;
  margin-bottom: 10px;
  position: relative;
}
.upload-img{
  position: absolute;
  top: 56px;
  height: 157px;
  left: 17px;
  width: calc(100% - 34px);
  z-index: 1;
}
</style>

<template>
  <div class="upload-bac">
  <to-upload-photo title="身份证正面" value="点击拍摄身份证|正面" :tipshow="tipShow.cardF" v-tap="getInfo(1)"></to-upload-photo>
    <img class="upload-img" :src="cardF.local" v-if="cardF.local != null">
  </div>
  <div class="upload-bac">
    <to-upload-photo style="margin-top:10px;" title="身份证背面" :tipshow="tipShow.cardB" value="点击拍摄身份证|背面" v-tap="getInfo(2)"></to-upload-photo>
    <img class="upload-img" :src="cardB.local" v-if="cardB.local != null">
  </div>
  <div class="upload-bac">
    <to-upload-photo style="margin-top:10px;" title="上传手持身份证正面照" :tipshow="tipShow.cardP" value="点击拍摄|手持|身份证正面照" v-tap="getInfo(3)"></to-upload-photo>
    <img class="upload-img" :src="cardP.local" v-if="cardP.local != null">
  </div>
<x-button slot="right" :class="{'btn-active':isFilled()}" style="background-color:#e2e2e2;color:#fff;margin:20px 20px;width:calc( 100% - 40px )" v-tap="isFilled()?nextStep():return">提交</x-button>
<loading :show="showLoading" text="正努力加载.."></loading>
<j-tel style="padding-bottom:40px;"></j-tel>
</template>

<script>
import Lib from 'assets/Lib.js'
import ToUploadPhoto from 'components/j-to-upload-photo'
import XButton from 'vux-components/x-button'
import Loading from 'vux-components/loading'
import JTel from 'components/j-tel'
import axios from 'axios'
Lib.M.auth(axios)
export default {
  data() {
    return {
      cardF:{local:null,server:null},
      cardB:{local:null,server:null},
      cardP:{local:null,server:null},
      showLoading: false,
      tipShow: {
        cardF: false,
        cardB: false,
        cardP: false
      }
    }
  },
  components: {
    ToUploadPhoto,
    XButton,
    JTel,
    Loading
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
          success(res) {
            let thisId = res.localIds[0]
            if(type == 1){
              that.cardF.local = thisId
              that.tipShow.cardF = true
            }
            if(type == 2){
              that.cardB.local = thisId
              that.tipShow.cardB = true
            }
            if(type == 3){
              that.cardP.local = thisId
              that.tipShow.cardP = true
            }
            wx.uploadImage({
              localId: thisId, // 需要上传的图片的本地ID，由chooseImage接口获得
              isShowProgressTips: 1, // 默认为1，显示进度提示
              success(res) {
                const serverId = res.serverId; // 返回图片的服务器端ID
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
        this.showLoading = true
        let data = JSON.parse(localStorage.getItem("apply-info"))
        data.idCardFrontImgInsert = [this.cardF.server]
        data.idCardBackImgInsert = [this.cardB.server]
        data.idCardHandImgInsert = [this.cardP.server]
        axios.put(`${Lib.C.loanApi}user-activate`,data).then((res)=>{
          alert("激活信息填写成功，请等待工作人员联系!")
          location.href = './instalment.html'
          this.showLoading = false
        }).catch((res)=>{
          alert("网络连接失败，请重试")
          this.showLoading = false
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
