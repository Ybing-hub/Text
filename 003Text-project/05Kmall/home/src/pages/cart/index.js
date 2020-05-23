var _nav = require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css')

var api = require('api')
var _util = require('util')
var tpl = require('./index.tpl')

var page = {
	cartsListParmas:{
		product:_util.getParamsFormUrl('productId'),
		stock:_util.getParamsFormUrl('stock'),
		price:_util.getParamsFormUrl('price')
	},
	init:function(){
		this.$cartBox = $('.cart .cart-box')
		this.loadCarts()
		this.bindEvent()
	},
	bindEvent:function(){
		var _this = this
		//1.处理单个选中或取消
		this.$cartBox.on('click','.select-one',function(){
			var $this = $(this)
			var productId = $this.parents('.product-item').data('product-id')
			//选中
			if ($this.is(':checked')) {
				api.updateCartsChoices({
					data:{
						productId:productId,
						checked:true
					},
					success:function(data){
						_this.renderCart(data)
					},
					error:function(){
						_this.showErrorPage(msg)
					}
				})
			}
			//取消选中
			else{
				api.updateCartsChoices({
					data:{
						productId:productId,
						checked:false
					},
					success:function(data){
						_this.renderCart(data)
					},
					error:function(){
						_this.showErrorPage(msg)
					}
				})
			}
		})
		//2.处理全部选中
		this.$cartBox.on('click','.select-all',function(){
			var $this = $(this)
			//选中
			if ($this.is(':checked')) {
				api.updateCartsChoices({
					data:{
						checked:true
					},
					success:function(data){
						_this.renderCart(data)
					},
					error:function(){
						_this.showErrorPage()
					}
				})
			}
			//取消选中
			else{
				api.updateCartsChoices({
					data:{
						checked:false
					},
					success:function(data){
						_this.renderCart(data)
					},
					error:function(){
						_this.showErrorPage()
					}
				})
			}
		})
		//3.删除单个商品
		this.$cartBox.on('click','.delete-one',function(){
			var $this = $(this)
			var productId = $this.parents('.product-item').data('product-id')
			if (_util.showConfirm('你确定删除该条商品吗?')) {
				api.deleteCarts({
					data:{
						productId:productId
					},
					success:function(data){
						_this.renderCart(data)
					},
					error:function(){
						_this.showErrorPage()
					}
				})
			}
		})
		//4.删除选中商品
		this.$cartBox.on('click','.delete-selected',function(){
			var $this = $(this)
			if (_util.showConfirm('你确定删除选中商品吗?')) {
				api.deleteCarts({
					success:function(data){
						_this.renderCart(data)
					},
					error:function(){
						_this.showErrorPage()
					}
				})
			}
		})
		//5.购物车订单数量+/-
		this.$cartBox.on('click','.count-btn',function(){
			var $this = $(this)
			var $input = $this.siblings('.count-input')
			var productId = $this.parents('.product-item').data('product-id')
			var current = parseInt($input.val())
			var count = current
			console.log(count)
			var stock = $input.data('stock')
			if ($this.hasClass('plus')) {
				if (count >= stock) {
					_util.showErrorMsg('超出商品库存')
					return
				}
				count = current + 1
			}
			else if ($this.hasClass('minus')) {
				if (count <= 1) {
					_util.showErrorMsg('商品至少购买一件')
					return
				}
				count = current - 1
			}
			api.updateCartsCount({
				data:{
					productId:productId,
					count:count
				},
				success:function(data){
					_this.renderCart(data)
				},
				error:function(){
					_this.showErrorPage()
				}
			})
		})
		//6.结算
		this.$cartBox.on('click','.btn-submit',function(){
			if (_this.totalCartPrice > 0) {
				window.location.href = './order-confirm.html'
			}
			else{
				_util.showErrorMsg('请先添加商品再去结算')
			}
		})
	},
	renderCart:function(data){
		_nav.loadCarts()
		if (data.cartList.length > 0) {
			this.totalCartPrice = data.totalCartPrice
			var html = _util.render(tpl,data)
			this.$cartBox.html(html)
		}else{
			this.$cartBox.html('<p class="empty-message">你的购物车空空如也</p>')
		}
	},
	loadCarts:function(){
		var _this = this
		api.getCarts({
			success:function(data){
				console.log(data)
				/*
				if (data.cartList.length > 0) {
					var html = _util.render(tpl,data)
					_this.$cartBox.html(html)
				}else{
					_this.$cartBox.html('<p class="empty-message">你的购物车空空如也</p>')
				}
				*/
				_this.renderCart(data)
			}
		})
	},
	showErrorPage:function(){
		this.$cartBox.html('<p class="empty-message">你的请求出错,稍后再试</p>')
	}
}
$(function(){
	page.init()
})