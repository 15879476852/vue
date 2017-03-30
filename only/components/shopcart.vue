<template>
	<div id="shopcart">
		<div class="top">
			<h2>购物车</h2>
			<router-link class="headerBtn" to="/index/goSettlement">结算</router-link>
		</div>
		<div class="main">
			 <div class="cartclass">
				<span class="cartNum">商品数量:{{allNum}}</span>
				<span class="cartallprice">应付总额(不含运费) : <i class="allprice">¥{{allprice}}</i></span>
			</div>
			<div class="cartgoods">
				<ul>
					<li class="cartgoodsItem" v-for="(item,index) in cartgoodsList">
						<img :src="item.goodsListImg" :goodsid="item.goodsID" @click="godetail"/>
						<div class="cartgoodsinfo">
							<h3 :goodsid="item.goodsID">{{item.goodsName}} <span class="dele" :index="index" :goodsid="item.goodsID" @click="dele"></span></h3>
							<p class="cartclassname">类型：{{item.className}}</p>
							<p class="goodsprice">
								单价：<span>{{(item.discount==0? item.price:item.price*item.discount/10)|RMB}}</span>
							</p>
							<p class="goodsnum" :goodsid="item.goodsID">
								数量：<span class="cartaddBtn Btn" @click="mulitBtn"></span><input class="inputNum" type="text" :value="item.number"/><span class="cartmulitBtn Btn" @click="addBtn"></span>
							</p>
						</div>
					</li>
				</ul>
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
				cartgoodsList:[],
				allprice:"",
				allNum:""
			}
		},
		created:function(){
			var that = this;
			var userID = JSON.parse(localStorage.getItem("user")).userID;
			if(userID==""){
				alert("请先登录！");
			}
			console.log(userID);
			
			ajax({
				url:"http://datainfo.duapp.com/shopdata/getCar.php",
				data:"userID="+userID,
				success:function(res){
					eval(res)
					function callback(info){
						console.log(info)
						that.cartgoodsList=info;
						var num =0;
						var allprice = 0;
						for(var i=0;i<info.length;i++){
							num+=parseInt(info[i].number);
							var price =0;
							price=parseInt(info[i].discount)==0?parseInt(info[i].price).toFixed(2):(info[i].price*info[i].discount/10).toFixed(2);
							allprice+=parseFloat(price)*num
						}
						that.allNum=num;
						that.allprice = allprice.toFixed(2);
						var cartAllNum = document.getElementsByClassName("cartAllNum")[0];
						cartAllNum.innerHTML=that.allNum;
						setTimeout(function(){
							that.loading("ok");
							new IScroll(".cartgoods",{
								mouseWheel: true,
							})
						},300)
					}
				}
			})
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
			godetail:function(e){
				var goodsid = e.target.getAttribute("goodsid");
				var url = "/goodsdetail/:"+goodsid;
				this.$router.push({path:url});
			},
			mulitBtn:function(e){
				var index = e.target.getAttribute("index");
				var goodsid= e.target.parentNode.getAttribute("goodsid");
				this.sum({type:"muilt",index:index,goodsid:goodsid});
			},
			addBtn:function(e){
				var index = e.target.getAttribute("index");
				var goodsid= e.target.parentNode.getAttribute("goodsid");
				this.sum({type:"add",index:index,goodsid:goodsid});
			},
			sum:function(info){
				var type = info.type ||"dele";
				var index = info.index || 0;
				var goodsid = info.goodsid || "";
				var goodsprice = document.getElementsByClassName('goodsprice')[index].firstElementChild.innerHTML;
				var length = goodsprice.length;
				var _input = document.getElementsByClassName('inputNum')[index];
				var inputNum = _input.value*1;
				var cartAllNum = document.getElementsByClassName("cartAllNum")[0];
				var price = parseFloat(goodsprice.slice(1,length))
				goodsprice =price*inputNum;
				if(type=="dele"){
					this.allNum -= inputNum;
					this.allprice= (parseFloat(this.allprice)-goodsprice).toFixed(2);
					cartAllNum.outerHTML=this.allNum;
				}else if(type=="add"){
					this.allNum +=1;
					inputNum+=1;
					_input.setAttribute("value",inputNum);
					_input.innerHTML = _input.getAttribute("value")
//					_input.outerHTML.value= _input.getAttribute("value");
					this.allprice= (parseFloat(this.allprice)+price).toFixed(2);
					cartAllNum.innerHTML=this.allNum;
					this.ajax(goodsid,inputNum);
				}else{
					this.allNum -= 1;
					inputNum-=1;
					_input.setAttribute("value",inputNum);
					_input.outerHTML = _input.getAttribute("value")

					this.allprice= (parseFloat(this.allprice)-price).toFixed(2);
					cartAllNum.innerHTML=this.allNum;
					this.ajax(goodsid,inputNum)
				}
				
			},
			ajax:function(goodsID,num){
				var userID = JSON.parse(localStorage.getItem("user")).userID ||"";
				if(userID==""){
					alert("连接失败！请重新先登录！");
				}
				var that = this;
				var goodsID=goodsID;
				var num = num;
				this.loading();
				ajax({
					url:"http://datainfo.duapp.com/shopdata/updatecar.php",
					data:"userID="+userID+"&goodsID="+goodsID+"&number="+num,
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
			dele:function(e){
				var userID = JSON.parse(localStorage.getItem("user")).userID ||"";
				if(userID==""){
					alert("连接失败！请重新先登录！");
				}
				console.log(userID);
				var that = this;
				var id = e.target.getAttribute("goodsid");
				var index = e.target.getAttribute("index");
				this.loading();
				ajax({
					url:"http://datainfo.duapp.com/shopdata/updatecar.php",
					data:"userID="+userID+"&goodsID="+id+"&number=0",
					success:function(res){
						that.loading("ok");
						if(res=="1"){
							that.cartgoodsList.splice(index,1);
							that.sum({type:"dele",index:index});
							alert("删除成功！")
						}
					}
				})
			}
		},
		mounted:function(){
			var footerItems = document.getElementsByClassName("footerItem");
			var footer = document.getElementsByClassName("footer")[0];
				for(var i=0;i<footerItems.length;i++){
					footerItems[i].className="footerItem";
				}
				footer.children[2].className="footerItem active";
			var cartAllNum = document.getElementsByClassName("cartAllNum")[0];
			cartAllNum.className="cartAllNum active";
			this.loading()
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
	#shopcart{
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
			height:100%;
			padding-top:.9rem;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			box-sizing: border-box;
			flex: 1;
			overflow: hidden;
			background: #f3f4f6;
			.cartclass{
				position: fixed;
				top:.8rem;
				width:100%;
				left:0;
				background:#747474;
				height: .9rem;
				overflow: hidden;
				z-index: 100;
				padding:0 0.1rem;
				font-size: .28rem;
				line-height:.9rem;
				color: #fff;
				.cartNum{
					padding-left: .25rem;
					width: 2rem;
					display: inline-block;
				}
				.allprice{
					color:rgb(159,45,45);
				}
				.cartallprice{
					display: inline-block;
					
				}
				.cartallprice>i{
					display: inline-block;
					font-style:normal;
				}
			}
			.cartgoods{
				width:100%;
				height:100%;
				overflow: hidden;
				box-sizing: border-box;
				-webkit-box-sizing: border-box;
				padding-bottom:.58rem;
				ul{
					li{
						padding:0.3rem;
						display:flex;
						border-bottom:1px solid #cbcbcb;
						border-top:1px solid #aaa;
						img{
							display: block;
							width:1.73rem;
							height:1.73rem;
							border:1px solid #bababa;
							margin-right:.25rem;
							cursor:pointer;
						}
						.cartgoodsinfo{
							flex:1;
							font:.3rem;
							position: relative;
							h3{
								line-height:.42rem;
								width:2.84rem;
								text-overflow:ellipsis;
								overflow: hidden;
								white-space:nowrap;
								cursor:pointer;
								.dele{
									right:0;
									top:0;
									position: absolute;
									width:.26rem;
									height:.33rem;
									background:url(/img/dele.png) no-repeat center;
									background-size: auto 100%;
								}
							}
							.cartclassname{
								line-height:.44rem;
							}
							.goodsprice{
								
								span{
									color:#ac1a1b;
								}
							}
							.goodsnum{
								display: flex;
								line-height:.44rem;
								.inputNum{
									display:block;
									width:.74rem;
									height:.44rem;
									text-align: center;
									border-radius:.05rem;
									margin:0 .15rem;
								}
								.Btn{
									display:block;
									width:.58rem;
									height:.44rem;
									border-radius:.1rem;
									cursor:pointer;
								}
								.cartaddBtn{
									background:url(/img/sum.png) no-repeat center;
									background-size:100% auto;
								}
								.cartmulitBtn{
									background:url(/img/mulit.png) no-repeat center;
									background-size:100% auto;
								}
							}
						}
					}
				}
			}
		}
	}
</style>