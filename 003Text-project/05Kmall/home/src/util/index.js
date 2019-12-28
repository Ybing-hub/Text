var Hogan = require('hogan.js')
var tpl = require('pages/common/side/index.tpl')

module.exports={
	validate:function(value,type){
		//1非空验证
		if (type == 'required') {
			return !!value
		}
		//2.验证用户名
		if (type == 'username') {
			return /^[a-z][a-z0-9_]{2,5}$/.test(value)
		}
		//3.验证密码
		if (type == 'password') {
			return /^\w{3,6}$/.test(value)
		}
		//4验证手机号
		if (type == 'phone'){
			return /^1[35789]\d{9}$/.test(value)
		}
		//5.验证邮箱
		if (type == 'email') {
			return /^\w+@\w+\.\w{2,5}$/.test(value)
		}
	},
	showSuccessMsg:function(msg){
		alert(msg)
	},
	showErrorMsg:function(msg){
		alert(msg)
	},
	goLogin:function(){
		window.location.href = '/user-login.html?redirect='+encodeURIComponent(window.location.href)
	},
	getParamsFormUrl:function(key){
		var query = window.location.search.substr(1)
		var reg = new RegExp('(^|&)'+key+'='+'([^&]*)($|&)')
		var result = query.match(reg)
		return result ? decodeURIComponent(result[2]) : null
	},
	render:function(tpl,data){
		var template = Hogan.compile(tpl);
		var html = template.render(data)
		return html
	}
}