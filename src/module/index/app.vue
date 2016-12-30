<template>
<div class="search-click-area" v-tap="goto('./search.html')">
</div>
<div class="search"><img src="/static/images/icon/search.png"></div>
<div class="click" :class="{open:openMenu}"><img src="/static/images/icon/click.png"></div>
<div class="menu-click-area" v-tap="openMenu = !openMenu"></div>
<div class="menu" :class="{'menu-active':openMenu}">
  <div class="menu-tri"></div>
  <div class="menu-content">
    <div class="menu-item"><img src="/static/images/icon/写评论.png">去点评</div>
    <div class="menu-item"><img src="/static/images/icon/添加门店.png">添加门店</div>
    <div class="menu-item"><img src="/static/images/icon/扫一扫.png">扫一扫</div>
  </div>
</div>
<div class="content">
 <swiper class="module-swiper" loop auto height="200px" dots-class="dot-custom" :list="bannerList" :index="bannerIndex"  @on-index-change="bannerOnChange" v-tap="clickBanner" :show-desc-mask="true" dots-position="center" :interval="5000">
  </swiper>
  <flexbox class="module-class">
    <flexbox-item class="module-class-item" v-for="class in classList|limitBy 5" v-tap="goto(class.url)">
      <img class="module-class-icon" :src="class.img">
      <!-- `/static/images/icon/${class.name}.png` -->
      <div class="module-class-name">{{class.name}}</div>
    </flexbox-item>
  </flexbox>
  <flexbox class="module-class">
    <flexbox-item class="module-class-item" v-for="class in classList|limitBy 5 5" v-tap="goto(class.url)">
      <img class="module-class-icon" :src="class.img">
      <div class="module-class-name">{{class.name}}</div>
    </flexbox-item>
  </flexbox>
  <!-- Service module -->
  <!-- 服务 -->
<!--   <div class="module-item">
    <div class="module-title-block"></div>
    <div class="module-title">服务</div>
    <div class="service">
      <div class="service-1"><img :src="serviceList[0].img" v-tap="goto(serviceList[0].url)"></div>
      <div class="service-2"><img :src="serviceList[1].img" v-tap="goto(serviceList[1].url)"></div>
      <div class="service-3"><img :src="serviceList[2].img" v-tap="goto(serviceList[2].url)"></div>
    </div>

 --><div class="longpic" v-tap="goto('./bannerfirst.html')">
      <img src="./long.png">
    </div>
 </div>
  <!-- module end -->
  <!-- Video module -->
  <div class="module-item">
    <div class="videoWrapper">
      <video controls="controls" preload="none" width="100%" height="200" src="http://ohej1hvbm.bkt.clouddn.com/movie.mp4" allowfullscreen></video>
    </div>
  </div>
  <!-- module end -->
  <!-- Operative module -->
  <!-- <div class="module-item operative" :style="{height:.5*getScreenWidth()+'px'}">
    <div class="operative-left-block" :style="{width:.5*getScreenWidth()-1+'px',height:.5*getScreenWidth()+'px'}">
      <img src="/static/images/首页活动运营/活动1.png" width="100%" height="100%">
    </div>
    <div class="operative-right-block-1" :style="{width:.5*getScreenWidth()+'px',height:.5/3*getScreenWidth()-1+'px'}">
      <img src="/static/images/首页活动运营/活动2.png" width="100%" height="100%">
    </div>
    <div class="operative-right-block-2" :style="{width:.5*getScreenWidth()+'px',height:.5/3*getScreenWidth()-1+'px',top:.5/3*getScreenWidth()+'px'}">
      <img src="/static/images/首页活动运营/活动3.png" width="100%" height="100%">
    </div>
    <div class="operative-right-block-3" :style="{width:.5*getScreenWidth()+'px',height:.5/3*getScreenWidth()+'px'}">
      <img src="/static/images/首页活动运营/活动4.png" width="100%" height="100%">
    </div>
  </div> -->
  <!-- module end -->

  <!-- Goods module -->
  <div class="module-item">
    <div class="module-title-block"></div>
    <div class="module-title" v-tap="goto('./pic-price.html')">有图有价<img src="./arrow.png"></div>
    <div class="scroll-box-container" :style="{width:'100%',height:.8*getScreenWidth()*.63+'px'}">
      <div :style="{width:'100%',height:.8*getScreenWidth()*.63+40+'px'}" class="scroll-box">
        <div class="pic_and_goods-list" :style="{width:pic_and_goods.length*(.8*getScreenWidth()+10)+'px',height:.8*getScreenWidth()*.63+'px'}">
          <div class="pic_and_goods-item" v-for="good in pic_and_goods" :style="{width: getScreenWidth()*.8 + 'px',height:.8*getScreenWidth()*.63+'px'}">
            <img :src="good.img" v-tap="goto(good.url)">
          </div>
        </div>
      </div>
    </div>
    <div class="module-more">
      <div class="module-description">看的到的都能买</div>
      <div class="module-detail" v-tap="goto('./pic-price.html')">了解详情</div>
    </div>
  </div>
  <!-- module end -->

  <!-- Special module -->
  <div class="module-item" style="margin-bottom: 51px">
    <div class="module-title-block"></div>
    <div class="module-title">专题推荐<img src="./arrow.png"></div>
    <div class="special">
      <div class="special-item" v-for="special of specialList" v-tap="goto(special.url)">
        <img :src="special.img">
        <div class="special-name">
          {{special.name}}
        </div>
        <div class="special-description">
          {{special.description}}
        </div>
      </div>
    </div>
  </div>
  <!-- module end -->
