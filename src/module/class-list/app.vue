<template>
<x-img v-for="class in classList" :src="class.img" class="class-item" :style="{width:(getScreenWidth()-41)/2 + 'px',height:(getScreenWidth()-41)/2 /167*100 + 'px'}" onclick="location.href='brand-list.html'">
</x-img>
</template>

<script>
import Lib from 'assets/Lib.js'
import XImg from 'vux-components/x-img'
export default {
  data() {
    return {
      classList: [{
        id: 1,
        img: 'http://placekitten.com/g/167/100'
      }, {
        id: 2,
        img: 'http://placekitten.com/g/167/100'
      }, {
        id: 3,
        img: 'http://placekitten.com/g/167/100'
      }, {
        id: 4,
        img: 'http://placekitten.com/g/167/100'
      }, {
        id: 5,
        img: 'http://placekitten.com/g/167/100'
      }]
    }
  },
  components: {
    XImg
  },
  methods: {
    getScreenWidth() {
      return document.body.clientWidth
    }
  }
}
</script>

<style>
body {
  background-color: #fff;
}
</style>
<style scoped lang="less">
.class-item {
    margin-top: 11px;
}
.class-item:nth-child(odd) {
    margin-left: 15px;
    margin-right: 11px;
}
.class-item:nth-child(even) {
    margin-right: 15px;
}
</style>
