<template>
<header>
  <div class="cart"  onclick="location.href='cart.html'"><img src="cart.png"></div>
  <div class="worker-logo"><img :src="worker.logo"></div>
  <div class="worker-name">{{worker.name}}</div>
  <div class="worker-description"><span class="worker-rank">口碑:<span class="detail-num">{{worker.rank}}</span></span><span>订单:<span class="detail-num">{{worker.orderNum}}</span></span>
  </div>
</header>
<div class="content">
  <group title="基本资料">
    <article>
      <flexbox>
        <flexbox-item>
          籍&nbsp;&nbsp;&nbsp;&nbsp;贯:{{worker.origin}}
        </flexbox-item>
        <flexbox-item>
          施工团队:{{worker.teamPeopleNum}}人
        </flexbox-item>
      </flexbox>
      <flexbox class="line">
        <flexbox-item>
          出生工种:{{worker.from}}
        </flexbox-item>
        <flexbox-item>
          政治面貌:{{worker.politics}}
        </flexbox-item>
      </flexbox>
      <flexbox class="line">
        <flexbox-item>
          从业年龄:{{worker.workYear}}
        </flexbox-item>
      </flexbox>
    </article>
  </group>
  <group title="从业经历">
    <article>
      <flexbox v-for="experience in worker.workExperience" :class="{'line':$index>=1}">
        <flexbox-item>
          {{experience.time}}&nbsp;&nbsp;{{experience.address}}
        </flexbox-item>
      </flexbox>
    </article>
  </group>
  <group title="装修小区">
    <article>
      <span v-for="area in worker.workArea">{{area}}&nbsp;&nbsp;</span>
    </article>
  </group>
  <group title="施工图片">
    <div class="module-item">
      <scroller lock-y scrollbar-x :height=".8*getScreenWidth()*.63+20+'px'" v-ref:goods>
        <div class="worker-product-list" :style="{width:worker.productList.length*(.8*getScreenWidth()+10)+'px',height:.8*getScreenWidth()*.63+'px'}">
          <div class="worker-product-item" v-for="good in worker.productList" :style="{width: getScreenWidth()*.8 + 'px',height:.8*getScreenWidth()*.63+'px'}">
            <x-img class="product-img" :scroller="$refs.goods" :src="good.src" @click="$refs.previewer.show($index)"></x-img>
          </div>
        </div>
      </scroller>
    </div>
  </group>

</div>



<previewer :list="worker.productList" v-ref:previewer :options="options"></previewer>
<footer>
  <div class="icon-item"><img src="share.png">
    <div>分享</div>
  </div>
  <div class="icon-item" v-if="isFavorite()"><img src="favorite.png">
    <div>收藏</div>
  </div>
  <div class="icon-item" v-else><img src="favorite.png">
    <div>收藏</div>
  </div>
  <div class="shop-list" onclick="location.href='shop-list.html'">查看门店</div>
</footer>
<previewer :list="worker.productList" v-ref:previewer :options="options"></previewer>
</template>

<script>
import Lib from 'assets/Lib.js'
import Group from 'vux-components/group'
import Scroller from 'vux-components/scroller'
import XImg from 'vux-components/x-img'
import Cell from 'vux-components/cell'
import Previewer from 'vux-components/previewer'
import {
  Flexbox,
  FlexboxItem
} from 'vux-components/flexbox'
export default {
  data() {
    return {
      worker: {
        logo: 'http://placekitten.com/g/80/80',
        name: "hahaha",
        rank: 4.7,
        orderNum: 1002,
        origin: '安徽',
        teamPeopleNum: 12,
        from: '电工',
        politics: '党员',
        workYear: 10,
        workExperience: [{
          time: '2008-2016',
          address: '北京好参谋俱乐部'
        }, {
          time: '2008-2016',
          address: '北京好参谋俱乐部'
        }, {
          time: '2008-2016',
          address: '北京好参谋俱乐部'
        }],
        workArea: ["康宝家园1", "康宝家园2", "康宝家园3", "康宝家园4"],
        productList: [{
          src: 'http://placekitten.com/g/200/126',
          w: 200,
          h: 126
        }, {
          src: 'http://placekitten.com/g/200/126',
          w: 200,
          h: 126
        }, {
          src: 'http://placekitten.com/g/200/126',
          w: 200,
          h: 126
        }, {
          src: 'http://placekitten.com/g/200/126',
          w: 200,
          h: 126
        }]
      },

      options: {
        getThumbBoundsFn(index) {
          // find thumbnail element
          let thumbnail = document.querySelectorAll('.product-img')[index]
            // get window scroll Y
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            // optionally get horizontal scroll
            // get position of element relative to viewport
          let rect = thumbnail.getBoundingClientRect()
            // w = width
          return {
            x: rect.left,
            y: rect.top + pageYScroll,
            w: rect.width
          }
          // Good guide on how to get element coordinates:
          // http://javascript.info/tutorial/coordinates
        }
      }
    }
  },
  components: {
    Group,
    Cell,
    Scroller,
    XImg,
    Previewer,
    Flexbox,
    FlexboxItem
  },
  methods: {
    isFavorite(workerId) {
      return true
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

article {
  padding: 15px;
  font-size: 12px;
  color: #393939;
}

footer {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 44px;
  width: 100%;
  background-color: #fff;
}

.content {
  padding-bottom: 44px;
}
</style>
<style scoped lang="less">
.worker-product-list {
    height: auto;
    padding: 10px 15px 20px;
    position: relative;
    .worker-product-item {
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
header {
    position: relative;
    height: 160px;
    width: 100%;
    background-color: #fff;
    .cart {
        position: absolute;
        height: 19px;
        width: 24px;
        top: 13px;
        right: 11px;
        img {
            height: 100%;
            width: 100%;
        }
    }
    .worker-logo {
        position: absolute;
        top: 16px;
        left: 50%;
        height: 80px;
        width: 80px;
        margin-left: -40px;
        border-radius: 40px;
        border: 1px solid #ddd;
        overflow: hidden;
        img {
            height: 100%;
            width: 100%;
        }
    }
    .worker-name {
        position: absolute;
        top: 106px;
        left: 0;
        width: 100%;
        height: 16px;
        font-size: 16px;
        color: #393939;
        text-align: center;
    }
    .worker-description {
        position: absolute;
        bottom: 16px;
        left: 0;
        width: 100%;
        height: 12px;
        font-size: 12px;
        color: #727272;
        text-align: center;
        .worker-rank {
            margin-right: 20px;
        }
    }
}
footer {
    .shop-list {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 68%;
        height: 44px;
        background-color: #88C929;
        line-height: 44px;
        color: #fff;
        text-align: center;
        font-size: 16px;
    }
    .icon-item {
        position: absolute;
        bottom: 0;
        font-size: 12px;
        color: #eee;
        width: 16%;
        height: 44px;
        img {
            width: 20px;
            height: 20px;
            position: absolute;
            top: 4px;
            left: 50%;
            margin-left: -10px;
        }
        div {
            position: absolute;
            width: 100%;
            height: 12px;
            line-height: 12px;
            bottom: 4px;
            text-align: center;
            color: #999;
        }
    }
    .icon-item:first-child {
        left: 0;
    }
    .icon-item:nth-child(2) {
        left: 16%;
    }
}
.detail-num {
    color: #5965B2;
}
.line{
  margin-top: 10px;
}
</style>
