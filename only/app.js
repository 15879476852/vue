import Vue from 'vue';
import App from './app.vue';
import VueRouter from 'vue-router';
import index from './components/index.vue';
import login from './components/login.vue';
import register from './components/register.vue';
import home from './components/home.vue';
import classify from './components/classify.vue';
import myshow from './components/myshow.vue';
import more from './components/more.vue';
import shopcart from './components/shopcart.vue';
import goodsdetail from './components/goodsdetail.vue';
import goSettlement from './components/goSettlement.vue';

Vue.use(VueRouter);

const routes=[{
	path:"/",
	component:index,
},{
	path:"/register",
	component:register
},{
	path:"/login",
	component:login
},{
	path:"/goodsdetail/:id",
	component:goodsdetail
},{
	path:"/index",
	component:index,
	children:[{
		path:"/index",
		component:home
	},{
		path:"/index/home",
		component:home
	},{
		path:"/index/classify",
		component:classify
	},{
		path:"/index/classify/:id",
		component:classify
	},{
		path:"/index/shopcart",
		component:shopcart
	},{
		path:"/index/myshow",
		component:myshow
	},{
		path:"/index/more",
		component:more
	},{
		path:"/index/goSettlement",
		component:goSettlement
	}]
}] 
const router = new VueRouter({
  routes
})
const app = new Vue({
	el:"#app",
	router,
	method:{
		
	},
    render: h => h(App)
})
