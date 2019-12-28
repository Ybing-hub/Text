var nav = require('pages/common/nav')
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
		this.$cartBox.on('click','product-item',function(){
			console.log('aaa')
		})
	},
	loadCarts:function(){
		var _this = this
		api.getCarts({
			success:function(data){
				console.log(data)
				if (data.cartList.length > 0) {
					var html = _util.render(tpl,data)
					_this.$cartBox.html(html)
				}else{
					_this.$cartBox.html('<p class="empty-message">你的购物车空空如也</p>')
				}
			}
		})
	}
}
$(function(){
	page.init()
})