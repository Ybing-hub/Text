require('./index.css')
var api = require('api')
var _util = require('util')
var page = {
	init:function(){
		this.loadUsername()
		this.bindEvent()
		this.loadCarts()
		return this
	},
	bindEvent:function(){
		$('#logout').on('click',function(){

			api.logout({
				success:function(){
					window.location.reload()
				},
				error:function(msg){
					_util.showErrorMsg(msg)
				}
			})
		})
	},
	loadCarts:function(){
		var $cartNum = $('.cart-num')
		api.getCartsCount({
			success:function(count){
				$cartNum.text(count||0)
			},
			error:function(){
				$cartNum.text(0)
			}
		})
	},
	loadUsername:function(){
		api.getUsername({
			success:function(data){
				$('.not-login').hide()
				$('.login').show()
				.find('.username')
				.text(data.username)
			}
		})
	}
}
module.exports = page.init()
