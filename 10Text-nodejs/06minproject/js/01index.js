;(function($){
	//增
	var $input = $('.todu-input')
	$input.on('keydown',function(ev){
		if (ev.keyCode == 13) {
			$.ajax({
				url:'/add',
				type:"post",
				dataType:"json",
				// data:$input.val(),
				success:function(data){
					console.log(data)
				},
				error:function(err){
					console.log(err)
				}
			})
		}
	})
	//删
	/*
	$('.todu-list').on('delete','.todu-item',function(){
		if (ev.keycode == 1) {
			$.ajax({
				url:url,
				dataType:'json',
				data:
				success:function(){},
				error:function(){}
			})
		}
	})
	*/
})(jQuery)