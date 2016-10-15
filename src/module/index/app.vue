<template>
<header>
  <div class="location"><img src="location.png" width="16px" height="20px">北京</div>
  <div class="search"><input type="search" placeholder="搜索..."><img src="search.png"></div>
  <img class="cart" src="cart.png" width="20px" height="20px">
</header>
<div class="content">
  <swiper class="module-swiper" loop auto height="150px" dots-class="dot-custom" :list="bannerList" :index="bannerIndex" @on-index-change="bannerOnChange" :show-desc-mask="false" dots-position="center" :interval="5000">
  </swiper>
  <flexbox class="module-class">
    <flexbox-item class="module-class-item" v-for="class in classList" v-tap="gotoCate(class.url)">
      <img class="module-class-icon" :src="class.img">
      <div class="module-class-name">{{class.name}}</div>
    </flexbox-item>
  </flexbox>

  <div class="module-activity">
    <div class="module-activity-left">
      <x-img :src="activityList[0].img">
      </x-img>
    </div>
    <div class="module-activity-right">
      <x-img :src="activityList[1].img">
      </x-img>
    </div>
    <div class="module-activity-right">
      <x-img :src="activityList[2].img">
      </x-img>
    </div>
  </div>
  <!-- Goods module -->
  <div class="module-item">
    <div class="module-title">有图有价</div>
    <div class="module-description">看的到的都能买</div>
    <div class="module-detail">了解详情</div>
    <div :style="{width:'100%',height:.8*getScreenWidth()*.63+20+'px'}" class="scroll-box">
      <div class="pic_and_goods-list" :style="{width:pic_and_goods.length*(.8*getScreenWidth()+10)+'px',height:.8*getScreenWidth()*.63+'px'}">
        <div class="pic_and_goods-item" v-for="good in pic_and_goods" :style="{width: getScreenWidth()*.8 + 'px',height:.8*getScreenWidth()*.63+'px'}">
          <img :src="good.img">
        </div>
      </div>
    </div>
    <div class="module-more">查看更多</div>
  </div>
  <!-- module end -->
  <!-- Ad module -->
  <div class="module-item ad" :style="{backgroundImage:'url('+ad.img+')'}"></div>
  <!-- module end -->
  <!-- Brand module -->
  <div class="module-item">
    <div class="module-title">品牌分类</div>
    <div class="module-description">300+品牌，500+建材城，满足你的胃口</div>
    <div class="module-detail" onclick="location.href='zc-info.html'">了解详情</div>
    <div class="brand-grid" :style="{height:getScreenWidth()*(.583*.85+.333*1.52)+'px'}">
      <div class="brand-grid-1" :style="{height:getScreenWidth()*.583*.85+'px'}">
        <div class="brand-grid-1-l" :style="{width:getScreenWidth()*.583+'px',height:getScreenWidth()*.583*.85+'px'}" v-tap="gotoBrand(0,brandList[0].name)">
          <x-img :src="brandList[0].img"></x-img>
        </div>
        <div class="brand-grid-1-r-t" :style="{width:getScreenWidth()*(1-.583)+'px',height:getScreenWidth()*.583*.85*.5+'px'}" v-tap="gotoBrand(1,brandList[1].name)">
          <x-img :src="brandList[1].img"></x-img>
        </div>
        <div class="brand-grid-1-r-b" :style="{width:getScreenWidth()*(1-.583)+'px',height:getScreenWidth()*.583*.85*.5+'px'}" v-tap="gotoBrand(2,brandList[2].name)">
          <x-img :src="brandList[2].img"></x-img>
        </div>
      </div>
      <div class="brand-grid-2" :style="{height:getScreenWidth()*.333*1.52+'px'}">
        <div class="brand-grid-2-l-t" :style="{width:getScreenWidth()*.333+'px',height:getScreenWidth()*.333*1.52*.5+'px'}" v-tap="gotoBrand(3,brandList[3].name)">
          <x-img :src="brandList[3].img"></x-img>
        </div>
        <div class="brand-grid-2-l-b" :style="{width:getScreenWidth()*.333+'px',height:getScreenWidth()*.333*1.52*.5+'px'}" v-tap="gotoBrand(4,brandList[4].name)">
          <x-img :src="brandList[4].img"></x-img>
        </div>
        <div class="brand-grid-2-m" :style="{width:getScreenWidth()*.333+'px',height:getScreenWidth()*.333*1.52+'px'}" v-tap="gotoBrand(5,brandList[5].name)">
          <x-img :src="brandList[5].img"></x-img>
        </div>
        <div class="brand-grid-2-r" :style="{width:getScreenWidth()*.333+'px',height:getScreenWidth()*.333*1.52+'px'}" v-tap="gotoBrand(6,brandList[6].name)">
          <x-img :src="brandList[6].img"></x-img>
        </div>
      </div>
    </div>
    <div class="module-more" onclick="location.href='class-list.html'">查看更多</div>
  </div>
  <!-- module end -->
  <!-- Workers module -->
  <div class="module-item">
    <div class="module-title">工长推荐</div>
    <div class="module-description">金牌工长，全职监理，保障你的权益</div>
    <div class="module-detail" onclick="location.href='gz-info.html'">了解详情</div>
    <div :style="{width:'100%',height:'170px'}" class="scroll-box">
      <div class="worker-list" :style="{width:workerList.length*110+'px'}">
        <div class="worker-item" v-for="worker in workerList" onclick="location.href='worker-detail.html?id={{worker.id}}&name={{worker.name}}'">
          <img :src="worker.img">
          <div class="worker-name">{{worker.name}}</div>
        </div>
      </div>
    </div>
    <div class="module-more" onclick="location.href='worker-list.html'">查看更多</div>
  </div>
  <!-- end -->
  <!-- Pictures module -->
  <div class="module-item">
    <div class="module-title">图库</div>
    <div class="module-description"  style="margin-bottom:10px;">实地拍摄，不再是“照骗”</div>
    <div :style="{width:'100%',height:.8*getScreenWidth()*.63+20+'px'}" class="scroll-box">
      <div class="pic_and_goods-list" :style="{width:picList.length*(.8*getScreenWidth()+10)+'px',height:.8*getScreenWidth()*.63+'px'}">
        <div class="pic_and_goods-item" v-for="pic in picList" :style="{width: getScreenWidth()*.8 + 'px',height:.8*getScreenWidth()*.63+'px'}">
          <img :src="pic.img">
        </div>
      </div>
    </div>
    <div class="module-more" onclick="location.href='gallery.html'">查看更多</div>
  </div>
  <!-- module end -->
