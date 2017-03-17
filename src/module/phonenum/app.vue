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
		transition: all 0.5s ease;
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
		.infoInput {
		    display: block;
		    width: calc(~"100% - 76px");
		    // height: 28px;
		    outline: none;
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
			right: 0;
			top: 0;
			padding: 17px 43px;
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
	    	top: 15px;
	    	left: 22px;
	    }
	    .identify-wrapper {
			position: relative;
	    }
	    .icon-test {
	    	position: absolute;
	    	top: 15px;
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
		.contact {
			display: flex;
			padding-left: 30px;
			height: 30px;
			line-height: 30px;
			input {
				outline: none;
				margin-right: 5px;
			}
			div {
				font-size: 14px;
				font-weight: 300;
				height: 30px;
				line-height: 13px;
				span {
					color: #ff9736;
				}
			}
		}
	}
}
</style>

<template>
	<div class="top-pic">
		<img src="bg.png" class="bg">
		<img src="logo.png" class="logo" id="myLogo">
	</div>
	<div class="content" id="myContent">
		<div class="title">
			<img src="title.png">
		</div>
		<div class="input-wrapper">
			<div class="phone-wrapper">
				<input class="infoInput" type="number" name="" placeholder="请输入手机号码" @focus="moveUpDown(1)" @blur="moveUpDown(0)" v-model="myPhoneNum">
				<img src="phone.png" class="icon-phone">
			</div>
			<div class="identify-wrapper">
				<input class="infoInput" type="number" placeholder="请输入验证码" @focus="moveUpDown(1)" @blur="moveUpDown(0)" v-model="myVerti" id="verti">
				<img src="identify.png" class="icon-test">
				<div v-if="!isSendId" class="sendid" v-tap="send()">发送验证码</div>
				<div v-if="isSendId" class="sendid" v-tap="moveUpDown(1)" style="color: #b5b5b8">{{time}}秒后可重试</div>
			</div>
			<div class="error">
				<img src="error.png" v-if="codeError" v-model="myPhoneNum">
				<div v-if="codeError">验证码错误</div>
			</div>
			<div class="contact">
				<input type="checkbox" v-tap="confirm()" v-model="myConfirm">
				<div class="text" v-tap="confirm()">我已同意<span v-tap="goto('./contact.html')">居分期用户协议</span></div>
			</div>
			<div class="btn" v-tap="isFinished?submit():return">
				<img v-if="isFinished()" src="btn-active.png">
				<img v-else src="btn-normal.png">
				<div class="btn-text">绑&ensp;&ensp;定</div>
			</div>
		</div>
	</div>
	<loading :show="loading" text="请稍后..."></loading>
</template>

<script>
import axios from 'axios'
import Lib from 'assets/Lib.js'
import Loading from 'vux-components/loading'
Lib.M.auth(axios)
export default {
	components: {
		Loading
	},
	data() {
		return {
			user: JSON.parse(localStorage.getItem("user")),
			myPhoneNum: '',
			myVerti: '',
			isSendId: false,
			loading: false,
			lastUrl: Lib.M.GetRequest().url ? unescape(Lib.M.GetRequest().url) : './index.html',
			time: 60,
			timekeeper: null,
			codeError: false,
			myConfirm: false
		}
	},
	methods: {
		active() {
			document.getElementById("verti").focus()
		},
		setTime() {
			this.time = 60
			let that = this
			this.timekeeper = setInterval(() => {
				that.time --
				if (that.time === 0) {
					clearInterval(that.timekeeper)
					this.isSendId = false
				}
			}, 1000)
		},
		goto(url) {
			window.location.href = './contact.html'
		},
		confirm() {
			this.myConfirm = !this.myConfirm
		},
		isTruePhoneNum() {
			let reg = /^1[3|4|5|7|8]\d{9}$/
			return reg.test(this.myPhoneNum)
		},
		isFinished() {
			let regVerti = /^\d{6}$/
			return this.isTruePhoneNum()&&regVerti.test(this.myVerti)&&this.myConfirm
		},
		moveUpDown(e) {
			if (e) {
				document.getElementById("myLogo").style.top = 11 + 'px'
				document.getElementById("myContent").style.top = 108 + 'px'
			} else {
				document.getElementById("myLogo").style.top = 56 + 'px'
				document.getElementById("myContent").style.top = 197 + 'px'
			}
		},
		send() {
			this.moveUpDown(1)
			this.loading = true
			let that = this
			if (!this.isTruePhoneNum()) {
				this.loading = false
				alert('请输入正确的手机号码')
			} else {
				axios.post(`${Lib.C.userApi}sms/sendCode`, {}, {
					params: {
						mobile: this.myPhoneNum
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
	    submit() {
	    	if (!this.isTruePhoneNum()) {
	    		alert('请输入正确的手机号码')
	    	} else if (!this.isFinished()) {
	    		alert('请输入6位的验证码')
	    	} else {
	    		axios.post(`${Lib.C.userApi}auth/registerUsingMobile`, {}, {
	    			params: {
	    				mobile: this.myPhoneNum,
	    				// userId: JSON.parse(localStorage.getItem("user")).userId,
	    				code: this.myVerti
		      		},
		      		withCredentials: true,
		      		responseType: true
		      	}).then((res) => {
		    		let data = res.data.data
			    	data.loginAt = new Date().getTime()
			    	data.expiredAt =String(Number(data.loginAt) + Number(data.expiresIn*1000 - 60*1000*100))
			    	window.localStorage.setItem("user", JSON.stringify(data))
			    	location.href = this.lastUrl
			    }).catch((res) => {
			    	this.loading = false
			    	this.active()
			    	let code = res.response.data.code
			    	// console.log(code)
			    	if (code == 40004) {
			    		alert('手机已经绑定了')
			    		let data = localStorage.getItem("user")
					    data.profile.mobile = this.myPhoneNum
					    window.localStorage.setItem("user", JSON.stringify(data))
			    		location.href = this.lastUrl
			    	} else if (code == 90204) {
			    		this.codeError = true
			    	}
			    })
			}
		}
	}
}
</script>