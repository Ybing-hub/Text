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
	},
	submit:function(ev){
		//1获取表单数据
		var fromData = {
			username:$.trim($('[name="username"]').val()),
			password:$.trim($('[name="password"]').val()),
		}
		//2验证数据
		var fromDataValiDate = this.validate(fromData)
		console.log(fromDataValiDate)
		//3发送请求
		if (fromDataValiDate.status) {
			fromErr.hide()
			api.login({
				data:fromData,
				success:function(data){
					window.location.href='/result.html'
				},
				error:function(msg){
					fromErr.show(msg)
				}
			})
			/*
			$.ajax({
				url:'sessions/users',
				method:'post',
				dataType:'json',
				data:fromData,
				success:function(result){
					if (result.code == 0) {
						window.location.href='/'
					}else{
						fromErr.show('用户名或密码不正确')
					}
				},
				error:function(err){
					fromErr.show('用户名或密码不正确')
				}
			})
			*/
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
		result.status =true
		return result
	}
}

$(function(){
	page.init()
})