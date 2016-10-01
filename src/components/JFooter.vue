<template>
<footer>
<div class="nav-class" v-for="class in moduleClass" :class="{'active':isSelected(class.ename)}">
  <img :src="class.icon">
<span class="nav-class-name">{{class.name}}</span>
</div>
</footer>
</template>

<script>
import Lib from 'assets/Lib.js'
export default {
  data(){
    return{
      moduleClass:[{
        name:'首页',
        ename:'index',
        icon:'',
        actIcon:''
      },{
        name:'分期',
        ename:'instalment',
        icon:'',
        actIcon:''
      },{
        name:'服务',
        ename:'service',
        icon:'',
        actIcon:''
      },{
        name:'个人',
        ename:'usercenter',
        icon:'',
        actIcon:''
      }]
    }
  },
  methods:{
    isSelected:(page)=>{
      return Lib.M.GetThisPage()==page
    }
  },
  ready:()=>{
    var footbar = document.querySelector("footer")
    footbar.style.top = `${screen.availHeight - footbar.offsetHeight}px`
  }
}
</script>
<style scoped>
footer{
  position: fixed;
  width: 100%;
  height:44px;
  left:0;
}
footer div{
  display: inline-block;
  width:25%;
}
.active{
  color:red!important
}
</style>
