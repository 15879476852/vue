<template>
	<div id="login">
		<div class="header">
			<span class="back" @click="back">&lt;</span>
			<p>开心摇摇用户登录</p>
		</div>
		<div class="login">
			<p>
				<input type="text" placeholder="请输入账户" class="user" v-model="username"/>
				<!--<span class="nouser" v-if="nouser"></span>-->
			</p>
			<p>
				<input type="password" placeholder="请输入密码" class="password" v-model="userpwd"/>
				<!--<span clas="errpwd" v-if="errpwd"></span>-->
			</p>
			<p class="showpassword">
				<i @click="showType"></i>
				<span>显示密码</span>
				<b>忘记密码?</b>
			</p>
			<p  class="rememberpassword">
				<i class="active" @click="showType"></i>
				<span>记住密码自动登录</span>
			</p>
			<p>
				<input type="button" class="loginBtn" value="登录" @click="gologin"/>
			</p>
			<p>
				<router-link class="registerBtn" to="/register">注册</router-link>
			</p>
		</div>
	</div>
</template>
<script>
	import {ajax} from '../src/ajax.js';
	export default{
		data:function(){
			return {
				username:"",
				userpwd:""
			}
		},
		methods:{
			back:function(){
				this.$router.go(-1)
			},
			showType:function(e){
				var tar = e.target;
				var pwd =document.getElementsByClassName("password")[0];
				if(tar.className=="active"){
					tar.className=" ";
					if(e.target.parentNode.getAttribute("class")=="showpassword"){
						pwd.setAttribute("type","password");
					}
				}else{
					tar.className="active";
					if(e.target.parentNode.getAttribute("class")=="showpassword"){
						pwd.setAttribute("type","text");
					}
				}
			},
			gologin:function(){
				var remember = document.getElementsByClassName("rememberpassword")[0].firstElementChild;
				var res = /^\w+$/;
				var psdRes =/^[\w]{6,20}$/;
				if(this.username==""|| this.userpwd==""){
					alert("用户名或密码不能为空!");
				}else if(!res.test(this.username)){
					alert("请输入字母或数字组成的密码！");
				}else if(!psdRes.test(this.userpwd)){
					alert("请输入字母或数字组成的大于6位小于20位的密码！");
				}else{
					var that = this;
					that.loading();
					ajax({
						url:"http://datainfo.duapp.com/shopdata/userinfo.php",
						data:"status=login&userID="+that.username+"&password="+that.userpwd,
						success:function(res){
							that.loading("ok");
							if(res=="0"){
								alert("用户名不存在！");
							}else if(res=="2"){
								alert("用户或密码错误！");
							}else{
								if(remember.getAttribute("class")=="active"){
									if(window.localStorage){
										localStorage.setItem("user",res)
										that.$router.push({path:"/index"})
									}else{
										alert("该版本太低请更新后再登录！");
									}
								}
							}
						}
					})
				}
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
			
		}
	}
</script>
<style lang="less">
	#login{
		width: 100%;
		height: 100%;
		overflow: hidden;
		.header{
			width: 100%;
			height:.8rem;
			background: #a91918;
			position: relative;
			p{
				font-size: .36rem;
				color: #fff;
				text-align:center;
				line-height:.7rem;
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
		.login{
			height: 100%;
			background: #f3eff0;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			box-sizing: border-box;
			width: 100%;
			padding:.3rem;
			p{
				height:.86rem;
				line-height:.86rem;
				span{
					float: left;
					font-size:.28rem;
					color:#5b5b5b;
					margin-left: .1rem;
				}
				i{
					cursor: pointer;
					float: left;
					margin-top:.24rem;
					width:.40rem;
					height: .40rem;
					background:url(/img/yes.png) no-repeat 0 0;
					background-size:100% auto;
					
				}
				i.active{
					background-position: 0 -0.4rem;
				}
				b{
					cursor: pointer;
					float: left;
					font-size:.28rem;
					color:#ff0f53;
					margin-left: .4rem;
				}
			}
			p:nth-child(2){
				margin-top: .04rem;
			}
			p:nth-child(5){
				margin-top: .1rem;
			}
			p:last-child{
				margin-top: .13rem;
			}
			input{
				outline: none;
				-webkit-box-sizing: border-box;
				-moz-box-sizing: border-box;
				box-sizing: border-box;
				border:0;
				padding:0 .2rem;
				line-height:.86rem;
				width: 100%;
				height: .86rem;
				border-radius: .1rem;
			}
			.loginBtn{
				cursor: pointer;
				border:1px solid #840000;
				background:#b80606;
				font-size:.34rem;
				color: #fff;
			}
			.registerBtn{
				display: block;
				cursor: pointer;
				border:1px solid #000;
				background:#444;
				font-size:.34rem;
				color: #fff;
				-webkit-box-sizing: border-box;
				-moz-box-sizing: border-box;
				box-sizing: border-box;
				border:0;
				padding:0 .2rem;
				line-height:.86rem;
				width: 100%;
				height: .86rem;
				border-radius: .1rem;
				text-align: center;
			}
			.user{
				font-size:.26rem;
				color: #666;
			}
			.password{
				font-size:.26rem;
				color: #666;
			}
		}
	}
</style>