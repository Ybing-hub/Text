require('pages/common/nav')
// require('pages/common/logo')
require('pages/common/search')
require('pages/common/side')
require('pages/common/footer')
require('./index.css')
var _util = require('util')
var _side = require('pages/common/side')
var api = require('api')
var tpl = require('./index.tpl')

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
		this.renderSide()
		this.bindEvent()
	},
	renderSide:function(){
		_side.render('user-center')
	},
	bindEvent:function(){
		var _this = this
		$('#btn-submit').on('click',function(){
			_this.submit()
		})
		$('#search-input').on('keyup',function(ev){
			if (ev.keyCode == 13) {
				_this.submit()	
			}
		})
	},
	submit:function(ev){
		//1获取表单数据
		var fromData = {
			newpassword:$.trim($('[name="newpassword"]').val()),
			repassword:$.trim($('[name="repassword"]').val()),
		}
		//2验证数据
		var fromDataValiDate = this.validate(fromData)
		console.log(fromDataValiDate)
		//3发送请求
		if (fromDataValiDate.status) {
			fromErr.hide()
			api.updatepswd({
				data:fromData,
				success:function(data){
					window.location.href='/result.html?type=updatePassword'
				},
				error:function(msg){
					fromErr.show(msg)
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
		//验证密码是否为空
		if (!_util.validate(fromData.newpassword,'required')){
			result.msg='密码不能为空'
			return result
		}
		//验证密码格式
		if (!_util.validate(fromData.newpassword,'newpassword')){
			result.msg='密码格式不正确'
			return result
		}
		//验证确认密码是否为空
		if (!_util.validate(fromData.repassword,'required')){
			result.msg='确认密码不能为空'
			return result
		}
		//验证确认密码是否一致
		if (fromData.newpassword != fromData.repassword){
			result.msg='两次密码不一致'
			return result
		}
		result.status =true
		return result
	}
}

$(function(){
	page.init()
})