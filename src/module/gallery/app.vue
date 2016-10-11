<template>
  <waterfall
       :line="line"
       :line-gap="200"
       :min-line-gap="180"
       :max-line-gap="220"
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

       >{{item.bc}}
         <div class="item" :style="{'backGroundColor':item.bc}" :index="item.index"></div>
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
      line: 'h',
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
    ItemFactory:function(e){

      var lastIndex = 0

      function generateRandomItems (count) {
        var items = [], i
        for (i = 0; i < count; i++) {
          items[i] = {
            index: lastIndex++,
            bc: getRandomColor(),
            width: 100 + ~~(Math.random() * 50),
            height: 100 + ~~(Math.random() * 50)
          }
        }
        return items
      }

      function getRandomColor () {
        var colors = [
          'rgba(21,174,103,.5)',
          'rgba(245,163,59,.5)',
          'rgba(255,230,135,.5)',
          'rgba(194,217,78,.5)',
          'rgba(195,123,177,.5)',
          'rgba(125,205,244,.5)'
        ]
        return colors[~~(Math.random() * colors.length)]
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
</style>
