/*
* @Author: TomChen
* @Date:   2019-03-13 18:10:45
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-13 18:52:43
*/
;(function($){
	var $login = $('#login')
	var $register = $('#register')
	$('#go-login').on('click',function(){
		$register.hide()
		$login.show()
	})
	$('#go-register').on('click',function(){
		$register.show()
		$login.hide()
	})


	//验证用户注册
	var username = $register.find('[name="username"]').val()
	var password = $register.find('[name="password"]').val()
	var repassword = $register.find('[name="repassword"]').val()
	var subRegister = $register.find('[id="sub-register"]')
	var err = document.getElementsByClassName('err')
	subRegister.on('click',function(){
		var userReg = /^[a-z][0-9_a-z]{2,6}$/i;
		var passReg = /^[a-z0-9]{4,6}$/ig;
		var Msg = ''
		if (!userReg.test(username)) {
			Msg = '你输入的名字不符合要求'
		}else if(!passReg.test(password)){
			Msg ='密码格式错误' 
		}else if (password != repassword){
			Msg = '两次密码不一致'
		}else{
			Msg = ''
		}
		err.html(Msg)
	})
})(jQuery);