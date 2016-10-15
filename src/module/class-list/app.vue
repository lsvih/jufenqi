<template>
<x-img v-for="class in classList" :src="class.url" class="class-item" :style="{width:(getScreenWidth()-41)/2 + 'px',height:(getScreenWidth()-41)/2 /167*100 + 'px'}" v-tap="gotoClass(class.id)">
</x-img>
</template>

<script>
import Lib from 'assets/Lib.js'
import XImg from 'vux-components/x-img'
export default {
  data() {
    return {
      classList: [{"id":0,"name":"中央空调","url":"/static/images/品类列表/中央空调.jpg"},{"id":1,"name":"入户门","url":"/static/images/品类列表/入户门.jpg"},{"id":2,"name":"吊顶","url":"/static/images/品类列表/吊顶.jpg"},{"id":3,"name":"国产家具","url":"/static/images/品类列表/国产家具.jpg"},{"id":4,"name":"地板","url":"/static/images/品类列表/地板.jpg"},{"id":5,"name":"地漏","url":"/static/images/品类列表/地漏.jpg"},{"id":6,"name":"壁纸","url":"/static/images/品类列表/壁纸.jpg"},{"id":7,"name":"定制家具","url":"/static/images/品类列表/定制家具.jpg"},{"id":8,"name":"家电","url":"/static/images/品类列表/家电.jpg"},{"id":9,"name":"家装","url":"/static/images/品类列表/家装.jpg"},{"id":10,"name":"床垫","url":"/static/images/品类列表/床垫.jpg"},{"id":11,"name":"开关面板","url":"/static/images/品类列表/开关面板.jpg"},{"id":12,"name":"散热器地暖","url":"/static/images/品类列表/散热器地暖.jpg"},{"id":13,"name":"普通散热器","url":"/static/images/品类列表/普通散热器.jpg"},{"id":14,"name":"智能","url":"/static/images/品类列表/智能.jpg"},{"id":15,"name":"木门","url":"/static/images/品类列表/木门.jpg"},{"id":16,"name":"楼梯","url":"/static/images/品类列表/楼梯.jpg"},{"id":17,"name":"榻榻米","url":"/static/images/品类列表/榻榻米.jpg"},{"id":18,"name":"橱柜","url":"/static/images/品类列表/橱柜.jpg"},{"id":19,"name":"油漆","url":"/static/images/品类列表/油漆.jpg"},{"id":20,"name":"洁具","url":"/static/images/品类列表/洁具.jpg"},{"id":21,"name":"淋浴房","url":"/static/images/品类列表/淋浴房.jpg"},{"id":22,"name":"灯具","url":"/static/images/品类列表/灯具.jpg"},{"id":23,"name":"瓷砖","url":"/static/images/品类列表/瓷砖.jpg"},{"id":24,"name":"电梯","url":"/static/images/品类列表/电梯.jpg"},{"id":25,"name":"白电","url":"/static/images/品类列表/白电.jpg"},{"id":26,"name":"硅藻泥","url":"/static/images/品类列表/硅藻泥.jpg"},{"id":27,"name":"空气净化器","url":"/static/images/品类列表/空气净化器.jpg"},{"id":28,"name":"软水净水","url":"/static/images/品类列表/软水净水.jpg"},{"id":29,"name":"进口家具","url":"/static/images/品类列表/进口家具.jpg"},{"id":30,"name":"门窗","url":"/static/images/品类列表/门窗.jpg"},{"id":31,"name":"防水","url":"/static/images/品类列表/防水.jpg"},{"id":32,"name":"阳光房","url":"/static/images/品类列表/阳光房.jpg"},{"id":33,"name":"饰品","url":"/static/images/品类列表/饰品.jpg"},]
        }
  },
  components: {
    XImg
  },
  methods: {
    getScreenWidth() {
      return document.body.clientWidth
    },
    gotoClass(id){
      location.href = `brand-list.html?id=${id}&name=${encodeURIComponent(this.classList[id].name)}`
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
