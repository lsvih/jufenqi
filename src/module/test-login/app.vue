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
	<div class="btn" v-tap="hahaha()">
		删除品牌
	</div>
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
			tabIndex: 0
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
		}
	},
	ready() {

	}
}
</script>