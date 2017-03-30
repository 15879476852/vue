<template>
	<div id="more">
		<div class="top">
			<h2>更多</h2>
			<router-link class="headerBtn" to="/login">。。。</router-link>
		</div>
		<div class="main">
			
		</div>
	</div>
</template>
<script>
	export default{
		
		mounted:function(){
			var footerItems = document.getElementsByClassName("footerItem");
			var footer = document.getElementsByClassName("footer")[0];
				for(var i=0;i<footerItems.length;i++){
					footerItems[i].className="footerItem";
				}
				footer.children[4].className="footerItem active";
		}
	}
</script>
<style lang="less">
	#more{
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
		}
	}
</style>