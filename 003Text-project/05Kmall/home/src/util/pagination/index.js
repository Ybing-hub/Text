require('./index.css')
var tpl =require('./index.tpl')
var _util =require('util')

;(function($){
	function Pagination($elem){
		this.$elem = $elem
	}
	Pagination.prototype = {
		constructor:Pagination,
		render:function(options){
			//生成页数
			var pages = Math.ceil(options.total / options.pageSize)
			//生成数据
			var pageArray = []
			//计算上一页和下一页 
			var prve = options.current - 1
			var next = options.current + 1
			//添加上一页
			pageArray.push({
				name:'上一页',
				value:prve,
				disabled:prve > 0 ? false : true
			})
			//添加下一页
			pageArray.push({
				name:'下一页',
				value:next,
				disabled:next <= pages ? false : true
			})
			//边界控制
			var start = options.current - options.range > 0 ?  options.current - options.range : 1
			var end = options.current + options.range < pages ?  options.current + options.range : pages
			for(var i = start; i<=end; i++){
				pageArray.push({
					name:i,
					value:i,
					active: options.current == i ? true:false
				})
			}
			var html = _util.render(tpl,{
				pageArray:pageArray,
				current:options.current,
				pages:pages
			})
			this.$elem.html(html)
		}
	}
	Pagination.DEFAULT = {
		range:3
	}
	$.fn.extend({
		pagination:function(fn,options){
			return this.each(function(){
				var $this = $(this)
				var pagination = $this.data('pagination')
				//单例模式
				if (!pagination) {
					var pagination = new Pagination($this)
					$this.data('pagination',pagination)
				}
				options = $.extend({},Pagination.DEFAULT,options)
				if (typeof pagination[fn] == 'function') {
					pagination[fn](options)
				}
			})
		}
	}) 
})(jQuery)