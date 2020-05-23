var nav = require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css')

var api = require('api')
var _util = require('util')
var _modal = require('./modal.js')

var shippingTpl = require('./shipping.tpl')
var productTpl = require('./product.tpl')

var page = {
	init:function(){
		this.shippingBox = $('.shipping-box')
		this.productBox = $('.product-box')
		this.loadShippingList()
		this.loadProductList()
		this.bindEvent()
	},
	bindEvent:function(){
		var _this = this
		this.shippingBox.on('get-shippings',function(ev,shippings){
			_this.renderShippings(shippings)
		})
		//1点击新增地址
		this.shippingBox.on('click','.shipping-add',function(){
			_modal.show()
		})
		//2.点击删除地址
		this.shippingBox.on('click','.shipping-delete',function(ev){
			ev.stopPropagation()
			if (_util.showConfirm('你确定删除该地址吗?')) {
				var shippingId = $(this).parents('.shipping-item').data('shipping-id')
				api.deleteShippings({
					data:{
						id:shippingId
					},
					success:function(shippings){
						_this.renderShippings(shippings)
					},
					error:function(){
						_util.showErrorMsg('删除失败')
					}
				})
			}
		})
		//3.点击编辑地址
		this.shippingBox.on('click','.shipping-edit',function(ev){
			ev.stopPropagation()
			var $this = $(this)
			var shippingId = $(this).parents('.shipping-item').data('shipping-id')
			api.getShippingsDetail({
				data:{
					id:shippingId
				},
				success:function(shipping){
					_modal.show(shipping)
				},
				error:function(){
					_util.showErrorMsg(Msg)
				}
			})
		})
		//4.点击选中地址
		this.shippingBox.on('click','.shipping-item',function(ev){
			ev.stopPropagation()
			var $this = $(this)
			$this.addClass('active')
			.siblings('.shipping-item')
			.removeClass('active')

			_this.selectShippingId = $this.data('shipping-id')
		})
		//5.点击支付
		this.productBox.on('click','.btn-submit',function(){
			var $this = $(this)
			if (_this.selectShippingId) {
				api.addOrders({
					data:{
						shippingId:_this.selectShippingId
					},
					success:function(order){
						window.location.href = './payment.html?orderNo='+order.orderNo
					},
					error:function(){
						_util.showErrMsg('创建订单失败,请稍后再试')
					}
				})
			}else{
				_util.showErrorMsg('你还没有选择地址')
			}
		})
	},
	renderShippings:function(shippings){
		var _this = this
		shippings.forEach(function(shipping){
			if (shipping._id == _this.selectShippingId) {
				shipping.active = true
			}
		})
		var html = _util.render(shippingTpl,{
			shippings:shippings
		})
		this.shippingBox.html(html)
	},
	loadShippingList:function(){
		var _this = this;
		api.getShippings({
			success:function(shippings){
				/*
				var html = _util.render(shippingTpl,{
					shippings:shippings
				})
				_this.shippingBox.html(html)
				*/
				_this.renderShippings(shippings)
			}
		})
	},
	loadProductList:function(){
		var _this = this;
		api.getOrdersList({
			success:function(data){
				if (data.cartList.length > 0) {
					var html = _util.render(productTpl,data)
					_this.productBox.html(html)
				}else{
					_this.productBox.html('<p class="empty-message">你还没有选择任何商品</p>')
				}
			},
			error:function(){
				_this.productBox.html('<p class="empty-message">加载失败,请重试</p>')
			}
		})
		
	}
}
$(function(){
	page.init()
})