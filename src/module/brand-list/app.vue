<template>
<group style="margin-top:-1.17647059em;">
<cell v-for="brand in brandList" class="cell-item" v-tap="goBandDetail(brand.id)" v-show="brand.img">
<img :src="brand.img" class="brand-logo" width="120px" height="80px">
<div class="brand-name">{{brand.name}}</div>
<div class="brand-description">{{brand.description}}</div>
<img v-if="isFavorite(brand.id)" class="brand-is-favorite" src="star-fill.png">
<img v-else class="brand-is-favorite" src="star.png">
</cell>
</group>

</template>

<script>
import Lib from 'assets/Lib.js'
import Group from 'vux-components/group'
import Cell from 'vux-components/cell'
export default {
  data() {
    return {
      className: (Lib.M.GetRequest().name),
      brandList:[]
      //brandList:[{id,name,img,description}]
    }
  },
  components: {
    Group,
    Cell,
  },
  ready(){
    this.$http.get(`${Lib.C.apiUrl}categories?expand=categoryBrands.brand&max-per-page=500&per-page=500&filter=name:${this.className}`).then((res) => {
    let brands = res.data.data.items[0].categoryBrands
    let that = this
    brands.map((brand)=>{
      that.brandList.push({
        id:brand.brand.id,
        name:brand.brand.name,
        img:brand.brand.logo_img?Lib.C.imgUrl + brand.brand.logo_img:null,
        description:brand.brand.description
      })
    })
  }, (res) => {
    console.log(res)//error
  })
  },
  methods: {
    isFavorite(brandId){
      return false
    },
    goBandDetail(id){
      location.href=`brand-detail.html?id=${id}`
    }
  }
}
</script>

<style>
body {
  background-color: #eee;
}
</style>
<style scoped lang="less">
.cell-item{
  position: relative;
  height: 80px;
  .brand-logo{
    position: absolute;
    top:10px;
    left:15px;
    width: 120px;
    height: 80px;
  }
  .brand-name{
    position: absolute;
    top:10px;
    left:145px;
    font-size: 12px;
    color: #393939;
  }
  .brand-description{
    position: absolute;
    top:44px;
    left:145px;
    font-size: 12px;
    color: #999;
    width: calc( ~"100% - 190px" );
    height: 50px;
    text-align: left;
    overflow:hidden;
    text-overflow:ellipsis;
  }
  .brand-is-favorite{
    position: absolute;
    top:40px;
    right: 15px;
    width: 20px;
    height: 20px;
  }
}
</style>
