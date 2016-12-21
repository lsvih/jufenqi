<template>
<div class="menu">
  <div class="menu-item" v-for="parent of classList" :class="{'active':select == $index}" v-tap="select = $index">
    <img :src="select == $index?activeImg(parent.img):parent.img">
    <div class="parent-name">{{parent.name}}</div>
  </div>
</div>
<div class="content">
  <div class="content-item" v-for="class of classList[select].child" v-tap="gotoClass(class.id)"><img :src="img + class.showImg">
   <!-- <div class="class-name">{{class.name}}</div> -->
  </div>
</div>
</template>

<script>
import Lib from 'assets/Lib.js'
import axios from 'axios'
Lib.M.auth(axios)
export default {
  data() {
    return {
      classList: [{
        name: '建材',
        id: 1,
        img: '/static/images/icon/class-icon/jc.png',
        child: []
      }, {
        name: '家电',
        id: 2,
        img: '/static/images/icon/class-icon/jd.png',
        child: []
      }, {
        name: '家纺',
        id: 3,
        img: '/static/images/icon/class-icon/jf.png',
        child: []
      }, {
        name: '家具',
        id: 4,
        img: '/static/images/icon/class-icon/jj.png',
        child: []
      }, ],
      select: Lib.M.GetRequest().type || 0,
      img: Lib.C.imgUrl
    }
  },
  components: {},
  ready() {
    let that = this
    let array = [1,2,3,4]
    array.map((id)=>{that.getData(id)})
  },
  methods: {
    getData(id) {
      axios.get(`${Lib.C.merApi}categories`, {
        params: {
          size: 1000,
          filter: "parent:" + id
        },
        withCredentials: true,
      }).then((res) => {
        this.classList[id - 1].child = res.data.data
      }).catch((res) => {})
    },
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
    overflow-y: hidden;
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
        border: 1px solid #f5a623;
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
    width: calc(~"100% - 81px - 20px");
    padding: 10px;
    .content-item {
        height: auto;
        width: calc(~"50% - 5px");
        float: left;
        margin-bottom: 5px;
        img {
            height: auto;
            width: 100%;
        }
        .class-name {
            height: 12px;
            margin-top: 8px;
            width: 100%;
            text-align: center;
            color: #999;
            font-size: 12px;
        }
    }
    .content-item:nth-child(odd){
      margin-right: 10px;
    }
}
</style>
