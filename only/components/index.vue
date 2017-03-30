<template>
	<div id="index">
		<div class="view">
			<transition name="slide">
				<router-view class="header"></router-view>
			</transition>
			<ul class="footer">
				<li class="footerItem" @click="go">
					<router-link  to="/index/home">首页</router-link>
				</li>
				<li class="footerItem"  @click="go">
					<router-link to="/index/classify">分类</router-link>
				</li>
				<li class="footerItem" @click="go">
					<i class="cartAllNum"></i>
					<router-link to="/index/shopcart">购物车</router-link>
				</li>
				<li class="footerItem" @click="go">
					<router-link to="/index/myshow">我的秀</router-link>
				</li>
				<li class="footerItem" @click="go">
					<router-link to="/index/more">更多</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	
	export default{
		methods:{
			go:function(e){
				this.getele(e.target,"footerItem");
			},
			getele:function(tar,ele){
				var footerItems = document.getElementsByClassName("footerItem");
				if(tar.className== ele){
					for(var i=0;i<footerItems.length;i++){
						footerItems[i].className="footerItem";
					}
					tar.className="footerItem active";
					return false;
				}else if(tar.tagName=="HTML"){
					return false;
				}
				this.getele(tar.parentNode,ele);
			}
		}
	}
</script>
<style lang="less">
	#index{
		width:100%;
		height:100%;
		.view{
			width:100%;
			height:100%;
			display: flex;
			position: relative;
			flex-direction: column;
			overflow: hidden;
		}
		.header{
			width: 100%;
			flex:1;
			padding-bottom:1rem;
			position: relative;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			box-sizing: border-box;
		}
		.footer{
			position:absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			background: #484850;
			height:1rem;
			display: flex;
			justify-content: space-around;
			li{
				cursor: pointer;
				text-align: center;
				position:relative;
				a{
					padding-top:.6rem;
					padding-bottom:.05rem;
					display: block;
					color: #fff;
					font-size:.24rem;
					text-align: center;
				}
				.cartAllNum{
					position:absolute;
					display:none;
					width:.3rem;
					height:.3rem;
					right:0;
					top:0;
					background:rgba(181,33,33,1);
					border-radius:50%;
					font-size:.22rem;
					line-height:.3rem;
					color:#fff;
					font-style:normal;
					text-align: center;
				}
				.cartAllNum.active{
					display:block;
				}
			}
			.footerItem:nth-child(1)>a{
				background:url('/img/home.png') no-repeat center 0.08rem;
				background-size: auto 0.50rem;
			}
			.footerItem:nth-child(2)>a{
				background:url('/img/classify.png') no-repeat center 0.08rem;
				background-size: auto 0.50rem;
			}
			.footerItem:nth-child(3)>a{
				background:url('/img/cart.png') no-repeat center 0.08rem;
				background-size: auto 0.50rem;
			}
			.footerItem:nth-child(4)>a{
				background:url('/img/personal.png') no-repeat center 0.08rem;
				background-size: auto 0.50rem;
			}
			.footerItem:nth-child(5){
				background:url('/img/more.png') no-repeat center 0.08rem;
				background-size: auto 0.50rem;
			}
			.active{
				border-top:.05rem solid #d71110;
			}
		}
	}
	.slide-enter-active,.slide-leave-active{
		transition:all .5s;
	}
	.slide-enter{
		transform:translateX(100%) translateY(-25%) scale(0);
	}
	.slide-leave-to{
		transform:translateX(-100%) translateY(-25%) scale(0);
	}
</style>