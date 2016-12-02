<template>
<j-apply-process :step="3">
</j-apply-process>

<group title="您当前的真实职业是">
<cell title="在职人员" link="ins-apply-step3-onserving.html" inline-desc="有稳定的收入来源:如教师、公司职员、公务员等" is-link style="height:80px;"></cell>
<cell title="自由人员" link="ins-apply-step3-free.html" inline-desc="自由职业:如网店卖家、自由撰稿人等" is-link style="height:80px;"></cell>
</group>
<!-- <x-button slot="right" style="background-color:rgb(136,201,40);color:#fff;margin:20px 20px;width:calc( 100% - 40px )" onclick="location.href='./ins-apply-step2.html'">下一步</x-button> -->
<j-tel style="margin-top:30px"></j-tel>
</template>

<script>
import Lib from 'assets/Lib.js'
import JApplyProcess from 'components/j-apply-process'
// import XInput from 'vux-components/x-input/'
import Group from 'vux-components/group/'
import Cell from 'vux-components/cell/'
// import XButton from 'vux-components/x-button'
import JTel from 'components/j-tel'
export default {
  data() {
    return {
      selected:1
    }
  },
  components: {
    JApplyProcess,
    // XInput,
    Group,
    Cell,
    // XButton,
    JTel
  },
  ready() {


  },
  methods: {



  }
}
</script>

<style>
body{
  background-color: #eee;
}
</style>
