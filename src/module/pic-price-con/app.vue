<template>
  <div id="app">
    <div class="topPic"></div>
  <!--  <div class="methodShow">
      <p>方案展示</p>
    </div> -->
    <div class="contentWrapper">
      <div class="contentTab">
        <li :class="{'select': $index == tabIndex }" v-for="tab in tabData" v-tap="tabIndex = $index">{{tab}}</li>
      </div>
      <div class="content">
        <div class="imageList"></div>
      </div>
    </div>
    <div class="itemList">
      <p>空间包含物品</p>
      <div class="item-wrapper">
        <div class="item" v-for="icon in iconData|limitBy 5">
          <div class="item-icon"></div>
          <div class="item-con">{{icon.name}}</div>
        </div>
      </div>
      <div class="item-wrapper">
        <div class="item" v-for="icon in iconData|limitBy 5 5">
          <div class="item-icon"></div>
          <div class="item-con">{{icon.name}}</div>
        </div>
      </div>
    </div>
    <form>
      <input type="text" placeholder="请输入您的姓名">
      <input type="password" placeholder="请输入您的密码">
      <button>提交表单</button>
    </form>
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
    Flexbox
	},
	data() {
		return {
      tabIndex: 0,
      tabData: ['客厅', '厨房', '卧室', '卫生间'],
      iconData: [
        { name: '窗帘', url: '' },
        { name: '床', url: '' },
        { name: '书桌', url: '' },
        { name: '沙发', url: '' },
        { name: '窗帘', url: '' },
        { name: '床', url: '' },
        { name: '窗帘', url: '' },
        { name: '床', url: '' },
        { name: '书桌', url: '' },
        { name: '沙发', url: '' }
      ]
		}
	}
}
</script>
<style>
html {
  font-family: 'PingFang HK';
}
</style>
<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.topPic {
  width: 100%;
  height: 250px;
  background-color: #eaeaea;
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
  height: 400px;
  .contentTab {
    height: auto;
    display: flex;
    li {
      flex: 1;
      list-style: none;
      background-color: rgb(240, 239, 239);
      padding: 15px 0;
    }
    .select {
      background-color: rgb(152, 212, 72);
    }
  }
  .content {
    height: 350px;
    padding: 5px 10px;
    overflow-x: hidden;
    .imageList {
      width: 100%;
      height: 350px;
      background-color: #ccc;
    }
  }
}
.itemList {
  height: 190px;
  p {
    text-align: left;
  }
  .item-wrapper {
    display: flex;
    justify-content: space-around;
    .item-icon {
      width: 50px;
      height: 50px;
      background-color: #666;
      border-radius: 50%;
    }
    .item-con {
      font-size: 13px;
      color: #666;
    }
  }
}

form {
  height: 170px;
  border-top: 1px solid #000;
  padding: 50px 50px;
  input {
    display: block;
    width: 100%;
    height: 28px;
    border: 1px solid #000;
    padding: 2px;
    font-size: 18px;
    margin-bottom: 20px;
  }
  button {
    width: 102.5%;
    height: 40px;
    background-color: #f9850e;
    font-size: 20px;
    border: none;
}
}
</style>