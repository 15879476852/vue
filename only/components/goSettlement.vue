<template>
	<div id="goSettlement">
		<div class="top">
			<span class="back" @click="back">&lt;</span>
			<h2>结算</h2>
			<router-link class="headerBtn" to="/shopcart">购物车</router-link>
		</div>
		<div class="main">
			
			</div>
		</div>
	</div>
</template>
<script>
	import {ajax} from '../src/ajax.js';
	import IScroll from "iscroll";
	import Swiper from "swiper";
	export default{
		methods:{
			back:function(){
				this.$router.go(-1)
			}
		}
	}
</script>
<style lang="less">
	#goSettlement{
		display: flex;
		flex-direction: column;
		width:100%;
		height:100%;
		.top{
			width: 100%;
			height:.86rem;
			background: #a91918;
			position: relative;
			h2{
				font-size: .36rem;
				color: #fff;
				text-align:center;
				line-height:.7rem;
			}
			.headerBtn{
				position: absolute;
				right:.23rem;
				top:.1rem;
				display: block;
				width: 1.04rem;
				height: .54rem;
				border-radius: .15rem;
				-webkit-box-shadow: -1px -1px 1px 1px #d63334,1px 1px 1px 1px #8e0e0d;
				cursor: pointer;
				font:700 0.22rem/0.54rem "";
				text-align: center;
				color: #fff;
				background:linear-gradient(to bottom,rgb(214,42,42),rgb(122,6,7));
			}
			span{
				cursor: pointer;
				display: block;
				position: absolute;
				left:.3rem;
				top:.02rem;
				font-size: .66rem;
				color: #fff;
				text-align:center;
				line-height:.7rem;
			}
		}
		.main{
			width: 100%;
			flex:1;
			overflow: hidden;
			background: #f3f4f6;
			>div{
				width:100%;
				height:100%;
				padding:0 0.3rem;
				-webkit-box-sizing: border-box;
				-moz-box-sizing: border-box;
				box-sizing: border-box;
				
			}
		}
	}
</style>