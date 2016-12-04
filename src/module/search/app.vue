<template>
<header>
  <form action="#">
    <input type="search" placeholder="请输入搜索内容" v-model="searchText" v-on:keypress="inputting()">
  </form>
  <div class="search" v-tap="search()">搜索</div>
</header>
<div class="content">
  <div class="brands" v-if="brands.length">
    <div class="brands-name">品牌 ({{brands.length}})</div>
    <div class="brand" v-for="brand in brands" v-tap="goto('./brand-detail.html?id='+brand.id)">{{brand.name}}</div>
  </div>
</div>
<loading :show="showLoading" text="正在搜索"></loading>
</template>

<script>
import Lib from 'assets/Lib.js'
import Loading from 'vux-components/loading'
import axios from 'axios'
try {
  axios.defaults.headers.common['Authorization'] = JSON.parse(localStorage.getItem("user")).tokenType + ' ' + JSON.parse(localStorage.getItem("user")).token
} catch (e) {
  localStorage.clear()
  window.location.href = `./wxAuth.html?url=index.html`
}
export default {
  data() {
    return {
      searchText: '',
      showLoading: false,
      brands: [],
      stores: []
    }
  },
  components: {
    Loading
  },
  methods: {
    search() {
      this.showLoading = true
      axios.get(`${Lib.C.merApi}brands?filter=name~${this.searchText}`).then((res) => {
        this.brands = res.data.data
        this.showLoading = false
        return false
      }).catch((res) => {
        alert("网络连接失败，请稍候重试")
        this.showLoading = false
      })
    },
    goto(url) {
      location.href = url
    },
    inputting(){
      if(event.keyCode==13){
        this.search()
      }
    }
  },
  ready() {
    document.getElementsByTagName('input')[0].focus()
  }
}
</script>

<style>
body {
  background-color: #eee;
  margin: 0;
}

header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 44px;
  z-index: 5;
  background-color: rgb(136, 201, 40);
}

.content {
  padding-top: 44px;
  width: 100%;
  z-index: 1;
}
</style>
<style lang="less" scoped>
header {
    input {
        -webkit-appearance: none;
        position: absolute;
        left: 15px;
        top: 7px;
        height: 30px;
        background-color: #fff;
        width: calc(~"100% - 80px");
        font-size: 12px;
        border: none;
        padding: 0 10px 0 10px;
        border-radius: 4px;
        color: #393939;
    }
    input::placeholder {
        font-size: 12px;
        color: #eee;
    }
    .search {
        position: absolute;
        height: 44px;
        margin-right: 15px;
        text-align: right;
        line-height: 44px;
        color: #fff;
        width: 40px;
        right: 0;
        font-size: 12px;
        top: 0;
    }
}
.content {
    .brands {
        font-size: 12px;
        .brands-name {
            width: 100%;
            height: 30px;
            background-color: #eee;
            padding-left: 15px;
            color: #393939;
            line-height: 30px;
        }
        .brand {
            width: 100%;
            height: 30px;
            padding-left: 15px;
            line-height: 30px;
            background-color: #fff;
            color: #999;
        }
    }
}
</style>