</div>
<j-footer></j-footer>
</template>

<script>
import Lib from 'assets/Lib.js'
import Swiper from 'vux-components/swiper'
import JFooter from 'components/JFooter.vue'
import XImg from 'vux-components/x-img'
import fqIcon from './icon/fq-icon.png'
import rzIcon from './icon/rz-icon.png'
import zxIcon from './icon/zx-icon.png'
import zcIcon from './icon/zc-icon.png'

import {
  Flexbox,
  FlexboxItem
} from 'vux-components/flexbox'
export default {
  data() {
    return {
      bannerIndex: 0,
      bannerList: [{
        url: 'javascript:',
        img: '/static/images/banner/banner1.jpg'
      },{
        url: 'javascript:',
        img: '/static/images/banner/banner2.jpg'
      }],
      classList: [{
        id: 0,
        name: '装修',
        url: 'worker-list.html',
        img: zxIcon
      }, {
        id: 1,
        name: '主材',
        url: 'class-list.html',
        img: zcIcon
      }, {
        id: 2,
        name: '软装',
        url: 'javascript:',
        img: rzIcon
      }, {
        id: 3,
        name: '分期',
        url: 'instalment.html',
        img: fqIcon
      }],
      activityList: [{
        url: 'javascript:',
        img: '/static/images/ad/jfq.jpg'
      }, {
        url: 'javascript:',
        img: '/static/images/ad/calc.jpg'
      }, {
        url: 'javascript:',
        img: '/static/images/ad/gallery.jpg'
      }],
      pic_and_goods: [{
        url: 'javascript:',
        img: '/static/temp/pic_and_price/有图有价1.jpg'
      },{
        url: 'javascript:',
        img: '/static/temp/pic_and_price/有图有价2.jpg'
      },{
        url: 'javascript:',
        img: '/static/temp/pic_and_price/有图有价3.jpg'
      },{
        url: 'javascript:',
        img: '/static/temp/pic_and_price/有图有价4.jpg'
      },{
        url: 'javascript:',
        img: '/static/temp/pic_and_price/有图有价5.jpg'
      }],
      picList: [{
        url: 'javascript:',
        img: '/static/temp/gallery/gallery1.jpg'
      },{
        url: 'javascript:',
        img: '/static/temp/gallery/gallery2.jpg'
      },{
        url: 'javascript:',
        img: '/static/temp/gallery/gallery3.jpg'
      },{
        url: 'javascript:',
        img: '/static/temp/gallery/gallery4.jpg'
      },{
        url: 'javascript:',
        img: '/static/temp/gallery/gallery5.jpg'
      },{
        url: 'javascript:',
        img: '/static/temp/gallery/gallery6.jpg'
      }],
      workerList: [{
        id:4,
        url: 'javascript:',
        name: '彭学勇',
        img: '/static/temp/workers/彭学勇.jpg'
      }, {
        id:1,
        url: 'javascript:',
        name: '杨爱军',
        img: '/static/temp/workers/杨爱军.jpg'
      }, {
        id:3,
        url: 'javascript:',
        name: '仰宗龙',
        img: '/static/temp/workers/仰宗龙.jpg'
      }, {
        id:6,
        url: 'javascript:',
        name: '雍自民',
        img: '/static/temp/workers/雍自民.jpg'
      }, {
        id:2,
        url: 'javascript:',
        name: '张林',
        img: '/static/temp/workers/张林.jpg'
      }],
      brandList: [{
        url: 'javascript:',
        name: "家具",
        img: '/static/images/品类运营/家具.jpg'
      }, {
        url: 'javascript:',
        name: "木作",
        img: '/static/images/品类运营/木作.jpg'
      }, {
        url: 'javascript:',
        name: '饰品',
        img: '/static/images/品类运营/饰品.jpg'
      }, {
        url: 'javascript:',
        name: '地板',
        img: '/static/images/品类运营/地板.jpg'
      }, {
        url: 'javascript:',
        name:'智能家居',
        img: '/static/images/品类运营/智能家居.jpg'
      }, {
        url: 'javascript:',
        name:'机电',
        img: '/static/images/品类运营/机电.jpg'
      }, {
        url: 'javascript:',
        name:'瓷砖卫浴',
        img: '/static/images/品类运营/瓷砖卫浴.jpg'
      }],
      ad: {
        url: 'javascript:',
        img: '/static/temp/ad.jpg'
      }
    }
  },
  components: {
    JFooter,
    Swiper,
    Flexbox,
    FlexboxItem,
    XImg,
  },
  ready() {


  },
  methods: {
    bannerOnChange(index) {
      this.bannerIndex = index
    },
    getScreenWidth() {
      return document.body.clientWidth
    },
    gotoBrand(id,name){
      location.href = `brand-list.html?id=${id}&name=${encodeURIComponent(name)}`
    },
    gotoCate(url){
      location.href = url
    }



  }
}
</script>
<style>
body {
  background-color: #eee;
}

