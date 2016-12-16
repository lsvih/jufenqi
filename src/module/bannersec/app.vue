<template>
  <div class="content">
    <img :src="picTwo">
    <div class="btn" v-tap="goto('http://wx.jufenqi.com/module/index.html')">
      <img src="./btn-1.png">
      <div class="btn-text">去分期</div>
    </div>
  </div>
  
</template>

<script>
import Lib from 'assets/Lib.js'
import PopupPicker from 'vux-components/popup-picker'
import Loading from 'vux-components/loading'
import axios from 'axios'
import picTwo from './bannertwo.png'
try {
  let now = Number(new Date().getTime())
  if (Number(JSON.parse(localStorage.user).expiredAt) < now||!JSON.parse(localStorage.user).profile.mobile) {
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
      cateId: Lib.M.GetRequest().id,
      brandList: [],
      img: Lib.C.imgUrl,
      categories: [],
      selectedCate: [],
      showSelect: false,
      showLoading: false,
      picTwo
        //brandList:[{id,name,img,description}]
    }
  },
  components: {
    PopupPicker,
    Loading
  },
  ready() {
    // this.getData(this.cateId)
    // let that = this
    // axios.get(`${Lib.C.merApi}categories`).then((res) => {
    //   res.data.data.map((e) => {
    //     that.categories.push({
    //       name: e.name,
    //       value: String(e.id),
    //       parent: e.parent === null ? 0 : String(e.parent.id)
    //     })
    //   })
    // }).catch((err) => {
    //   throw err //error
    // })
  },
  methods: {
    goto(url) {
      window.location.href = url
    }
  }
}
</script>

<style lang="less">
.content {
  width: 100%;
  position: relative;
  img {
    width: 100%;
  }
  .btn {
    text-align: center;
    position: absolute;
    bottom: 10px;
    left: 75px;
    margin: auto;
    width: calc(~"100% - 150px");
    height: 44px;
    margin: 10px auto;
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      z-index: 0;
    }
    .btn-text {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 30%;
      z-index: 1;
      font-size: 18px;
      color: #fff;
    }
  }
}
// .btn {
//   text-align: center;
//   position: absolute;
//   bottom: 10px;
//   margin: auto;
//   width: calc(~"100% - 150px");
//   height: 44px;
//   margin: 10px auto;
//   img {
//     position: absolute;
//     width: 100%;
//     height: 100%;
//     left: 0;
//     top: 0;
//     z-index: 0;
//   }
//   .btn-text {
//     position: absolute;
//     width: 100%;
//     height: 100%;
//     left: 0;
//     top: 30%;
//     z-index: 1;
//     font-size: 18px;
//     color: #fff;
//   }
// }
</style>
