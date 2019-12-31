require('pages/common/logo')
require('pages/common/footer')
require('./index.css')
var _util = require('util')
var modalTpl = require('./modal.tpl')
var api = require('api')

var fromErr = {
	show:function(msg){
		$('.error-item').show()
		$('.error-item')
		.find('.error-msg')
		.text(msg)
	},
	hide:function(){
		$('.error-item').hide()
		$('.error-item')
		.find('.error-msg')
		.text('')
	}
}
module.exports = {
	show:function(){
		this.shipping = shipping
		this.$modalBox = $('.modal-box')
		this.loadModal()
		this.bindEvent()
	},
	loadModal:function(){
		var html = _util.render(modalTpl,this.shipping)
		this.$modalBox.html(html)
	}
}
/*
var page = {
	init:function(){
		this.bindEvent()
	},
	bindEvent:function(){
		var _this = this
		$('#btn-submit').on('click',function(){
			_this.submit()
		})
		$('input').on('keyup',function(ev){
			if (ev.keyCode == 13) {
				_this.submit()	
			}
		})
	},
	submit:function(ev){
		//1获取表单数据
		var fromData = {
			username:$.trim($('[username="username"]').val()),
			address:$.trim($('[name="address"]').val()),
			phone:$.trim($('[name="phone"]').val()),
			email:$.trim($('[name="email"]').val()),
		}
		//2验证数据
		var fromDataValiDate = this.validate(fromData)
		console.log(fromDataValiDate)
		//3发送请求
		if (fromDataValiDate.status) {
			fromErr.hide()
			api.register({
				data:fromData,
				success:function(data){
					window.location.href='/result.html?type=register'
				},
				error:function(msg){
					fromErr.show(fromDataValiDate.msg)
				}
			})
		}else{
			fromErr.show(fromDataValiDate.msg)
		}
	},
	validate:function(fromData){
		var result = {
			status:false,
			msg:''
		}
		//验证用户名是否为空
		if (!_util.validate(fromData.username,'required')){
			result.msg='用户名不能为空'
			return result
		}
		//验证用户名格式
		if (!_util.validate(fromData.username,'username')){
			result.msg='用户名格式不正确'
			return result
		}
		//验证手机号是否为空
		if (!_util.validate(fromData.phone,'required')){
			result.msg='手机号不能为空'
			return result
		}
		//验证手机号格式
		if (!_util.validate(fromData.phone,'phone')){
			result.msg='手机号格式不正确'
			return result
		}
		//验证邮箱是否为空
		if (!_util.validate(fromData.email,'required')){
			result.msg='邮箱不能为空'
			return result
		}
		//验证邮箱格式
		if (!_util.validate(fromData.email,'email')){
			result.msg='邮箱格式不正确'
			return result
		}
		result.status =true
		return result
	}
}

$(function(){
	page.init()
})
*/