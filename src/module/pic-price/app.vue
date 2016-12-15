<template>
  <div id="app">
    <div class="banner">
      <swiper class="module-swiper" loop auto height="200px" dots-class="dot-custom" :list="bannerList" :index="bannerIndex" @on-index-change="bannerOnChange" :show-desc-mask="false" dots-position="center" :interval="5000">
    </div>
    <div class="listWrapper">
      <div class="houseStyle">
        <div></div>
        <span>风格名称</span>
        <div></div>
      </div>
      <div v-for="(space, type) in spaces">
        <div class="group-title">{{ spaceEnum[type] }}<span class="group-title-en">{{ spaceEnumEn[type] }}</span></div>
        <slider style="border-bottom: 5px solid #fbfbfb" :scale="0.84">
          <div v-if="sp.design_img_url" v-for="sp in space" class="group-slide-item md-whiteframe-3dp" layout="column">
            <div v-tap="navigate(sp)" class="item-container">
              <v-img :src="sp.design_img_url"></v-img>
              <div class="text-block">
                <div class="description">{{ sp.description }}</div>
                <div class="title-group" layout="row">
                  <div class="title" flex>{{ sp.name }}</div>
                  <div class="price">¥{{ total(sp) }}整体软装</div>
                </div>
              </div>
            </div>
          </div>
        </slider>
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
    Slider,
    Flexbox
  },
  data () {
    return {
      bannerIndex: 0,
      bannerList: [],
      spaces: [],
      spaceEnum: ['客厅', '餐厅', '主卧', '次卧'],
      spaceEnumEn: ['Living Room', 'Dining Room', 'Bedroom', 'Subaltern Room']
    }
  },
  created() {
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
  background-color: #666;
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
  background-color: #ccc;
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
.group-title {
  padding: 14px 12px;
  /*text-align: center;*/
  font-size: 1.2em;
  color: #424242;
  font-weight: bold;
}

.group-title-en {
  font-weight: normal;
  font-size: 13px;
  margin-left: 4px;
  color: #9e9e9e;
}

.image-group {
  white-space: nowrap;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;

}

.image-group div {
  display: inline-block;
  width: 72%;
  margin: 0 16px;
}

.image-group div + div {
  margin-left: 0;
}
</style>
