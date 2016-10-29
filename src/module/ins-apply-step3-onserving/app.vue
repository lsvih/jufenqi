<template>
<j-apply-process :step="3">
</j-apply-process>

<group title="请输入详细信息">
<x-input title="公司名称" type="text" :value.sync="company" placeholder="请输入真实的公司名称"></x-input>
<x-input title="职&nbsp;&nbsp;位" :value.sync="position" type="text" placeholder="请填写真实职位"></x-input>
<x-input title="月薪收入" :value.sync="monthlyIncome" type="Number" keyborad="number" placeholder="请填写实际收入"></x-input>
</group>
<x-button slot="right" :class="{'btn-active':isFilled()}" style="background-color:#e2e2e2;color:#fff;margin:20px 20px;width:calc( 100% - 40px )" v-tap="isFilled()?nextStep():return">提交</x-button>
<j-tel style="margin-top:30px"></j-tel>
</template>

<script>
import Lib from 'assets/Lib.js'
import JApplyProcess from 'components/JApplyProcess.vue'
import XInput from 'vux-components/x-input/'
import Group from 'vux-components/group/'
import Cell from 'vux-components/cell/'
import XButton from 'vux-components/x-button'
import JTel from 'components/JTel.vue'
export default {
  data() {
    return {
      selected:1,
      company:null,
      position:null,
      monthlyIncome:null
    }
  },
  components: {
    JApplyProcess,
    XInput,
    Group,
    Cell,
    XButton,
    JTel
  },
  methods: {
    isFilled(){
        return this.company!==null&&this.position!==null&&this.monthlyIncome!==null
    },
    nextStep(){
      let data = JSON.parse(window.localStorage.getItem("apply-info"))
      data.isIncumbent = true
      data.monthlyIncome = this.monthlyIncome
      data.company = this.company
      data.position = this.position
      this.$http.post(`${Lib.C.loanApi}user-application`,data).then((res)=>{
        window.location.href = './ins-apply-success.html?wait=true'
      },(res)=>{
        alert("提交申请失败，请稍候重试...")
      })
    }

  }
}
</script>

<style>
body{
  background-color: #eee;
}
.btn-active{
  background-color: rgb(136,201,40)!important;
}
</style>
