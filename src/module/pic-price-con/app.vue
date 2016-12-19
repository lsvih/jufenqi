<template>
    <div class="topPic">
      <img :src="imgUrl+schemes.showImg">
    </div>
  <!--  <div class="methodShow">
      <p>方案展示</p>
    </div> -->
    <div class="contentWrapper">
      <div class="contentTab">
        <li v-tap="tabIndex = $index" v-for="space in schemes.spaces" :class="{select:tabIndex==$index}">{{space.type.name}}</li>
      </div>
      <div class="content" v-html="schemes.spaces[tabIndex].descriptionRich">
        <!-- <div class="image-item">
          <img src="http://placehold.it/550x340" alt="">
            <p><span></span>问问嫩问问你问问嫩我呢问你呢我你嫩我嫩我嫩我嫩我嫩我嫩嫩我嫩我</p>
        </div>
        <div class="image-item">
          <img src="http://placehold.it/550x340" alt="">
            <p><span></span>问问嫩问问你问问嫩我呢问你呢我你嫩我嫩我嫩我嫩我嫩我嫩嫩我嫩我</p>
        </div>
        <div class="image-item">
          <img src="http://placehold.it/550x340" alt="">
            <p><span></span>问问嫩问问你问问嫩我呢问你呢我你嫩我嫩我嫩我嫩我嫩我嫩嫩我嫩我</p>
        </div>
      </div> -->
    </div>
    <div class="itemList" :style="{height:schemes.spaces[tabIndex].products.length > 4?'188px':'128px'}">
      <div class="item-name-before"></div><div class="item-name">空间包含物品</div>
      <div class="item-wrapper">
        <div class="item" v-for="product in schemes.spaces[tabIndex].products">
          <div class="item-icon"><img :src="imgUrl+product.coverImg"></div>
          <div class="item-con">{{product.name}}</div>
        </div>
      </div>

    </div>
    <div class="form">
    <div class="item-name-before"></div><div class="item-name">预约咨询</div>
    <img src="./name.jpg" class="name">
    <img src="./phone.jpg" class="phone">
      <input type="text" v-model="name" placeholder="请输入您的姓名">
      <input type="number" v-model="phone" placeholder="请输入您的手机号码">
      <div class="btn" v-tap="isFinished()?submit():return"><div class="btn-text">提交</div><img v-if='isFinished()' :src="btnImgA"><img v-else :src="btnImg"></div>
    </div>
</template>

<script>
import Lib from 'assets/Lib.js'
import JFooter from 'components/j-footer'
import {
  Flexbox,
  FlexboxItem
} from 'vux-components/flexbox'
import Loading from 'vux-components/loading'
import Scroller from 'vux-components/scroller'
import axios from 'axios'
import Swiper from 'vux-components/swiper'
import btnImg from './btn.jpg'
import btnImgA from './btn-active.jpg'
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
	name: 'app',
	components: {
		Swiper,
    JFooter,
    Flexbox,
    FlexboxItem
	},
	data() {
		return {
      id:Lib.M.GetRequest().id,
      imgUrl:Lib.C.imgUrl,
      tabIndex: 0,
      schemes:{},
      name:'',
      phone:'',
      btnImg,
      btnImgA
		}
	},
  ready(){
    axios.get(`${Lib.C.picpApi}schemes/${this.id}?expand=spaces`).then((res) => {
      this.schemes = res.data.data
      let spaceIdArr = []
      res.data.data.spaces.forEach((space)=>{
        spaceIdArr.push(space.id)
      })
      axios.get(`${Lib.C.picpApi}/spaces?expand=products&filter=id:${spaceIdArr.join(',')}`).then((res) => {
          res.data.data.map((a)=>{
              this.schemes.spaces[findIdIndex(a.id,this.schemes.spaces)].products = a.products
          })
    }).catch((err) => {
      throw err //error
    })
    }).catch((err) => {
      throw err //error
    })
  },
  methods:{
    isFinished(){
       let reg = /^1[3|4|5|7|8]\d{9}$/
      return this.name&&reg.test(this.phone)
    },
    submit(){
      if(!this.name){
        alert("请输入您的称呼")
        return
      }
      let reg = /^1[3|4|5|7|8]\d{9}$/
      if(!reg.test(this.phone)){
        alert("请输入正确的手机号码")
        return
      }
      axios.post(`${Lib.C.homeApi}form-infos`,{
        formName:this.id,
        fullname:this.name,
        mobile:this.phone
      }).then((res) => {
          alert('您的信息已提交，我们会在24小时之内处理您的提交请求')
    }).catch((err) => {
      throw err //error
    })
    }
  }
}


