var nav = require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css')

var api = require('api')
var _util = require('util')
var tpl = require('./index.tpl')
require('util/pagination')

var page = {
	productsListParams:{
		category:_util.getParamsFormUrl('categoryId'),
		keyword:_util.getParamsFormUrl('keyword'),
		page:_util.getParamsFormUrl('page')  || 1,
		orderBy:_util.getParamsFormUrl('orderBy') || 'default',
	},
	init:function(){
		this.$paginationBox = $('.pagination-box')
		this.loadProductsList()
		this.initPagination()
		this.bindEvent()
	},
	bindEvent:function(){
		var _this = this
		$('.sort-item').on('click',function(){
			var $this = $(this)
			if($this.hasClass('default')){//默认排序
				if($this.hasClass('active')){
					return
				}
				$this.addClass('active').siblings('.sort-item').removeClass('active')
				_this.productsListParams.orderBy = 'default'
			}else if ($this.hasClass('price')){//按价格排序
				$this.addClass('active').siblings('.sort-item').removeClass('active')
				if ($this.hasClass('asc')) {
					$this.removeClass('asc').addClass('desc')
					_this.productsListParams.orderBy = 'price_desc'
				}else if ($this.hasClass('desc')) {
					$this.removeClass('desc').addClass('asc')
					_this.productsListParams.orderBy = 'price_asc'
				}
			}
			_this.productsListParams.page = 1
			_this.loadProductsList()
		})
	},
	initPagination:function(){
		var _this = this
		this.$paginationBox.pagination()
		
	},
	loadProductsList:function(){
		var _this = this
		api.getProductsList({
			data:_this.productsListParams,
			success:function(data){
				console.log(data)
				if(data.list.length > 0){
					var html = _util.render(tpl,{
						list:data.list
					})
					$('.product-list-box').html(html)
					//构建分页器结构
					_this.$paginationBox.pagination('render',{
						current:data.current,
						pageSize:data.pageSize,
						total:data.total,
					})
				}else{//没有该条件下的商品信息
					$('.product-list-box').html('<p class="empty-message">你搜索的商品走丢啦......</p>')
				}
				
			}
		})
	}
}
$(function(){
	page.init()
})