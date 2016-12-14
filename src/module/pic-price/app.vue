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
      <div class="swiper"></div>
      <ul>
        <li v-for="pic in picList"></li>
      </ul>
    </div>
  </div>
</template>

<script>
import Lib from 'assets/Lib.js'
import JFooter from 'components/j-footer'
import Swiper from 'vux-components/swiper'
import axios from 'axios'
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
    JFooter
  },
  data () {
    return {
      bannerIndex: 0,
      bannerList: []
    }
  },
  methods: {
    bannerOnChange(index) {
      this.bannerIndex = index;
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
  .swiper {
    height: 350px;
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
</style>
