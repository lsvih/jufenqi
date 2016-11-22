<template>
<div class="menu">
  <div class="menu-item" v-for="parent of classList" :class="{'active':select == $index}" v-tap="select = $index">
    <img :src="select == $index?activeImg(parent.img):parent.img">
    <div class="parent-name">{{parent.name}}</div>
  </div>
</div>
<div class="content">
    <div class="content-item" v-for="class of classList[select].child" v-tap="gotoClass(class.id)"><img :src="class.url">
      <div class="class-name">{{class.name}}</div>
    </div>
</div>
</template>

<script>
import Lib from 'assets/Lib.js'
import axios from 'axios'
export default {
  data() {
    return {
      classList: [{
        name: '建材',
        id: 1,
        img: '/static/images/icon/class-icon/jc.png',
        child: [{"id":1,"name":"中央空调","url":"/static/images/class/建材/中央空调.jpg"},{"id":2,"name":"入户门","url":"/static/images/class/建材/入户门.jpg"},{"id":3,"name":"净水器","url":"/static/images/class/建材/净水器.jpg"},{"id":4,"name":"卫浴","url":"/static/images/class/建材/卫浴.png"},{"id":5,"name":"吊顶","url":"/static/images/class/建材/吊顶.jpg"},{"id":6,"name":"地暖","url":"/static/images/class/建材/地暖.jpg"},{"id":7,"name":"地板","url":"/static/images/class/建材/地板.jpg"},{"id":8,"name":"壁纸","url":"/static/images/class/建材/壁纸.jpg"},{"id":9,"name":"家用电器","url":"/static/images/class/建材/家用电器.jpg"},{"id":11,"name":"散热器地暖","url":"/static/images/class/建材/散热器地暖.jpg"},{"id":12,"name":"智能家居","url":"/static/images/class/建材/智能家居.jpg"},{"id":13,"name":"木门","url":"/static/images/class/建材/木门.jpg"},{"id":14,"name":"楼梯","url":"/static/images/class/建材/楼梯.jpg"},{"id":15,"name":"榻榻米","url":"/static/images/class/建材/榻榻米.jpg"},{"id":16,"name":"橱柜","url":"/static/images/class/建材/橱柜.jpg"},{"id":17,"name":"沐浴房","url":"/static/images/class/建材/沐浴房.png"},{"id":18,"name":"灯具","url":"/static/images/class/建材/灯具.jpg"},{"id":19,"name":"瓷砖","url":"/static/images/class/建材/瓷砖.jpg"},{"id":20,"name":"电梯","url":"/static/images/class/建材/电梯.jpg"},{"id":21,"name":"空气净化器","url":"/static/images/class/建材/空气净化器.jpg"},{"id":22,"name":"窗帘","url":"/static/images/class/建材/窗帘.jpg"},{"id":23,"name":"门窗","url":"/static/images/class/建材/门窗.jpg"},]
      }, {
        name: '家具',
        id: 1,
        img: '/static/images/icon/class-icon/jj.png',
        child: [{"id":1,"name":"国产家具","url":"/static/images/class/家具/国产家具.jpg"},{"id":2,"name":"定制家具","url":"/static/images/class/家具/定制家具.jpg"},{"id":4,"name":"床垫","url":"/static/images/class/家具/床垫.jpg"},{"id":5,"name":"进口家具","url":"/static/images/class/家具/进口家具.jpg"},]
      }, {
        name: '家纺',
        id: 1,
        img: '/static/images/icon/class-icon/jf.png',
        child: [{"id":1,"name":"卫浴","url":"/static/images/class/家纺/卫浴.jpg"}]
      }, {
        name: '家电',
        id: 1,
        img: '/static/images/icon/class-icon/jd.png',
        child: [{"id":1,"name":"家用电器","url":"/static/images/class/家电/家用电器.jpg"}]
      }],
      select: Lib.M.GetRequest().type || 0,
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
    // })
  },
  methods: {
    getScreenWidth() {
      return document.body.clientWidth
    },
    gotoClass(id) {
      location.href = `brand-list.html?id=${id}`
    },
    activeImg(img) {
      let img_arr = img.split('.png')
      img_arr[0] += '-active.png'
      return img_arr[0]
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
    position: fixed;
    top: 0;
    left: 0;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    overflow-y: scroll;
    height: 100%;
    width: 81px;
    .menu-item {
        position: relative;
        height: 25%;
        width: calc(~"100% - 1px");
        border-bottom: 1px solid #e5e5e5;
        border-right: 1px solid #e5e5e5;
        background-color: #f8f8f8;
        font-size: 12px;
        color: #393939;
        img {
            width: 24px;
            height: 24px;
            position: absolute;
            top: calc(~"50% - 22px");
            left: calc(~"50% - 12px");
        }
        .parent-name {
            position: absolute;
            height: 12px;
            width: 100%;
            top: calc(~"50% + 10px");
            text-align: center;
        }
    }
    .active {
        color: #f5a623;
        background-color: #fff;
        border:1px solid #f5a623
    }
}
.cate {
    .cate-name {
        padding-left: 7px;
        margin: 10px 0;
        font-size: 12px;
        color: #393939;
    }
}
.content {
    position: absolute;
    top: 0;
    right: 0;
    overflow-x: hidden;
    width: calc(~"100% - 81px - 18px");
    padding: 16px 9px;
    .content-item {
        height: 100px;
        width: 78px;
        float: left;
        margin: 0 7px 20px;
        img {
            height: 78px;
            width: 78px;
        }
        .class-name {
            height: 12px;
            margin-top: 8px;
            width: 78px;
            text-align: center;
            color: #999;
            font-size: 12px;
        }
    }
}
</style>
