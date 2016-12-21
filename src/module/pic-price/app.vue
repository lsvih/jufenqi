<template>
  <div id="app">
    <div class="banner">
      <swiper class="module-swiper" loop auto height="250px" dots-class="dot-custom" :list="bannerList" :index="bannerIndex" @on-index-change="bannerOnChange" :show-desc-mask="false" dots-position="center" :interval="5000" :show-dots="false">
      </swiper>
    </div>
    <div class="listWrapper">

      <div v-for="style in styles">
      <div class="houseStyle">
        <div></div>
        <span>{{ style.name }}</span>
        <div></div>
      </div>
        <!-- <div class="group-title"></div> -->
        <slider style="border-bottom: 5px solid #fbfbfb" :scale="0.84">
          <div v-for="sp in style.schemes" class="group-slide-item md-whiteframe-3dp" layout="column">
            <div v-tap="goto('./pic-price-con.html?id='+sp.id)" class="item-container">
              <img :src="imgUrl + sp.coverImg"></img>
              <div class="text-block">
                <div class="title-group" layout="row">
                  <div class="title" flex>{{ sp.coverTitle }}</div>
                </div>
              </div>
            </div>
          </div>
        </slider>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import Lib from 'assets/Lib.js'
import JFooter from 'components/j-footer'
import Swiper from 'vux-components/swiper'
import axios from 'axios'
import Slider from 'components/slider'
import {
  Flexbox,
  FlexboxItem
} from 'vux-components/flexbox'
Lib.M.auth(axios)
export default {
  name: 'app',
  components: {
    Swiper,
    JFooter,
    Slider,
    Flexbox
  },
  data () {
    return {
      imgUrl: Lib.C.imgUrl,
      bannerIndex: 0,
      bannerList: [],
      styles: [],
    }
  },
  ready() {
    axios.get(`${Lib.C.picpApi}carousels?filter=enabled%3Atrue`).then((res)=>{
      res.data.data.forEach((e)=>{
        this.bannerList.push({
          url: 'javascript:',
          img: this.imgUrl + e.coverImg
        })
      })
    }).catch((err)=>{
      throw err
    })
    axios.get(`${Lib.C.picpApi}styles?expand=schemes`).then((res)=>{
      this.styles = res.data.data
    }).catch((err)=>{
      throw err
    })
  },
  methods: {
    bannerOnChange(index) {
      this.bannerIndex = index;
    },
    getScreenWidth() {
      return document.body.clientWidth
    },
    gotoPriceCon(id, name) {
      window.location.href = `pic-price-con.html?id=${id}&name=${encodeURIComponent(name)}`
    },
    goto(url) {
      window.location.href = url
    }
  }
}
</script>
<style>
html {
  background-color: #ccc;
}
</style>
<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.dot-custom .vux-icon-dot {
  opacity: .7;
}

.dot-custom .vux-icon-dot.active {
  background-color: #88C929!important;
  opacity: 1;
}
.banner {
  width: 100%;
  height: 250px;
}
.listWrapper {
  width: 100%;
  height: 400px;
  background-color: #ccc;
  position: relative;
  .houseStyle {
    padding: 20px 0;
    background-color: #fff;
    font-size: 15px;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    div {
      width: 75px;
      height: 0.5px;
      background-color: #ccc;
      vertical-align: middle;
      margin-top: 10px;
    }
    span {
      display: inline-block;
      padding: 0 7px;
    }
  }
  ul {
    position: absolute;
    bottom: 30px;
    left: 30px;
    list-style: none;
    li {
      display: inline-block;
      width: 40px;
      height: 3px;
      background-color: #fff;
      & .select {
        background-color: orange;
      }
    }
  }
}
// slider's style
    .group-slide-item {
      padding: 0.6em;
      background-color: white;
      box-sizing: border-box;
      display: inline-block;
      transition: all cubic-bezier(0.785, 0.135, 0.15, 0.86) .6s;
      transform: scale(0.9);
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12);

      &.current {
        transform: scale(1);
        box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 3px 3px -2px rgba(0, 0, 0, 0.12);
      }

      .text-block {
        white-space: normal;

        .description {
          color: #bababa;
          font-size: 0.9em;
          margin: 0.5em 0;
          height: 6em;
        }

        .title-group {
          padding: 0.5em 0;
          margin-top: 0.8em;

          .title {
            color: #4c4455;
            font-weight: bold;
          }

          .price {
            color: #625b6a;
          }
        }
      }
    }

    .slide-title {
      align-items: center;
      white-space: normal;
      position: absolute;
      bottom: 0;
      background: rgba(255, 255, 255, 0.81);
      width: 100%;
      padding: 0.8em;
      box-sizing: border-box;

      .deco {
        margin-left: 1em;
        margin-right: 0.8em;
        border-radius: 40%;
        display: inline-block;
        background-color: #424242;
        width: 0.2em;
        height: 0.5em;
      }

      .text {
        color: #424242;
        font-size: 0.9em;
        font-weight: bolder;

        > * {
          display: inline-block;
          margin: 0;
        }
      }
    }
    .item-container{
      display: inline-block;
    background-color: #f3f3f3;
    img {
      width: 100%;
    }
    }

</style>
