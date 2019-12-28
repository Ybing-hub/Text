require('pages/common/logo')
require('pages/common/search')
require('pages/common/footer')
require('./index.css')
var _util = require('util')
var api = require('api')

var page = {
	init:function(){
		this.bindEvent()
	},
	bindEvent:function(){
		var _this = this
		$('#btn-search').on('click',function(){
			_this.submit()
		})
		$('input').on('keyup',function(ev){
			if (ev.keyCode == 13) {
				_this.submit()	
			}
		})
	},
	submit:function(ev){
		var keyword = $.trim($('#search-input').val())
		window.location.href = '/list.html?keyword'+keyword
	}
}

$(function(){
	page.init()
})