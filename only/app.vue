<template>
	<div id="main">
		<transition name="fade">
			<router-view></router-view>
		</transition>
	</div>
</template>
<script>
	export default{
		
	}
</script>
<style lang="less">
	#main{
		width: 100%;
		height: 100%;
		position: relative;
	}
	#main .black{
		position:absolute;
		background:rgba(255,255,255,0.5);
		z-index:1000;
		width:100%;
		height:100%;
		text-align:center;
		line-height:5rem;
		color:#000;
		font-size:.32rem;
		left: 0;
		top:0;
	}
	.fade-enter-active, .fade-leave-active {
	  transition: all .5s
	}
	.fade-enter{
		transform: translateX(25%) translateY(-100%) scale(0);
	}
	.fade-leave-to{
	  transform:translateX(25%) translateY(100%) scale(0);
	}
</style>