<style>
body {
  background-color: #eee;
}
html {
  width: 100%;
  height: 100%;
}
</style>
<style lang="less">
@font: #F1E2BE;
@bac: #EF913B;
@weuiDialogBackgroundColor: #FAFAFC;
@weuiDialogLineColor: #D5D5D6;
@weuiDialogLinkColor: #3CC51F;
@weuiDialogLinkActiveBc: #EEEEEE;

.user-container {
  width: 100%;
  height: 215px;
  background-image: url('/static/images/usercenter/user-bg.png');
  background-size: 100% 100%;
  position: relative;
  .img-wrapper {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .name-wrapper {
    font-size: 20px;
    color: @font;
    position: absolute;
    top: 150px;
    left: 50%;
    transform: translateX(-50%);
  }
  .to-usercenter {
    font-size: 12px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    top: 180px;
  }
}

.cell {
  height: 44px;
  line-height: 44px;
  background-color: #fff;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  color: #393939;
  margin-bottom: 1px;
  position: relative;
  img {
    transform: rotate(-90deg);
    width: 13px;
  }
  .label {
    font-size: 14px;
    img {
      width: 10px;
      margin-right: 5px;
    }
  }
  .right {
    font-size: 12px;
    font-weight: 300;
    line-height: 44px;
  }
  .abso {
    width: 100%;
    height: 100%;
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    line-height: 44px;
    font-size: 14px;
    color: #999;
    font-weight: 300;
  }
}
.logout {
  width: 50px;
  text-align: center;
  height: 30px;
  font-size: 12px;
  color: #ccc;
  line-height: 40px;
  border-bottom: 1px solid #ccc;
  margin: 70px auto;
}
/*
 * dialog css
 */
.setTapColor(@c:rgba(0,0,0,0)) {
    -webkit-tap-highlight-color: @c;
}
.setTopLine(@c: #C7C7C7) {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    border-top: 1px solid @c;
    color: @c;
    transform-origin: 0 0;
    transform: scaleY(0.5);
}
.setLeftLine(@c: #C7C7C7) {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 1px;
    height: 100%;
    border-left: 1px solid @c;
    color: @c;
    transform-origin: 0 0;
    transform: scaleX(0.5);
}
.weui_dialog_ft {
    position: relative;
    line-height: 42px;
    margin-top: 4px !important;
    font-size: 17px;
    display: flex;
    span {
        display: block;
        flex: 1;
        color: #888;
        text-decoration: none;
        &:active {
            background-color: @weuiDialogLinkActiveBc;
        }
    }
    &:after {
        content: " ";
        .setTopLine(@weuiDialogLineColor);
    }
    .primary {
        color: #f99736 !important;
    }
}
</style>

<template>

  <div class="user-container">
    <div class="img-wrapper"><img :src="userIcon"></div>
    <div class="name-wrapper">{{userName}}</div>
    <div class="to-usercenter" v-tap="goto('./usercenter.html')">返回个人中心</div>
  </div>
  <div class="cell" v-tap="nameChange = true">
    <div class="label">{{userName}}</div>
    <div class="right">
      修改昵称
      <img src="./select.png">
    </div>
  </div>
  <div class="cell" v-tap="phoneChange = true">
    <div class="label">{{userMobile}}</div>
    <div class="right">
      修改手机
      <img src="./select.png">
    </div>
  </div>
  <div class="cell" v-tap="goto('./logout.html')" style="margin-top: 80px;">
    <div class="abso">
      退出登录
    </div>
  </div>
<Dialog :show.sync="nameChange" >
  <p style="font-size: 18px;">修改昵称</p>
  <group>
    <x-input title="修改昵称" :value.sync="nickname" type="text" placeholder="请输入新昵称"></x-input>
  <div class="weui_dialog_ft">
    <span @click="nameChange = false" style="border-right: 1px solid #D5D5D6;">取消</span>
    <span :class="{'primary': isNameFilled()}" @click="isNameFilled()?nameChangePost(tempOrderNo):return">确认修改</span>
  </div>
  </group>
</Dialog>
<Dialog :show.sync="phoneChange" >
  <p style="font-size: 18px;">修改号码</p>
  <group>
    <x-input title="修改号码" :value.sync="mobile" type="number" placeholder="请输入新号码" ></x-input>
    <x-input :value.sync="vertiCode" type="number" placeholder="请输入验证码" >
    <span v-tap="send()" v-if="!isSendId" >获取验证码</span>
    <span v-if="isSendId" style="color: #b5b5b8" v-if="isSendId">{{time}}秒后可重试</span>
    </x-input>
  <div class="weui_dialog_ft">
    <span @click="phoneChange = false" style="border-right: 1px solid #D5D5D6;">取消</span>
    <span :class="{'primary': isPhoneFinished()}" @click="isPhoneFinished()?mobileChangePost():return">确认修改</span>
  </div>
  </group>
</Dialog>
<loading :show="loading" text="请稍后..."></loading>
</template>

<script>
import Lib from 'assets/Lib.js'
import axios from 'axios'
import Dialog from 'vux-components/dialog'
import Group from 'vux-components/group'
import XInput from 'vux-components/x-input'
import Loading from 'vux-components/loading'

Lib.M.auth(axios)
export default {
  data() {
    return {
      loading: false,
      userIcon: JSON.parse(localStorage.getItem('user')).profile.profileImage,
      userName: JSON.parse(localStorage.getItem('user')).profile.nickname,
      userMobile: JSON.parse(localStorage.getItem('user')).profile.mobile,
      bannerContent: {},
      nameChange: false,
      phoneChange: false,
      nickname: '',
      mobile: '',
      vertiCode: '',
      time: 0,
      timekeeper: null,
      isSendId: false
    }
  },
  components: {
    Dialog,
    Group,
    XInput,
    Loading
  },
  ready() {
  },
  methods: {
    goto(url) {
      location.href = url
    },
    isNameFilled() {
      return this.nickname
    },
    nameChangePost() {
      let temp = JSON.parse(localStorage.getItem('user'))
      temp.profile.nickname = this.nickname
      axios.post(`${Lib.C.userApi}customerProfiles/update`,
        temp.profile
      ).then((res) => {
        temp.profile = res.data.data
        localStorage.setItem('user', JSON.stringify(temp))
        alert('修改昵称成功！')
        location.reload()
      }).catch((err) => {
        alert('请求失败，请稍后再试。。')
      })
    },
    isTruePhoneNum() {
      let reg = /^1[3|4|5|7|8]\d{9}$/
      return reg.test(this.mobile)
    },
    isPhoneFinished() {
      let regVerti = /^\d{6}$/
      return this.isTruePhoneNum()&&regVerti.test(this.vertiCode)
    },
    send() {
      this.loading = true
      let that = this
      if (!this.isTruePhoneNum()) {
        this.loading = false
        alert('请输入正确的手机号码')
      } else {
        axios.post(`${Lib.C.userApi}sms/sendCode`, {}, {
          params: {
            mobile: this.mobile
          },
          withCredentials: true,
          responseType: true
        }).then(
          (res)=>{
            this.loading = false
            this.isSendId = true
            this.time = 60
            this.timekeeper = setInterval(() => {
              that.time --
              if (that.time === 0) {
                clearInterval(that.timekeeper)
                this.isSendId = false
              }
            }, 1000)
        }).catch((res) => {
            this.loading = false
            alert('服务器繁忙，请稍后重试')
            this.isSendId = false
        })
      }
    },
    mobileChangePost() {
      axios.post(`${Lib.C.userApi}auth/changeMobile`, {
        code: this.vertiCode,
        mobile: this.mobile
      }).then((res) => {
        let temp = JSON.parse(localStorage.getItem('user'))
        temp.profile.mobile = this.mobile
        localStorage.setItem('user', JSON.stringify(temp))
        alert('修改手机号成功!')
        location.reload()
      }).catch((err) => {
        let code = err.response.data.code
        if (code == 40004) {
          alert('手机已经被绑定！')
        }
        if (code == 90204) {
          alert('验证码错误，请重新输入')
        }
        if (code == 90205) {
          alert('验证码已过期，请重新发送')
        }
      })
    }
  }
}
</script>
