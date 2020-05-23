require('pages/common/logo')
require('pages/common/footer')
require('./index.css')
var _util = require('util')
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
		$('[name="username"]').on('blur',function(){
			var username = $(this).val()
			if(!_util.validate(username, 'require')) {
	            return;
	        }
	        if (!_util.validate(username, 'username')) {
	            return;
	        }   
			api.checkUsername({
				data:{
					username:username
				},
				success:function(){
					fromErr.hide()
				},
				error:function(msg){
					fromErr.show(msg)
				}
			})
		})
	},
	submit:function(ev){
		//1获取表单数据
		var fromData = {
			username:$.trim($('[name="username"]').val()),
			password:$.trim($('[name="password"]').val()),
			repassword:$.trim($('[name="repassword"]').val()),
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
		//验证密码是否为空
		if (!_util.validate(fromData.password,'required')){
			result.msg='密码不能为空'
			return result
		}
		//验证密码格式
		if (!_util.validate(fromData.password,'password')){
			result.msg='密码格式不正确'
			return result
		}
		//验证确认密码是否为空
		if (!_util.validate(fromData.repassword,'required')){
			result.msg='确认密码不能为空'
			return result
		}
		//验证确认密码是否一致
		if (fromData.password != fromData.repassword){
			result.msg='两次密码不一致'
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