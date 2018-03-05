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
  overflow: hidden;
}
</style>
<style lang="less">
.module-class {
    background-color: #fff;
    padding: 20px 0;
    .module-class-item {
        text-align: center;
        color: #333;
        position: relative;
        .module-class-icon {
            height: 60px;
            width: 60px;
        }
        .module-class-name {
            margin-top: 3px;
            width: 100%;
            text-align: center;
            font-size: 12px;
        }
        .arrow {
          position: absolute;
          width: 8px;
          left: 100%;
          top: 31%;
          img {
            display: block;
            width: 100%;
          }
        }
    }
}
.module-item {
    width: 100%;
    height: auto;
    position: relative;
    background: #fff;
    .event-img {
      width: 100%;
      height: calc(~"100vw * 8 / 15");
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .videoWrapper {
        width: 100%;
        height: calc(~"100vw * 8 / 15");
        position: relative;
        .video-true {
          width: 1px;
          height: 0px;
          position: absolute;
          top: 50%;
          left: 0;
          z-index: 10;
        }
        .video-bg {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 65;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .mask {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background-color: #000;
          opacity: 0.3;
          z-index: 100;
        }
        .video-fake-btn {
          width: 55px;
          height: 55px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 200;
          img {
            width: 100%
          }
        }

    }
    .module-title-block {
        position: absolute;
        left: 0px;
        top: 14px;
        height: 20px;
        width: 8px;
        background-color: #ff9736;
        border-radius: 0 5px 5px 0px;
    }
    .module-title {
        color: #393939;
        font-size: 18px;
        height: 30px;
        width: 95%;
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
            font-weight: 200;
        }
        .module-detail {
            color: #ff9736;
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
        margin-right: 10px;
        display: inline-block;
        float: left;
        box-shadow: 0px 22px 10px 0px rgba(0, 0, 0, 0.2);
        img {
            width: 100%;
            display: block;
            border-radius: 6px 6px 0 0;
        }
        .good-name {
          width: 100%;
          background-color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #333;
          border-radius: 0 0 6px 6px;
        }
    }
    .brand_item {
        margin-right: 10px;
        display: inline-block;
        float: left;
        img {
            width: 100%;
            display: block;
        }
        .good-name {
          width: 100%;
          background-color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #333;
          font-size: 12px;
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
.headline {
  display: flex;
  width: 100%;
  height: 55px;
  .headline-logo {
    flex: 1;
    height: 55px;
    img {
      height: 100%;
    }
  }
  .carousel-wrapper {
    flex: 12;
    height: 55px;
    background-color: #fff;
    .headline-swipper {
      p {
        font-size: 12px !important;
        padding: 20px 50px 20px 13px !important;
        background-image: none !important;
        color: #999 !important;
        text-shadow: none !important;

      }
    }
  }
}
.longpic {
  width: 100%;
  img {
    width: 100%;
  }
}
.item-others {
  margin: 8px auto;
  box-sizing: border-box;
  padding: 15px 16px;
  background-color: #fff;
  width: calc(~"100% - 32px");
  .text-wrapper {
    font-size: 16px;
    .text-content {
      margin-bottom: 12px;
    }
    .text-source {
      color: #999;
      font-size: 12px;
    }
  }
  .img-wrapper {
    width: 100%;
    img {
      width: 100%;
      height: auto;
      display: block;
    }
  }
}
</style>

<template>
<!-- <div class="search-click-area" v-tap="goto('./search.html')">
</div>
<div class="search"><img src="/static/images/icon/search.png"></div> -->
<!-- 搜索 -->
<!-- <div class="click" :class="{open:openMenu}"><img src="/static/images/icon/click.png"></div> -->
<!-- <div class="menu-click-area" v-tap="openMenu = !openMenu"></div> -->
<!-- <div class="menu" :class="{'menu-active':openMenu}">
  <div class="menu-tri"></div>
  <div class="menu-content">
    <div class="menu-item"><img src="/static/images/icon/写评论.png">去点评</div>
    <div class="menu-item"><img src="/static/images/icon/添加门店.png">添加门店</div>
    <div class="menu-item"><img src="/static/images/icon/扫一扫.png">扫一扫</div>
  </div>
</div> -->
<div class="content">
 <swiper class="module-swiper" loop auto height="200px" dots-class="dot-custom" :list="bannerList" :index="bannerIndex"  @on-index-change="bannerOnChange" v-tap="clickBanner" :show-desc-mask="true" dots-position="center" :interval="5000">
  </swiper>
  <flexbox class="module-class">
    <flexbox-item class="module-class-item" v-for="class in classList|limitBy 5" v-tap="goto(class.url)" style="margin-left: 6px;">
      <img class="module-class-icon" :src="class.img">
      <!-- `/static/images/icon/${class.name}.png` -->
      <div class="module-class-name" :style="{width: class.name.length >4?'105%':'100%'}">{{class.name}}</div>
    </flexbox-item>
  </flexbox>
  <!-- <flexbox class="module-class">
    <flexbox-item class="module-class-item" v-for="class in classList|limitBy 5 5" v-tap="goto(class.url)">
      <img class="module-class-icon" :src="class.img">
      <div class="module-class-name">{{class.name}}</div>
    </flexbox-item>
  </flexbox> -->
  <!-- Service module -->
  <!-- 服务 -->
<!--   <div class="module-item">
    <div class="module-title-block"></div>
    <div class="module-title">服务</div>
    <div class="service">
      <div class="service-1"><img :src="serviceList[0].img" v-tap="goto(serviceList[0].url)"></div>
      <div class="service-2"><img :src="serviceList[1].img" v-tap="goto(serviceList[1].url)"></div>
      <div class="service-3"><img :src="serviceList[2].img" v-tap="goto(serviceList[2].url)"></div>
    </div>-->

<!-- 居头条 -->
    <!-- <div class="headline" v-tap="goto('./head-list.html')">
      <div class="headline-logo"><img src="./headline.jpg"></div>
      <div class="carousel-wrapper">
        <swiper class="headline-swipper" loop auto show-dots="false" :list="headlineList" :interval="1500" direction="vertical" height="55px" :index="headlineIndex" @on-index-change="headlineOnChange" >
        </swiper>
      </div>
    </div> -->
    <!-- <div class="longpic" v-tap="goto('./bannerfirst.html')">
      <img src="./long.png">
    </div> -->

 </div>
  <!-- module end -->
  <!-- Video module -->
  <div class="module-item">
    <!-- 视频 -->
    <div class="videoWrapper">
      <video class="video-true" id="adVideo" controls="controls" preload="none" width="100%" height="200" src="http://ohej1hvbm.bkt.clouddn.com/movie.mp4" allowfullscreen></video>
      <div class="video-bg"><img src="/static/new/index/videocover.png"></div>
      <div class="video-fake-btn" v-tap="playVideo()"><img src="/static/images/player.png"></div>
      <div class="mask"></div>
    </div>
    <!-- <div class="event-img">
      <img src="/static/63event.png" v-tap="goto('gz-info.html')">
    </div> -->
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
  <div class="module-item">
    <div class="module-title-block"></div>
    <div class="module-title">分期介绍</div>
    <flexbox class="module-class">
    <flexbox-item class="module-class-item" v-for="class in insList" style="margin-left: 6px;">
      <img class="module-class-icon" :src="class.img">
      <!-- `/static/images/icon/${class.name}.png` -->
      <div class="module-class-name" :style="{width: class.name.length >4?'105%':'100%'}">{{class.name}}</div>
      <div class="arrow" v-if="class.id != 3"><img src="/static/new/index/arrow.png"></div>
    </flexbox-item>
  </flexbox>
  </div>
  <!-- Goods module -->

  <div class="module-item" style="background-color: #eee;">
    <div class="module-title-block"></div>
    <div class="module-title" v-tap="goto('./pic-price.html')">案例展示</div>
    <div class="scroll-box-container" :style="{width:'100%',height:.73*getScreenWidth()*.63+'px'}">
      <div :style="{width:'100%',height:.8*getScreenWidth()*.63+40+'px'}" class="scroll-box">
        <div class="pic_and_goods-list" :style="{width:picList.length*(.45*getScreenWidth()+10)+'px',height:.8*getScreenWidth()*.63+'px'}">
          <div class="pic_and_goods-item" v-for="good in picList" :style="{width: getScreenWidth()*.45 + 'px',height:.6*getScreenWidth()*.63+'px'}">
            <img :src="good.img" v-tap="goto(good.url)">
            <div class="good-name" :style="{height:.15*getScreenWidth()*.63+'px'}">{{good.name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- module end -->

  <!-- Special module -->
  <div class="module-item" style="margin: 8px auto">
    <div class="module-title-block"></div>
    <div class="module-title">品牌品类</div>
    <!-- <div class="special">
      <div class="special-item" v-for="special of specialList" v-tap="goto(special.url)">
        <img :src="special.img">
        <div class="special-name">
          {{special.name}}
        </div>
        <div class="special-description">
          {{special.description}}
        </div>
      </div>
    </div> -->
    <tab active-color='#ff9736' :index.sync="index">
      <tab-item style="font-size:12px" active-class="tab-active" :selected="tabIndex == 0" v-tap="tabIndex = 0">瓷砖卫浴</tab-item>
      <tab-item style="font-size:12px" active-class="tab-active" :selected="tabIndex == 1" v-tap="tabIndex = 1">木作</tab-item>
      <tab-item style="font-size:12px" active-class="tab-active" :selected="tabIndex == 2" v-tap="tabIndex = 2">家具</tab-item>
      <tab-item style="font-size:12px" active-class="tab-active" :selected="tabIndex == 3" v-tap="tabIndex = 3">机电</tab-item>
      <tab-item style="font-size:12px" active-class="tab-active" :selected="tabIndex == 4" v-tap="tabIndex = 4">配饰</tab-item>
      <tab-item style="font-size:12px" active-class="tab-active" :selected="tabIndex == 5" v-tap="tabIndex = 5">家用电器</tab-item>
    </tab>
    <div class="scroll-box-container" v-if="tabIndex == 0" :style="{width:'100%',height:.4*getScreenWidth()*.8+'px'}">
      <div :style="{width:'100%',height:.4*getScreenWidth()*.63+40+'px',}" class="scroll-box">
        <div class="pic_and_goods-list" :style="{width:list0.length*0.7*(.3*getScreenWidth()) - 20+'px',height:.4*getScreenWidth()*.63+'px',padding: '13px 0 0 0px'}">
          <div class="brand_item" v-for="good in list0" :style="{width: getScreenWidth()*.25*0.7 + 'px',height:.25*getScreenWidth()*0.7+'px', margin: '0 0 0 10px'}">
            <img :src="good.img" v-tap="goto(good.url)" style="border-radius: 50%;height: 100%;">
            <div class="good-name" :style="{height:.1*getScreenWidth()*.63+'px'}">{{good.name}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="scroll-box-container" v-if="tabIndex == 1" :style="{width:'100%',height:.4*getScreenWidth()*.8+'px'}">
      <div :style="{width:'100%',height:.4*getScreenWidth()*.63+40+'px',}" class="scroll-box">
        <div class="pic_and_goods-list" :style="{width:list1.length*0.7*(.3*getScreenWidth())- 10+'px',height:.4*getScreenWidth()*.63+'px',padding: '13px 0 0 0px'}">
          <div class="brand_item" v-for="good in list1" :style="{width: getScreenWidth()*.25*0.7 + 'px',height:.25*getScreenWidth()*0.7+'px', margin: '0 0 0 10px'}">
            <img :src="good.img" v-tap="goto(good.url)" style="border-radius: 50%;height: 100%;">
            <div class="good-name" :style="{height:.1*getScreenWidth()*.63+'px'}">{{good.name}}</div>
          </div>
        </div>
      </div>
    </div><div class="scroll-box-container" v-if="tabIndex == 2" :style="{width:'100%',height:.4*getScreenWidth()*.8+'px'}">
      <div :style="{width:'100%',height:.4*getScreenWidth()*.63+40+'px',}" class="scroll-box">
        <div class="pic_and_goods-list" :style="{width:list2.length*0.7*(.3*getScreenWidth())- 10+'px',height:.4*getScreenWidth()*.63+'px',padding: '13px 0 0 0px'}">
          <div class="brand_item" v-for="good in list2" :style="{width: getScreenWidth()*.25*0.7 + 'px',height:.25*getScreenWidth()*0.7+'px', margin: '0 0 0 10px'}">
            <img :src="good.img" v-tap="goto(good.url)" style="border-radius: 50%;height: 100%;">
            <div class="good-name" :style="{height:.1*getScreenWidth()*.63+'px'}">{{good.name}}</div>
          </div>
        </div>
      </div>
    </div><div class="scroll-box-container" v-if="tabIndex == 3" :style="{width:'100%',height:.4*getScreenWidth()*.8+'px'}">
      <div :style="{width:'100%',height:.4*getScreenWidth()*.63+40+'px',}" class="scroll-box">
        <div class="pic_and_goods-list" :style="{width:list3.length*0.7*(.3*getScreenWidth())- 10+'px',height:.4*getScreenWidth()*.63+'px',padding: '13px 0 0 0px'}">
          <div class="brand_item" v-for="good in list3" :style="{width: getScreenWidth()*.25*0.7 + 'px',height:.25*getScreenWidth()*0.7+'px', margin: '0 0 0 10px'}">
            <img :src="good.img" v-tap="goto(good.url)" style="border-radius: 50%;height: 100%;">
            <div class="good-name" :style="{height:.1*getScreenWidth()*.63+'px'}">{{good.name}}</div>
          </div>
        </div>
      </div>
    </div><div class="scroll-box-container" v-if="tabIndex == 4" :style="{width:'100%',height:.4*getScreenWidth()*.8+'px'}">
      <div :style="{width:'100%',height:.4*getScreenWidth()*.63+40+'px',}" class="scroll-box">
        <div class="pic_and_goods-list" :style="{width:list4.length*0.7*(.3*getScreenWidth())- 10+'px',height:.4*getScreenWidth()*.63+'px',padding: '13px 0 0 0px'}">
          <div class="brand_item" v-for="good in list4" :style="{width: getScreenWidth()*.25*0.7 + 'px',height:.25*getScreenWidth()*0.7+'px', margin: '0 0 0 10px'}">
            <img :src="good.img" v-tap="goto(good.url)" style="border-radius: 50%;height: 100%;">
            <div class="good-name" :style="{height:.1*getScreenWidth()*.63+'px'}">{{good.name}}</div>
          </div>
        </div>
      </div>
    </div><div class="scroll-box-container" v-if="tabIndex == 5" :style="{width:'100%',height:.4*getScreenWidth()*.8+'px'}">
      <div :style="{width:'100%',height:.4*getScreenWidth()*.63+40+'px',}" class="scroll-box">
        <div class="pic_and_goods-list" :style="{width:list5.length*0.7*(.3*getScreenWidth())- 20+'px',height:.4*getScreenWidth()*.63+'px',padding: '13px 0 0 0px'}">
          <div class="brand_item" v-for="good in list5" :style="{width: getScreenWidth()*.25*0.7 + 'px',height:.25*getScreenWidth()*0.7+'px', margin: '0 0 0 10px'}">
            <img :src="good.img" v-tap="goto(good.url)" style="border-radius: 50%;height: 100%;">
            <div class="good-name" :style="{height:.1*getScreenWidth()*.63+'px'}">{{good.name}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="module-more">
      <div class="module-description">更多品牌请进入建材板块</div>
      <div class="module-detail" v-tap="goto('./class-list.html')">查看建材</div>
    </div>
  </div>
  <!-- module end -->
  <div class="module-item" style="margin-bottom: 60px;background-color: #eee;">
    <div class="module-title-block"></div>
    <div class="module-title">家装攻略</div>
    <div class="item-others" v-for="rec in recList" v-tap="goto(rec.url)">
      <div class="img-wrapper">
        <img :src="rec.imgUrl">
      </div>
      <div class="text-wrapper" v-tap="gotoDetail(headline.id)">
        <div class="text-content">
         {{rec.title}}
        </div>
        <div class="text-source">
          {{rec.introduction}}
        </div>
      </div>
    </div>
  </div>
</div>
<j-footer style="z-index: 500;"></j-footer>
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
import {
  Tab,
  TabItem
} from 'vux-components/tab'
import axios from 'axios'

Lib.M.auth(axios, false)

export default {
  data() {
    return {
      tabIndex: 0,
      bannerIndex: 0,
      newBannerList: [],
      bannerList: [{
        url: 'javascript:',
        img: '/static/new/index/banner01.png'
      }, {
        url: './bannersec.html',
        img: '/static/images/banner/banner-2.png'
      }, {
        url: './class-list.html',
        img: '/static/images/banner/banner-3.jpg'
      }],
      headlineIndex: 0,
      headlineList: [
        {
          url: 'javascript:',
          img: '',
          title: "家装小百科：论“全包”“半包”“清包”的是与非"
        },{
          url: 'javascript:',
          img: '',
          title: '谨防装修报价单上的五大陷阱'
        },{
          url: 'javascript:',
          img: '',
          title: '遇到一言不合就开裂的墙，我们该怎么办？'
        }
      ],
      classList: [{
        id: 0,
        name: '去分期',
        url: 'instalment.html',
        img: '/static/new/index/icon01.png'
      }, {
        id: 1,
        name: '看建材',
        url: 'class-list.html',
        img: '/static/new/index/icon02.png'
      }, {
        id: 2,
        name: '找案例',
        url: 'pic-price.html',
        img: '/static/new/index/icon03.png'
      }, {
        id: 3,
        name: '找装修',
        url: 'brand-sp.html',
        img: '/static/new/index/icon04.png'
      },],
      // }, {
      //   id: 4,
      //   name: '找装修',
      //   url: 'worker-list.html',
      //   img: '/static/images/icon/找装修.png'
      // }, {
      //   id: 5,
      //   name: '建材',
      //   url: './class-list.html#type0',
      //   img: '/static/images/icon/建材.png'
      // }, {
      //   id: 6,
      //   name: '家具',
      //   url: './class-list.html#type3',
      //   img: '/static/images/icon/家具.png'
      // }, {
      //   id: 7,
      //   name: '家纺',
      //   url: './class-list.html#type2',
      //   img: '/static/images/icon/家纺.png'
      // }, {
      //   id: 8,
      //   name: '家电',
      //   url: './class-list.html#type1',
      //   img: '/static/images/icon/家电.png'
      // }, {
      //   id: 9,
      //   // name: '特价活动',
      //   name: '全部分类',
      //   // url: './gz-info.html',
      //   url: './all-class.html',
      //   img: '/static/images/icon/全部分类.png'
      // }],
      insList: [{
        id: 0,
        name: '线上看品牌',
        img: '/static/new/index/ins01.png'
      }, {
        id: 1,
        name: '线下挑商品',
        img: '/static/new/index/ins02.png'
      }, {
        id: 2,
        name: '支付',
        img: '/static/new/index/ins03.png'
      }, {
        id: 3,
        name: '生成订单',
        img: '/static/new/index/ins04.png'
      },],
      pic_and_goods: [{
        url: './pic-price-con.html?id=12',
        img: '/static/temp/pic_and_price/罗马假日.jpg',
      }, {
        url: './pic-price-con.html?id=21',
        img: '/static/temp/pic_and_price/桃花源.jpg',
      }, {
        url: './pic-price-con.html?id=14',
        img: '/static/temp/pic_and_price/天使爱美丽.jpg',
      },{
        url: './pic-price-con.html?id=6',
        img: '/static/temp/pic_and_price/现代北欧之柯达.jpg',
      },{
        url: './pic-price-con.html?id=20',
        img: '/static/temp/pic_and_price/永恒.jpg',
      }],
      list0: [{
        url: './brand-detail.html?id=22',
        img: '/static/brands/czwy/德立.png',
        name: '德立'
      }, {
        url: './brand-detail.html?id=84',
        img: '/static/brands/czwy/科勒洁具.png',
        name: '科勒'
      }, {
        url: './brand-detail.html?id=91',
        img: '/static/brands/czwy/朗斯.png',
        name: '朗斯'
      },{
        url: './brand-detail.html?id=99',
        img: '/static/brands/czwy/马可波罗.png',
        name: '马克波罗'
      },{
        url: './brand-detail.html?id=102',
        img: '/static/brands/czwy/美标.png',
        name: '美标'
      },{
        url: './brand-detail.html?id=151',
        img: '/static/brands/czwy/友邦.png',
        name: '友邦'
      },{
        url: './brand-detail.html?id=240',
        img: '/static/brands/czwy/亚细亚瓷砖.png',
        name: '亚细亚'
      },{
        url: './brand-detail.html?id=229',
        img: '/static/brands/czwy/TOTO.png',
        name: 'TOTO'
      }],
      list1: [{
        url: './brand-detail.html?id=11',
        img: '/static/brands/mz/博洛尼橱柜.png',
        name: '博洛尼橱柜'
      }, {
        url: './brand-detail.html?id=16',
        img: '/static/brands/mz/德尔.png',
        name: '德尔'
      }, {
        url: './brand-detail.html?id=27',
        img: '/static/brands/mz/顶固.png',
        name: '顶固'
      },{
        url: './brand-detail.html?id=108',
        img: '/static/brands/mz/摩兰.png',
        name: '摩兰'
      },{
        url: './brand-detail.html?id=77',
        img: '/static/brands/mz/久盛地板.png',
        name: '久盛地板'
      }],
      list2: [{
        url: './brand-detail.html?id=12',
        img: '/static/brands/jj/博洛尼家具.png',
        name: '博洛尼家具'
      }, {
        url: './brand-detail.html?id=26',
        img: '/static/brands/jj/邓禄普.png',
        name: '邓禄普'
      }, {
        url: './brand-detail.html?id=39',
        img: '/static/brands/jj/富莱德家具.png',
        name: '富莱德家具'
      },{
        url: './brand-detail.html?id=144',
        img: '/static/brands/jj/席梦思.png',
        name: '席梦思'
      },{
        url: './brand-detail.html?id=90',
        img: '/static/brands/jj/兰鼎犀.png',
        name: '兰鼎犀'
      },{
        url: './brand-detail.html?id=147',
        img: '/static/brands/jj/伊格瑞美.png',
        name: '伊格瑞美'
      }],
      list3: [{
        url: './brand-detail.html?id=267',
        img: '/static/brands/jd/宝仙娜.png',
        name: '宝仙娜'
      }, {
        url: './brand-detail.html?id=18',
        img: '/static/brands/jd/德国哈姆.png',
        name: '德国哈姆'
      }, {
        url: './brand-detail.html?id=266',
        img: '/static/brands/jd/德国永诺.png',
        name: '德国永诺'
      },{
        url: './brand-detail.html?id=46',
        img: '/static/brands/jd/韩国爱康.png',
        name: '韩国爱康'
      },{
        url: './brand-detail.html?id=242',
        img: '/static/brands/jd/智慧家居.png',
        name: '智慧家居'
      }],
      list4: [{
        url: './brand-detail.html?id=7',
        img: '/static/brands/ps/安然壁纸.png',
        name: '安然壁纸'
      }, {
        url: './brand-detail.html?id=42',
        img: '/static/brands/ps/格莱美墙纸.png',
        name: '格莱美墙纸'
      }, {
        url: './brand-detail.html?id=219',
        img: '/static/brands/ps/桑巴蒂.png',
        name: '桑巴蒂'
      },{
        url: './brand-detail.html?id=232',
        img: '/static/brands/ps/施耐德.png',
        name: '施耐德'
      },{
        url: './brand-detail.html?id=231',
        img: '/static/brands/ps/西门子.png',
        name: '西门子'
      },{
        url: './brand-detail.html?id=155',
        img: '/static/brands/ps/综益窗帘.png',
        name: '综益窗帘'
      }],
      list5: [{
        url: './brand-detail.html?id=2',
        img: '/static/brands/jydq/3M.png',
        name: '3M'
      }, {
        url: './brand-detail.html?id=19',
        img: '/static/brands/jydq/德国洁水.png',
        name: '德国洁水'
      }, {
        url: './brand-detail.html?id=20',
        img: '/static/brands/jydq/德国锐好.png',
        name: '德国锐好'
      },{
        url: './brand-detail.html?id=43',
        img: '/static/brands/jydq/格力空调.png',
        name: '格力空调'
      },{
        url: './brand-detail.html?id=78',
        img: '/static/brands/jydq/凯奈蒂克.png',
        name: '凯奈蒂克'
      },{
        url: './brand-detail.html?id=245',
        img: '/static/brands/jydq/科普.png',
        name: '科普'
      },{
        url: './brand-detail.html?id=103',
        img: '/static/brands/jydq/美的中央空调.png',
        name: '美的中央空调'
      },{
        url: './brand-detail.html?id=243',
        img: '/static/brands/jydq/美国GE.png',
        name: '美国GE'
      },{
        url: './brand-detail.html?id=237',
        img: '/static/brands/jydq/宜佳电.png',
        name: '宜佳电'
      }],
      openMenu: false,
      recList: [],
      picList: [],
    }
  },
  components: {
    JFooter,
    Swiper,
    Flexbox,
    FlexboxItem,
    XImg,
    Tab,
    TabItem,
  },
  ready() {
    this.getArticle()
    this.getDecStyle()
  },
  methods: {
    bannerOnChange(index) {
      this.bannerIndex = index
    },
    headlineOnChange(index) {
      this.headlineIndex = index
    },
    clickBanner(item){
      location.href = this.newBannerList[this.bannerIndex].url
    },
    getScreenWidth() {
      return document.body.clientWidth
    },
    gotoBrand(id, name) {
      window.location.href = `brand-list.html?id=${id}&name=${encodeURIComponent(name)}`
    },
    goto(url) {
      window.location.href = url
    },
    playVideo() {
      document.getElementById('adVideo').play()
    },
    getArticle() {
      axios.get('http://wx.jufenqi.com:8080/content/api/articles', {
        params: {
          filter: `enabled:true`,
          size: 8,
          sort: 'createdAt,DESC'
          // DESC
        }
      }).then((res) => {
        let arr = res.data.data
        arr.map((e, id) => {
          let content = JSON.parse(e.contentDelta)
          let imgList = []
          content.ops.map((l) => {
            if (l.insert.image) {
              imgList.push(l.insert.image)
            }
          })
          this.recList.push({
            id: e.id,
            title: e.title,
            introduction: e.introduction,
            imgUrl: imgList[0],
            url: `./headline-con.html?id=${e.id}`
          })
        })
        document.body.scrollTop = 0
      }).catch((err) => {
        console.log(err)
        throw err
      })
    },
    getDecStyle() {
      axios.get(`http://wx.jufenqi.com:8080/content/api/decoration-styles`).then((res) => {
        res.data.data.map((e) => {
          this.picList.push({
            id: e.id,
            name: e.name,
            img: Lib.C.imgUrl +e.decorationComponents[0].componentImg,
            url: `./pic-price-con.html?id=${e.id}`
          })
        })
      }).catch((err) => {
        console.log(err)
        throw err
      })
    },
  }
}
</script>