.dot-custom .vux-icon-dot {
  opacity: .7;
}

.dot-custom .vux-icon-dot.active {
  background-color: #88C929!important;
  opacity: 1;
}

.content {
  padding: 44px 0 44px 0;
}

header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 44px;
  z-index: 5;
  background-color: #fff;
  border-bottom: 1px solid #D8D8D8;
}
</style>
<style lang="less" scoped>
.module-class {
    width: 100%;
    height: 100px;
    margin-top: 10px;
    background-color: #fff;
    .module-class-item {
        position: relative;
        height: 100%;
        .module-class-icon {
            position: absolute;
            top: 27px;
            left: 50%;
            margin-left: -15px;
            width: 30px;
            height: 30px;
        }
        .module-class-name {
            position: absolute;
            left: 0;
            bottom: 21px;
            font-size: 12px;
            width: 100%;
            height: auto;
            text-align: center;
        }
    }
}
.module-activity {
    height: 100px;
    width: 100%;
    margin-top: 10px;
    div {
        float: left;
    }
    img {
        height: 100%;
        width: 100%;
    }
    .module-activity-left {
        height: 100%;
        width: 50%;
    }
    .module-activity-right {
        height: 50%;
        width: 50%;
    }
}
.module-item {
    width: 100%;
    height: auto;
    position: relative;
    background-color: #fff;
    margin-top: 10px;
    .module-title {
        color: #393939;
        font-size: 30px;
        height: 30px;
        width: 100%;
        text-align: center;
        line-height: 1;
        padding-top: 15px;
    }
    .module-description {
        color: #999;
        font-size: 16px;
        height: 16px;
        width: 100%;
        text-align: center;
        line-height: 1;
        padding-top: 15px;
    }
    .module-detail {
        color: #3BA794;
        font-size: 12px;
        height: 12px;
        width: 100%;
        text-align: center;
        line-height: 1;
        padding: 8px 0 15px;
    }
    .module-more {
        width: 100%;
        height: 44px;
        line-height: 44px;
        font-size: 16px;
        color: #999;
        text-align: center;
        border-top: 1px solid #eee;
    }
}
.pic_and_goods-list {
    height: auto;
    padding: 0 15px 20px;
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
.worker-list {
    height: 160px;
    padding: 0 15px;
    .worker-item {
        height: 160px;
        width: 100px;
        margin-right: 10px;
        text-align: center;
        display: inline-block;
        float: left;
        font-size: 12px;
        img{
          width: 100%;
        }
    }
}
.ad {
    width: 100%;
    height: 100px;
    background-position: top center;
    background-size: 100% auto;
}
.brand-grid {
    width: 100%;
    position: relative;
    div {
        position: absolute;
    }
    .brand-grid-1 {
        top: 0;
        left: 0;
        width: 100%;
        img {
            top: 0;
            left: 0;
        }
    }
    .brand-grid-1-l {
        top: 0;
        left: 0;
    }
    .brand-grid-1-r-t {
        top: 0;
        right: 0;
    }
    .brand-grid-1-r-b {
        bottom: 0;
        right: 0;
    }
    .brand-grid-2 {
        bottom: 0;
        left: 0;
        width: 100%;
        img {
            left: 0;
            bottom: 0;
        }
    }
    .brand-grid-2-l-t {
        top: 0;
        left: 0;
    }
    .brand-grid-2-l-b {
        bottom: 0;
        left: 0;
    }
    .brand-grid-2-m {
        bottom: 0;
        left: 33.3%;
    }
    .brand-grid-2-r {
        bottom: 0;
        right: 0;
    }
    img {
        position: absolute;
        height: 100%;
        width: 100%;
    }
}
header {
    .location {
        position: absolute;
        left: 5.3%;
        bottom: 12px;
        font-size: 12px;
        color: #393939;
        img {
            vertical-align: bottom;
            padding-right: 5px;
        }
    }
    .search {
        input {
            position: absolute;
            width: calc( ~"100% - 54px - 88px" );
            height: 25px;
            line-height: 25px;
            border-radius: 12.5px;
            border: 1px solid rgba(57,57,57,.5);
            padding: 0 10px 0 20px;
            top: 10px;
            left: 88px;
            right: 54px;
        }
        *[placeholder],
        [placeholder],
        input[placeholder] {
            color: #D8D8D8!important;
        }
        img {
            position: absolute;
            width: 13px;
            height: 12px;
            top: 17px;
            left: 95px;
        }

    }
    .alert {
        position: absolute;
        top: 10px;
        right: 19.4%;
    }
    .cart {
        position: absolute;
        top: 12px;
        right: 15px;
    }
}
.scroll-box {
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
}
</style>
