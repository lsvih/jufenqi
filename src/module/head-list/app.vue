<style lang="less">
body {
  background-color: #eee;
  overflow: hidden;
}
.tab-wrapper {
  overflow-x: scroll; 
}
</style>
<template>
  <div>
    <div class="head-list">
      <scroller lock-y="true">
        <div class="tab-wrapper" :style="{width:tabList.length*.146*getScreenWidth()+'px', height:'44px'}">
          <tab active-color='#ff9537' :index.sync="tabIndex">
            <tab-item v-for="tab in tabList" style="font-size:12px" active-class="tab-active" :selected="tabIndex == $index" v-tap="tabIndex = $index">{{tab}}</tab-item>
          </tab>
        </div>
      </scroller>
    </div>
    <div class="swiper-wrapper">
      
    </div>
  </div>
</template>

<script>
import Lib from 'assets/Lib.js'
import axios from 'axios'
import { Tab, TabItem } from 'vux-components/tab'
import Scroller from 'vux-components/scroller'
import Swiper from 'vux-components/swiper'
Lib.M.auth(axios)
export default {
  data() {
    return {
      tabIndex: 0,
      tabList: ['头条', '订阅', '北京', '视频', '问答', '评测', '手机', '美搭', '型男', '趣玩', '体育']
    }
  },
  components: {
    Tab,
    TabItem,
    Scroller,
    Swiper
  },
  ready() {
    // axios.get(`${Lib.C.homeApi}operations?filter=id:${this.id}`).then((res) => {
    //   this.bannerContent = res.data.data[0]
    //   this.title = res.data.data[0].title
    //   document.title = this.title
    // }).catch((err) => {
    //   throw err
    // })
    console.log(this.tabList.length*.146*this.getScreenWidth()+'px')
  },
  methods: {
    getScreenWidth() {
      return document.body.clientWidth
    }
  }
}
</script>
