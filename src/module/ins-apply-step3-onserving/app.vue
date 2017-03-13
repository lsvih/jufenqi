<style>
body{
  background-color: #eee;
}
.btn-active{
  background-color: #ff9736 !important;
}
</style>

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
import JApplyProcess from 'components/j-apply-process'
import XInput from 'vux-components/x-input/'
import Group from 'vux-components/group/'
import Cell from 'vux-components/cell/'
import XButton from 'vux-components/x-button'
import JTel from 'components/j-tel'
import axios from 'axios'
Lib.M.auth(axios)
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
      if (data.id) {
        delete data.id
      }
      data.isIncumbent = true
      data.monthlyIncome = this.monthlyIncome
      data.company = this.company
      data.position = this.position
      axios.post(`${Lib.C.loanApi}user-application`,data).then((res)=>{
        data.id = res.data.data.id
        localStorage.setItem("apply-info",JSON.stringify(data))
        if (res.data.data.statusEnum == 0) {
          window.location.href = './ins-apply-failed.html'
        } else {
          window.location.href = './ins-apply-success.html?wait=true'
        }
      }).catch((res)=>{
        alert("提交申请失败，请稍候重试...")
        location.href = "./instalment.html"
      })
    }

  }
}
</script>