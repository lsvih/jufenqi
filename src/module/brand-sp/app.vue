<style>
body {
  background-color: #fff;
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
.content {
    margin-top: 50px;
    height: auto;
    background-color: #fff;
    width: 100%;
    .brand {
        position: relative;
        display:inline-block;
        img {
            position: absolute;
            top:20px;
            left:12.5px;
            width: calc(~"100% - 25px");
        }
        .brand-name{
            position: absolute;
            bottom: 10px;
            left:0;
            width: 100%;
            text-align: center;
            font-size: 12px;
            color:#393939;
        }
    }
}
.vux-popup-picker-header {
    color: #ff9736 !important;
}
</style>

<template>
<div class="select">
  {{'装修公司'}}</div>
<!-- <popup-picker title="地区" :data="categories" :columns="2" :show-cell="false" :show.sync="showSelect" :value.sync="selectedCate" @on-hide="onHide" show-name v-ref:cate></popup-picker> -->
<loading :show="showLoading" text="正在加载品牌"></loading>

<div class="content">
  <div class="brand" v-for="brand in brandList" :style="{width:getScreenWidth()/3+'px',height:getScreenWidth()/3+27+'px'}" v-tap="goBandDetail(brand.id)">
    <img :src="img + brand.logoImg">
    <div class="brand-name">{{brand.name}}</div>
  </div>
</div>
</div>
</template>

<script>
import Lib from 'assets/Lib.js'
import PopupPicker from 'vux-components/popup-picker'
import Loading from 'vux-components/loading'
import axios from 'axios'

Lib.M.auth(axios)

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
    this.getData(36)
    let that = this
    axios.get(`${Lib.C.merApi}categories`).then((res) => {
      res.data.data.map((e) => {
        that.categories.push({
          name: e.name,
          value: String(e.id),
          parent: e.parent === null ? 0 : String(e.parent.id)
        })
      })
    }).catch((err) => {
      throw err //error
    })
  },
  methods: {
    getData(id) {
      if(id != undefined){
         this.showLoading = true
      axios.get(`${Lib.C.merApi}categories/${id}?expand=categoryBrands`).then((res) => {
        this.brandList = res.data.data.categoryBrands.map((i) => {
          return i.brand
        })
        this.showLoading = false
      }).catch((err) => {
        this.showLoading = false
        throw err
      })
      }else{
        axios.get(`${Lib.C.merApi}brands?size=10000`).then((res) => {
        this.brandList = res.data.data
        this.showLoading = false
      }).catch((err) => {
        this.showLoading = false
        throw err
      })
      }

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
    }
  }
}
</script>