<template>
	<div id="register">
		<div class="header">
			<span class="back" @click="back">&lt;</span>
			<p>用户注册</p>
		</div>
		<div class="register">
			<p class="input">
				<input type="text" placeholder="请输入账户:" class="user" @input="infoType" v-model="username"/>
				<i class="err"></i>
			</p>
			<p class="input">
				<input type="password" placeholder="登录密码:" class="password" @input="infoType" v-model="userpwd"/>
				<i></i>
			</p>
			<p class="input">
				<input type="password" placeholder="确定密码:" class="repeatpwd" @input="infoType" v-model="userrepwd"/>
				<i></i>
			</p>
			<p class="registerBtn">
				<input type="button" class=" " value="确定注册" @click="goregister"/>
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
				userpwd:"",
				userrepwd:"",
				user:false,
				psd:false,
				reqeatpsd:false
			}
		},
		methods:{
			back:function(){
				this.$router.go(-1)
			},
			infoType:function(e){
				var name = e.target.className; 
				var userRex = /^\w+$/;
				var pwdRex = /^[\w]{6,20}$/;
				var registerBtn = document.getElementsByClassName("registerBtn")[0];
				var Btn = registerBtn.firstElementChild;
				var i = e.target.nextElementSibling || nextElementSibling(e.target);
				var that = this;
				var _text;
				switch (name){
					case "user":
						ajax({
							url:"http://datainfo.duapp.com/shopdata/getuser.php",
							data:"userID="+that.username,
							success:function(info){
								eval(info);
								function callback(text){
									_text = text;
									if(that.username==""){
										i.innerHTML="用户名不能为空！";
									}else if(!userRex.test(that.username)){
										i.innerHTML="请输入字母或数字组成的用户名！";
									}else if(typeof _text=="object"){
										i.innerHTML="该用户名已存在！";
									}else{
										that.user=true;
										i.innerHTML="";
									}
								}
							}
						})
						break;
					case "password":
						if(that.userpwd==""){
							i.innerHTML="密码不能为空！";
						}else if(!pwdRex.test(that.userpwd)){
							i.innerHTML="请输入字母或数字组成的大于6位且小于20位的密码！";
						}else{
							that.psd=true;
							i.innerHTML="";
						}
						break;
					case "repeatpwd":
						if(that.userrepwd==""){
							i.innerHTML="密码不能为空！";
						}else if(that.userrepwd!=that.userpwd){
							i.innerHTML="两次密码不对！";
						}else{
							that.reqeatpsd=true;
							i.innerHTML="";
						}
						break;
					default:
						break;
				}
				if(that.user==true&&that.psd==true&&that.reqeatpsd==true){
					Btn.className="active";
				}
			},
			goregister:function(e){
				var that = this;
				var _class= e.target.getAttribute("class");
				var i = document.getElementsByClassName("err")[0];
				if(_class=="active"){
					that.loading();
					ajax({
						url:"http://datainfo.duapp.com/shopdata/userinfo.php",
						data:"status=register&userID="+that.username+"&password="+that.userpwd,
						success:function(info){
							that.loading("ok");
							if(info=="0"){
								i.innerHTML="该用户名已存在！";
							}else if(info=="2"){
								i.innerHTML="数据库错误！";
							}else{
								that.$router.push({path:"/login"})
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
	#register{
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
		}
		.register{
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
					line-height:.3rem;
					padding:0 .2rem;
					margin:0;
					height:.3rem;
				}
			}
			p:last-child{
				margin-top:1.0rem;
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
			.input{
				height:1.16rem;
				/*background:#fff;*/
				i{
					font-size:.16rem;
					color:#FF7700;
					float: left;
				}
			}
			.loginBtn{
				cursor: pointer;
				border:1px solid #840000;
				background:#b80606;
				font-size:.34rem;
				color: #fff;
			}
			.registerBtn>input{
				cursor: pointer;
				border:1px solid #000;
				background:#444;
				font-size:.34rem;
				color: #fff;
			}
			.registerBtn>input.active{
				background:#b80606;
			}
			.user{
				font-size:.26rem;
				color: #666;
			}
			.password{
				font-size:.26rem;
				color: #666;
			}
			.repeatpwd{
				font-size:.26rem;
				color: #666;
			}
		}
	}
</style>