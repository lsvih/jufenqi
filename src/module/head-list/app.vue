<style lang="less">
body {
  background-color: #eee;
  position: relative;
}
.head-list {
  width: 100%;
  height: 44px;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
}
.scroll-box {
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch; 
  &::-webkit-scrollbar {
    display: none;
  }
}
.tab-wrapper {
  overflow-x: scroll;
}
.swiper-wrapper {
  position: absolute;
  top: 44px;
  left: 0;
  z-index: 50;
}
.item-first {
  margin-top: 5px;
  padding: 9px 16px 15px 16px;
  background-color: #fff;
  .item-title {
    display: flex;
    width: 100%;
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    .img-wrapper {
      width: 20px;
      height: 16px;
      line-height: 34px;
      margin-right: 5px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    p {
      margin: 0;
      font-size: 16px;
    }
  }
  .cover-img {
    width: 100%;
    height: 168px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .text-content {
    width: 100%;
    height: auto;
    font-size: 12px;
    font-weight: 200;
    color: #393939;
    margin-top: 5px;
  }
}
.item-others {
  margin-top: 1px;
  padding: 15px 16px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  .text-wrapper {
    flex: 2;
    font-size: 16px;
    padding-right: 10px;
    .text-content {
      margin-bottom: 12px;
    }
    .text-source {
      color: #999;
      font-size: 12px;
    }
  }
  .img-wrapper {
    flex: 1;
    height: 73px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

</style>
<template>
  <div>
    <div class="head-list">
      <!-- <scroller :lock-y="true"> -->
      <div class="scroll-box">
        <div class="tab-wrapper" :style="{width:tabList.length*.167*getScreenWidth()+'px', height:'44px'}">
          <tab active-color='#ff9537' :index.sync="tabIndex">
            <tab-item v-for="tab in tabList" style="font-size:12px" active-class="tab-active" :selected="tabIndex == $index" v-tap="tabChange($index, tab.name)">{{tab.name}}</tab-item>
          </tab>
        </div>
      </div>
      <!-- </scroller> -->
    </div>
    <div class="swiper-wrapper">
        <!-- <div class="item-first">
          <div class="item-title">
            <div class="img-wrapper"><img src="http://placehold.it/350x150"></div>
            <p>显锋说他能打死一头牛，水电费水电费水电费水电费</p>
          </div>
          <div class="cover-img">
            <img src="http://placehold.it/350x150">
          </div>
          <div class="text-content">
          </div>
        </div> -->
        <!-- :height="getScreenHeight()-44+'px'" lock-x scrollbar-y -->
        <!-- <scroller> -->
        <div class="item-others" v-for="headline in headList">
          <div class="text-wrapper" v-tap="gotoDetail(headline.id)">
            <div class="text-content">
              {{titleTransform(headline.title)}}
            </div>
            <div class="text-source">
              来源：{{headline.source}}
            </div>
          </div>
          <div class="img-wrapper">
            <img :src="headline.coverImg">
          </div>
        </div>
        <!-- </scroller> -->
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
      tabList: [],
      tabName: '',
      headList: []
    }
  },
  components: {
    Tab,
    TabItem,
    Scroller,
    Swiper
  },
  ready() {
    this.getTabs()
  },
  methods: {
    getTabs() {
      axios.get(`http://wx.jufenqi.com:8080/content/api/headline-tabs`,{
        params: {
          size: 20
        }
      }).then((res) => {
        res.data.data.map((tab) => {
          this.tabList.push({name: tab.name})
        })
        this.tabName = this.tabList[0].name
        this.getHeadlist(this.tabName)
      }).catch((err) => {
        alert('获取信息失败，请稍后再试')
      })
    },
    getScreenWidth() {
      return document.body.clientWidth
    },
    getSrcreenHeight() {
      return document.body.clientHeight
    },
    getHeadlist(name) {
      axios.get(`http://wx.jufenqi.com:8080/content/api/headline-list`, {
        params: {
          filter: 'tabName:' + name
        }
      }).then((res) => {
        this.headList = res.data.data
      }).catch((err) => {
        alert('获取列表信息失败，请稍后再试')
      })
    },
    titleTransform(string) {
      return string.split(' ')[0]
    },
    tabChange(id, name) {
      this.tabIndex = id
      this.getHeadlist(name)
    },
    gotoDetail(headId) {
      location.href = `./headline-con.html?id=${headId}`
    }
  }
}
</script>
