;(function($){
	var $dropdown = $('.nav .dropdown')
	$($dropdown).dropdown({delay:200})
	$($dropdown).on('dropdown-show',function(ev){
		var dataUrl = $dropdown.data('url');
		if ($dropdown.data('url')) {	
			$.getJSON('',function(data){
			})
		}
		
	})

})(jQuery);