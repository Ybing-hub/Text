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
	},
	renderShippings:function(shippings){
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