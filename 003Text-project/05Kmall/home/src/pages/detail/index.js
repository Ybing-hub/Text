var nav = require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css')

var api = require('api')
var _util = require('util')
var tpl = require('./index.tpl')

var page = {
	productsDetailParams:{
		id:_util.getParamsFormUrl('productId')
	},
	init:function(){
		this.$detailBox = $('.detail-box')
		this.loadProductDetail()
		this.bindEvent()
	},
	bindEvent:function(){
		var _this = this
		//1切换图片
		this.$detailBox.on('mouseenter','.product-small-img-item',function(){
			var $this = $(this)
			$this.addClass('active')
			.siblings('.product-small-img-item')
			.removeClass('active')
			var imageUrl = $this.find('img').attr('src')
			$('.product-main-img img').attr('src',imageUrl)
		})
		//2商品数量
		this.$detailBox.on('click','.count-btn',function(){
			var $this = $(this)
			var $input = $('.count-input')
			var current = parseInt($input.val())
			if($this.hasClass('plus')){
				$input.val(current < _this.stock ? current + 1 : _this.stock)
			}
			else if($this.hasClass('minus')){
				$input.val(current > 1 ? current - 1 : 1)
			}
		})
		//3添加购物车
		this.$detailBox.on('click','.add-cart-btn',function(){
			var count = $('.count-input').val()
			api.addCarts({
				data:{
					productId:_this.productsDetailParams.id,
					count:count
				},
				success:function(data){
					_util.goResult('addCart')
				}
			})
		})
	},
	loadProductDetail:function(){
		var _this = this
		if (!this.productsDetailParams.id) {
			return
		}
		api.getProductsDetail({
			data:_this.productsDetailParams,
			success:function(product){
				console.log(product)
				//商品缓存
				_this.stock = product.stock
				//图片地址
				product.images = product.images.split(',')
				product.activeImage = product.images[0]

				var html = _util.render(tpl,product)
				_this.$detailBox.html(html)
			}
		})
	}
}
$(function(){
	page.init()
})