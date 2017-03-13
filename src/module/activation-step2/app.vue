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

</style>

<template>
<div class="upload-bac">
  <to-upload-photo title="房产证" value="点击拍摄|房产证" :tipshow="tipShow.house" v-tap="getInfo(1)"></to-upload-photo>
  <img class="upload-img" :src="houseInfo.local" v-if="hasImg(1)" v-tap="getInfo(1)">
</div>

<div class="upload-bac">
  <to-upload-photo title="工资流水证明" value="点击拍摄|工资流水证明" :tipshow="tipShow.money" v-tap="getInfo(2)"></to-upload-photo>
  <img class="upload-img" :src="moneyInfo.local" v-if="hasImg(2)" v-tap="getInfo(2)">
</div>

<x-button slot="right" :class="{'btn-active':isFilled()}" style="background-color:#e2e2e2;color:#fff;margin:20px 20px;width:calc( 100% - 40px )" v-tap="isFilled()?nextStep():return">提交</x-button>
<j-tel></j-tel>
</template>

<script>
import Lib from 'assets/Lib.js'
import ToUploadPhoto from 'components/j-to-upload-photo'
import XButton from 'vux-components/x-button'
import JTel from 'components/j-tel'
import axios from 'axios'
Lib.M.auth(axios)
export default {
  data() {
    return {
      houseInfo: {local:null,server:null},
      moneyInfo: {local:null,server:null},
      tipShow: {house: false, money: false}
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
            that.houseInfo.local = thisId
            that.tipShow.house = true
          }else{
            that.moneyInfo.local = thisId
            that.tipShow.money = true
          }

          wx.uploadImage({
            localId: thisId, // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function(res) {
              console.log(res)
              var serverId = res.serverId; // 返回图片的服务器端ID
              if(type == 1){
                that.houseInfo.server = serverId
              }else{
                that.moneyInfo.server = serverId
              }
            }
          })
        }
      })
    },
    hasImg(type) {
      if (type == 1) {
        return this.houseInfo.local != null
      } else {
        return this.moneyInfo.local != null
      }
    },
    isFilled(){
      return this.houseInfo.server!==null&&this.moneyInfo.server!==null
    },
    nextStep(){
      let data = JSON.parse(localStorage.getItem("apply-info"))
      data.premisesPermitImgsInsert = [this.houseInfo.server]
      data.salaryImgsInsert = [this.moneyInfo.server]
      localStorage.setItem("apply-info",JSON.stringify(data))
      location.href = "./activation-step3.html"
    }
  }
}

function wxReady(obj) {
  obj.debug = false
  obj.jsApiList = ["chooseImage", "previewImage", "uploadImage", "downloadImage"]
  wx.config(obj)
}
</script>