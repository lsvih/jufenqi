<style scoped lang="less">
.swiper-container {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-image: url('/static/help/bg.png');
    background-size: 100% auto;
}
.slide {
    width: 100%;
    height: 100vh;
    img {
        width: 100%;
        height: auto;
        display: block;

    }
}
.imgFix {
    width: 100%;
    height: 100vh;
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
}
.img-left {
    position: fixed;
    bottom: 6.3%;
    left: 7%;
    z-index: 99;
    width: 30%;
}
.img-right {
    position: fixed;
    bottom: 2.6%;
    right: 4.4%;
    z-index: 99;
    width: 29%;
}
.swiper-slide {
    height: 100% !important;
}
</style>

<template>
<div class="swiper-container">
  <swiper :options="swiperOption">
    <swiper-slide v-for="img in imgFirst">
      <div class="slide" :style="setBack(img.imgUrl)"></div>
    </swiper-slide>
    <swiper-slide v-for="img in imgList" track-by="$index">
      <div class="slide" :style="setBack(img.imgUrl)"><img :src="img.icon"></div>
    </swiper-slide>
  </swiper>
</div>
<!-- <img src="/static/help/icon2.png" class="img-left"> -->
<!-- <img src="/static/help/icon1.png" class="img-right"> -->
</template>

<script>
import Lib from 'assets/Lib.js'
import axios from 'axios'
import {
  swiper,
  swiperSlide
} from 'vue-awesome-swiper'

Lib.M.auth(axios)
export default {
  data() {
    return {
      slideHeight: document.body.clientHeight,
      swiperOption: {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        direction: 'vertical',
        spaceBetween: 0
      },
      imgList: [{
        imgUrl: '/static/help/01.png',
        icon: '/static/help/item.png'
      }, {
        imgUrl: '/static/help/02.png',
        icon: '/static/help/item.png'
      }, {
        imgUrl: '/static/help/03.png',
        icon: '/static/help/item.png'
      }, {
        imgUrl: '/static/help/04.png',
        icon: '/static/help/item.png'
      }, {
        imgUrl: '/static/help/05.png',
        icon: '/static/help/item.png'
      }, {
        imgUrl: '/static/help/06.png',
        icon: '/static/help/item.png'
      }, {
        imgUrl: '/static/help/07.png',
        icon: '/static/help/item.png'
      }, {
        imgUrl: '/static/help/08.png',
        icon: '/static/help/item.png'
      }, {
        imgUrl: '/static/help/09.png',
        icon: '/static/help/item.png'
      }, ],
      imgFirst: [{
        imgUrl: '/static/help/1.png',
        icon: '/static/help/item.png'
      }, {
        imgUrl: '/static/help/2.png',
        icon: '/static/help/item.png'
      }, {
        imgUrl: '/static/help/3.png',
        icon: '/static/help/item.png'
      }, {
        imgUrl: '/static/help/4.png',
        icon: '/static/help/item.png'
      }, {
        imgUrl: '/static/help/5.png',
        icon: '/static/help/item.png'
      }, {
        imgUrl: '/static/help/6.png',
        icon: '/static/help/item.png'
      }, {
        imgUrl: '/static/help/7.png',
        icon: '/static/help/item.png'
      }, ]
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  ready() {},
  methods: {
    setBack(img) {
      return {
        backgroundImage: `url(${img})`,
        backgroundSize: '100% 100%'
      }
    },
    setB(id) {
      return {
        backgroundImage: `url(/static/help/${id}.png)`,
        backgroundSize: '100% auto'
      }
    },
    getScreenHeight() {
      return document.body.clientHeight
    }
  }
}
</script>
