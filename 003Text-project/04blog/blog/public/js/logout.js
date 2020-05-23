;(function($){
	$('#logout').on('click',function(){
		$.ajax({
			url:'/user/logout',
			type:'get'
		})
		.done(function(data){
			if(data.code == 1){
				//退出成功返回首页
				window.location.href = '/'
			}
		})
		.fail(function(err){
			$('#user-info').find('.err').html('请求失败,请稍后再试!!!')
		})
	})
})(jQuery);
