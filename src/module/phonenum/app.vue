<template>
	<div class="top-pic">
		<img src="bg.png" class="bg">
		<img src="logo.png" class="logo">
	</div>
	<div class="content">
		<div class="title">
			<img src="title.png">	
		</div>
		<div class="input-wrapper">
			<div class="phone-wrapper">
				<input type="number" name="" placeholder="请输入手机号码">
				<img src="phone.png" class="icon-phone">
			</div>
			<div class="identify-wrapper">
				<input type="number" placeholder="请输入验证码">
				<img src="identify.png" class="icon-test">
				<div class="sendid">发送验证码</div>
			</div>
			<div class="error">
				<img src="error.png" v-if="isSendIdError()" v-model="myPhoneNum">
				<div v-if="isSendIdError()" v-model="mySendId">验证码错误</div>
			</div>
			<div class="btn">
				<img src="btn-normal.png">
				<div class="btn-text">绑&ensp;&ensp;定</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
try {
  let now = Number(new Date().getTime())
  if (Number(JSON.parse(localStorage.user).expiredAt) < now||!JSON.parse(localStorage.user).profile.mobile) {
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
			myPhoneNum: 0,
			mySendId: 0,
			isSendId: false
		}
	},
	methods: {
		isSendIdError() {
			if (this.mySendId === 889333) {
				return true
			} else {
				return false
			}
		},
		isFinished() {

		}
	}
}
</script>
<style>
* {
	margin: 0;
}
body {
	background-color: #f7f7f7;
	position: relative;
}
</style>
<style lang="less">
.top-pic {
	width: 100%;
	position: relative;
	.bg {
		width: 100%;
	}
	.logo {
		position: absolute;
		width: calc(~"100% - 200px");
		top: 56px;
		left: 100px;
	}
}
.content {
	width: 100%;
	position: absolute;
	top: 197px;
	transition: all 0.5s ease;
	.title {
		width: 100%;
		font-size: 0;
		margin-bottom: -1px;
		img {
			width: 100%;
		}
	}
	.input-wrapper {
		background-color: #f7f7f7;
		margin: 0;
		padding-top: 51px;
		input {
		    display: block;
		    width: calc(~"100% - 76px");
		    height: 28px;
		    border-style: solid;
		    border-color: #eceff1;
		    border-width: 0 0 1px 0;
		    padding: 17px 0 17px 61px;
		    font-size: 15px;
		    margin: 0 auto;
		    background-color: #f7f7f7;
		    -webkit-appearance: none;
		}
		.sendid {
			position: absolute;
			right: 43px;
			top: 22px;
			color: #546e7a;
			font-size: 15px;
		}
		img {
			width: 20px;
			height: 20px;
	    }
	    .phone-wrapper {
	    	position: relative;
	    }
	    .icon-phone {
	    	position: absolute;
	    	top: 22px;
	    	left: 22px;
	    }
	    .identify-wrapper {
			position: relative;
	    }
	    .icon-test {
	    	position: absolute;
	    	top: 22px;
	    	left: 22px;
	    }
		input::placeholder{
			font-size: 15px;
			color: #b5b5b8;
		}
		.error {
			width: 100%;
			height: 40px;
			background-color: #f7f7f7;
			img {
				margin: 0 20px 0 22px;
				vertical-align: middle;
			}
			div {
				display: inline-block;
				color: #f83333;
				line-height: 40px;
				font-size: 15px;
			}
		}
		.btn {
			width: calc(~"100% - 15px");
			height: 51px;
			margin: 0 auto;
			position: relative;
			text-align: center;
			img {
				width: 100%;
				height: 100%;
				position: absolute;
				left: 0;
				top: 0;
				z-index: 0;
			}
			.btn-text {
				width: 100%;
				height: 100%;
				position: absolute;
				line-height: 51px;
				color: #fff;
				font-size: 15px;
				z-index: 1;
			}
		}
	}
}
</style>