</div>
<j-footer></j-footer>
</template>

<script>
import Lib from 'assets/Lib.js'
import Swiper from 'vux-components/swiper'
import JFooter from 'components/j-footer'
import XImg from 'vux-components/x-img'
import {
  Flexbox,
  FlexboxItem
} from 'vux-components/flexbox'
import axios from 'axios'
Lib.M.auth(axios, false)

export default {
  data() {
    return {
      bannerIndex: 0,
      bannerList: [{
        url: './bannerfirst.html',
        img: '/static/images/banner/banner-1.png'
      }, {
        url: './bannersec.html',
        img: '/static/images/banner/banner-2.png'
      }, {
        url: './class-list.html',
        img: '/static/images/banner/banner-3.jpg'
      }],
      classList: [{
        id: 0,
        name: '办分期',
        url: 'instalment.html',
        img: '/static/images/icon/办分期.png'
      }, {
        id: 1,
        name: '有图有价',
        url: 'pic-price.html',
        img: '/static/images/icon/有图有价.png'
      }, {
        id: 2,
        name: '装修必读',
        url: 'readme.html',
        img: '/static/images/icon/装修必读.png'
      }, {
        id: 3,
        name: '博洛尼家装',
        url: 'brand-detail.html?id=186',
        img: '/static/images/icon/博洛尼.png'
      }, {
        id: 4,
        name: '找装修',
        url: 'worker-list.html',
        img: '/static/images/icon/找装修.png'
      }, {
        id: 5,
        name: '建材',
        url: './class-list.html#type0',
        img: '/static/images/icon/建材.png'
      }, {
        id: 6,
        name: '家具',
        url: './class-list.html#type3',
        img: '/static/images/icon/家具.png'
      }, {
        id: 7,
        name: '家纺',
        url: './class-list.html#type2',
        img: '/static/images/icon/家纺.png'
      }, {
        id: 8,
        name: '家电',
        url: './class-list.html#type1',
        img: '/static/images/icon/家电.png'
      }, {
        id: 9,
        name: '全部分类',
        url: './all-class.html',
        img: '/static/images/icon/全部分类.png'
      }],
      pic_and_goods: [{
        url: './pic-price-con.html?id=12',
        img: '/static/temp/pic_and_price/罗马假日.jpg'
      }, {
        url: './pic-price-con.html?id=21',
        img: '/static/temp/pic_and_price/桃花源.jpg'
      }, {
        url: './pic-price-con.html?id=14',
        img: '/static/temp/pic_and_price/天使爱美丽.jpg'
      },{
        url: './pic-price-con.html?id=6',
        img: '/static/temp/pic_and_price/现代北欧之柯达.jpg'
      },{
        url: './pic-price-con.html?id=20',
        img: '/static/temp/pic_and_price/永恒.jpg'
      }],
      specialList: [{
        url: 'javascript:',
        img: '/static/images/specials/专题一.png',
        name: '极简风家具专题',
        description: '精选极简风家具'
      }, {
        url: 'javascript:',
        img: '/static/images/specials/专题二.png',
        name: '新中式生活',
        description: '传统风格全新演绎'
      }],
      serviceList: [{
        url: './free-design.html',
        img: '/static/images/services/免费设计.png'
      }, {
        url: './free-gauge.html',
        img: '/static/images/services/免费量房.png'
      }, {
        url: './free-verify.html',
        img: '/static/images/services/免费验房.png'
      }],
      openMenu: false
    }
  },
  components: {
    JFooter,
    Swiper,
    Flexbox,
    FlexboxItem,
    XImg,
  },
  methods: {
    bannerOnChange(index) {
      this.bannerIndex = index
    },
    clickBanner(item){
      location.href = this.bannerList[this.bannerIndex].url
    },
    getScreenWidth() {
      return document.body.clientWidth
    },
    gotoBrand(id, name) {
      window.location.href = `brand-list.html?id=${id}&name=${encodeURIComponent(name)}`
    },
    goto(url) {
      window.location.href = url
    }
  }
}
</script>
<style>
body {
  background-color: #eee;
  overflow-x: hidden;
}

