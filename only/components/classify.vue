<template>
	<div id="classify">
		<div class="top">
			<h2>新品发布</h2>
			<a class="headerBtn" @click="gocart">购物车</a>
		</div>
		<div class="main">
			<div class="classLists">
				<ul>
					<li  class="classlist"classid="0" @click="toclass">最热</li>
					<li class="classlist" v-for="item in goodsclass" @click="toclass" :classid="item.classID">{{item.className}}</li>
				</ul>
			</div>
			<div class="goodslist">
				<ul>
					<li class="goodsitemlist" v-for="item in goodslist" @click="togoods" :goodsid="item.goodsID">
						<img :src="item.goodsListImg"/>
						<p class="goodsname">{{item.goodsName}}</p>
						<p class="price">
							<span>{{(item.discount==0? item.price:item.price*item.discount/10)|RMB}}</span>
							<del>{{item.price|RMB}}</del>
						</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	import {ajax} from '../src/ajax.js';
	import IScroll from "iscroll";
	export default{
		data:function(){
			return {
				goodsclass:[],
				goodslist:[]
			}
		},
		methods:{
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
			},
			gocart:function(e){
				this.$router.push({path:"/index/shopcart"});
			},
			toclass:function(e){
				var classid = e.target.getAttribute("classid");
				var url = "/index/classify/:"+classid;
				this.$router.push({path:url});
				var url2 = this.$route.params.id;
				var _id = url2?url2.slice(1,url.length):1;
				var classlists = document.getElementsByClassName("classlist");
				for(var i=0;i<classlists.length;i++){
					classlists[i].className="classlist";
				}
				classlists[_id].className="classlist active";
				this.loading();
			},
			togoods:function(e){
				var goodsid='';
				function getEle(target){
					if(target.className=="goodsitemlist"){
						goodsid = target;
						return false;
					}else{
						if(target.tagName!="HTML"){
							getEle(target.parentNode);	
						}else{
							return false;
						}
					}
				}
				getEle(e.target);
				var url = "/goodsdetail/:"+goodsid.getAttribute("goodsid");
				this.$router.push({path:url})
			}
		},
		watch:{
			'$route':function(){
				var that = this;
				var url = that.$route.params.id;
				var _id = url?url.slice(1,url.length):0;
				ajax({
					url:"http://datainfo.duapp.com/shopdata/getGoods.php",
					data:"classID="+_id,
					success:function(res){
						eval(res)
						function callback(info){
							that.goodslist=info;
							that.loading("ok");
						}
					}
				})
			}
		},
		created:function(){
			var that = this;
			var url = that.$route.params.id;
			var _id = url?url.slice(1,url.length):0;
			ajax({
				url:"http://datainfo.duapp.com/shopdata/getGoods.php",
				data:"classID="+_id,
				success:function(res){
					eval(res)
					function callback(info){
						that.goodslist=info;
						that.loading();
						var classlists = document.getElementsByClassName("classlist");
						for(var i=0;i<classlists.length;i++){
							classlists[i].className="classlist";
						}
						setTimeout(function(){
							new IScroll(".goodslist",{
								mouseWheel: true,
							})
						},300)
						function loading(){
							if(classlists[_id]){
								that.loading("ok");
								classlists[_id].className="classlist active";
								return;
							}
							setTimeout(function(){
								loading();
							},300)
						}
						loading()
					}
				}
			})
			ajax({
				url:"http://datainfo.duapp.com/shopdata/getclass.php",
				success:function(res){
					var info = JSON.parse(res);
					that.goodsclass = info;
				}
			})
		},
		mounted:function(){
			var footerItems = document.getElementsByClassName("footerItem");
			var footer = document.getElementsByClassName("footer")[0];
				for(var i=0;i<footerItems.length;i++){
					footerItems[i].className="footerItem";
				}
				footer.children[1].className="footerItem active";
		},
		filters:{
			RMB:function(info){
				if(info=='') return '';
				return "¥"+(info*1).toFixed(2);
			}
		}
	}
</script>
<style lang="less">
	#classify{
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
			.classLists{
				position: fixed;
				top:.8rem;
				width:100%;
				left:0;
				background:#9a9fa5;
				height: .58rem;
				overflow: hidden;
				z-index: 100;
				padding:0 0.1rem;
				ul{
					width: 150%;
					display: flex;
					justify-content: space-between;
					li{
						cursor: pointer;
						line-height: .58rem;
						font-size: .23rem;
					}
					.active{
						color: #fff;
					}
				}
			}
			.goodslist{
				width:100%;
				height:100%;
				overflow: hidden;
				box-sizing: border-box;
				-webkit-box-sizing: border-box;
				padding-bottom:.58rem;
				ul{
					margin-top: .25rem;
					overflow: hidden;
					position: relative;
					min-height:100%;
					width:100%;
					li{
						float: left;
						width:50%;
						padding: 0 .36rem;
						img{
							cursor: pointer;
							width:100%;
							height: 2.45rem;
							margin-top:.34rem;
						}
						.goodsname{
							cursor: pointer;
							font:.24rem/.6rem "";
							color:#393939;
							text-overflow: ellipsis;
							overflow: hidden;
							width: 100%;
							text-align: center;
							white-space: nowrap;
						}
						.price{
							font-size: .2rem;
							span{
								color: #d60e10;
							}
							del{
								float: right;
								color: #868686;
							}
						}
					}
					.null{
						position: absolute;
						float: none;
						width:4rem;
						height:4rem;
						text-align: center;
						font-size:.36rem;
						line-height: 4rem;
						left: 0;
						top:0;
						right: 0;
						bottom: 0;
						margin: auto;
					}
				}
			}
		}
	}
</style>