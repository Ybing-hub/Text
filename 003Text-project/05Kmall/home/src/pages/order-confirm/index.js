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
		//1点击新增地址
		this.shippingBox.on('click','shipping-add',function(){
			_modal.show()
		})
	},
	loadShippingList:function(){
		var html = _util.render(shippingTpl)
		this.shippingBox.html(html)
	},
	loadProductList:function(){
		var _this = this;
		api.getOrdersList({
			success:function(data){
				console.log(data)
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