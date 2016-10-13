<template>
<header>
  <div class="select-address">{{address}}<img src="select.png" class="select-icon"></div>
  <div class="select-class">品类<img src="select.png" class="select-icon"></div>
  <div class="sort">综合排序<img src="select.png" class="select-icon"></div>
  <span class="cart"><img src="cart.png"></span>
</header>
<div class="content">
  <group style="margin-top:-1.17647059em;">
    <cell v-for="shop in shopList" class="cell-item" @click="gotoShopDetail(shop.id)">
      <img :src="shop.img" class="shop-logo" width="120px" height="80px">
      <div class="shop-name">{{shop.name}}</div>
      <div class="shop-address">{{shop.address}}</div>
      <div class="shop-rate">评分:{{shop.rate}}</div>
      <img v-if="isFavorite(shop.id)" class="shop-is-favorite" src="star-fill.png">
      <img v-else class="shop-is-favorite" src="star.png">
    </cell>
  </group>
</div>
<div class="location-ball"><img src="fixed-ball.png"></div>
</template>

<script>
import Lib from 'assets/Lib.js'
import Group from 'vux-components/group'
import Cell from 'vux-components/cell'
export default {
  data() {
    return {
      address:"全北京",
      brandId:Lib.M.GetRequest().id,
      shopList: [],
      //shopList:[{id,name,img,address,rate}]
      reqUrl:`${Lib.C.apiUrl}stores?filter=brand_id:${Lib.M.GetRequest().id}`
    }
  },
  components: {
    Group,
    Cell,
  },
  methods: {
    isFavorite(shopId) {
      return true
    },
    gotoShopDetail(id){
      location.href= `shop-detail.html?id=${id}`
    }
  },
  ready(){
    this.$http.get(this.reqUrl).then((res) => {
      let stores = res.data.data.items
      let that = this
      stores.map((store)=>{
        that.shopList.push({
          id:store.id,
          name:store.name,
          img: null,
          address:store.address,
          rate: store.rate?store.rate:"暂无评分"
        })
      })

  }, (res) => {
    console.log(res)//error
  })
  }
}
</script>

<style>
body {
  background-color: #eee;
}
</style>
<style scoped lang="less">
.cell-item {
    position: relative;
    height: 80px;
    .shop-logo {
        position: absolute;
        top: 10px;
        left: 15px;
        width: 120px;
        height: 80px;
    }
    .shop-name {
        position: absolute;
        top: 10px;
        left: 145px;
        font-size: 12px;
        color: #393939;
    }
    .shop-address {
        position: absolute;
        top: 44px;
        left: 145px;
        font-size: 12px;
        color: #999;
        width: calc( ~"100% - 190px" );
        height: 30px;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;

    }
    .shop-rate {
        position: absolute;
        bottom: 10px;
        left: 145px;
        font-size: 12px;
        color: #3BA794;
    }
    .shop-is-favorite {
        position: absolute;
        top: 40px;
        right: 15px;
        width: 20px;
        height: 20px;
    }
}
.content {
    padding-top: 44px;
}
header {
    position: fixed;
    height: 12px;
    width: 100%;
    left: 0;
    top: 0;
    padding: 16px 0;
    background-color: #fff;
    z-index: 20;
    border-bottom: 1px solid #eee;
    .cart {
        position:absolute;
        right: 0;
        top:0;
        height: 44px;
        width: 44px;
        img{
          height: 100%;
          width: 100%;
        }
    }
    div{
      position: absolute;
      height: 12px;
      line-height: 12px;
      width: calc( ~"(100% - 44px - 3px )/3");
      text-align: center;
      font-size: 12px;
      .select-icon{
        vertical-align: middle;
        width: 6px;
        height: 4px;
        margin-left: 10px;
      }
    }
    .select-address{
      top:16px;
      left:0;
      border-right:1px solid #eee;
    }
    .select-class{
      top:16px;
      left:calc( ~"(100% - 47px )/3" );
      border-right:1px solid #eee;
    }
    .sort{
      top:16px;
      left:calc( ~"(100% - 47px )/3*2 " );
    }
}
.location-ball{
  position: fixed;
  bottom: 30px;
  right: 30px;
  height: 40px;
  width: 40px;
  img{
    height: 100%;
  width: 100%;

  }
}
</style>
