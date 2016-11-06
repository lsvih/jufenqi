<template>
<header>
  <div class="location"><img src="location.png" width="16px" height="20px">北京</div>
  <!-- <div class="search"><input type="search" placeholder="搜索..."><img src="search.png"></div> -->
  <img src="./logo.png" style="height:19px;width:86px;position:absolute;top:13px;left:calc( 50% - 43px );">
  <img class="cart" src="cart.png" width="20px" height="20px" v-tap="gotoCate('./cart.html')">
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

  <div class="activity" :style="{height:.16*getScreenWidth()+20+'px'}">
    <div class="activity-left" :style="{height:.16*getScreenWidth()+'px',width:(getScreenWidth()-35)/2+'px'}">
      <x-img :src="activityList[0].img">
      </x-img>
    </div>
    <div class="activity-right" :style="{height:.16*getScreenWidth()+'px',width:(getScreenWidth()-35)/2+'px'}">
      <x-img :src="activityList[1].img">
      </x-img>
    </div>
  </div>
  <!-- Goods module -->
  <div class="module-item">
    <div class="module-title">有图有价<img src="./arrow.png"></div>
    <div class="scroll-box-container" :style="{width:'100%',height:.8*getScreenWidth()*.63+'px'}">
      <div :style="{width:'100%',height:.8*getScreenWidth()*.63+40+'px'}" class="scroll-box">
        <div class="pic_and_goods-list" :style="{width:pic_and_goods.length*(.8*getScreenWidth()+10)+'px',height:.8*getScreenWidth()*.63+'px'}">
          <div class="pic_and_goods-item" v-for="good in pic_and_goods" :style="{width: getScreenWidth()*.8 + 'px',height:.8*getScreenWidth()*.63+'px'}">
            <img :src="good.img">
          </div>
        </div>
      </div>
    </div>
    <div class="module-more">
      <div class="module-description">看的到的都能买</div>
      <div class="module-detail">了解详情</div>
    </div>
  </div>
  <!-- module end -->
  <!-- Ad module -->
  <div class="module-item ad"><img v-bind:src="ad.img"></div>
  <!-- module end -->
  <!-- Brand module -->
  <div class="module-item">
    <div class="module-title" v-tap="gotoCate('./class-list.html')">品牌分类<img src="./arrow.png"></div>

    <div class="brand-grid" :style="{height:((getScreenWidth()-35)*(200/340)+(getScreenWidth()-42)/3+5)+'px'}">
      <div class="brand-grid-1" :style="{height:(getScreenWidth()-35)*(200/340)+'px'}">
        <div class="brand-grid-1-l" :style="{width:(getScreenWidth()-35)*(200/340)+'px',height:(getScreenWidth()-35)*(200/340)+'px'}" v-tap="gotoBrand(0,brandList[0].name)">
          <x-img :src="brandList[0].img"></x-img>
        </div>
        <div class="brand-grid-1-r" :style="{width:(getScreenWidth()-35)*(140/340)+'px',height:(getScreenWidth()-35)*(200/340)+'px'}" v-tap="gotoBrand(1,brandList[1].name)">
          <x-img :src="brandList[1].img"></x-img>
        </div>
      </div>
      <div class="brand-grid-2" :style="{height:(getScreenWidth()-42)/3+'px'}">
        <div class="brand-grid-2-l" :style="{width:(getScreenWidth()-42)/3+'px',height:(getScreenWidth()-42)/3+'px'}" v-tap="gotoBrand(2,brandList[2].name)">
          <x-img :src="brandList[2].img"></x-img>
        </div>
        <div class="brand-grid-2-m" :style="{width:(getScreenWidth()-42)/3+'px',height:(getScreenWidth()-42)/3+'px'}" v-tap="gotoBrand(3,brandList[3].name)">
          <x-img :src="brandList[3].img"></x-img>
        </div>
        <div class="brand-grid-2-r" :style="{width:(getScreenWidth()-42)/3+'px',height:(getScreenWidth()-42)/3+'px'}" v-tap="gotoBrand(4,brandList[4].name)">
          <x-img :src="brandList[4].img"></x-img>
        </div>
      </div>
    </div>
    <div class="module-more">
      <div class="module-description">300+品牌，500+建材城，满足你的胃口</div>
      <div class="module-detail" onclick="location.href='zc-info.html'">了解详情</div>
    </div>
  </div>
  <!-- module end -->
  <!-- Workers module -->
  <div class="module-item">
    <div class="module-title" v-tap="gotoCate('./worker-list.html')">工长推荐<img src="./arrow.png"></div>
    <div class="scroll-box-container" :style="{width:'100%',height:'155px'}">
      <div :style="{width:'100%',height:'190px'}" class="scroll-box">
        <div class="worker-list" :style="{width:workerList.length*110+'px'}">
          <div class="worker-item" v-for="worker in workerList" onclick="location.href='worker-detail.html?id={{worker.id}}&name={{worker.name}}'">
            <img :src="worker.img">
            <div class="worker-name">{{worker.name}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="module-more">
      <div class="module-description">金牌工长，全职监理，保障你的权益</div>
      <div class="module-detail" onclick="location.href='gz-info.html'">了解详情</div>
    </div>
  </div>
  <!-- end -->
  <div class="activity" :style="{height:.16*getScreenWidth()+20+'px'}">
    <div class="activity-left" :style="{height:.16*getScreenWidth()+'px',width:(getScreenWidth()-35)/2+'px'}">
      <x-img :src="activityList[2].img">
      </x-img>
    </div>
    <div class="activity-right" :style="{height:.16*getScreenWidth()+'px',width:(getScreenWidth()-35)/2+'px'}">
      <x-img :src="activityList[3].img">
      </x-img>
    </div>
  </div>
  <!-- Pictures module -->
  <div class="module-item">
    <!-- <div class="module-title" v-tap="gotoCate('./gallery.html')">图库<img src="./arrow.png"></div> -->
      <div class="module-title">图库<img src="./arrow.png"></div>
    <div class="scroll-box-container" :style="{width:'100%',height:.8*getScreenWidth()*.63+'px'}">
      <div :style="{width:'100%',height:.8*getScreenWidth()*.63+40+'px'}" class="scroll-box">
        <div class="pic_and_goods-list" :style="{width:picList.length*(.8*getScreenWidth()+10)+'px',height:.8*getScreenWidth()*.63+'px'}">
          <div class="pic_and_goods-item" v-for="pic in picList" :style="{width: getScreenWidth()*.8 + 'px',height:.8*getScreenWidth()*.63+'px'}">
            <img :src="pic.img">
          </div>
        </div>
      </div>
    </div>
    <div class="module-more">
      <div class="module-description" style="margin-bottom:10px;">实地拍摄，不再是“照骗”</div>
    </div>
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
      }, {
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
        img: '/static/images/ad/t-1.png'
      }, {
        url: 'javascript:',
        img: '/static/images/ad/t-2.png'
      }, {
        url: 'javascript:',
        img: '/static/images/ad/b-1.png'
      }, {
        url: 'javascript:',
        img: '/static/images/ad/b-2.png'
      }],
      pic_and_goods: [{
        url: 'javascript:',
        img: '/static/temp/pic_and_price/有图有价1.png'
      }, {
        url: 'javascript:',
        img: '/static/temp/pic_and_price/有图有价2.png'
      }, {
        url: 'javascript:',
        img: '/static/temp/pic_and_price/有图有价3.png'
      }],
      picList: [{
        url: 'javascript:',
        img: '/static/temp/gallery/gallery1.png'
      }, {
        url: 'javascript:',
        img: '/static/temp/gallery/gallery2.png'
      }, {
        url: 'javascript:',
        img: '/static/temp/gallery/gallery3.png'
      }],
      workerList: [{
        id: 4,
        url: 'javascript:',
        name: '彭学勇',
        img: '/static/temp/workers/彭学勇.jpg'
      }, {
        id: 1,
        url: 'javascript:',
        name: '杨爱军',
        img: '/static/temp/workers/杨爱军.jpg'
      }, {
        id: 3,
        url: 'javascript:',
        name: '仰宗龙',
        img: '/static/temp/workers/仰宗龙.jpg'
      }, {
        id: 6,
        url: 'javascript:',
        name: '雍自民',
        img: '/static/temp/workers/雍自民.jpg'
      }, {
        id: 2,
        url: 'javascript:',
        name: '张林',
        img: '/static/temp/workers/张林.jpg'
      }],
      brandList: [{
        url: 'javascript:',
        name: "橱柜",
        img: '/static/images/新品类运营/橱柜.png'
      }, {
        url: 'javascript:',
        name: "家电",
        img: '/static/images/新品类运营/家电.png'
      }, {
        url: 'javascript:',
        name: '地板',
        img: '/static/images/新品类运营/地板.png'
      }, {
        url: 'javascript:',
        name: '定制家具',
        img: '/static/images/新品类运营/定制家具.png'
      }, {
        url: 'javascript:',
        name: '木门',
        img: '/static/images/新品类运营/木门.png'
      }],
      ad: {
        url: 'javascript:',
        img: '/static/temp/ad.png'
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
  methods: {
    bannerOnChange(index) {
      this.bannerIndex = index
    },
    getScreenWidth() {
      return document.body.clientWidth
    },
    gotoBrand(id, name) {
      window.location.href = `brand-list.html?id=${id}&name=${encodeURIComponent(name)}`
    },
    gotoCate(url) {
      window.location.href = url
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
  overflow: hidden;
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
            top: 23px;
            left: 50%;
            margin-left: -20px;
            width: 40px;
            height: 40px;
        }
        .module-class-name {
            position: absolute;
            left: 0;
            bottom: 18px;
            font-size: 12px;
            width: 100%;
            height: auto;
            text-align: center;
        }
    }
}