function findIdIndex(id,array){
  for(let i =0;i<array.length;i++){
    if(array[i].id == id) return i
  }
  return -1
}
</script>
<style lang="less">
.topPic {
  width: 100%;
  img{
    width: 100%;
  }
}
.methodShow {
  height: 30px;
  background-color: #fff;
  padding: 10px 5px;
  p {
    margin: 0;
    text-align: left;
    font-size: 22px;
  }
}
.contentWrapper {
  padding-bottom: 50px;
  .contentTab {
    height: auto;
    display: flex;
    li {
      flex: 1;
      list-style: none;
      text-align: center;
      background-color: rgb(240, 239, 239);
      padding: 15px 0;
    }
    .select {
      background-color: rgb(152, 212, 72);
      color:#fff!important;
    }
  }
  .content {
    padding: 0 15px;
    // 富文本样式
    img{
      width: 100%;
    }
    overflow: hidden;
    .image-item {
      width: 100%;
      padding-bottom: 25px;
      span {
        position: absolute;
        left: 0;
        top: 0;
        background-color: green;
        display: block;
        width: 2px;
        height: 12px;
      }
      p {
        margin: 0;
        padding: 0 0 0 10px;
        text-align: left;
        position: relative;
        font-size: 12px;
      }

      img {
        width: 100%;
      }

    }
  }
}
.itemList {
  // height: 128px;
  padding: 0 15px;
  position: relative;
  p {
    text-align: left;
  }
  .item-name{
          position: absolute;
          left: 46px;
      }
      .item-name-before{
          position: absolute;
          left:15px;
          top:-5px;
          height: 25px;
          width: 25px;
          border-radius: 25px;
          background-image: url('./goodsicon.png');
          background-size: contain;
        }
  .item-wrapper {
    position: absolute;
    left:0px;
    padding-top: 25px;
    font-size: 0;
    .item{
      display: inline-block;
      margin:5px 12.5px 2px 12.5px;
    }
    .item-icon {

      width: 50px;
      height: 50px;
      background-color: #666;
      border-radius: 50%;
      img{
        width: 100%;
        height: 100%;
        border-radius:50%;
      }
    }
    .item-con {
      width: 50px;
      text-align: center;
      font-size: 13px;
      color: #666;
      margin-top: 5px;
    }
  }
}

.form {
  border-top: 20px solid #eee;
  padding: 85px 50px;
  position: relative;
  .item-name{
          position: absolute;
          left: 46px;
          top:18px;
      }
      .item-name-before{
          position: absolute;
          left:15px;
          top:13px;
          height: 25px;
          width: 25px;
          border-radius: 25px;
          background-image: url('./icon2.png');
          background-size: contain;
      }
  input {
    display: block;
    width: calc(~"100% - 34px");
    height: 28px;
    border-style: solid;
    border-color: #eceff1;
    border-width: 0 0 1px 0;
    padding: 2px;
    font-size: 15px;
    margin-bottom: 20px;
    padding: 0 0 0 34px;
    -webkit-appearance: none;
  }
  input::placeholder{
    font-size: 15px;
    color: #b5b5b8;
  }
  .name{
    position: absolute;
    height: 20px;
    width: 20px;
    top:90px;
    left:50px;
  }
  .phone{
    position: absolute;
    height:20px;
    width: 20px;
    top:140px;
    left:50px;
  }
  .btn {
    width: calc(~"100% - 100px");
    height: 44px;
    background-color: #f9850e;
    font-size: 20px;
    border: none;
    line-height: 44px;
    text-align: center;
    position: absolute;
    img{
      position: absolute;
      top:0;
      left:0;
      z-index: 0;
      height: 100%;
      width: 100%;
    }
    .btn-text{
      position: absolute;
      top:0;
      left:0;
      height: 44px;
      width: 100%;
      color:#fff;
      text-align: center;
      line-height: 44px;
      z-index: 1;
    }
  }
}
</style>
