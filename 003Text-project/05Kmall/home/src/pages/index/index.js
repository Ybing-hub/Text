var nav = require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css')
require('node_modules/swiper/css/swiper.min.css')

var api = require('api')
var _util = require('util')

var categoryTpl = require('./category.tpl')
var swiperTpl = require('./swiper.tpl')
var floorsTpl = require('./floors.tpl')

import Swiper from 'swiper'
var page = {
	init:function(){
		this.loadCategory()
		this.loadSwiper()
		this.loadFloors()
	},
	loadCategory:function(){
		api.getCategories({
			success:function(categories){
				var html = _util.render(categoryTpl,{
					categories:categories
				})
				$('.categories').html(html)
			}
		})
	},
	loadSwiper:function(){
		api.getHomeAds({
			data:{
				position:1
			},
			success:function(data){
				var html = _util.render(swiperTpl,{
					slides:data
				})
				$('.swiper-container .swiper-wrapper').html(html)

				var mySwiper = new Swiper ('.swiper-container', {
				    loop: true, // 循环模式选项
				    autoplay:true,
				    // 如果需要分页器
				    pagination: {
				      el: '.swiper-pagination',
				      //点击底部按钮
				       clickable :true
				    },
				    
				    // 如果需要前进后退按钮
				    navigation: {
				      nextEl: '.swiper-button-next',
				      prevEl: '.swiper-button-prev',
				    }
				})     
			}
		})
	},
	loadFloors:function(){
		api.getFloors({
			success:function(data){
				var html = _util.render(floorsTpl,{
					floors:data
				})
				$('.floor-wrap').html(html)
			}
		})
	}
}
$(function(){
	page.init()
})