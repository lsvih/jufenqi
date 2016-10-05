<template>
<group style="margin-top:-1.17647059em;">
<cell v-for="brand in brandList" class="cell-item" onclick="location.href='brand-detail.html'">
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
      brandList:[
        {
          id:1,
          name:'hahah',
          img:'http://placekitten.com/g/120/80',
          description:'123sdafsd'
        },{
          id:2,
          name:'hahah',
          img:'http://placekitten.com/g/120/80',
          description:'123sdafsd'
        },{
          id:3,
          name:'hahah',
          img:'http://placekitten.com/g/120/80',
          description:'123sdafsd'
        },{
          id:4,
          name:'hahah',
          img:'http://placekitten.com/g/120/80',
          description:'123sdafsd'
        }
      ]
    }
  },
  components: {
    Group,
    Cell,
  },
  methods: {
    isFavorite(brandId){
      return true
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
