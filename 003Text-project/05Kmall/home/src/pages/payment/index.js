var nav = require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css')

var api = require('api')
var _util = require('util')
var tpl = require('./index.tpl')

var page = {
	paymentsParams:{
		orderNo:_util.getParamsFormUrl('orderNo')
	},
	init:function(){
		this.paymentBox = $('.payment-box')
		this.loadPayments()
	},
	bindEvent:function(){
	},
	loadPayments:function(){
		var _this = this;
		if (this.paymentsParams.orderNo) {
			api.getPayments({
				data:_this.paymentsParams.orderNo,
				success:function(order){
					console.log(order)
					var html = _util.render(tpl,order)
					_this.paymentBox.html(html)
				},
				error:function(){
					_this.paymentBox.html('<p class="empty-message">获取订单失败,请重试</p>')
				}
			})
		}else{
			_this.paymentBox.html('<p class="empty-message">你还没有订单,稍后再试</p>')
		}
		
	}
}
$(function(){
	page.init()
})