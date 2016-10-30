<template>
<x-img v-for="class in classList" :src="class.showImg" class="class-item" :style="{width:(getScreenWidth()-41)/2 + 'px',height:(getScreenWidth()-41)/2 /167*100 + 'px'}" v-tap="gotoClass(class.id)">
</x-img>
</template>

<script>
import Lib from 'assets/Lib.js'
import XImg from 'vux-components/x-img'
export default {
  data() {
    return {
      classList: []
    }
  },
  components: {
    XImg
  },
  ready(){
    this.$http.get(`${Lib.C.merApi}categories`, {
      params: {size:1000}
    }).then((res) => {
      this.classList = res.data.data
    }, (res) => {
      alert("网络连接失败，请刷新重试")
      window.location.reload()
    })
  },
  methods: {
    getScreenWidth() {
      return document.body.clientWidth
    },
    gotoClass(id) {
      location.href = `brand-list.html?id=${id}`
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