.dot-custom .vux-icon-dot {
  opacity: .7;
}

.dot-custom .vux-icon-dot.active {
  background-color: #88C929!important;
  opacity: 1;
}

.content {
  /* padding: 0 0 44px 0; */
  overflow-x: hidden;
}
.content .longpic {
  width: 100%;
}
.content .longpic img {
  width: 100%;
  height: auto;
}
</style>
<style lang="less" scoped>
.module-class {
    background-color: #fff;
    padding: 8px 0;
    .module-class-item {
        text-align: center;
        .module-class-icon {
            height: 40px;
            width: 40px;
        }
        .module-class-name {
            margin-top: 3px;
            width: 100%;
            text-align: center;
            font-size: 12px;
        }
    }
}
.module-item {
    width: 100%;
    height: auto;
    position: relative;
    background: #fff;
    margin-top: 10px;
    .videoWrapper {
        width: 100%;
        height: 200px;
        background: url('/static/images/mask.jpg') no-repeat;
        background-size: 100% auto;
        opacity: 0.5;
        margin-bottom: 13px;
    }
    .module-title-block {
        position: absolute;
        left: 15px;
        top: 14px;
        height: 20px;
        width: 3px;
        background-color: #3BA794;
    }
    .module-title {
        color: #393939;
        font-size: 16px;
        height: 30px;
        width: 95%;
        text-align: 15px;
        text-indent: 15px;
        line-height: 1;
        margin-left: 15px;
        padding-top: 15px;
        img {
            height: 12px;
            width: 7px;
            vertical-align: middle;
            margin-left: 5px;
        }
    }

    .module-more {
        width: 100%;
        height: 44px;
        line-height: 44px;
        font-size: 16px;
        color: #999;
        text-align: center;
        .module-description {
            font-size: 12px;
            color: #999;
            float: left;
            margin-left: 15px;
        }
        .module-detail {
            color: #3BA794;
            font-size: 12px;
            float: right;
            margin-right: 15px;
        }
    }
}
.operative {
    .operative-left-block {
        position: absolute;
        top: 0;
        left: 0;
        border-right: 1px solid #eee;
    }
    .operative-right-block-1 {
        position: absolute;
        top: 0;
        right: 0;
        border-bottom: 1px solid #eee;
    }
    .operative-right-block-2 {
        position: absolute;
        right: 0;
        border-bottom: 1px solid #eee;
    }
    .operative-right-block-3 {
        position: absolute;
        bottom: 0;
        right: 0;
    }
}
.pic_and_goods-list {
    height: auto;
    padding: 0 0px 20px 15px;
    position: relative;
    .pic_and_goods-item {
        height: auto;
        margin-right: 10px;
        display: inline-block;
        float: left;
        img {
            height: 100%;
            width: 100%;
        }
    }
}
.service {
    .service-1 {
        display: block;
        width: calc(~"100% - 30px");
        padding: 5px 15px;
        img {
            width: 100%;
            height: auto;
        }
    }
    .service-2,
    .service-3 {
        display: table-cell;
        width: calc(~"50% - 20.5px");
        img {
            width: 100%;
            height: auto;
        }
    }
    .service-2 {
        padding: 5px 5.5px 5px 15px;
    }
    .service-3 {
        padding: 5px 15px 5px 5.5px;
    }
}
.scroll-box {
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
}
.special {
    .special-item {
        display: table-cell;
        width: calc(~"50% - 20.5px");
        img {
            width: 100%;
            height: auto;
            margin-bottom: 5px;
        }
        .special-name {
            font-size: 14px;
            color: #393939;
            margin-bottom: 5px;
        }
        .special-description {
            font-size: 12px;
            color: #999;
            font-weight: 100;
        }
    }
    .special-item:nth-child(odd) {
        padding: 5px 5.5px 5px 15px;
    }
    .special-item:nth-child(even) {
        padding: 5px 15px 5px 5.5px;
    }
}
.play {
    position: absolute;
    z-index: 2;
    height: 30px;
    width: 30px;
    left: calc(~"50% - 15px");
    top: calc(~"50% - 15px");
    img {
        height: 100%;
        width: 100%;
    }
}
.scroll-box {
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
}
.scroll-box-container {
    overflow: hidden;
}
.search {
    position: fixed;
    top: 10px;
    left: 10px;
    height: 30px;
    width: 30px;
    background-color: rgba(0, 0, 0, .2);
    border-radius: 50%;
    z-index: 5;
    img {
        position: absolute;
        top: 5px;
        left: 5px;
        height: 20px;
        width: 20px;
    }
}
.search-click-area {
    position: fixed;
    top: 5px;
    left: 5px;
    height: 40px;
    width: 40px;
    z-index: 6;
}
.menu-click-area {
    position: fixed;
    top: 5px;
    right: 5px;
    height: 40px;
    width: 40px;
    z-index: 6;
}
.click {
    position: fixed;
    top: 10px;
    right: 10px;
    height: 30px;
    width: 30px;
    background-color: rgba(0, 0, 0, .2);
    border-radius: 50%;
    z-index: 5;
    transform: rotate(45deg);
    transition: 0.5s;
    img {
        position: absolute;
        top: 5px;
        left: 5px;
        height: 20px;
        width: 20px;
    }
}
.open {
    transform: rotate(0);
}
.menu {
    position: fixed;
    height: 0;
    width: 116px;
    top: 40px;
    right: 0;
    overflow: hidden;
    z-index: 5;
    transition: 0.5s;
    .menu-tri {
        position: absolute;
        height: 10px;
        width: 10px;
        background-color: #fff;
        transform: rotate(45deg);
        right: 20px;
        top: 3px;
    }
    .menu-content {
        position: absolute;
        top: 7px;
        right: 0;
        background-color: #fff;
        height: 122px;
        width: 116px;
        .menu-item {
            position: relative;
            height: 40px;
            margin-left: 10px;
            width: calc(~"100% - 10px");
            border-bottom: 1px solid #eee;
            font-size: 12px;
            color: #999;
            line-height: 40px;
            padding-left: 35px;
            img {
                position: absolute;
                left: 10px;
                top: 10px;
                height: 20px;
                width: 20px;
            }
        }
    }
}
.menu-active {
    height: 130px;
}
</style>
