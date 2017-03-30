<template>
	<div id="goodsdetail">
		<div class="top">
			<span class="back" @click="back">&lt;</span>
			<h2>商品详情</h2>
			<router-link class="headerBtn" to="/index/shopcart">购物车</router-link>
		</div>
		<div class="main">
			<div v-for="items in goodsItemall">
				<div class="goodslistbanner">
					<ul class="swiper-wrapper goodsItembanner">
						<li class="swiper-slide" v-for="item in JSON.parse(items.imgsUrl)">
							<img :src="item"/>
						</li>
					</ul>
					<div class="swiper-pagination pagin"></div>
				</div>
				<div class="goodsinfo">
					<h3 class="title">{{items.goodsName}}</h3>
					<p class="price">
						<span>{{(items.discount==0? items.price:items.price*items.discount/10)|RMB}}</span>
						<del>{{items.price|RMB}}</del>
					</p>
					<p class="buynumber">
						购买人数:{{items.buynumber}}
					</p>
				</div>
				<h3 class="title">商品详情</h3>
				<div class="goodsinfolist" >
					<ul>
						<li v-for="item in JSON.parse(items.goodsBenUrl)">
							<img :src="item"/>
						</li>
					</ul>
					<div v-for="goods in goodsinfo">
						<p>{{goods}}</p>
					</div>
				</div>
			</div>
		</div>
		<div class="bottom">
			<div class="detailbtn">
				<input class="addCart" type="button" value="添加到购物车" @click="addcart"/>
			</div>
		</div>
	</div>
</template>
<script>
	import {ajax} from '../src/ajax.js';
	import IScroll from "iscroll";
	import Swiper from "swiper";
	export default{
		data:function(){
			return {
				goodsItemall:[],
				goodsinfo:[],
				goodslistSwiper:'',
				num:[]
			}
		},
		created:function(){
			var that = this;
			var url = that.$route.params.id;
			var id = url.slice(1,url.length);
			ajax({
				url:"http://datainfo.duapp.com/shopdata/getGoods.php",
				data:"goodsID="+id,
				success:function(res){
					eval(res)
					function callback(info){
						console.log(info)
						that.goodsItemall=info;
						that.goodsinfo=info[0].detail.split("。");
						setTimeout(function(){
							var goodslistbanner = document.getElementsByClassName('goodsItembanner')[0];
							var length = goodslistbanner.children.length;
							goodslistbanner.style.width=(length+1)*100+"%";
							that.goodslistSwiper = new Swiper (".goodslistbanner", {
//								direction: 'horizontal',// 如果需要分页器
								pagination:".swiper-pagination",
							})
							that.mainIScroll = new IScroll(".main",{
								mouseWheel: true,
							});
						},500)
					}
				}
			})
		},
		methods:{
			back:function(){
				this.$router.go(-1)
			},
			addcart:function(e){
				var userID = JSON.parse(localStorage.getItem("user")).userID ||"";
				if(userID==""){
					alert("连接失败！请重新先登录！");
				}
				console.log(userID);
				var that = this;
				var url = that.$route.params.id;
				var id = url.slice(1,url.length);
				var num =e.target.num || 1;
				this.loading();
				ajax({
					url:"http://datainfo.duapp.com/shopdata/updatecar.php",
					data:"userID="+userID+"&goodsID="+id+"&number="+1,
					success:function(res){
						that.loading("ok");
						if(res=="1"){
							alert("添加成功！")
						}else{
							alert("添加失败！请检查网络连接！")
						}
					}
				})
			},
			loading:function(info){
				var info = info || "loding...";
				var odiv = document.createElement("div");
				odiv.className="black";
				var black= document.getElementsByClassName("black")[0] ||"";
				if(info=="ok"){
					document.getElementById("main").removeChild(black)?"":document.getElementById("main").removeChild(black);
				}else{
					odiv.innerHTML=info;
					document.getElementById("main").appendChild(odiv);
				}
			}
		},
		filters:{
			RMB:function(info){
				if(info=='') return '';
				return "¥"+(info*1).toFixed(2);
			}
		},
		mounted:function(){
			
		}
	}
</script>
<style lang="less">
	#goodsdetail{
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
				padding:0 0.3rem;
				-webkit-box-sizing: border-box;
				-moz-box-sizing: border-box;
				box-sizing: border-box;
				.goodslistbanner{
					width:100%;
					overflow:hidden;
					position:relative;
					ul{
						height:4rem;
						height: 7rem;
						li{
							width:4rem;
							height: 7.5rem;
							float: left;
							text-align: center;
							img{
								width:100%;
								height: 7.5rem;
							}
						}
					}
					.swiper-pagination.swiper-pagination-bullets{
						position:absolute;
						bottom:.1rem;
						left: 0;
						right:0;
						margin:auto;
						width:1rem;
						height:.3rem;
						min-width:2rem;
						z-index:100;
						text-align: center;
						span.swiper-pagination-bullet{
							display:inline-block;
							height: 10px;
							width: 10px;
							border-radius: 50%;
							background: #ddd;
							margin:0 .05rem;
						}
						span.swiper-pagination-bullet.swiper-pagination-bullet-active{
							display: inline-block;
							height: 10px;
							width: 10px;
							border-radius: 50%;
							background: red;
						}
					}
				}
				.goodsinfo{
					padding:.6rem .2rem;
				}
				.title{
					font-size:.32rem;
				}
				.price{
					font-size:.26rem;
					span{
						color:#FF7700;
					}
				}.buynumber{
					font-size: .26rem;
				}
				.goodsinfolist{
					ul{
						width:100%;
						
						li{
							width:100%;
							img{
								width:100%;
								height:100%;
							}
						}
					}
				}
			}
		}
		.bottom{
			width:100%;
			height:0.98rem;
			.detail{
				width:100%;
				height:.99rem;
				background:#FFF;
				font-size:.3rem;
				line-height:.99rem;
				color: #656565;
				position:relative;
				padding:0 .34rem 0 .86rem;
				.icont-i{
					position:absolute;
					width:.36rem;
					height:.36rem;
					background:url(/img/icont-i.png) no-repeat center;
					background-size:100% auto;
					left:.24rem;
					top:.34rem;
				}
				.icont-right{
					position:absolute;
					width:.12rem;
					height:.17rem;
					top:.41rem;
					right:.34rem;
					background:url(/img/icont-right.png) no-repeat center;
					background-size:100% auto;
				}
			}
			.detailbtn{
				width:100%;
				height:.98rem;
				background:#a3a3a3;
				padding:0.1rem 0;
				-webkit-box-sizing: border-box;
				-moz-box-sizing: border-box;
				box-sizing: border-box;;
				.addCart{
					display: block;
					margin:auto;
					background:linear-gradient(to bottom,rgb(191,37,37),rgb(145,15,15));
					border-radius:.1rem;
					font-size:.3rem;
					color:#fff;
					height:.8rem;
					line-height:.8rem;
					padding:0 1.28rem;
				}
			}
		}
	}
</style>