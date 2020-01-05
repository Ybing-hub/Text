var nav = require('pages/common/nav')
require('pages/common/search')
var _side = require('pages/common/side')
require('pages/common/footer')
require('./index.css')

var api = require('api')
var _util = require('util')
var tpl = require('./index.tpl')
require('util/pagination')

var page = {
	ordersListParams:{
		keyword:_util.getParamsFormUrl('keyword'),
		page:_util.getParamsFormUrl('page')  || 1,
	},
	init:function(){
		this.$paginationBox = $('.pagination-box')
		this.loadOrdersList()
		this.renderSide()
		this.initPagination()
	},
	renderSide:function(){
		_side.render('order-list')
	},
	initPagination:function(){
		var _this = this
		this.$paginationBox.pagination()
	},
	loadOrdersList:function(){
		var _this = this
		api.getOrdersList({
			data:_this.ordersListParams,
			success:function(data){
				console.log(data)
				if(data.list.length > 0){
					data.list.forEach(function(order){
						order.createdTime = new Date(order.createdAt).toLocaleString()
					})
					var html = _util.render(tpl,{
						list:data.list
					})
					$('.order-box').html(html)
					//构建分页器结构
					_this.$paginationBox.pagination('render',{
						current:data.current,
						pageSize:data.pageSize,
						total:data.total,
					})
				}else{//没有该条件下的商品信息
					$('.order-box').html('<p class="empty-message">你还没有订单......</p>')
				}
				
			}
		})
	}
}
$(function(){
	page.init()
})