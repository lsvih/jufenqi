<template>
<div class="menu">
  <div class="menu-item" v-for="parent of classList" :class="{'active':select === $index}" v-tap="select = $index">
    <div class="active-border" v-if="select === $index"></div>
    <div class="parent-name">{{parent.name}}</div>
  </div>
</div>
<div class="content">
  <div class="content-item" v-for="class of classList[select].child" v-tap="gotoClass(class.id)"><img :src="class.img"><div class="class-name">{{class.name}}</div></div>
</div>
</template>

<script>
import Lib from 'assets/Lib.js'
import axios from 'axios'
export default {
  data() {
    return {
      classList: [{
        name: '家电',
        id: 1,
        child: [{
          name: '电视',
          id: 1,
          img: 'http://placekitten.com/500/500'
        }, {
          name: '冰箱',
          id: 2,
          img: 'http://placekitten.com/500/500'
        }]
      }, {
        name: '家电',
        id: 1,
        child: [{
          name: '电视',
          id: 1,
          img: 'http://placekitten.com/500/500'
        }, {
          name: '冰箱',
          id: 2,
          img: 'http://placekitten.com/500/500'
        },{
          name: '电视',
          id: 1,
          img: 'http://placekitten.com/500/500'
        }, {
          name: '冰箱',
          id: 2,
          img: 'http://placekitten.com/500/500'
        },{
          name: '电视',
          id: 1,
          img: 'http://placekitten.com/500/500'
        }, {
          name: '冰箱',
          id: 2,
          img: 'http://placekitten.com/500/500'
        },{
          name: '电视',
          id: 1,
          img: 'http://placekitten.com/500/500'
        }, {
          name: '冰箱',
          id: 2,
          img: 'http://placekitten.com/500/500'
        },{
          name: '电视',
          id: 1,
          img: 'http://placekitten.com/500/500'
        }, {
          name: '冰箱',
          id: 2,
          img: 'http://placekitten.com/500/500'
        },{
          name: '电视',
          id: 1,
          img: 'http://placekitten.com/500/500'
        }, {
          name: '冰箱',
          id: 2,
          img: 'http://placekitten.com/500/500'
        },{
          name: '电视',
          id: 1,
          img: 'http://placekitten.com/500/500'
        }, {
          name: '冰箱',
          id: 2,
          img: 'http://placekitten.com/500/500'
        },{
          name: '电视',
          id: 1,
          img: 'http://placekitten.com/500/500'
        }, {
          name: '冰箱',
          id: 2,
          img: 'http://placekitten.com/500/500'
        },{
          name: '电视',
          id: 1,
          img: 'http://placekitten.com/500/500'
        }, {
          name: '冰箱',
          id: 2,
          img: 'http://placekitten.com/500/500'
        },{
          name: '电视',
          id: 1,
          img: 'http://placekitten.com/500/500'
        }, {
          name: '冰箱',
          id: 2,
          img: 'http://placekitten.com/500/500'
        },{
          name: '电视',
          id: 1,
          img: 'http://placekitten.com/500/500'
        }, {
          name: '冰箱',
          id: 2,
          img: 'http://placekitten.com/500/500'
        },{
          name: '电视',
          id: 1,
          img: 'http://placekitten.com/500/500'
        }, {
          name: '冰箱',
          id: 2,
          img: 'http://placekitten.com/500/500'
        },{
          name: '电视',
          id: 1,
          img: 'http://placekitten.com/500/500'
        }, {
          name: '冰箱',
          id: 2,
          img: 'http://placekitten.com/500/500'
        },{
          name: '电视',
          id: 1,
          img: 'http://placekitten.com/500/500'
        }, {
          name: '冰箱',
          id: 2,
          img: 'http://placekitten.com/500/500'
        },{
          name: '电视',
          id: 1,
          img: 'http://placekitten.com/500/500'
        }, {
          name: '冰箱',
          id: 2,
          img: 'http://placekitten.com/500/500'
        },{
          name: '电视',
          id: 1,
          img: 'http://placekitten.com/500/500'
        }, {
          name: '冰箱',
          id: 2,
          img: 'http://placekitten.com/500/500'
        },{
          name: '电视',
          id: 1,
          img: 'http://placekitten.com/500/500'
        }, {
          name: '冰箱',
          id: 2,
          img: 'http://placekitten.com/500/500'
        },{
          name: '电视',
          id: 1,
          img: 'http://placekitten.com/500/500'
        }, {
          name: '冰箱',
          id: 2,
          img: 'http://placekitten.com/500/500'
        },{
          name: '电视',
          id: 1,
          img: 'http://placekitten.com/500/500'
        }, {
          name: '冰箱',
          id: 2,
          img: 'http://placekitten.com/500/500'
        }]
      }, {
        name: '家电',
        id: 1,
        child: [{
          name: '电视',
          id: 1,
          img: 'http://placekitten.com/500/500'
        }, {
          name: '冰箱',
          id: 2,
          img: 'http://placekitten.com/500/500'
        }]
      }, {
        name: '家电',
        id: 1,
        child: [{
          name: '电视',
          id: 1,
          img: 'http://placekitten.com/500/500'
        }, {
          name: '冰箱',
          id: 2,
          img: 'http://placekitten.com/500/500'
        }]
      }],
      select: 0,
      img: Lib.C.imgUrl
    }
  },
  components: {},
  ready() {
    // axios.get(`${Lib.C.merApi}categories`, {
    //   params: {size:1000}
    // }).then((res) => {
    //   this.classList = res.data.data
    // }).catch((res) => {
    //   alert("网络连接失败，请刷新重试")
    //   window.location.reload()
    // })
  },
  methods: {
    getScreenWidth() {
      return document.body.clientWidth
    },
    gotoClass(id) {
      location.href = `brand-list.html?id=${id}`
    }
  }
}
</script>

<style>
body {
  background-color: #fff;
}
</style>
<style scoped lang="less">
.menu {
    position: absolute;
    top: 0;
    left: 0;
    overflow-x: hidden;
    overflow-y: scroll;
    height: 100%;
    width: 81px;
    .menu-item {
        position: relative;
        height: 44px;
        width: calc(~"100% - 1px");
        border-bottom: 1px solid #e5e5e5;
        border-right: 1px solid #e5e5e5;
        background-color: #f8f8f8;
        font-size: 12px;
        text-align: center;
        line-height: 45px;
        color:#393939;
    }
    .active{
      color:#f5a623;
      background-color: #fff;
    }
    .active-border{
      position: absolute;
      left: 0;
      top:0;
      width: 3px;
      height: 100%;
      background-color: #f5a623;
    }
}
.content{
  position: absolute;
  top:0;
  right: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  height: calc(~"100% - 16px");
  width: calc(~"100% - 81px - 18px");
  padding: 16px 9px;
  .content-item{
    height: 100px;
    width: 78px;
    float: left;
    margin: 0 7px 20px 7px;
    img{
      height: 78px;
      width: 78px;
    }
    .class-name{
      height: 12px;
      width: 78px;
      text-align: center;
      color: #999;
      font-size: 12px;
    }
  }
}
</style>
