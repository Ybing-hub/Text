require('pages/common/nav')
require('pages/common/logo')
require('pages/common/search')
var _side = require('pages/common/side')
require('pages/common/footer')
require('./index.css')
var _util = require('util')
var api = require('api')
var tpl = require('./index.tpl')

var page = {
	init:function(){
		this.renderSide()
		this.loadUsername()
	},
	renderSide:function(){
		_side.render('user-center')
	},
	loadUsername:function(){
		api.getUsernames({
			success:function(data){
				var html = _util.render(tpl,data)
				$('.side-content').html(html)
			}
		})
	}
}
$(function(){
	page.init()
})