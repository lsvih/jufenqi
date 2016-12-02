<template>
<div class="jufenqi-form" v-bind:style="{backgroundColor:back_groud_color}">
  <!-- 防止露缝 -->
  <div class="patch" v-bind:style="{backgroundColor:back_groud_color}"></div>
  <input id="name" type="text" placeholder="请输入您的称呼" v-bind:style="{border:_border}"/>
  <input id="phone" type="tel" placeholder="请输入手机号码" v-bind:style="{border:_border}"/>
  <div class="select-address" v-tap="showSelect = true" v-bind:style="{border:_border}">{{$refs.area.getNameValues()||'请选择房屋所在城市'}}</div>
  <div class="submit-btn">立即申请</div>
</div>
<popup-picker title="地区" :data="area" :columns="3" :show-cell="false" :show.sync="showSelect" :value.sync="areaSelect" show-name v-ref:area></popup-picker>
</template>
<script>
import PopupPicker from 'vux-components/popup-picker'
export default {
  components: {
    PopupPicker
  },
  data() {
    return {
      area: [{
        name: '北京',
        value: 'beijing',
        parent: 0
      }, {
        name: '北京市',
        value: 'bj',
        parent: 'beijing'
      }, {
        name: '东城',
        value: 'dc',
        parent: 'bj'
      }, {
        name: '西城',
        value: 'xc',
        parent: 'bj'
      }, {
        name: '海淀',
        value: 'hd',
        parent: 'bj'
      }, {
        name: '海淀',
        value: 'hd',
        parent: 'bj'
      }, {
        name: '朝阳',
        value: 'cy',
        parent: 'bj'
      }, {
        name: '丰台',
        value: 'ft',
        parent: 'bj'
      }, {
        name: '门头沟',
        value: 'mtg',
        parent: 'bj'
      }, {
        name: '石景山',
        value: 'sjs',
        parent: 'bj'
      }, {
        name: '房山',
        value: 'fs',
        parent: 'bj'
      }, {
        name: '通州',
        value: 'tz',
        parent: 'bj'
      }, {
        name: '顺义',
        value: 'sy',
        parent: 'bj'
      }, {
        name: '昌平',
        value: 'cp',
        parent: 'bj'
      }, {
        name: '大兴',
        value: 'dx',
        parent: 'bj'
      }, {
        name: '怀柔',
        value: 'hr',
        parent: 'bj'
      }, {
        name: '平谷',
        value: 'pg',
        parent: 'bj'
      }, {
        name: '延庆',
        value: 'yq',
        parent: 'bj'
      }, {
        name: '密云',
        value: 'my',
        parent: 'bj'
      }],
      showSelect: false,
      areaSelect: []
    }
  },
  props: {
    color: {
      type: String,
      default: '#ffffff'
    },
    border: {
      type: String,
      default: 'none'
    }
  },
  computed: {
    back_groud_color() {
      return this.color
    },
    _border(){
      return this.border
    }
  }
}
</script>

<style scoped lang="less">
.patch {
    position: absolute;
    height: 16px;
    left: 0;
    top: -8px;
    width: 100%;
}
.jufenqi-form {
    position: relative;
    height: 280px;
    width: 100%;
    text-align: center;
    input{
      position: absolute;
      left: 15px;
      border-radius:5px;
      height: 44px;
      background-color: #fff;
      line-height: 44px;
      width: calc(~"100% - 50px");
      font-size: 16px;
      color: #999;
      border:none;
      padding-left: 20px;
    }
    #name{
      position: absolute;
      top:25px;
    }
    #phone{
      position: absolute;
      top:89px;
    }
    .select-address{
      position: absolute;
      top:153px;
      left:15px;
      width: calc(~"100% - 50px");
      height: 44px;
      border-radius: 5px;
      background-color: #fff;
      font-size: 16px;
      color:#999;
      line-height: 44px;
      text-align: left;
      padding-left: 20px;
    }
    .submit-btn{
      width: calc(~"100% - 30px");
      height: 44px;
      position: absolute;
      top:216px;
      left:15px;
      background-color: #fbc300;
      color:#393939;
      text-align: center;
      line-height: 44px;
      border-radius: 5px;
    }
}
</style>
