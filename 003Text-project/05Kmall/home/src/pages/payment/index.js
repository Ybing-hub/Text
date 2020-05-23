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
		this.timer = 0
		this.paymentBox = $('.payment-box')
		this.loadPayments()
	},
	bindEvent:function(){
	},
	loadPayments:function(){
		var _this = this;
		if (this.paymentsParams.orderNo) {
			api.getPayments({
				data:{
					orderNo:_this.paymentsParams.orderNo
				},
				success:function(order){
					var html = _util.render(tpl,order)
					_this.paymentBox.html(html)
					_this.listenPaymentStatus()
				},
				error:function(){
					_this.paymentBox.html('<p class="empty-message">获取订单失败,请重试</p>')
				}
			})
		}else{
			_this.paymentBox.html('<p class="empty-message">你还没有订单,稍后再试</p>')
		}
		
	},
	listenPaymentStatus:function(){
		var _this = this
		this.timer = setInterval(function(){
			api.getPaymentStatus({
				data:{
					orderNo:_this.paymentsParams.orderNo
				},
				success:function(status){
					if (status) {
						window.location.href = './result.html?type=payment&orderNo='+_this.paymentsParams.orderNo
					}
				},
				error:function(){

				}
			})
		},1000)  
	}
}
$(function(){
	page.init()
})