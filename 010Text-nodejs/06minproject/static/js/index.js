;(function($){
	//增
	var $input = $('.todo-input')
	$input.on('keydown',function(ev){
		if (ev.keyCode == 13) {
			$.ajax({
				url:'/add',
				type:"post",
				dataType:"json",
				data:{
					things:$input.val()
				},
				success:function(result){
					const data = result.data
					if (result.code == 0) {
						var $dom = $(`<li class="todo-item" data-id="{{item.id}}">${data.things}</li>`)
						$('.todo-list').append($dom)
						$input.val('')
					}
				},
				error:function(err){
					console.log(err)
				}
			})
		}
	})
	//删
	$('.todo-list').on('click','.todo-item',function(){
		var $this = $(this)
		$.ajax({
			url:'/delete',
			dataType:'json',
			data:{
				id:$this.data('id')
			},
			success:function(data){
				if(result.code == 0) {
					$this.remove()
				}else{
					console.log(data.message)
				}
			},
			error:function(err){
				console.log(err)
			}
		})
	})
})(jQuery)