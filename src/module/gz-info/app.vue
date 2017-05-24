<style lang="less">

.event {
  position: relative;
  box-sizing: border-box;
  .brand-wrap {
    box-sizing: border-box;
    width: 100%;
    padding: 0 6px 0 16px;
    margin-top: 40px;
    display: flex;
    flex-wrap: wrap;
    .brand {
      box-sizing: border-box;
      margin-bottom: 50px;
      width: 33.33%;
      height: calc(~"(100vw - 52px) / 3");
      border-right: 10px solid transparent;

      .cate {
        width: 100%;
        height: 100%;
        margin-bottom: 10px;
        position: relative;
        img {
          width: 100%;
          height: 100%;
        }
        .checked {
          width: 20px;
          height: 20px;
          position: absolute;
          right: 3px;
          top: 3px;
        }
      }
      .con {
        // width: 100%;
        width: calc(~"100% - 20px");
        margin: 0 auto;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 12px;
        font-weight: 300;
        border: 1px solid #ff9736;
        border-radius: 5px;
      }
    }
  }
  .bot {
    display: flex;
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    .left {
      height: 44px;
      padding-left: 16px;
      line-height: 44px;
      width: 75%;
      border-top: 1px solid #ebebeb;
    }
    .right {
      height: 45px;
      width: 25%;
      text-align: center;
      background-color: #ebebeb;
      color: #999;
      line-height: 45px;
      font-weight: 300;
      position: relative;
    }
    .active {
      background-color: #ff9736;
      color: #fff;
      border-color: #ff9736;
    }
  }
  .btn{
    position: absolute;
    width: 60px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    color: #ff9736;
    font-size: 14px;
    border-radius: 5px;
    left: -60px;
    top: 0;
  }
}
.vux-flexbox-item {
  color: #ff9736 !important;
}
</style>

<template>
  <div class="event">
    <div class="brand-wrap">
        <div class="brand" v-for="cate in list" track-by="$index" >
          <div class="cate">
            <img :src="cate.cateurl" v-tap="cate.show = !cate.show">
            <img src="/static/images/success-orange.png" class="checked" v-if="cate.show">
          </div>
          <div class="con" v-tap="getBrand(cate.cateId)">{{cate.brand}}</div>
        </div>
        
        <div class="bot">
          <div class="left">总价：<span style="color: #ff9736;">{{getTrue() * 500}}</span> 元</div>
          <div class="right" :class="{'active': getTrue() > 0}">
            立即支付
            <div class="btn" v-tap="allTrue(0)">全选</div>
          </div>
          
        </div>
    </div>
  </div>
  <loading :show="showLoading" text="正在加载品牌"></loading>
  <popup-picker title="选择品牌" :data="tmpBrands" :columns="1" :show-cell="false" :show.sync="showSelect" :value.sync="selectedBrand" @on-hide="onHide" show-name v-ref:cate></popup-picker>
</template>

<script>
import Lib from 'assets/Lib.js'
import axios from 'axios'
import PopupPicker from 'vux-components/popup-picker'
import Loading from 'vux-components/loading'
Lib.M.auth(axios)

export default {
  data() {
    return {
      list: [{
        cateurl: '/static/cizhuan.jpg',
        cateId: 10,
        brand: '马可波罗',
        brandId: 99,
        show: false,
      },{
        cateurl: '/static/diban.jpg',
        cateId: 11,
        brand: '德尔',
        brandId: 16,
        show: false,
      },{
        cateurl: '/static/weiyu.jpg',
        cateId: 31,
        brand: '法恩莎',
        show: false,
        brandId: 33
      },{
        cateurl: '/static/diaoding.jpg',
        cateId: 16,
        brand: '友邦',
        show: false,
        brandId: 151
      },{
        cateurl: '/static/dingzhi.jpg',
        cateId: 17,
        brand: '顶固',
        brandId: 27,
        show: false,
      },{
        cateurl: '/static/mumen.jpg',
        cateId: 25,
        brand: '霍尔茨',
        brandId: 61,
        show: false,
      }],
      tmpBrands: [],
      showLoading: false,
      showSelect: false,
      selectedBrand: []
    }
  },
  methods: {
    show(heihei) {
      return !heihei
    },
    getTrue() {
      let count = 0
      this.list.map((e) => {
        if (e.show) {
          count ++
        }
      })
      return count
    },
    allTrue(type) {
      if (type == 0) {
        this.list.map((e) => {
          e.show = true
        })
      } else {
        this.list.map((e) => {
          e.show = !e.show
        })
      }
    },
    getBrand(id) {
      this.tmpBrands = []
      this.showLoading = true
      axios.get(`${Lib.C.merApi}categories/${id}?expand=categoryBrands`).then((res) => {
        res.data.data.categoryBrands.map((e) => {
          if (e.brand) {
            this.tmpBrands.push({
              name: e.brand.name,
              value: [e.brand.id, e.id].join(',')
            })
          }
        })
        this.showSelect = true
        this.showLoading = false
      }).catch((err) => {
        this.showLoading = false
        throw err
      })
    },
    onHide() {
      if (this.selectedBrand.length > 0) {
        let tmpId = Number(this.selectedBrand[0].split(',')[0])
        let tmpExpand = Number(this.selectedBrand[0].split(',')[1])
        console.log(tmpId, tmpExpand)
        axios.get(`${Lib.C.merApi}brands/${tmpId}?expand=categoryBrands`).then((res) => {
          res.data.data.categoryBrands.map((cate) => {
            this.list.map((e) => {
              if (tmpExpand == cate.id && e.cateId == cate.category.id) {
                e.brandId = res.data.data.id
                e.brand = res.data.data.name
              }
            })
          })
          
        }).catch((err) => {
          throw err
        })
      }
      this.showSelect = false
      this.selectedBrand = []
    }
  },
  components: {
    PopupPicker,
    Loading
  },
  ready() {

  }
}
</script>
