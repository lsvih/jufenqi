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
        height: 20px;
        width: 20px;
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
        background-color: #ff9736;
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
.line {
    margin-top: 10px;
}
.worker-demo {
  width: 100%;
  margin-bottom: 44px;
  img{
    width: 100%;
  }
}
</style>

<template>
<div class="worker-demo">
  <img :src="workerUrl">
</div>
<footer>
  <div class="icon-item"><img src="share.png">
    <div>分享</div>
  </div>
  <div class="icon-item" v-if="isFavorite" v-tap="cancelFavorite"><img src="favorite-fill.png">
    <div>已收藏</div>
  </div>
  <div class="icon-item" v-else v-tap="addWorkerTo('favorite')"><img src="favorite.png">
    <div>收藏</div>
  </div>
  <div class="shop-list" v-tap="addWorkerTo('cart')">添加到备选清单</div>
</footer>
<toast :show.sync="showToast" :text="toastText"></toast>
</template>

<script>
import Lib from 'assets/Lib.js'
import Group from 'vux-components/group'
import Scroller from 'vux-components/scroller'
import XImg from 'vux-components/x-img'
import Cell from 'vux-components/cell'
import Previewer from 'vux-components/previewer'
import Toast from 'vux-components/toast'
import {
  Flexbox,
  FlexboxItem
} from 'vux-components/flexbox'
import axios from 'axios'
Lib.M.auth(axios)
export default {
  data() {
    return {
      showToast: false,
      toastText: "",
      isFavorite: false,
      worker: {},
      imgUrl:Lib.C.imgUrl,
      id:Lib.M.GetRequest().id,
      imgSrc: '/static/images/工长demo/',
      workerUrl: ''
    }
  },
  components: {
    Group,
    Cell,
    Scroller,
    XImg,
    Flexbox,
    FlexboxItem,
    Toast
  },
  ready() {
    axios.get(`${Lib.C.userApi}workmanProfiles/${Lib.M.GetRequest().id}`).then((res) => {
      if (res.data.data == null) {
        window.document.body.style.display = "hidden"
        alert("您查看的信息不存在,请重新选择")
        window.history.go(-1)
      }
      console.log(res.data.data)
      this.worker = res.data.data
      this.workerUrl = `${this.imgSrc + res.data.data.nickname}详情页.jpg`
      this.isFavorite = this._isFavorite()
    }).catch((res) => {
      window.document.body.style.display = "hidden"
      alert("您查看的信息不存在,请重新选择")
      window.history.go(-1)
    })
  },
  methods: {
    getImage(){
      return findIdObj(this.id,this.newWorkerList).url
    },
    getScreenWidth() {
      return document.body.clientWidth
    },
    mapSrc(StringArr) {
      let arr = []
      StringArr.map((e) => {
        arr.push({
          src: e,
          w: 500,
          h: 500
        })
      })
      return arr
    },
    getTime(t) {
      let a = new Date(t)
      let b = new Date()
      return b.getYear() - a.getYear()
    },
    cancelFavorite() {
      let list = JSON.parse(window.localStorage.getItem('favorite'))
      for (let i in list.worker) {
        if (list.worker[i].userId === this.worker.userId) {
          list.worker.$remove(list.worker[i])
        }
      }
      window.localStorage.setItem('favorite', JSON.stringify(list))
      this.isFavorite = false
    },
    _isFavorite() {
      if (!localStorage.getItem('favorite')) {
        localStorage.setItem('favorite', JSON.stringify({
          worker: [],
          shop: []
        }))
        return false
      }
      return findSameWorker(this.worker.userId, JSON.parse(localStorage.getItem('favorite')).worker)
    },
    addWorkerTo(type) {
      Lib.M.authOnlyPhone()
      if (window.localStorage.getItem(type)) {
        let list = JSON.parse(window.localStorage.getItem(type))
        if (findSameWorker(this.worker.userId, list.worker)) {
          this.toastText = "已添加"
          this.showToast = true
        } else {
          list.worker.push(this.worker)
          window.localStorage.setItem(type, JSON.stringify(list))
          this.toastText = "添加成功"
          this.showToast = true
        }
      } else {
        let list = {
          worker: [],
          shop: []
        }
        list.worker.push(this.worker)
        window.localStorage.setItem(type, JSON.stringify(list))
        this.toastText = "添加成功"
        this.showToast = true
      }
      if (type === 'favorite') {
        this.isFavorite = true
      } else {
        setTimeout(() => {
          history.go(-1)
        }, 500)
      }
    },
    goto(url) {
      window.location.href = url
    }
  }
}
/**
 * 在列表中找到userId相同的项
 */
function findSameWorker(userId, workerList) {
  for (let worker of workerList) {
    if (worker.userId === userId) {
      return true
    }
  }
  return false
}

function findIdObj(id,array){
  for(let obj of array){
    if(id == obj.id){
      return obj
    }
  }
}
</script>
