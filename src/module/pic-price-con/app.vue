<style lang="less">
.topPic {
  width: 100%;
  position: relative;
  img{
    width: 100%;
  }
  .houseprice {
    padding: 10px ;
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;
    border-radius: 0 5px 5px 0;
    left: 0;
    bottom: 30px;
    color: #fff;
    font-size: 30px;
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
    text-align: center;
    &>div {
      margin: 15px auto;
      width: calc(~"100% - 30px");
      color: #666;
    }
    .space-wp {
      
      h3 {
        color: #333;
      }
      img {
        display: block;
        width: calc(~"100% - 40px");
        margin: 20px auto 10px auto;
      }
      div {
        font-size: 14px;
        color: #666;
        margin: 15px auto;
        width: calc(~"100% - 40px");
      }
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

<template>
    <div class="topPic">
      <img :src="tabList[0].img">
      <div class="houseprice">{{styleName}}</div>
    </div>
  <!--  <div class="methodShow">
      <p>方案展示</p>
    </div> -->
    <div class="contentWrapper">
      <div class="contentTab">
        <div>
          {{des}}
        </div>
        <div class="space-wp" v-for="space in tabList">
          <h3>{{space.name}}</h3>
          <img :src="space.img">
          <div>{{space.dis}}</div>
        </div>
       <!--  <li v-tap="tabIndex = $index"  :class="{select:tabIndex==$index}" track-by="$index">{{space.name}}</li> -->
      </div>
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

Lib.M.auth(axios)
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
      render:false,
      tabList: [],
      styleName: '',
      des: '',
		}
	},
  ready(){
    this.getDecStyleId(this.id)
  },
  methods:{
    getDecStyleId(id) {
      axios.get(`http://wx.jufenqi.com:8080/content/api/decoration-styles/${id}`).then((res) => {
        console.log(res.data.data)
        this.styleName = res.data.data.name
        this.des = res.data.data.description
        res.data.data.decorationComponents.map((e) => {
          this.tabList.push({
            name: e.name,
            dis: e.description,
            img: Lib.C.imgUrl + e.componentImg
          })
        })
      }).catch((err) => {
        console.log(err)
        throw err
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
