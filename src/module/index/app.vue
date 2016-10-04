<template>
<div class="content">
  <swiper class="module-swiper" loop auto height="150px" dots-class="dot-custom" :list="bannerList" :index="bannerIndex" @on-index-change="bannerOnChange" :show-desc-mask="false" dots-position="center" :interval="5000">
  </swiper>
  <flexbox class="module-class">
    <flexbox-item class="module-class-item" v-for="class in classList">
      <img class="module-class-icon" :src="class.img">
      <div class="module-class-name">{{class.name}}</div>
    </flexbox-item>
  </flexbox>

  <div class="module-activity">
    <div class="module-activity-left">
      <x-img :src="activityList[0].img">
        <x-img>
    </div>
    <div class="module-activity-right">
      <x-img :src="activityList[1].img">
        <x-img>
    </div>
    <div class="module-activity-right">
      <x-img :src="activityList[2].img">
        <x-img>
    </div>
  </div>
  <!-- Goods module -->
  <div class="module-item">
    <div class="module-title">有图有价</div>
    <div class="module-description">品牌推荐商品</div>
    <div class="module-detail">了解详情</div>
    <scroller lock-y scrollbar-x :height=".8*getScreenWidth()*.63+20+'px'" v-ref:goods>
      <div class="pic_adn_goods-list" :style="{width:pic_and_goods.length*(.8*getScreenWidth()+10)+'px',height:.8*getScreenWidth()*.63+'px'}">
        <div class="pic_and_goods-item" v-for="good in pic_and_goods" :style="{width: getScreenWidth()*.8 + 'px',height:.8*getScreenWidth()*.63+'px'}">
          <x-img :scroller="$refs.goods" :src="good.img"></x-img>
        </div>
      </div>
    </scroller>
    <div class="module-more">查看更多</div>
  </div>
  <!-- module end -->
  <!-- Ad module -->
  <div class="module-item ad" :style="{backgroundImage:'url('+ad.img+')'}"></div>
  <!-- module end -->
  <!-- Brand module TODO-->
  <div class="module-item">
    <div class="module-title">品牌分类</div>
    <div class="module-description">品牌推荐商品</div>
    <div class="module-detail">了解详情</div>
    <div class="brand-grid">
      <div class="brand-grid-1-l">
      </div>
      <div class="brand-grid-1-r-t">
      </div>
      <div class="brand-grid-1-r-d">
      </div>
      <div class="brand-grid-2-l-t">
      </div>
      <div class="brand-grid-2-l-d">
      </div>
      <div class="brand-grid-2-m">
      </div>
      <div class="brand-grid-2-r">
      </div>
    </div>
    <div class="module-more">查看更多</div>
  </div>
  <!-- module end -->
  <!-- Workers module -->
  <div class="module-item">
    <div class="module-title">工长推荐</div>
    <div class="module-description">推荐工长推荐工长推荐工长</div>
    <div class="module-detail">了解详情</div>
    <scroller lock-y scrollbar-x height="170px" v-ref:worker>
      <div class="worker-list" :style="{width:workerList.length*110+'px'}">
        <div class="worker-item" v-for="worker in workerList">
          <x-img :scroller="$refs.worker" :src="worker.img"></x-img>
          <div class="worker-name">{{worker.name}}</div>
        </div>
      </div>
    </scroller>
    <div class="module-more">查看更多</div>
  </div>
  <!-- end -->
  <!-- Pictures module -->
  <div class="module-item">
    <div class="module-title">图库</div>
    <div class="module-description">品牌推荐商品</div>
    <div class="module-detail">了解详情</div>
    <scroller lock-y scrollbar-x :height=".8*getScreenWidth()*.63+20+'px'" v-ref:pic>
      <div class="pic_adn_goods-list" :style="{width:picList.length*(.8*getScreenWidth()+10)+'px',height:.8*getScreenWidth()*.63+'px'}">
        <div class="pic_and_goods-item" v-for="pic in picList" :style="{width: getScreenWidth()*.8 + 'px',height:.8*getScreenWidth()*.63+'px'}">
          <x-img :scroller="$refs.pic" :src="pic.img"></x-img>
        </div>
      </div>
    </scroller>
    <div class="module-more">查看更多</div>
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
import {
  Flexbox,
  FlexboxItem
} from 'vux-components/flexbox'
import Scroller from 'vux-components/scroller'
export default {
  data() {
    return {
      bannerIndex: 0,
      bannerList: [{
        url: 'javascript:',
        img: 'http://7xqzw4.com2.z0.glb.qiniucdn.com/1.jpg'
      }, {
        url: 'javascript:',
        img: 'http://7xqzw4.com2.z0.glb.qiniucdn.com/2.jpg'
      }, {
        url: 'javascript:',
        img: 'http://7xqzw4.com2.z0.glb.qiniucdn.com/3.jpg'
      }],
      classList: [{
        id: 0,
        name: '分类',
        img: 'http://placekitten.com/g/20/20'
      }, {
        id: 1,
        name: '分类',
        img: 'http://placekitten.com/g/20/20'
      }, {
        id: 2,
        name: '分类',
        img: 'http://placekitten.com/g/20/20'
      }, {
        id: 3,
        name: '分类',
        img: 'http://placekitten.com/g/20/20'
      }],
      activityList: [{
        url: 'javascript:',
        img: 'http://placekitten.com/g/200/100'
      }, {
        url: 'javascript:',
        img: 'http://placekitten.com/g/200/50'
      }, {
        url: 'javascript:',
        img: 'http://placekitten.com/g/200/50'
      }],
      pic_and_goods: [{
        url: 'javascript:',
        img: 'http://placekitten.com/g/200/126'
      }, {
        url: 'javascript:',
        img: 'http://placekitten.com/g/200/126'
      }, {
        url: 'javascript:',
        img: 'http://placekitten.com/g/200/126'
      }, {
        url: 'javascript:',
        img: 'http://placekitten.com/g/200/126'
      }, {
        url: 'javascript:',
        img: 'http://placekitten.com/g/200/126'
      }],
      picList: [{
        url: 'javascript:',
        img: 'http://placekitten.com/g/200/126'
      }, {
        url: 'javascript:',
        img: 'http://placekitten.com/g/200/126'
      }, {
        url: 'javascript:',
        img: 'http://placekitten.com/g/200/126'
      }, {
        url: 'javascript:',
        img: 'http://placekitten.com/g/200/126'
      }, {
        url: 'javascript:',
        img: 'http://placekitten.com/g/200/126'
      }, {
        url: 'javascript:',
        img: 'http://placekitten.com/g/200/126'
      }, {
        url: 'javascript:',
        img: 'http://placekitten.com/g/200/126'
      }, {
        url: 'javascript:',
        img: 'http://placekitten.com/g/200/126'
      }, {
        url: 'javascript:',
        img: 'http://placekitten.com/g/200/126'
      }, {
        url: 'javascript:',
        img: 'http://placekitten.com/g/200/126'
      }],
      workerList: [{
        url: 'javascript:',
        name: '郑家园',
        img: 'http://placekitten.com/g/100/130'
      },{
        url: 'javascript:',
        name: '郑家园',
        img: 'http://placekitten.com/g/100/130'
      },{
        url: 'javascript:',
        name: '郑家园',
        img: 'http://placekitten.com/g/100/130'
      },{
        url: 'javascript:',
        name: '郑家园',
        img: 'http://placekitten.com/g/100/130'
      },{
        url: 'javascript:',
        name: '郑家园',
        img: 'http://placekitten.com/g/100/130'
      },{
        url: 'javascript:',
        name: '郑家园',
        img: 'http://placekitten.com/g/100/130'
      },{
        url: 'javascript:',
        name: '郑家园',
        img: 'http://placekitten.com/g/100/130'
      },{
        url: 'javascript:',
        name: '郑家园',
        img: 'http://placekitten.com/g/100/130'
      },{
        url: 'javascript:',
        name: '郑家园',
        img: 'http://placekitten.com/g/100/130'
      },],
      ad: {
        url: 'javascript:',
        img: 'http://placekitten.com/g/400/126'
      }
    }
  },
  components: {
    JFooter,
    Swiper,
    Flexbox,
    FlexboxItem,
    XImg,
    Scroller
  },
  ready() {


  },
  methods: {
    bannerOnChange(index) {
      this.bannerIndex = index
    },
    getScreenWidth() {
      return document.body.clientWidth
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
  background-color: #9EBC2B!important;
  opacity: 1;
}

.content {
  padding-bottom: 44px;
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
            top: 31px;
            left: 50%;
            margin-left: -11px;
            width: 22px;
            height: 22px;
        }
        .module-class-name {
            position: absolute;
            left: 0;
            bottom: 30px;
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
        padding-top: 4px;
    }
    .module-detail {
        color: #5965B2;
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
.pic_adn_goods-list {
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
.worker-list{
  height: 160px;
  .worker-item{
    height: 160px;
    width: 100px;
    margin-right: 10px;
    text-align: center;
    display: inline-block;
    float: left;
    font-size: 12px;
  }
}
.ad {
    width: 100%;
    height: 100px;
    background-position: top center;
    background-size: 100% auto;
}
</style>
