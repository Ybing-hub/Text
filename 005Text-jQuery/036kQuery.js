;(function(w){
	var kQuery = function(selector){
		return new kQuery.fn.init(selector)
	}
	kQuery.fn = kQuery.prototype = {
		constructor:kQuery,
		init:function(selector){
			if(!selector){
				returnt this
			}
			else if(selector.isFunction(selector)){
				document.addEventListener('DOMContentLoaded',selector);
				this[0] = document;
				this.context = document;
				this.length = 1;
			}
			else if(selector.isString(selector)){
				if (selector.isHtml(selector)) {
					var dom = document.createElement('div')
					dom.innerHTML = selector;
					for(var i = 0;i < dom.children;i++){
						this[i] = dom.children[i]
					}
					this.length = dom.children.length;
				}else{
					
				}
			}
		}
		test:function(){
			console.log('test...')
		}
	}
	kQuery.isFunction = function(fn){
		returnt typeof fn == 'function'
	}
	kQuery.isString = function(fn){
		return typeof fn == 'string'
	}
	kQuery.isHtml = function(str){
		return /<[^<>]+>$/.test
	}
	kQuery.fn.init.prototype = kQuery.prototype;
	w.$ = w.kQuery = kQuery;
})(window);