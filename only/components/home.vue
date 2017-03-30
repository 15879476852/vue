<template>
	<div id="home">
		<div class="top">
			<h2>首页</h2>
			<router-link class="headerBtn" to="/login">登录</router-link>
		</div>
		<div class="main">
			<div class="wrapper">
				<div class="itemlist" v-for="items in all">
					<h3 class="title" :classid="items.classID" @click="toclass">{{items.goodsName}}</h3>
					<div  :class="'banner'+items.goodsID">
						<ul class="swiper-wrapper">
							<li class="swiper-slide" :goodsid="items.goodsID" @click="togoods" v-for="item in JSON.parse(items.goodsBenUrl)">
								<img :src="item"/>
							</li>
						</ul>
						<div class="swiper-pagination pagin"></div>
						<!--<div class="swiper-button-prev"></div>
						<div class="swiper-button-next"></div>-->
					</div>

				</div>
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
			return{
				all:[],
				mainIScroll:'',
				bannerSwiper:[],
				bannerWidth:[],
//				bannerpagination:[]
			}
		},
		created:function(){
			var that = this;
			ajax({
				url:"http://datainfo.duapp.com/shopdata/getBanner.php",
				success:function(res){
					eval(res);
					function callback(test){
						that.all=test
						setTimeout(function(){
							var itemlists = document.getElementsByClassName("itemlist");
							//获取
							for(var i=0;i<itemlists.length;i++){
								that.bannerSwiper.push(itemlists[i].children[1].className);
								that.bannerWidth.push(itemlists[i].children[1]);
							}
							//动态设置符框宽度
							for(var i=0;i<that.bannerWidth.length;i++){
								var banwid = that.bannerWidth[i].children[0]
								var length = banwid.children.length;
								banwid.style.width=length*100+"%";
							}
							//建立多个bannerSwiper
							for(var i=0;i<that.bannerSwiper.length;i++){
								new Swiper ("."+that.bannerSwiper[i], {
									direction: 'horizontal',
									// 如果需要分页器
									pagination:"swiper-pagination",
								})
							}
							that.mainIScroll = new IScroll(".main",{
								mouseWheel: true,
							});
						},300)
					}
				}
			})
		},
		methods:{
			toclass:function(e){
				var classid = e.target.getAttribute("classid");
				var url = "/index/classify/:"+classid;
				this.$router.push({path:url});
			},
			togoods:function(e){
				var goodsid = e.target.parentNode.getAttribute("goodsid");
				var url = "/goodsdetail/:"+goodsid;
				this.$router.push({path:url})
			}
		},
		mounted:function(){
			var footerItems = document.getElementsByClassName("footerItem");
			var footer = document.getElementsByClassName("footer")[0];
				for(var i=0;i<footerItems.length;i++){
					footerItems[i].className="footerItem";
				}
				footer.children[0].className="footerItem active";
		}
	}
</script>
<style lang="less">
	#home{
		display: flex;
		flex-direction: column;
		.top{
			width: 100%;
			height:.8rem;
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
		}
		.main{
			width: 100%;
			flex: 1;
			overflow: hidden;
			background: #f3f4f6;
			.itemlist{
				width:100%;
				overflow:hidden;
				padding:0 .2rem;
				margin-top:.1rem;
				h3{
					font:.32rem/.64rem "";
					color: #000;
					cursor: pointer;
					width: 100%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					/*background:#fff;*/
				}
				>div{
					width:100%;
					height: 100%;
					overflow:hidden;
					position:relative;
				}
				ul{
					height:6rem;
					li{
						cursor: pointer;
						float: left;
						width:6rem;
						height:6rem;
						img{
							width: 100%;
							height: 100%;
						}
					}
				}
				.pagin{
					position: absolute;
					left:0;
					right:0;
					bottom:.2rem;
					margin: auto;
				}
			}
		}
	}
</style>