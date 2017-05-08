<style lang="less">
@orange: #ff9736;
.tab-wrapper {
	width: 100%;
	height: 44px;
	display: flex;
	justify-content: space-around;
	.tab {
		flex: 1;
		height: 100%;
		text-align: center;
		line-height: 44px;
		background-color: @orange;
		font-size: 12px;
		color: #fff;
	}
}
.content {
	padding-top: 20px;
	text-align: center;
	font-size: 30px;
}
.select {
	background-color: #fff !important;
	color: #000 !important;
}
.tab-active {
    color: #ff9736 !important;
    border-color: #88C929 !important;
    font-size: 12px!important;
}
.btn {
	cursor: pointer;
	width: 80px;
	height: 44px;
	line-height: 44px;
	font-size: 14px;
	color: #fff;
	background-color: #ff9736;
	border-radius: 5px;
	text-align: center;
	margin: 20px auto;
}
</style>
<template>
	<div class="tab-wrapper">
		<div class="tab" v-for="n in 3" track-by="$index" v-tap="changeIndex($index)" :class="{'select': tabIndex == $index}">第{{n+1}}个tab</div>
	</div>
	<div class="content">
		{{array[tabIndex].name}}
	</div>
	<div class="btn" v-tap="tryQr()">
		获取二维码
	</div>
	<!-- <div v-for="date in dates">
		{{result(date)|currency '￥' 2}}
	</div> -->
</template>

<script>
import {
  Tab,
  TabItem
} from 'vux-components/tab'
import axios from 'axios'
import Lib from 'assets/Lib.js'

Lib.M.auth(axios)

export default {
	data() {
		return {
			array: [
			{
				name: '尼玛'
			},{
				name: '卧槽'
			},{
				name: '几把'
			}
			],
			// brands: [69,75,85,94,98,109,107,105,113,111,126,127,154,133,137,141,140,143,145,149,161,174,179,197,198],
			brands: [],
			tabIndex: 0,
			token: '',
// 			dates: [5364091,
// 520320,
// 480000,
// 1711176,
// 686603,
// 686603,
// 5695192,
// 396304,
// 13468000,
// 1607447,
// 138144,
// 805248,
// 47808000,
// 475765,
// 268879,
// 4011289,
// 5622773,
// 2392490,
// 5617026,
// 2503894,
// 19200000,
// 25824000,
// 874496,
// 47808000,
// 24000000,
// 7232417,
// 5825544,
// 968602,
// 38208000,
// 2704131,
// 586500,
// 1451520,
// 9450000,
// 8032500,
// 4725000,
// 1226976,
// 763700,
// 1563840,
// 19200000,
// 55603600,
// 842880,
// 6979200,
// 1748000,
// 19152000,
// 1610205,
// 8996766,
// 6336000,
// 6336000,
// 640350,
// 810000,
// 252000,
// 9,
// 90,
// 9,
// 90,
// 797670,
// 982870,
// 1800000,
// 1567080,
// 36207,
// 52173,
// 352357,
// 1,
// 15271,
// 7254,
// 1028520,
// 2196,
// 9,
// 479906,
// 31160,
// 89965,
// 218790,
// 9,
// 90,
// 99,
// 1,
// 96,
// 91,
// 90,
// 48,
// 9,
// 317110,
// 9,
// 90,
// 450000,
// 10,
// 9544,
// 9544,
// 9,
// 1,
// 1100902,
// 9600000,
// 95,
// 45,
// 1,
// 45,
// 190,
// 180,
// 1,
// 1,
// 96,
// 95,
// 1,
// 1,
// 1,
// 9,
// 1,
// 1,
// 9,
// 1,
// 98,
// 2250,
// 2185,
// 90000,
// 950000,
// 1045,
// 9000,
// 4500,
// 9,
// 9000,
// 9500,
// 90,
// 190,
// 180,
// 90,
// 90,
// 190,
// 828000,
// 9000,
// 9,
// 9200,
// 828000,
// 1,
// 960000,
// 47000,
// 920000,
// 55200000,
// 48,
// 92,
// 1,
// 9,
// 1,
// 1,
// 1,
// 1,
// 1,
// 1,
// 1,
// 1,
// 9,
// 9,
// 10,
// 1,
// 1000,
// 1,
// 90,
// 1,
// 1,
// 9,
// 1,
// 10,
// 1,
// 1,
// 1,
// 9,
// 9,
// 1,
// 1,
// 10,
// 9,
// 100,
// 90,]
		}
	},
	components: {
		Tab,
		TabItem
	},
	methods: {
		changeIndex(id) {
			this.tabIndex = id
		},
		delBrand(id) {
			axios.delete(`http://wx.jufenqi.com:8080/merchant/api/brands/${id}`).then((res) => {
				console.log(res.data.message)
			}).catch((err) => {
				console.log(err)
			})
		},
		hahaha() {
			this.brands.map((brand) => {
				this.delBrand(brand)
			})
		},
		getToken() {
			axios.get(`http://wx.jufenqi.com:8080/wechat/api/mp/accessToken`).then((res) => {
				this.token = res.data.data.accessToken
				console.log(this.token)
			}).catch((err) => {
				console.log(err)
			})
		},
		tryQr(){
			//测试二维码生成

			axios.post(`https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=${this.token}`,{
				action_name: "QR_LIMIT_STR_SCENE",
				action_info: {
					scene: {
						scene_id: 100
					}
				}
			}).then((res) => {
				console.log("haha")
			}).catch((err) => {
				console.log(err)
			})
		},
		getTime(timeStamp) {
			var d = new Date(timeStamp * 1000)
			var Y = d.getFullYear() + '-'
			var M = (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) + '-'
			var D = (d.getDate() < 10 ? '0' + (d.getDate()) : d.getDate())
			return Y + M + D
		},
		result(e) {
			return e/100
		}
		//
		//   "ticket": "gQEh8TwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyRjVBLXdHZ19jUDAxMDAwMHcwM2oAAgQeAQtZAwQAAAAA", 
	},
	ready() {
		this.getToken()
	}
}
</script>