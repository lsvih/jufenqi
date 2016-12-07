<template>
<j-apply-process :step="3">
</j-apply-process>

<group title="请输入详细信息">
  <x-input title="每月收入" :value.sync="monthlyIncome" keyborad="number" type="Number" placeholder="请输入真实的每月收入"></x-input>
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
try {
  let now = Number(new Date().getTime())
  if (Number(JSON.parse(localStorage.user).expiredAt) < now) {
    localStorage.removeItem('user')
    location.href = './wxAuth.html?url=' + encodeURIComponent(location.href)
  }
  axios.defaults.headers.common['Authorization'] = JSON.parse(localStorage.getItem("user")).tokenType + ' ' + JSON.parse(localStorage.getItem("user")).token
} catch (e) {
  localStorage.clear()
  window.location.href = `./wxAuth.html?url=index.html`
}
export default {
  data() {
    return {
      selected: 1,
      monthlyIncome: null
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
  ready() {},
  methods: {
    isFilled() {
      return this.monthlyIncome !== null
    },
    nextStep() {
      let data = JSON.parse(window.localStorage.getItem("apply-info"))
      data.isIncumbent = false
      data.monthlyIncome = this.monthlyIncome
      axios.post(`${Lib.C.loanApi}user-application`, data).then((res) => {
        localStorage.setItem("apply-info", JSON.stringify(data))
        if (res.data.data.status == 0) {
          window.location.href = './ins-apply-failed.html'
        } else {
          window.location.href = './ins-apply-success.html?wait=true'
        }
      }).catch((res) => {
        alert("提交申请失败，请稍候重试...")
      })
    }
  }
}
</script>

<style>
body {
  background-color: #eee;
}

.btn-active {
  background-color: rgb(136, 201, 40)!important;
}
</style>
