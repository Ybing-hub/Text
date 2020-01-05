var nav = require('pages/common/nav')
require('pages/common/search')
var _side = require('pages/common/side')
require('pages/common/footer')
require('./index.css')

var api = require('api')
var _util = require('util')
var tpl = require('./index.tpl')

var page = {
	ordersDetailParams:{
		orderNo:_util.getParamsFormUrl('orderNo'),
	},
	init:function(){
		//加载侧边栏
		this.renderSide()
		this.loadOrderDetail()
	},
	renderSide:function(){
		_side.render('order-list')
	},
	loadOrderDetail:function(){
		var _this = this
		api.getOrderDetail({
			data:this.ordersDetailParams,
			success:function(order){
				console.log(order)
				var html = _util.render(tpl)
				$('.order-box').html(html)
			}
		})
		
	}
}
$(function(){
	page.init()
})