<template>
  <waterfall
      class="waterfall-container"
       line="v"
       :line-gap="getScreenWidth()/2"
       :watch="items"
     >
       <!-- each component is wrapped by a waterfall slot -->
       <waterfall-slot
         v-for="item in items"
         :width="item.width"
         :height="item.height"
         :order="$index"
         move-class="item-move"
         transition="wf"
       >
<img class="item" :index="item.index" :src="item.img">
         </div>
       </waterfall-slot>
     </waterfall>

</template>

<script>
import Lib from 'assets/Lib.js'
import Waterfall from 'vue-waterfall/lib/waterfall'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'

export default {
  data() {
    return {
      items: this.ItemFactory(100),
      isBusy: false
    }
  },
  ready(){
    console.log(this.items)
  },
  components: {
    Waterfall,
    WaterfallSlot,
  },
  methods: {
    getScreenWidth() {
      console.log(document.body.clientWidth)
      return document.body.clientWidth
    },
    ItemFactory:function(e){

      var lastIndex = 0

      function generateRandomItems (count) {
        var items = [], i
        for (let i = 0; i < count; i++) {
          let w = 100 + ~~(Math.random() * 50)
          let h = 100 + ~~(Math.random() * 50)
          items[i] = {
            index: lastIndex++,
            width: w,
            height: h,
            img: `http://lorempixel.com/${w}/${h}`
          }
        }
        return items
      }
      return  generateRandomItems(e)

    },
    addItems: function () {
            if (!this.isBusy && this.items.length < 500) {
              this.isBusy = true
              this.items.push.apply(this.items, ItemFactory.get(50))
            }
          },
          shuffle: function () {
            this.items.sort(function () {
              return Math.random() - 0.5
            })
          }


  }
}
</script>

<style>
body{
  background-color: #eee;
  }</style>

<style lang="less" scoped>
.apply-success {
    position: relative;
    width: 100%;
    height: 200px;
    background-color: #fff;
    img {
        width: 70px;
        height: 70px;
        position: absolute;
        top: 40px;
        left: 50%;
        margin-left: -35px;
    }
    .process {
        padding-top: 200px;
    }
    .ins-status {
        position: absolute;
        width: 100%;
        top: 120px;
        text-align: center;
        font-size: 16px;
        color: #393939;
    }
    .ins-tips {
        position: absolute;
        font-size: 12px;
        width: 100%;
        top: 146px;
        text-align: center;
        color: #727272;
    }
}
.item{
  height:calc( ~"100% - 8px" );
  padding:8px 4px 0 4px;
  width: calc( ~"100% - 8px" );
}
</style>
