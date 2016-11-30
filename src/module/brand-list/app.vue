<template>
<div class="select" v-tap="showSelect = true">
  {{$refs.cate.getNameValues()||'品类'}}<img src="./select.png"></div>
<popup-picker title="地区" :data="categories" :columns="2" :show-cell="false" :show.sync="showSelect" :value.sync="selectedCate" @on-hide="onHide" show-name v-ref:cate></popup-picker>
<loading :show="showLoading" text="正在加载品牌"></loading>

<div class="content">
<div class="brand" v-for="brand in brands" :style="{width:(getScreenWidth()-4)/3+'px',height:(getScreenWidth()-4)/3+'px'}"><img :src="img + brand.img"></div>
</div>
</div>
</template>

<script>
import Lib from 'assets/Lib.js'
import PopupPicker from 'vux-components/popup-picker'
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
      cateId: Lib.M.GetRequest().id,
      brandList: [],
      img: Lib.C.imgUrl,
      categories: [],
      selectedCate: [],
      showSelect: false,
      showLoading: false
        //brandList:[{id,name,img,description}]
    }
  },
  components: {
    PopupPicker,
    Loading
  },
  ready() {
    this.getData(this.cateId)
    let that = this
    axios.get(`${Lib.C.merApi}categories`).then((res) => {
      res.data.data.map((e) => {
        that.categories.push({
          name: e.name,
          value: String(e.id),
          parent: e.parent === null ? 0 : String(e.parent.id)
        })
      })
    }).catch((res) => {
      console.log(res) //error
    })
  },
  methods: {
    getData(id) {
      this.showLoading = true

    },
    onHide() {
      if (this.selectedCate.length) {
        this.cateId = this.selectedCate[1]
        this.getData(this.cateId)
      }
    },
    goBandDetail(id) {
      location.href = `brand-detail.html?id=${id}`
    },
    getScreenWidth() {
      return document.body.clientWidth
    },
  }
}
</script>

<style>
body {
  background-color: #eee;
}
</style>
<style scoped lang="less">
.select {
    position: fixed;
    top: 0;
    left: 0;
    height: 40px;
    width: 100%;
    background-color: #fff;
    text-align: center;
    font-size: 12px;
    color: #393939;
    line-height: 40px;
    img {
        width: 6px;
        height: 4px;
        margin-left: 8px;
        vertical-align: middle;
    }
}
.content{
  padding-top: 70px;
  margin-left: 1px;
  height: auto;
  width: calc(~"100% - 1px");
  .brand{
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
</style>
