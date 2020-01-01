require('pages/common/logo')
require('pages/common/footer')
require('./index.css')
var _util = require('util')
var _city = require('util/city')
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
	show:function(shipping){
		this.shipping = shipping
		this.$modalBox = $('.modal-box')
		this.loadModal()
		this.bindEvent()
		this.loadProvinces()
	},
	loadProvinces:function(){
		//加载省份
		var provinces = _city.getProvinces()
		var provinceSelectOption = this.getSelectOption(provinces)
		var provinceSelect = this.$modalBox.find('.province-select')
		provinceSelect.html(provinceSelectOption)
	},
	loadCities:function(province){
		//加载城市
		var cities = _city.getCities(province)
		var citiesSelectOption = this.getSelectOption(cities)
		var citiesSelect = this.$modalBox.find('.city-select')
		citiesSelect.html(citiesSelectOption)
	},
	getSelectOption:function(arr){
		var html = '<option value="">请选择</option>'
		for(var i = 0; i<arr.length;i++){
			html += '<option value="'+arr[i]+'">'+arr[i]+'</option>'
		}
		return html
	},
	loadModal:function(){
		var html = _util.render(modalTpl,this.shipping)
		this.$modalBox.html(html)
	},
	bindEvent:function(){
		var _this = this
		//1点击关闭地址弹窗
		this.$modalBox.on('click','.close',function(){
			_this.hideModal()
		})
		//阻止事件冒泡
		this.$modalBox.on('click','.modal-container',function(ev){
			ev.stopPropagation()
		})
		//2.监听对应省份加载对应城市信息
		this.$modalBox.on('change','.province-select',function(){
			var province = $(this).val()
			_this.loadCities(province)
		})
		//3提交新增地址
		this.$modalBox.find('#btn-submit').on('click',function(){
			_this.submit()
		})
		//键盘回车提交
		this.$modalBox.find('input').on('keyup',function(ev){
			if (ev.keyCode == 13) {
				_this.submit()
			}
		})
	},
	hideModal:function(){
		this.$modalBox.empty()
	},
	submit:function(ev){
		var _this = this
		//1获取表单数据
		var fromData = {
			name:$.trim($('[name="name"]').val()),
			province:$.trim($('[name="province"]').val()),
			city:$.trim($('[name="city"]').val()),
			address:$.trim($('[name="address"]').val()),
			phone:$.trim($('[name="phone"]').val()),
			zip:$.trim($('[name="zip"]').val()),
		}
		//2验证数据
		var fromDataValiDate = this.validate(fromData)
		//3发送请求
		if (fromDataValiDate.status) {
			fromErr.hide()
			api.addShippings({
				data:fromData,
				success:function(shippings){
					//1.新增成功关闭弹窗
					_this.hideModal()
					//2.自定义事件将数据传递出去
					$('.shipping-box').trigger('get-shippings',[shippings])
					//3.成功提示
					_util.showSuccessMsg('新增地址成功')
				},
				error:function(msg){
					_util.showErrorMsg('新增地址失败')
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
		//验证收货人是否为空
		if (!_util.validate(fromData.name,'required')){
			result.msg='收货人不能为空'
			return result
		}
		//验证省份是否为空
		if (!_util.validate(fromData.province,'required')){
			result.msg='省份不能为空'
			return result
		}
		//验证城市是否为空
		if (!_util.validate(fromData.city,'required')){
			result.msg='城市不能为空'
			return result
		}
		//验证地址是否为空
		if (!_util.validate(fromData.address,'required')){
			result.msg='地址不能为空'
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
		result.status =true
		return result
	}
}