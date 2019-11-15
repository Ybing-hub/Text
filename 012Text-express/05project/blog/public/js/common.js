/*
* @Author: TomChen
* @Date:   2019-03-13 18:10:45
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-13 18:52:43
*/
;(function($){
	var $login = $('#login')
	var $register = $('#register')
	var $userInfo = $('#user-info')
	$('#go-login').on('click',function(){
		$register.hide()
		$login.show()
	})
	$('#go-register').on('click',function(){
		$register.show()
		$login.hide()
	})


	//验证用户注册
	$('#sub-register').on('click',function(){
		var username = $register.find('[name="username"]').val()
		var password = $register.find('[name="password"]').val()
		var repassword = $register.find('[name="repassword"]').val()
		var $err = $register.find('.err')
		// console.log('err')
		var userReg = /^[a-z][0-9_a-z]{2,6}$/i;
		var passReg = /^\w{3,6}$/;
		var errMsg = ''
		if (!userReg.test(username)) {
			errMsg = '你输入的名字不符合要求'
		}else if(!passReg.test(password)){
			errMsg ='密码格式错误' 
		}else if (password != repassword){
			errMsg = '两次密码不一致'
		}else{
			errMsg = ''
		}
		if (errMsg) {
			$err.html(errMsg)
		}else{
			$err.html('')
			$.ajax({
				url:'/user/register',
				type:'post',
				datatype:'json',
				data:{
					username:username,
					password:password
				}
			})
			.done(function(data){
				if (data.code == '1') {
					$('#go-login').trigger('click')
				}else{
					$err.html(data.message)
				}
			})
			.fail(function(err){
				if (data.code == '-1') {
					$err.html('请求失败，稍后再试')
				}
			})
		}
	})

	//验证用户登陆
	$('#sub-login').on('click',function(){
		var username = $login.find('[name="username"]').val()
		var password = $login.find('[name="password"]').val()
		var $err = $login.find('.err')
		// console.log('err')
		var userReg = /^[a-z][0-9_a-z]{2,6}$/i;
		var passReg = /^\w{3,6}$/;
		var errMsg = ''
		if (!userReg.test(username)) {
			errMsg = '你输入的名字不符合要求'
		}else if(!passReg.test(password)){
			errMsg ='密码格式错误' 
		}else{
			errMsg = ''
		}
		if (errMsg) {
			$err.html(errMsg)
		}else{
			$err.html('')
			$.ajax({
				url:'/user/login',
				type:'post',
				datatype:'json',
				data:{
					username:username,
					password:password
				}
			})
			.done(function(data){
				var $span = $userInfo.find('span').html(data.user.username)
				console.log($span)
				if (data.code == '1') {
					$userInfo.show()
					$login.hide()
				}else{
					$err.html(data.message)
				}
			})
			.fail(function(err){
				if (data.code == '0') {
					$err.html('请求失败，稍后再试')
				}
			})
		}
	})
})(jQuery);