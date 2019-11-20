(function($){
	$('.del').on('click',function(){
		if (!window.confirm("真的要删除吗?")) {
			return false
		}
	})
})(jQuery)