.activity {
    position: relative;
    margin-top: 10px;
    width: 100%;
    background-color: #fff;
    img {
        height: 100%;
        width: 100%;
        border-radius: 5px;
    }
    .activity-left {
        position: absolute;
        top: 10px;
        left: 15px;
    }
    .activity-right {
        position: absolute;
        top: 10px;
        right: 15px;
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
        font-size: 16px;
        height: 30px;
        width: 100%;
        text-align: left;
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
        img {
            width: 100%;
        }
        .worker-name {
            margin-top: 3px;
        }
    }
}
.ad {
    width: 100%;
    height: 100px;
    img {
        margin: 10px 15px;
        border-radius: 5px;
        width: calc(~" 100% - 30px ");
        height: calc(~" 100% - 20px ");
    }
}
.brand-grid {
    width: 100%;
    position: relative;
    div {
        position: absolute;
        overflow: hidden;
        border-radius: 5px;
    }
    .brand-grid-1 {
        top: 0;
        left: 0;
        width: 100%;
    }
    .brand-grid-1-l {
        top: 0;
        left: 15px;
    }
    .brand-grid-1-r {
        top: 0;
        right: 15px;
    }
    .brand-grid-2 {
        bottom: 0;
        left: 0;
        width: 100%;
    }
    .brand-grid-2-l {
        top: 0;
        left: 15px;
    }
    .brand-grid-2-m {
        bottom: 0;
        left: calc( ~"(100% - 42px)/3 + 21px" );
    }
    .brand-grid-2-r {
        bottom: 0;
        right: 15px;
    }
    img {
        border-radius: 5px;
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
.scroll-box-container {
    overflow: hidden;
}
</style>
